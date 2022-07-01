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
  register("collection-slider", {
    onLoad: function () {
      const settings = JSON.parse(this.container.querySelector("#collectionSlider_settings").innerText);
      const limitArr = settings.limitArr;
      const autoPlay = settings.autoPlay*1000;
      console.log(limitArr[5]);
      var slider = tns({
        container: '.collectionSlider__sliderCont',
        items: limitArr[0] !== undefined ? limitArr[0] : 2.5,
        gutter: 50,
        autoplay: autoPlay <= 0 ? false : true,
        autoplayTimeout: autoPlay,
        mouseDrag: true,
        autoplayButtonOutput: false,
        nav: false,
        controls: false,
        responsive: {
          600:{
            items: limitArr[1] !== undefined ? limitArr[1] : 3.7,
            gutter: 78,
          },
          1000:{
            items: limitArr[2] !== undefined ? limitArr[2] : 5,
            gutter: 78,
          },
          1280:{
            items: limitArr[3] !== undefined ? limitArr[3] : 6,
            gutter: 70,
          }
        }
      });
    }
  });

  load("*");


