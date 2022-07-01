(() => {
  // app/scripts/cart-popup.js
  console.log("a");
  var popup = document.querySelector(".cartPopup");
  var closeBtn = document.querySelector(".cartPopup__closeBtn");
  var init = () => {
    toggleEnabelScroll();
    closeBtn.addEventListener("click", closePopup);
  };
  var toggleEnabelScroll = () => {
    const body = document.querySelector("body");
    if (body.style.overflow === "hidden") {
      body.style.overflow = "visible";
    } else {
      body.style.overflow = "hidden";
    }
  };
  var closePopup = () => {
    popup.remove();
    toggleEnabelScroll();
  };
  init();
})();
