(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS({
    "node_modules/lazysizes/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes;
        }
      })(typeof window != "undefined" ? window : {}, function l(window2, document, Date2) {
        "use strict";
        var lazysizes, lazySizesCfg;
        (function() {
          var prop;
          var lazySizesDefaults = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: true,
            ricTimeout: 0,
            throttleDelay: 125
          };
          lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
          for (prop in lazySizesDefaults) {
            if (!(prop in lazySizesCfg)) {
              lazySizesCfg[prop] = lazySizesDefaults[prop];
            }
          }
        })();
        if (!document || !document.getElementsByClassName) {
          return {
            init: function() {
            },
            cfg: lazySizesCfg,
            noSupport: true
          };
        }
        var docElem = document.documentElement;
        var supportPicture = window2.HTMLPictureElement;
        var _addEventListener = "addEventListener";
        var _getAttribute = "getAttribute";
        var addEventListener2 = window2[_addEventListener].bind(window2);
        var setTimeout2 = window2.setTimeout;
        var requestAnimationFrame2 = window2.requestAnimationFrame || setTimeout2;
        var requestIdleCallback = window2.requestIdleCallback;
        var regPicture = /^picture$/i;
        var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
        var regClassCache = {};
        var forEach = Array.prototype.forEach;
        var hasClass = function(ele, cls) {
          if (!regClassCache[cls]) {
            regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
          }
          return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
        };
        var addClass = function(ele, cls) {
          if (!hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
          }
        };
        var removeClass = function(ele, cls) {
          var reg;
          if (reg = hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
          }
        };
        var addRemoveLoadEvents = function(dom, fn, add) {
          var action = add ? _addEventListener : "removeEventListener";
          if (add) {
            addRemoveLoadEvents(dom, fn);
          }
          loadEvents.forEach(function(evt) {
            dom[action](evt, fn);
          });
        };
        var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
          var event = document.createEvent("Event");
          if (!detail) {
            detail = {};
          }
          detail.instance = lazysizes;
          event.initEvent(name, !noBubbles, !noCancelable);
          event.detail = detail;
          elem.dispatchEvent(event);
          return event;
        };
        var updatePolyfill = function(el, full) {
          var polyfill;
          if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
            if (full && full.src && !el[_getAttribute]("srcset")) {
              el.setAttribute("srcset", full.src);
            }
            polyfill({ reevaluate: true, elements: [el] });
          } else if (full && full.src) {
            el.src = full.src;
          }
        };
        var getCSS = function(elem, style) {
          return (getComputedStyle(elem, null) || {})[style];
        };
        var getWidth = function(elem, parent, width) {
          width = width || elem.offsetWidth;
          while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
            width = parent.offsetWidth;
            parent = parent.parentNode;
          }
          return width;
        };
        var rAF = function() {
          var running, waiting;
          var firstFns = [];
          var secondFns = [];
          var fns = firstFns;
          var run = function() {
            var runFns = fns;
            fns = firstFns.length ? secondFns : firstFns;
            running = true;
            waiting = false;
            while (runFns.length) {
              runFns.shift()();
            }
            running = false;
          };
          var rafBatch = function(fn, queue) {
            if (running && !queue) {
              fn.apply(this, arguments);
            } else {
              fns.push(fn);
              if (!waiting) {
                waiting = true;
                (document.hidden ? setTimeout2 : requestAnimationFrame2)(run);
              }
            }
          };
          rafBatch._lsFlush = run;
          return rafBatch;
        }();
        var rAFIt = function(fn, simple) {
          return simple ? function() {
            rAF(fn);
          } : function() {
            var that = this;
            var args = arguments;
            rAF(function() {
              fn.apply(that, args);
            });
          };
        };
        var throttle = function(fn) {
          var running;
          var lastTime = 0;
          var gDelay = lazySizesCfg.throttleDelay;
          var rICTimeout = lazySizesCfg.ricTimeout;
          var run = function() {
            running = false;
            lastTime = Date2.now();
            fn();
          };
          var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
            requestIdleCallback(run, { timeout: rICTimeout });
            if (rICTimeout !== lazySizesCfg.ricTimeout) {
              rICTimeout = lazySizesCfg.ricTimeout;
            }
          } : rAFIt(function() {
            setTimeout2(run);
          }, true);
          return function(isPriority) {
            var delay;
            if (isPriority = isPriority === true) {
              rICTimeout = 33;
            }
            if (running) {
              return;
            }
            running = true;
            delay = gDelay - (Date2.now() - lastTime);
            if (delay < 0) {
              delay = 0;
            }
            if (isPriority || delay < 9) {
              idleCallback();
            } else {
              setTimeout2(idleCallback, delay);
            }
          };
        };
        var debounce = function(func) {
          var timeout, timestamp;
          var wait = 99;
          var run = function() {
            timeout = null;
            func();
          };
          var later = function() {
            var last = Date2.now() - timestamp;
            if (last < wait) {
              setTimeout2(later, wait - last);
            } else {
              (requestIdleCallback || run)(run);
            }
          };
          return function() {
            timestamp = Date2.now();
            if (!timeout) {
              timeout = setTimeout2(later, wait);
            }
          };
        };
        var loader = function() {
          var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
          var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
          var regImg = /^img$/i;
          var regIframe = /^iframe$/i;
          var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
          var shrinkExpand = 0;
          var currentExpand = 0;
          var isLoading = 0;
          var lowRuns = -1;
          var resetPreloading = function(e) {
            isLoading--;
            if (!e || isLoading < 0 || !e.target) {
              isLoading = 0;
            }
          };
          var isVisible = function(elem) {
            if (isBodyHidden == null) {
              isBodyHidden = getCSS(document.body, "visibility") == "hidden";
            }
            return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
          };
          var isNestedVisible = function(elem, elemExpand) {
            var outerRect;
            var parent = elem;
            var visible = isVisible(elem);
            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;
            while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
              visible = (getCSS(parent, "opacity") || 1) > 0;
              if (visible && getCSS(parent, "overflow") != "visible") {
                outerRect = parent.getBoundingClientRect();
                visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
              }
            }
            return visible;
          };
          var checkElements = function() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
            var lazyloadElems = lazysizes.elements;
            if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
              i = 0;
              lowRuns++;
              for (; i < eLlen; i++) {
                if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
                  continue;
                }
                if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
                  unveilElement(lazyloadElems[i]);
                  continue;
                }
                if (!(elemExpandVal = lazyloadElems[i][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                  elemExpand = currentExpand;
                }
                if (!defaultExpand) {
                  defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                  lazysizes._defEx = defaultExpand;
                  preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                  hFac = lazySizesCfg.hFac;
                  isBodyHidden = null;
                  if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                  } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                    currentExpand = defaultExpand;
                  } else {
                    currentExpand = shrinkExpand;
                  }
                }
                if (beforeExpandVal !== elemExpand) {
                  eLvW = innerWidth + elemExpand * hFac;
                  elvH = innerHeight + elemExpand;
                  elemNegativeExpand = elemExpand * -1;
                  beforeExpandVal = elemExpand;
                }
                rect = lazyloadElems[i].getBoundingClientRect();
                if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                  unveilElement(lazyloadElems[i]);
                  loadedSomething = true;
                  if (isLoading > 9) {
                    break;
                  }
                } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                  autoLoadElem = preloadElems[0] || lazyloadElems[i];
                }
              }
              if (autoLoadElem && !loadedSomething) {
                unveilElement(autoLoadElem);
              }
            }
          };
          var throttledCheckElements = throttle(checkElements);
          var switchLoadingClass = function(e) {
            var elem = e.target;
            if (elem._lazyCache) {
              delete elem._lazyCache;
              return;
            }
            resetPreloading(e);
            addClass(elem, lazySizesCfg.loadedClass);
            removeClass(elem, lazySizesCfg.loadingClass);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass);
            triggerEvent(elem, "lazyloaded");
          };
          var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
          var rafSwitchLoadingClass = function(e) {
            rafedSwitchLoadingClass({ target: e.target });
          };
          var changeIframeSrc = function(elem, src) {
            var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
            if (loadMode2 == 0) {
              elem.contentWindow.location.replace(src);
            } else if (loadMode2 == 1) {
              elem.src = src;
            }
          };
          var handleSources = function(source) {
            var customMedia;
            var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
            if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
              source.setAttribute("media", customMedia);
            }
            if (sourceSrcset) {
              source.setAttribute("srcset", sourceSrcset);
            }
          };
          var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
            var src, srcset, parent, isPicture, event, firesLoad;
            if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
              if (sizes) {
                if (isAuto) {
                  addClass(elem, lazySizesCfg.autosizesClass);
                } else {
                  elem.setAttribute("sizes", sizes);
                }
              }
              srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
              src = elem[_getAttribute](lazySizesCfg.srcAttr);
              if (isImg) {
                parent = elem.parentNode;
                isPicture = parent && regPicture.test(parent.nodeName || "");
              }
              firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
              event = { target: elem };
              addClass(elem, lazySizesCfg.loadingClass);
              if (firesLoad) {
                clearTimeout(resetPreloadingTimer);
                resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
              }
              if (isPicture) {
                forEach.call(parent.getElementsByTagName("source"), handleSources);
              }
              if (srcset) {
                elem.setAttribute("srcset", srcset);
              } else if (src && !isPicture) {
                if (regIframe.test(elem.nodeName)) {
                  changeIframeSrc(elem, src);
                } else {
                  elem.src = src;
                }
              }
              if (isImg && (srcset || isPicture)) {
                updatePolyfill(elem, { src });
              }
            }
            if (elem._lazyRace) {
              delete elem._lazyRace;
            }
            removeClass(elem, lazySizesCfg.lazyClass);
            rAF(function() {
              var isLoaded = elem.complete && elem.naturalWidth > 1;
              if (!firesLoad || isLoaded) {
                if (isLoaded) {
                  addClass(elem, lazySizesCfg.fastLoadedClass);
                }
                switchLoadingClass(event);
                elem._lazyCache = true;
                setTimeout2(function() {
                  if ("_lazyCache" in elem) {
                    delete elem._lazyCache;
                  }
                }, 9);
              }
              if (elem.loading == "lazy") {
                isLoading--;
              }
            }, true);
          });
          var unveilElement = function(elem) {
            if (elem._lazyRace) {
              return;
            }
            var detail;
            var isImg = regImg.test(elem.nodeName);
            var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
            var isAuto = sizes == "auto";
            if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
              return;
            }
            detail = triggerEvent(elem, "lazyunveilread").detail;
            if (isAuto) {
              autoSizer.updateElem(elem, true, elem.offsetWidth);
            }
            elem._lazyRace = true;
            isLoading++;
            lazyUnveil(elem, detail, isAuto, sizes, isImg);
          };
          var afterScroll = debounce(function() {
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
          });
          var altLoadmodeScrollListner = function() {
            if (lazySizesCfg.loadMode == 3) {
              lazySizesCfg.loadMode = 2;
            }
            afterScroll();
          };
          var onload = function() {
            if (isCompleted) {
              return;
            }
            if (Date2.now() - started < 999) {
              setTimeout2(onload, 999);
              return;
            }
            isCompleted = true;
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
            addEventListener2("scroll", altLoadmodeScrollListner, true);
          };
          return {
            _: function() {
              started = Date2.now();
              lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
              preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
              addEventListener2("scroll", throttledCheckElements, true);
              addEventListener2("resize", throttledCheckElements, true);
              addEventListener2("pageshow", function(e) {
                if (e.persisted) {
                  var loadingElements = document.querySelectorAll("." + lazySizesCfg.loadingClass);
                  if (loadingElements.length && loadingElements.forEach) {
                    requestAnimationFrame2(function() {
                      loadingElements.forEach(function(img) {
                        if (img.complete) {
                          unveilElement(img);
                        }
                      });
                    });
                  }
                }
              });
              if (window2.MutationObserver) {
                new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
              } else {
                docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                setInterval(throttledCheckElements, 999);
              }
              addEventListener2("hashchange", throttledCheckElements, true);
              ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                document[_addEventListener](name, throttledCheckElements, true);
              });
              if (/d$|^c/.test(document.readyState)) {
                onload();
              } else {
                addEventListener2("load", onload);
                document[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                setTimeout2(onload, 2e4);
              }
              if (lazysizes.elements.length) {
                checkElements();
                rAF._lsFlush();
              } else {
                throttledCheckElements();
              }
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement,
            _aLSL: altLoadmodeScrollListner
          };
        }();
        var autoSizer = function() {
          var autosizesElems;
          var sizeElement = rAFIt(function(elem, parent, event, width) {
            var sources, i, len;
            elem._lazysizesWidth = width;
            width += "px";
            elem.setAttribute("sizes", width);
            if (regPicture.test(parent.nodeName || "")) {
              sources = parent.getElementsByTagName("source");
              for (i = 0, len = sources.length; i < len; i++) {
                sources[i].setAttribute("sizes", width);
              }
            }
            if (!event.detail.dataAttr) {
              updatePolyfill(elem, event.detail);
            }
          });
          var getSizeElement = function(elem, dataAttr, width) {
            var event;
            var parent = elem.parentNode;
            if (parent) {
              width = getWidth(elem, parent, width);
              event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
              if (!event.defaultPrevented) {
                width = event.detail.width;
                if (width && width !== elem._lazysizesWidth) {
                  sizeElement(elem, parent, event, width);
                }
              }
            }
          };
          var updateElementsSizes = function() {
            var i;
            var len = autosizesElems.length;
            if (len) {
              i = 0;
              for (; i < len; i++) {
                getSizeElement(autosizesElems[i]);
              }
            }
          };
          var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
          return {
            _: function() {
              autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
              addEventListener2("resize", debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
          };
        }();
        var init = function() {
          if (!init.i && document.getElementsByClassName) {
            init.i = true;
            autoSizer._();
            loader._();
          }
        };
        setTimeout2(function() {
          if (lazySizesCfg.init) {
            init();
          }
        });
        lazysizes = {
          cfg: lazySizesCfg,
          autoSizer,
          loader,
          init,
          uP: updatePolyfill,
          aC: addClass,
          rC: removeClass,
          hC: hasClass,
          fire: triggerEvent,
          gW: getWidth,
          rAF
        };
        return lazysizes;
      });
    }
  });

  // node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js
  var require_ls_unveilhooks = __commonJS({
    "node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document, lazySizes) {
        "use strict";
        var bgLoad, regBgUrlEscape;
        var uniqueUrls = {};
        if (document.addEventListener) {
          regBgUrlEscape = /\(|\)|\s|'/;
          bgLoad = function(url, cb) {
            var img = document.createElement("img");
            img.onload = function() {
              img.onload = null;
              img.onerror = null;
              img = null;
              cb();
            };
            img.onerror = img.onload;
            img.src = url;
            if (img && img.complete && img.onload) {
              img.onload();
            }
          };
          addEventListener("lazybeforeunveil", function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var tmp, load, bg, poster;
            if (!e.defaultPrevented) {
              var target = e.target;
              if (target.preload == "none") {
                target.preload = target.getAttribute("data-preload") || "auto";
              }
              if (target.getAttribute("data-autoplay") != null) {
                if (target.getAttribute("data-expand") && !target.autoplay) {
                  try {
                    target.play();
                  } catch (er) {
                  }
                } else {
                  requestAnimationFrame(function() {
                    target.setAttribute("data-expand", "-10");
                    lazySizes.aC(target, lazySizes.cfg.lazyClass);
                  });
                }
              }
              tmp = target.getAttribute("data-link");
              if (tmp) {
                addStyleScript(tmp, true);
              }
              tmp = target.getAttribute("data-script");
              if (tmp) {
                e.detail.firesLoad = true;
                load = function() {
                  e.detail.firesLoad = false;
                  lazySizes.fire(target, "_lazyloaded", {}, true, true);
                };
                addStyleScript(tmp, null, load);
              }
              tmp = target.getAttribute("data-require");
              if (tmp) {
                if (lazySizes.cfg.requireJs) {
                  lazySizes.cfg.requireJs([tmp]);
                } else {
                  addStyleScript(tmp);
                }
              }
              bg = target.getAttribute("data-bg");
              if (bg) {
                e.detail.firesLoad = true;
                load = function() {
                  target.style.backgroundImage = "url(" + (regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg) + ")";
                  e.detail.firesLoad = false;
                  lazySizes.fire(target, "_lazyloaded", {}, true, true);
                };
                bgLoad(bg, load);
              }
              poster = target.getAttribute("data-poster");
              if (poster) {
                e.detail.firesLoad = true;
                load = function() {
                  target.poster = poster;
                  e.detail.firesLoad = false;
                  lazySizes.fire(target, "_lazyloaded", {}, true, true);
                };
                bgLoad(poster, load);
              }
            }
          }, false);
        }
        function addStyleScript(src, style, cb) {
          if (uniqueUrls[src]) {
            return;
          }
          var elem = document.createElement(style ? "link" : "script");
          var insertElem = document.getElementsByTagName("script")[0];
          if (style) {
            elem.rel = "stylesheet";
            elem.href = src;
          } else {
            elem.onload = function() {
              elem.onerror = null;
              elem.onload = null;
              cb();
            };
            elem.onerror = elem.onload;
            elem.src = src;
          }
          uniqueUrls[src] = true;
          uniqueUrls[elem.src || elem.href] = true;
          insertElem.parentNode.insertBefore(elem, insertElem);
        }
      });
    }
  });

  // node_modules/lazysizes/plugins/parent-fit/ls.parent-fit.js
  var require_ls_parent_fit = __commonJS({
    "node_modules/lazysizes/plugins/parent-fit/ls.parent-fit.js"(exports, module) {
      (function(window2, factory) {
        if (!window2) {
          return;
        }
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(typeof window != "undefined" ? window : 0, function(window2, document, lazySizes) {
        "use strict";
        if (!window2.addEventListener) {
          return;
        }
        var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
        var regCssFit = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/;
        var regCssObject = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/;
        var regPicture = /^picture$/i;
        var cfg = lazySizes.cfg;
        var getCSS = function(elem) {
          return getComputedStyle(elem, null) || {};
        };
        var parentFit = {
          getParent: function(element, parentSel) {
            var parent = element;
            var parentNode = element.parentNode;
            if ((!parentSel || parentSel == "prev") && parentNode && regPicture.test(parentNode.nodeName || "")) {
              parentNode = parentNode.parentNode;
            }
            if (parentSel != "self") {
              if (parentSel == "prev") {
                parent = element.previousElementSibling;
              } else if (parentSel && (parentNode.closest || window2.jQuery)) {
                parent = (parentNode.closest ? parentNode.closest(parentSel) : jQuery(parentNode).closest(parentSel)[0]) || parentNode;
              } else {
                parent = parentNode;
              }
            }
            return parent;
          },
          getFit: function(element) {
            var tmpMatch, parentObj;
            var css = getCSS(element);
            var content = css.content || css.fontFamily;
            var obj = {
              fit: element._lazysizesParentFit || element.getAttribute("data-parent-fit")
            };
            if (!obj.fit && content && (tmpMatch = content.match(regCssFit))) {
              obj.fit = tmpMatch[1];
            }
            if (obj.fit) {
              parentObj = element._lazysizesParentContainer || element.getAttribute("data-parent-container");
              if (!parentObj && content && (tmpMatch = content.match(regCssObject))) {
                parentObj = tmpMatch[1];
              }
              obj.parent = parentFit.getParent(element, parentObj);
            } else {
              obj.fit = css.objectFit;
            }
            return obj;
          },
          getImageRatio: function(element) {
            var i, srcset, media, ratio, match, width, height;
            var parent = element.parentNode;
            var elements = parent && regPicture.test(parent.nodeName || "") ? parent.querySelectorAll("source, img") : [element];
            for (i = 0; i < elements.length; i++) {
              element = elements[i];
              srcset = element.getAttribute(cfg.srcsetAttr) || element.getAttribute("srcset") || element.getAttribute("data-pfsrcset") || element.getAttribute("data-risrcset") || "";
              media = element._lsMedia || element.getAttribute("media");
              media = cfg.customMedia[element.getAttribute("data-media") || media] || media;
              if (srcset && (!media || (window2.matchMedia && matchMedia(media) || {}).matches)) {
                ratio = parseFloat(element.getAttribute("data-aspectratio"));
                if (!ratio) {
                  match = srcset.match(regDescriptors);
                  if (match) {
                    if (match[2] == "w") {
                      width = match[1];
                      height = match[3];
                    } else {
                      width = match[3];
                      height = match[1];
                    }
                  } else {
                    width = element.getAttribute("width");
                    height = element.getAttribute("height");
                  }
                  ratio = width / height;
                }
                break;
              }
            }
            return ratio;
          },
          calculateSize: function(element, width) {
            var displayRatio, height, imageRatio, retWidth;
            var fitObj = this.getFit(element);
            var fit = fitObj.fit;
            var fitElem = fitObj.parent;
            if (fit != "width" && (fit != "contain" && fit != "cover" || !(imageRatio = this.getImageRatio(element)))) {
              return width;
            }
            if (fitElem) {
              width = fitElem.clientWidth;
            } else {
              fitElem = element;
            }
            retWidth = width;
            if (fit == "width") {
              retWidth = width;
            } else {
              height = fitElem.clientHeight;
              if ((displayRatio = width / height) && (fit == "cover" && displayRatio < imageRatio || fit == "contain" && displayRatio > imageRatio)) {
                retWidth = width * (imageRatio / displayRatio);
              }
            }
            return retWidth;
          }
        };
        lazySizes.parentFit = parentFit;
        document.addEventListener("lazybeforesizes", function(e) {
          if (e.defaultPrevented || e.detail.instance != lazySizes) {
            return;
          }
          var element = e.target;
          e.detail.width = parentFit.calculateSize(element, e.detail.width);
        });
      });
    }
  });

  // node_modules/lazysizes/plugins/object-fit/ls.object-fit.js
  var require_ls_object_fit = __commonJS({
    "node_modules/lazysizes/plugins/object-fit/ls.object-fit.js"(exports, module) {
      (function(window2, factory) {
        if (!window2) {
          return;
        }
        var globalInstall = function(initialEvent) {
          factory(window2.lazySizes, initialEvent);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(typeof window != "undefined" ? window : 0, function(window2, document, lazySizes, initialEvent) {
        "use strict";
        var cloneElementClass;
        var style = document.createElement("a").style;
        var fitSupport = "objectFit" in style;
        var positionSupport = fitSupport && "objectPosition" in style;
        var regCssFit = /object-fit["']*\s*:\s*["']*(contain|cover)/;
        var regCssPosition = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/;
        var blankSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        var regBgUrlEscape = /\(|\)|'/;
        var positionDefaults = {
          center: "center",
          "50% 50%": "center"
        };
        function getObject(element) {
          var css = getComputedStyle(element, null) || {};
          var content = css.fontFamily || "";
          var objectFit = content.match(regCssFit) || "";
          var objectPosition = objectFit && content.match(regCssPosition) || "";
          if (objectPosition) {
            objectPosition = objectPosition[1];
          }
          return {
            fit: objectFit && objectFit[1] || "",
            position: positionDefaults[objectPosition] || objectPosition || "center"
          };
        }
        function generateStyleClass() {
          if (cloneElementClass) {
            return;
          }
          var styleElement = document.createElement("style");
          cloneElementClass = lazySizes.cfg.objectFitClass || "lazysizes-display-clone";
          document.querySelector("head").appendChild(styleElement);
        }
        function removePrevClone(element) {
          var prev = element.previousElementSibling;
          if (prev && lazySizes.hC(prev, cloneElementClass)) {
            prev.parentNode.removeChild(prev);
            element.style.position = prev.getAttribute("data-position") || "";
            element.style.visibility = prev.getAttribute("data-visibility") || "";
          }
        }
        function initFix(element, config) {
          var switchClassesAdded, addedSrc, styleElement, styleElementStyle;
          var lazysizesCfg = lazySizes.cfg;
          var onChange = function() {
            var src = element.currentSrc || element.src;
            if (src && addedSrc !== src) {
              addedSrc = src;
              styleElementStyle.backgroundImage = "url(" + (regBgUrlEscape.test(src) ? JSON.stringify(src) : src) + ")";
              if (!switchClassesAdded) {
                switchClassesAdded = true;
                lazySizes.rC(styleElement, lazysizesCfg.loadingClass);
                lazySizes.aC(styleElement, lazysizesCfg.loadedClass);
              }
            }
          };
          var rafedOnChange = function() {
            lazySizes.rAF(onChange);
          };
          element._lazysizesParentFit = config.fit;
          element.addEventListener("lazyloaded", rafedOnChange, true);
          element.addEventListener("load", rafedOnChange, true);
          lazySizes.rAF(function() {
            var hideElement = element;
            var container = element.parentNode;
            if (container.nodeName.toUpperCase() == "PICTURE") {
              hideElement = container;
              container = container.parentNode;
            }
            removePrevClone(hideElement);
            if (!cloneElementClass) {
              generateStyleClass();
            }
            styleElement = element.cloneNode(false);
            styleElementStyle = styleElement.style;
            styleElement.addEventListener("load", function() {
              var curSrc = styleElement.currentSrc || styleElement.src;
              if (curSrc && curSrc != blankSrc) {
                styleElement.src = blankSrc;
                styleElement.srcset = "";
              }
            });
            lazySizes.rC(styleElement, lazysizesCfg.loadedClass);
            lazySizes.rC(styleElement, lazysizesCfg.lazyClass);
            lazySizes.rC(styleElement, lazysizesCfg.autosizesClass);
            lazySizes.aC(styleElement, lazysizesCfg.loadingClass);
            lazySizes.aC(styleElement, cloneElementClass);
            [
              "data-parent-fit",
              "data-parent-container",
              "data-object-fit-polyfilled",
              lazysizesCfg.srcsetAttr,
              lazysizesCfg.srcAttr
            ].forEach(function(attr) {
              styleElement.removeAttribute(attr);
            });
            styleElement.src = blankSrc;
            styleElement.srcset = "";
            styleElementStyle.backgroundRepeat = "no-repeat";
            styleElementStyle.backgroundPosition = config.position;
            styleElementStyle.backgroundSize = config.fit;
            styleElement.setAttribute("data-position", hideElement.style.position);
            styleElement.setAttribute("data-visibility", hideElement.style.visibility);
            hideElement.style.visibility = "hidden";
            hideElement.style.position = "absolute";
            element.setAttribute("data-parent-fit", config.fit);
            element.setAttribute("data-parent-container", "prev");
            element.setAttribute("data-object-fit-polyfilled", "");
            element._objectFitPolyfilledDisplay = styleElement;
            container.insertBefore(styleElement, hideElement);
            if (element._lazysizesParentFit) {
              delete element._lazysizesParentFit;
            }
            if (element.complete) {
              onChange();
            }
          });
        }
        if (!fitSupport || !positionSupport) {
          var onRead = function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var element = e.target;
            var obj = getObject(element);
            if (obj.fit && (!fitSupport || obj.position != "center")) {
              initFix(element, obj);
              return true;
            }
            return false;
          };
          window2.addEventListener("lazybeforesizes", function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var element = e.target;
            if (element.getAttribute("data-object-fit-polyfilled") != null && !element._objectFitPolyfilledDisplay) {
              if (!onRead(e)) {
                lazySizes.rAF(function() {
                  element.removeAttribute("data-object-fit-polyfilled");
                });
              }
            }
          });
          window2.addEventListener("lazyunveilread", onRead, true);
          if (initialEvent && initialEvent.detail) {
            onRead(initialEvent);
          }
        }
      });
    }
  });

  // node_modules/lazysizes/plugins/bgset/ls.bgset.js
  var require_ls_bgset = __commonJS({
    "node_modules/lazysizes/plugins/bgset/ls.bgset.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document, lazySizes) {
        "use strict";
        if (!window2.addEventListener) {
          return;
        }
        var lazySizesCfg = lazySizes.cfg;
        var regWhite = /\s+/g;
        var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
        var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/;
        var regType = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/;
        var regBgUrlEscape = /\(|\)|'/;
        var allowedBackgroundSize = { contain: 1, cover: 1 };
        var proxyWidth = function(elem) {
          var width = lazySizes.gW(elem, elem.parentNode);
          if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
            elem._lazysizesWidth = width;
          }
          return elem._lazysizesWidth;
        };
        var getBgSize = function(elem) {
          var bgSize;
          bgSize = (getComputedStyle(elem) || { getPropertyValue: function() {
          } }).getPropertyValue("background-size");
          if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
            bgSize = elem.style.backgroundSize;
          }
          return bgSize;
        };
        var setTypeOrMedia = function(source, match) {
          if (match) {
            var typeMatch = match.match(regType);
            if (typeMatch && typeMatch[1]) {
              source.setAttribute("type", typeMatch[1]);
            } else {
              source.setAttribute("media", lazySizesCfg.customMedia[match] || match);
            }
          }
        };
        var createPicture = function(sets, elem, img) {
          var picture = document.createElement("picture");
          var sizes = elem.getAttribute(lazySizesCfg.sizesAttr);
          var ratio = elem.getAttribute("data-ratio");
          var optimumx = elem.getAttribute("data-optimumx");
          if (elem._lazybgset && elem._lazybgset.parentNode == elem) {
            elem.removeChild(elem._lazybgset);
          }
          Object.defineProperty(img, "_lazybgset", {
            value: elem,
            writable: true
          });
          Object.defineProperty(elem, "_lazybgset", {
            value: picture,
            writable: true
          });
          sets = sets.replace(regWhite, " ").split(regSplitSet);
          picture.style.display = "none";
          img.className = lazySizesCfg.lazyClass;
          if (sets.length == 1 && !sizes) {
            sizes = "auto";
          }
          sets.forEach(function(set) {
            var match;
            var source = document.createElement("source");
            if (sizes && sizes != "auto") {
              source.setAttribute("sizes", sizes);
            }
            if (match = set.match(regSource)) {
              source.setAttribute(lazySizesCfg.srcsetAttr, match[1]);
              setTypeOrMedia(source, match[2]);
              setTypeOrMedia(source, match[3]);
            } else {
              source.setAttribute(lazySizesCfg.srcsetAttr, set);
            }
            picture.appendChild(source);
          });
          if (sizes) {
            img.setAttribute(lazySizesCfg.sizesAttr, sizes);
            elem.removeAttribute(lazySizesCfg.sizesAttr);
            elem.removeAttribute("sizes");
          }
          if (optimumx) {
            img.setAttribute("data-optimumx", optimumx);
          }
          if (ratio) {
            img.setAttribute("data-ratio", ratio);
          }
          picture.appendChild(img);
          elem.appendChild(picture);
        };
        var proxyLoad = function(e) {
          if (!e.target._lazybgset) {
            return;
          }
          var image = e.target;
          var elem = image._lazybgset;
          var bg = image.currentSrc || image.src;
          if (bg) {
            var useSrc = regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg;
            var event = lazySizes.fire(elem, "bgsetproxy", {
              src: bg,
              useSrc,
              fullSrc: null
            });
            if (!event.defaultPrevented) {
              elem.style.backgroundImage = event.detail.fullSrc || "url(" + event.detail.useSrc + ")";
            }
          }
          if (image._lazybgsetLoading) {
            lazySizes.fire(elem, "_lazyloaded", {}, false, true);
            delete image._lazybgsetLoading;
          }
        };
        addEventListener("lazybeforeunveil", function(e) {
          var set, image, elem;
          if (e.defaultPrevented || !(set = e.target.getAttribute("data-bgset"))) {
            return;
          }
          elem = e.target;
          image = document.createElement("img");
          image.alt = "";
          image._lazybgsetLoading = true;
          e.detail.firesLoad = true;
          createPicture(set, elem, image);
          setTimeout(function() {
            lazySizes.loader.unveil(image);
            lazySizes.rAF(function() {
              lazySizes.fire(image, "_lazyloaded", {}, true, true);
              if (image.complete) {
                proxyLoad({ target: image });
              }
            });
          });
        });
        document.addEventListener("load", proxyLoad, true);
        window2.addEventListener("lazybeforesizes", function(e) {
          if (e.detail.instance != lazySizes) {
            return;
          }
          if (e.target._lazybgset && e.detail.dataAttr) {
            var elem = e.target._lazybgset;
            var bgSize = getBgSize(elem);
            if (allowedBackgroundSize[bgSize]) {
              e.target._lazysizesParentFit = bgSize;
              lazySizes.rAF(function() {
                e.target.setAttribute("data-parent-fit", bgSize);
                if (e.target._lazysizesParentFit) {
                  delete e.target._lazysizesParentFit;
                }
              });
            }
          }
        }, true);
        document.documentElement.addEventListener("lazybeforesizes", function(e) {
          if (e.defaultPrevented || !e.target._lazybgset || e.detail.instance != lazySizes) {
            return;
          }
          e.detail.width = proxyWidth(e.target._lazybgset);
        });
      });
    }
  });

  // node_modules/lazysizes/plugins/respimg/ls.respimg.js
  var require_ls_respimg = __commonJS({
    "node_modules/lazysizes/plugins/respimg/ls.respimg.js"(exports, module) {
      (function(window2, factory) {
        if (!window2) {
          return;
        }
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(typeof window != "undefined" ? window : 0, function(window2, document, lazySizes) {
        "use strict";
        var polyfill;
        var lazySizesCfg = lazySizes.cfg;
        var img = document.createElement("img");
        var supportSrcset = "sizes" in img && "srcset" in img;
        var regHDesc = /\s+\d+h/g;
        var fixEdgeHDescriptor = function() {
          var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
          var forEach = Array.prototype.forEach;
          return function() {
            var img2 = document.createElement("img");
            var removeHDescriptors = function(source) {
              var ratio, match;
              var srcset = source.getAttribute(lazySizesCfg.srcsetAttr);
              if (srcset) {
                if (match = srcset.match(regDescriptors)) {
                  if (match[2] == "w") {
                    ratio = match[1] / match[3];
                  } else {
                    ratio = match[3] / match[1];
                  }
                  if (ratio) {
                    source.setAttribute("data-aspectratio", ratio);
                  }
                  source.setAttribute(lazySizesCfg.srcsetAttr, srcset.replace(regHDesc, ""));
                }
              }
            };
            var handler = function(e) {
              if (e.detail.instance != lazySizes) {
                return;
              }
              var picture = e.target.parentNode;
              if (picture && picture.nodeName == "PICTURE") {
                forEach.call(picture.getElementsByTagName("source"), removeHDescriptors);
              }
              removeHDescriptors(e.target);
            };
            var test = function() {
              if (!!img2.currentSrc) {
                document.removeEventListener("lazybeforeunveil", handler);
              }
            };
            document.addEventListener("lazybeforeunveil", handler);
            img2.onload = test;
            img2.onerror = test;
            img2.srcset = "data:,a 1w 1h";
            if (img2.complete) {
              test();
            }
          };
        }();
        if (!lazySizesCfg.supportsType) {
          lazySizesCfg.supportsType = function(type) {
            return !type;
          };
        }
        if (window2.HTMLPictureElement && supportSrcset) {
          if (!lazySizes.hasHDescriptorFix && document.msElementsFromPoint) {
            lazySizes.hasHDescriptorFix = true;
            fixEdgeHDescriptor();
          }
          return;
        }
        if (window2.picturefill || lazySizesCfg.pf) {
          return;
        }
        lazySizesCfg.pf = function(options) {
          var i, len;
          if (window2.picturefill) {
            return;
          }
          for (i = 0, len = options.elements.length; i < len; i++) {
            polyfill(options.elements[i]);
          }
        };
        polyfill = function() {
          var ascendingSort = function(a, b) {
            return a.w - b.w;
          };
          var regPxLength = /^\s*\d+\.*\d*px\s*$/;
          var reduceCandidate = function(srces) {
            var lowerCandidate, bonusFactor;
            var len = srces.length;
            var candidate = srces[len - 1];
            var i = 0;
            for (i; i < len; i++) {
              candidate = srces[i];
              candidate.d = candidate.w / srces.w;
              if (candidate.d >= srces.d) {
                if (!candidate.cached && (lowerCandidate = srces[i - 1]) && lowerCandidate.d > srces.d - 0.13 * Math.pow(srces.d, 2.2)) {
                  bonusFactor = Math.pow(lowerCandidate.d - 0.6, 1.6);
                  if (lowerCandidate.cached) {
                    lowerCandidate.d += 0.15 * bonusFactor;
                  }
                  if (lowerCandidate.d + (candidate.d - srces.d) * bonusFactor > srces.d) {
                    candidate = lowerCandidate;
                  }
                }
                break;
              }
            }
            return candidate;
          };
          var parseWsrcset = function() {
            var candidates;
            var regWCandidates = /(([^,\s].[^\s]+)\s+(\d+)w)/g;
            var regMultiple = /\s/;
            var addCandidate = function(match, candidate, url, wDescriptor) {
              candidates.push({
                c: candidate,
                u: url,
                w: wDescriptor * 1
              });
            };
            return function(input) {
              candidates = [];
              input = input.trim();
              input.replace(regHDesc, "").replace(regWCandidates, addCandidate);
              if (!candidates.length && input && !regMultiple.test(input)) {
                candidates.push({
                  c: input,
                  u: input,
                  w: 99
                });
              }
              return candidates;
            };
          }();
          var runMatchMedia = function() {
            if (runMatchMedia.init) {
              return;
            }
            runMatchMedia.init = true;
            addEventListener("resize", function() {
              var timer;
              var matchMediaElems = document.getElementsByClassName("lazymatchmedia");
              var run = function() {
                var i, len;
                for (i = 0, len = matchMediaElems.length; i < len; i++) {
                  polyfill(matchMediaElems[i]);
                }
              };
              return function() {
                clearTimeout(timer);
                timer = setTimeout(run, 66);
              };
            }());
          };
          var createSrcset = function(elem, isImage) {
            var parsedSet;
            var srcSet = elem.getAttribute("srcset") || elem.getAttribute(lazySizesCfg.srcsetAttr);
            if (!srcSet && isImage) {
              srcSet = !elem._lazypolyfill ? elem.getAttribute(lazySizesCfg.srcAttr) || elem.getAttribute("src") : elem._lazypolyfill._set;
            }
            if (!elem._lazypolyfill || elem._lazypolyfill._set != srcSet) {
              parsedSet = parseWsrcset(srcSet || "");
              if (isImage && elem.parentNode) {
                parsedSet.isPicture = elem.parentNode.nodeName.toUpperCase() == "PICTURE";
                if (parsedSet.isPicture) {
                  if (window2.matchMedia) {
                    lazySizes.aC(elem, "lazymatchmedia");
                    runMatchMedia();
                  }
                }
              }
              parsedSet._set = srcSet;
              Object.defineProperty(elem, "_lazypolyfill", {
                value: parsedSet,
                writable: true
              });
            }
          };
          var getX = function(elem) {
            var dpr = window2.devicePixelRatio || 1;
            var optimum = lazySizes.getX && lazySizes.getX(elem);
            return Math.min(optimum || dpr, 2.5, dpr);
          };
          var matchesMedia = function(media) {
            if (window2.matchMedia) {
              matchesMedia = function(media2) {
                return !media2 || (matchMedia(media2) || {}).matches;
              };
            } else {
              return !media;
            }
            return matchesMedia(media);
          };
          var getCandidate = function(elem) {
            var sources, i, len, media, source, srces, src, width;
            source = elem;
            createSrcset(source, true);
            srces = source._lazypolyfill;
            if (srces.isPicture) {
              for (i = 0, sources = elem.parentNode.getElementsByTagName("source"), len = sources.length; i < len; i++) {
                if (lazySizesCfg.supportsType(sources[i].getAttribute("type"), elem) && matchesMedia(sources[i].getAttribute("media"))) {
                  source = sources[i];
                  createSrcset(source);
                  srces = source._lazypolyfill;
                  break;
                }
              }
            }
            if (srces.length > 1) {
              width = source.getAttribute("sizes") || "";
              width = regPxLength.test(width) && parseInt(width, 10) || lazySizes.gW(elem, elem.parentNode);
              srces.d = getX(elem);
              if (!srces.src || !srces.w || srces.w < width) {
                srces.w = width;
                src = reduceCandidate(srces.sort(ascendingSort));
                srces.src = src;
              } else {
                src = srces.src;
              }
            } else {
              src = srces[0];
            }
            return src;
          };
          var p = function(elem) {
            if (supportSrcset && elem.parentNode && elem.parentNode.nodeName.toUpperCase() != "PICTURE") {
              return;
            }
            var candidate = getCandidate(elem);
            if (candidate && candidate.u && elem._lazypolyfill.cur != candidate.u) {
              elem._lazypolyfill.cur = candidate.u;
              candidate.cached = true;
              elem.setAttribute(lazySizesCfg.srcAttr, candidate.u);
              elem.setAttribute("src", candidate.u);
            }
          };
          p.parse = parseWsrcset;
          return p;
        }();
        if (lazySizesCfg.loadedClass && lazySizesCfg.loadingClass) {
          (function() {
            var sels = [];
            ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(sel) {
              sels.push(sel + lazySizesCfg.loadedClass);
              sels.push(sel + lazySizesCfg.loadingClass);
            });
            lazySizesCfg.pf({
              elements: document.querySelectorAll(sels.join(", "))
            });
          })();
        }
      });
    }
  });

  // node_modules/lazysizes/plugins/rias/ls.rias.js
  var require_ls_rias = __commonJS({
    "node_modules/lazysizes/plugins/rias/ls.rias.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document, lazySizes) {
        "use strict";
        var config, riasCfg;
        var lazySizesCfg = lazySizes.cfg;
        var replaceTypes = { string: 1, number: 1 };
        var regNumber = /^\-*\+*\d+\.*\d*$/;
        var regPicture = /^picture$/i;
        var regWidth = /\s*\{\s*width\s*\}\s*/i;
        var regHeight = /\s*\{\s*height\s*\}\s*/i;
        var regPlaceholder = /\s*\{\s*([a-z0-9]+)\s*\}\s*/ig;
        var regObj = /^\[.*\]|\{.*\}$/;
        var regAllowedSizes = /^(?:auto|\d+(px)?)$/;
        var anchor = document.createElement("a");
        var img = document.createElement("img");
        var buggySizes = "srcset" in img && !("sizes" in img);
        var supportPicture = !!window2.HTMLPictureElement && !buggySizes;
        (function() {
          var prop;
          var noop = function() {
          };
          var riasDefaults = {
            prefix: "",
            postfix: "",
            srcAttr: "data-src",
            absUrl: false,
            modifyOptions: noop,
            widthmap: {},
            ratio: false,
            traditionalRatio: false,
            aspectratio: false
          };
          config = lazySizes && lazySizes.cfg;
          if (!config.supportsType) {
            config.supportsType = function(type) {
              return !type;
            };
          }
          if (!config.rias) {
            config.rias = {};
          }
          riasCfg = config.rias;
          if (!("widths" in riasCfg)) {
            riasCfg.widths = [];
            (function(widths) {
              var width;
              var i = 0;
              while (!width || width < 3e3) {
                i += 5;
                if (i > 30) {
                  i += 1;
                }
                width = 36 * i;
                widths.push(width);
              }
            })(riasCfg.widths);
          }
          for (prop in riasDefaults) {
            if (!(prop in riasCfg)) {
              riasCfg[prop] = riasDefaults[prop];
            }
          }
        })();
        function getElementOptions(elem, src, options) {
          var attr, parent, setOption, prop, opts;
          var elemStyles = window2.getComputedStyle(elem);
          if (!options) {
            parent = elem.parentNode;
            options = {
              isPicture: !!(parent && regPicture.test(parent.nodeName || ""))
            };
          } else {
            opts = {};
            for (prop in options) {
              opts[prop] = options[prop];
            }
            options = opts;
          }
          setOption = function(attr2, run) {
            var attrVal = elem.getAttribute("data-" + attr2);
            if (!attrVal) {
              var styles = elemStyles.getPropertyValue("--ls-" + attr2);
              if (styles) {
                attrVal = styles.trim();
              }
            }
            if (attrVal) {
              if (attrVal == "true") {
                attrVal = true;
              } else if (attrVal == "false") {
                attrVal = false;
              } else if (regNumber.test(attrVal)) {
                attrVal = parseFloat(attrVal);
              } else if (typeof riasCfg[attr2] == "function") {
                attrVal = riasCfg[attr2](elem, attrVal);
              } else if (regObj.test(attrVal)) {
                try {
                  attrVal = JSON.parse(attrVal);
                } catch (e) {
                }
              }
              options[attr2] = attrVal;
            } else if (attr2 in riasCfg && typeof riasCfg[attr2] != "function" && !options[attr2]) {
              options[attr2] = riasCfg[attr2];
            } else if (run && typeof riasCfg[attr2] == "function") {
              options[attr2] = riasCfg[attr2](elem, attrVal);
            }
          };
          for (attr in riasCfg) {
            setOption(attr);
          }
          src.replace(regPlaceholder, function(full, match) {
            if (!(match in options)) {
              setOption(match, true);
            }
          });
          return options;
        }
        function replaceUrlProps(url, options) {
          var candidates = [];
          var replaceFn = function(full, match) {
            return replaceTypes[typeof options[match]] ? options[match] : full;
          };
          candidates.srcset = [];
          if (options.absUrl) {
            anchor.setAttribute("href", url);
            url = anchor.href;
          }
          url = ((options.prefix || "") + url + (options.postfix || "")).replace(regPlaceholder, replaceFn);
          options.widths.forEach(function(width) {
            var widthAlias = options.widthmap[width] || width;
            var ratio = options.aspectratio || options.ratio;
            var traditionalRatio = !options.aspectratio && riasCfg.traditionalRatio;
            var candidate = {
              u: url.replace(regWidth, widthAlias).replace(regHeight, ratio ? traditionalRatio ? Math.round(width * ratio) : Math.round(width / ratio) : ""),
              w: width
            };
            candidates.push(candidate);
            candidates.srcset.push(candidate.c = candidate.u + " " + width + "w");
          });
          return candidates;
        }
        function setSrc(src, opts, elem) {
          var elemW = 0;
          var elemH = 0;
          var sizeElement = elem;
          if (!src) {
            return;
          }
          if (opts.ratio === "container") {
            elemW = sizeElement.scrollWidth;
            elemH = sizeElement.scrollHeight;
            while ((!elemW || !elemH) && sizeElement !== document) {
              sizeElement = sizeElement.parentNode;
              elemW = sizeElement.scrollWidth;
              elemH = sizeElement.scrollHeight;
            }
            if (elemW && elemH) {
              opts.ratio = opts.traditionalRatio ? elemH / elemW : elemW / elemH;
            }
          }
          src = replaceUrlProps(src, opts);
          src.isPicture = opts.isPicture;
          if (buggySizes && elem.nodeName.toUpperCase() == "IMG") {
            elem.removeAttribute(config.srcsetAttr);
          } else {
            elem.setAttribute(config.srcsetAttr, src.srcset.join(", "));
          }
          Object.defineProperty(elem, "_lazyrias", {
            value: src,
            writable: true
          });
        }
        function createAttrObject(elem, src) {
          var opts = getElementOptions(elem, src);
          riasCfg.modifyOptions.call(elem, { target: elem, details: opts, detail: opts });
          lazySizes.fire(elem, "lazyriasmodifyoptions", opts);
          return opts;
        }
        function getSrc(elem) {
          return elem.getAttribute(elem.getAttribute("data-srcattr") || riasCfg.srcAttr) || elem.getAttribute(config.srcsetAttr) || elem.getAttribute(config.srcAttr) || elem.getAttribute("data-pfsrcset") || "";
        }
        addEventListener("lazybeforesizes", function(e) {
          if (e.detail.instance != lazySizes) {
            return;
          }
          var elem, src, elemOpts, sourceOpts, parent, sources, i, len, sourceSrc, sizes, detail, hasPlaceholder, modified, emptyList;
          elem = e.target;
          if (!e.detail.dataAttr || e.defaultPrevented || riasCfg.disabled || !((sizes = elem.getAttribute(config.sizesAttr) || elem.getAttribute("sizes")) && regAllowedSizes.test(sizes))) {
            return;
          }
          src = getSrc(elem);
          elemOpts = createAttrObject(elem, src);
          hasPlaceholder = regWidth.test(elemOpts.prefix) || regWidth.test(elemOpts.postfix);
          if (elemOpts.isPicture && (parent = elem.parentNode)) {
            sources = parent.getElementsByTagName("source");
            for (i = 0, len = sources.length; i < len; i++) {
              if (hasPlaceholder || regWidth.test(sourceSrc = getSrc(sources[i]))) {
                sourceOpts = getElementOptions(sources[i], sourceSrc, elemOpts);
                setSrc(sourceSrc, sourceOpts, sources[i]);
                modified = true;
              }
            }
          }
          if (hasPlaceholder || regWidth.test(src)) {
            setSrc(src, elemOpts, elem);
            modified = true;
          } else if (modified) {
            emptyList = [];
            emptyList.srcset = [];
            emptyList.isPicture = true;
            Object.defineProperty(elem, "_lazyrias", {
              value: emptyList,
              writable: true
            });
          }
          if (modified) {
            if (supportPicture) {
              elem.removeAttribute(config.srcAttr);
            } else if (sizes != "auto") {
              detail = {
                width: parseInt(sizes, 10)
              };
              polyfill({
                target: elem,
                detail
              });
            }
          }
        }, true);
        var polyfill = function() {
          var ascendingSort = function(a, b) {
            return a.w - b.w;
          };
          var reduceCandidate = function(srces) {
            var lowerCandidate, bonusFactor;
            var len = srces.length;
            var candidate = srces[len - 1];
            var i = 0;
            for (i; i < len; i++) {
              candidate = srces[i];
              candidate.d = candidate.w / srces.w;
              if (candidate.d >= srces.d) {
                if (!candidate.cached && (lowerCandidate = srces[i - 1]) && lowerCandidate.d > srces.d - 0.13 * Math.pow(srces.d, 2.2)) {
                  bonusFactor = Math.pow(lowerCandidate.d - 0.6, 1.6);
                  if (lowerCandidate.cached) {
                    lowerCandidate.d += 0.15 * bonusFactor;
                  }
                  if (lowerCandidate.d + (candidate.d - srces.d) * bonusFactor > srces.d) {
                    candidate = lowerCandidate;
                  }
                }
                break;
              }
            }
            return candidate;
          };
          var getWSet = function(elem, testPicture) {
            var src;
            if (!elem._lazyrias && lazySizes.pWS && (src = lazySizes.pWS(elem.getAttribute(config.srcsetAttr || ""))).length) {
              Object.defineProperty(elem, "_lazyrias", {
                value: src,
                writable: true
              });
              if (testPicture && elem.parentNode) {
                src.isPicture = elem.parentNode.nodeName.toUpperCase() == "PICTURE";
              }
            }
            return elem._lazyrias;
          };
          var getX = function(elem) {
            var dpr = window2.devicePixelRatio || 1;
            var optimum = lazySizes.getX && lazySizes.getX(elem);
            return Math.min(optimum || dpr, 2.4, dpr);
          };
          var getCandidate = function(elem, width) {
            var sources, i, len, media, srces, src;
            srces = elem._lazyrias;
            if (srces.isPicture && window2.matchMedia) {
              for (i = 0, sources = elem.parentNode.getElementsByTagName("source"), len = sources.length; i < len; i++) {
                if (getWSet(sources[i]) && !sources[i].getAttribute("type") && (!(media = sources[i].getAttribute("media")) || (matchMedia(media) || {}).matches)) {
                  srces = sources[i]._lazyrias;
                  break;
                }
              }
            }
            if (!srces.w || srces.w < width) {
              srces.w = width;
              srces.d = getX(elem);
              src = reduceCandidate(srces.sort(ascendingSort));
            }
            return src;
          };
          var polyfill2 = function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var candidate;
            var elem = e.target;
            if (!buggySizes && (window2.respimage || window2.picturefill || lazySizesCfg.pf)) {
              document.removeEventListener("lazybeforesizes", polyfill2);
              return;
            }
            if (!("_lazyrias" in elem) && (!e.detail.dataAttr || !getWSet(elem, true))) {
              return;
            }
            candidate = getCandidate(elem, e.detail.width);
            if (candidate && candidate.u && elem._lazyrias.cur != candidate.u) {
              elem._lazyrias.cur = candidate.u;
              candidate.cached = true;
              lazySizes.rAF(function() {
                elem.setAttribute(config.srcAttr, candidate.u);
                elem.setAttribute("src", candidate.u);
              });
            }
          };
          if (!supportPicture) {
            addEventListener("lazybeforesizes", polyfill2);
          } else {
            polyfill2 = function() {
            };
          }
          return polyfill2;
        }();
      });
    }
  });

  // app/scripts/plugin.js
  var import_ls = __toModule(require_ls_unveilhooks());
  var import_ls2 = __toModule(require_ls_parent_fit());
  var import_ls3 = __toModule(require_ls_object_fit());
  var import_ls4 = __toModule(require_ls_bgset());
  var import_lazysizes = __toModule(require_lazysizes());
  var import_ls5 = __toModule(require_ls_respimg());
  var import_ls6 = __toModule(require_ls_rias());
  window.lazySizesConfig = window.lazySizesConfig || {};
  lazySizesConfig.loadMode = 0;
  lazySizesConfig.loadHidden = false;
  /*! lazysizes - v5.2.0 unveilhooks*/
  /*! lazysizes - v5.2.0 parent-fit*/
  /*! lazysizes - v5.2.0 objectfit */
  /*! lazysizes - v5.2.0 bgset */
  /*! lazysizes - v5.2.0 */
  /*! lazysizes - v5.2.0 ls.respimg.min.js */
  /*! lazysizes - v5.2.0 Rias */
})();
