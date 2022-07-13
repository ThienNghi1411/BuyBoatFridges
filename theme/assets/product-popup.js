(() => {
  // app/scripts/product-popup.js
  var ProductPopupAsking = class extends HTMLElement {
    constructor() {
      super();
      this.init();
    }
    init() {
      const overlay = this.querySelector(".popupAsking__overlay");
      const closeBtn = this.querySelector(".popupAsking__btnClose");
      const content = this.querySelector(".popupAsking__content");
      content.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      overlay.addEventListener("click", () => {
        this.closePopup();
      });
      closeBtn.addEventListener("click", () => {
        this.closePopup();
      });
    }
    closePopup() {
      this.style.display = "none";
      const body = document.querySelector("body");
      body.style.overflow = "visible";
    }
  };
  customElements.define("product-popup-asking", ProductPopupAsking);
  var ProductPopupPreOrder = class extends HTMLElement {
    constructor() {
      super();
      this.init();
    }
    init() {
    }
  };
  customElements.define("product-popup-preorder", ProductPopupPreOrder);
})();
