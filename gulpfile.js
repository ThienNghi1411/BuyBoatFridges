const { src, dest, watch, series, parallel, lastRun, task } = require("gulp");
const browserSync = require("browser-sync").create();
const fs = require("fs");
const { argv } = require("yargs");
const sass = require("gulp-sass");
const cssnano = require("cssnano");
const path = require("path");
const plugins = require("gulp-load-plugins")();
const autoprefixer = require("autoprefixer");
const npmRun = require("npm-run");
const esbuild = require("esbuild");


const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


// CSS Func
function buildCss(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`${path.basename(filePath)} does not exist.`);
    return;
  }

  return new Promise((resolve, reject) => {
    src(filePath)
      .pipe(plugins.sourcemaps.init())
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(
        plugins.postcss([
          cssnano({ safe: true, autoprefixer: true }),
          autoprefixer({
            overrideBrowserslist: ["safari >= 10", "last 2 version", "ios >= 10", "not ie >0", "not dead"],
          }),
        ]),
      )
      .pipe(sass({ outputStyle: "nested" }))
      .on("error", function (err) {
        console.log(err.toString());
      })
      .pipe(plugins.rename(path.basename(filePath, ".scss") + ".css"))
      .pipe(dest("theme/assets"))
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(plugins.rename(path.basename(filePath, ".scss") + ".min.css"))
      .pipe(plugins.sourcemaps.write("."))
      .pipe(dest("theme/assets"))
      .on("end", function () {
        console.log(path.basename(filePath) + ": Finish");
      });
  });
}

function cssTask(filePath) {
  let fileName = path.basename(filePath, ".scss");
  let sourceTree = JSON.parse(fs.readFileSync("./app.css.config.json"));
  Object.keys(sourceTree)
    .filter((item) => sourceTree[item].indexOf(fileName) != -1)
    .map((item) => {
      let filePath = "app/styles/" + item + ".scss";
      console.log(filePath);
      buildCss(filePath);
    });
}

async function removeCss(filePath) {
  fs.unlinkSync("theme/assets/" + path.basename(filePath, ".scss") + ".css");
  console.log("Deleted " + path.basename(filePath));
}

// JS Func
async function buildScripts(entryPoints) {
  let entryOnlyMinify = [];
  if (typeof entryPoints === "string") {
    entryPoints = [entryPoints];
  }

  entryPoints = entryPoints.filter((entry) => {
    return entry.includes(".min.js") ? (entryOnlyMinify.push(entry), false) : true;
  });

  // unminify
  let result = await esbuild.build({
    entryPoints,
    bundle: true,
    minify: false,
    legalComments: "inline",
    outdir: path.resolve(__dirname, "./", "theme/assets"),
  });

  if (result.errors.length) {
    console.error(result.error[0]);
    return;
  }

  // minify && source-map
  entryPoints = entryPoints.reduce((accu, value) => {
    accu[`${path.basename(value, ".js")}.min`] = value;
    return accu;
  }, {});
  entryOnlyMinify = entryOnlyMinify.reduce((accu, value) => {
    accu[`${path.basename(value, ".min.js")}.min`] = value;
    return accu;
  }, {});

  return esbuild
    .build({
      entryPoints: {
        ...entryPoints,
        ...entryOnlyMinify,
      },
      bundle: true,
      minify: true,
      legalComments: "inline",
      sourcemap: "external",
      outdir: path.resolve(__dirname, "./", "theme/assets"),
    })
    .then((result) => {
      if (result.errors.length) {
        console.error(result.error[0]);
      } else {
        return [
          Object.keys(entryPoints).map((entry) => {
            console.log(`${entry.split(".")[0]}: Finish`);
            return entry.split(".")[0];
          }),
          Object.keys(entryOnlyMinify).map((entry) => {
            console.log(`${entry.split(".")[0]}: Finish`);
            return path.basename(entry, ".min.js");
          }),
        ];
      }
    });
}

function scriptTask(filePath) {
  let fileName = path.basename(filePath, ".js");
  let sourceTree = JSON.parse(fs.readFileSync("./app.js.config.json"));

  buildScripts(
    Object.keys(sourceTree)
      .filter((item) => {
        return sourceTree[item].indexOf(fileName) != -1;
      })
      .map((item) => {
        return "./app/scripts/" + item + ".js";
      }),
  );
}

async function removeScript(filePath) {
  fs.unlinkSync("theme/assets/" + path.basename(filePath));
  console.log("Deleted " + path.basename(filePath));
}


// Start Server
async function startServer() {
  watch("./app/scripts/common/**/*.js").on("change", scriptTask);
  watch("./app/scripts/*.js").on("change", buildScripts);
  watch("./app/scripts/*.js").on("unlink", removeScript);

  watch("./app/styles/common/**/*.scss").on("change", cssTask);
  watch("./app/styles/*.scss").on("change", buildCss);
  watch("./app/styles/*.scss").on("unlink", removeCss);
  watch(".tmp/theme.update").on(
    "change",
    debounce(function () {
      browserSync.reload("*.css");
    }, 500),
  );
}

async function build() {
  let arrPromise = fs
    .readdirSync("app/styles/", { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => {
      let filePath = "app/styles/" + item.name;
      return new Promise((resolve, reject) => {
        src(filePath)
          .pipe(plugins.sourcemaps.init())
          .pipe(sass.sync().on("error", sass.logError))
          .pipe(
            plugins.postcss([
              cssnano({ safe: true, autoprefixer: true }),
              autoprefixer({
                overrideBrowserslist: ["safari >= 10", "last 2 version", "ios >= 10", "not ie > 0", "not dead"],
              }),
            ]),
          )
          .pipe(sass({ outputStyle: "expanded" }))
          .on("error", function (err) {
            console.log(err.toString());
          })
          .pipe(plugins.rename(path.basename(filePath, ".scss") + ".css"))
          .pipe(dest("theme/assets"))
          .pipe(sass({ outputStyle: "compressed" }))
          .pipe(plugins.rename(path.basename(filePath, ".scss") + ".min.css"))
          .pipe(plugins.sourcemaps.write("."))
          .pipe(dest("theme/assets"))
          .on("end", function () {
            console.log(path.basename(filePath) + ": Finish");
            resolve([path.basename(filePath, ".scss") + ".css", path.basename(filePath, ".scss") + ".min.css", path.basename(filePath, ".scss") + ".min.css.map"]);
          });
      });
    });


  Promise.all(arrPromise).then((res) => {
    npmRun.exec(`cd theme && theme deploy -a --allow-live ${res.map((item) => item.map((item) => "assets/" + item).join(" ")).join(" ")}`, function (err, stdout, stderr) {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  });



  buildScripts(
    fs
      .readdirSync("./app/scripts/", { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => "./app/scripts/" + item.name),
  );
}

exports.serve = startServer;
exports.build = build;
