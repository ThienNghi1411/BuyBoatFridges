/*@license
  Gofarm by ShopThemes (https://www.shopthemes.net)
  Access unminified JS in assets/theme.js
  */

  import "./common/theme-section";
  import homeFilter from "./homePage-filter";

  register("page-banner", {
    onLoad: function () {
      var slider = tns({
        container: '.pageBanner__slider',
        items: 1,
        mouseDrag: true,
        autoplayButtonOutput: false,
        nav: true,
        navPosition: "bottom",
        controlsContainer: "#controls",
        prevButton: ".controls__prevBtn",
        nextButton: ".controls__nextBtn"
      });
    },
    onUnload: function () {},
    onSelect: function () {},
    onDeselect: function () {},
    onBlockSelect: function (e) {},
    onBlockDeselect: function (e) {},
  });
  register('home-filter',  {
    onload: homeFilter
  })
  register("mini-banner", {
    onLoad: function () {

      var slider = tns({
        container: '.miniBanner__bannerCont',
        items: 1,
        mouseDrag: true,
        autoplayButtonOutput: false,
        nav: true,
        navPosition: "bottom",
        controls: false,
        responsive: {
          900:{
            disable:true,
          }
        }
      });
      var slider2 = tns({
        container: '.miniBanner__productBannerCont',
        items: 1,
        mouseDrag: true,
        autoplayButtonOutput: false,
        nav: true,
        navPosition: "bottom",
        controls: false,
        responsive: {
          900:{
            disable:true,
          }
        }
      });

    }
  });
  
  load("*");


