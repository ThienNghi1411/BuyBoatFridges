(() => {
  // app/scripts/cart-popup.js
  var CartPopUp = class extends HTMLElement {
    constructor() {
      super();
      console.log(this.dataset);
      this.init();
    }
    init() {
      const qty = this.querySelector(".cartPopup__pdQty-qty");
      qty.innerText = this.dataset.qty;
      const total = this.querySelector(".cartPopup__total-total");
      total.innerText = "$" + this.dataset.price * 1 * (this.dataset.qty * 1) / 100;
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
      const checkBox = this.querySelector(".cartPopup__term");
      const checkOutBtn = this.querySelector(".cartPopup__btnCheckout");
      checkBox.addEventListener("click", () => {
        let box = checkBox.querySelector(".cartPopup__term-checkbox");
        if (box.classList.contains("cartPopup__term-checkboxActive")) {
          box.classList.remove("cartPopup__term-checkboxActive");
          checkOutBtn.style.opacity = "0.5";
          checkOutBtn.style.pointerEvents = "none";
        } else {
          box.classList.add("cartPopup__term-checkboxActive");
          checkOutBtn.style.opacity = "1";
          checkOutBtn.style.pointerEvents = "all";
        }
      });
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
    toggleCheckBox() {
    }
  };
  customElements.define("cart-popup", CartPopUp);
})();
