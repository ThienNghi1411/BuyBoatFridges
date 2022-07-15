(() => {
  // app/scripts/productSpecs.js
  var specOptions = document.querySelectorAll(".productSpecs__optionWrap");
  var contentDestop = document.querySelectorAll(".contentDestop");
  var init = () => {
    specOptions.forEach((specOption, i) => {
      specOption.addEventListener("click", (e) => toggleOption(e, i));
    });
    if (window.innerWidth >= 1e3) {
      specOptions[0].classList.add("productSpecs__activeOption");
      contentDestop[0].style.display = "flex";
    }
  };
  var removeClass = (doms, className) => {
    doms.forEach((dom) => {
      if (dom.classList.contains(className)) {
        dom.classList.remove(className);
      }
    });
  };
  var removeContent = () => {
    contentDestop.forEach((content) => {
      content.style.display = "none";
    });
  };
  var toggleOption = (e, i) => {
    let option = e.currentTarget;
    let content = e.currentTarget.parentElement.querySelectorAll(".productSpecs__content");
    let hideIcon = e.currentTarget.querySelector(".productSpecs__optionWrap-hideIcon");
    let showIcon = e.currentTarget.querySelector(".productSpecs__optionWrap-showIcon");
    if (option.classList.contains("productSpecs__activeOption")) {
      option.classList.remove("productSpecs__activeOption");
      content.forEach((tmp) => {
        tmp.style.display = "none";
      });
      hideIcon.style.display = "none";
      showIcon.style.display = "block";
      contentDestop[i].style.display = "none";
    } else {
      window.innerWidth >= 1e3 ? removeClass(specOptions, "productSpecs__activeOption") : "";
      removeContent();
      option.classList.add("productSpecs__activeOption");
      content.forEach((tmp) => {
        tmp.style.display = "block";
      });
      hideIcon.style.display = "block";
      showIcon.style.display = "none";
      contentDestop[i].style.display = "flex";
    }
  };
  init();
  var dimentionsContents = document.querySelectorAll(".dimentions__content");
  dimentionsContents.forEach((dimentionsContent) => {
    let trContents = dimentionsContent.querySelectorAll("table tbody tr");
    trContents.forEach((trContent) => {
      let tdContents = trContent.querySelectorAll("td");
      tdContents.forEach((tdContent) => {
        if (tdContent.querySelector("img")) {
          tdContent.classList.add("tdWrap");
        }
      });
    });
  });
})();
