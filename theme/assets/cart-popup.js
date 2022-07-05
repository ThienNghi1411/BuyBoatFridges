(() => {
  // app/scripts/cart-popup.js
  var CartPopUp = class extends HTMLElement {
    constructor() {
      super();
      this.init();
    }
    init() {
      console.log(this);
      const overlay = this.querySelector(".cartPopup__overlay");
      const popupContent = this.querySelector(".cartPopup__content");
      const closeBtn = this.querySelector(".cartPopup__closeBtn");
      const btnContinue = this.querySelector(".cartPopup__btnShopping");
      popupContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closePopup();
      });
      overlay.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closePopup();
      });
      btnContinue.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closePopup();
      });
      this.toggleEnabelScroll();
    }
    closePopup() {
      this.remove();
      this.toggleEnabelScroll();
    }
    toggleEnabelScroll() {
      const body = document.querySelector("body");
      if (body.style.overflow === "hidden") {
        body.style.overflow = "visible";
      } else {
        body.style.overflow = "hidden";
      }
    }
  };
  customElements.define("cart-popup", CartPopUp);
})();
