(() => {
  // app/scripts/cart-quick-view.js
  var CartRemoveButton = class extends HTMLElement {
    constructor() {
      super();
      this.addEventListener("click", (event) => {
        let spin = this.querySelector(".cartQuickView__productLine-spinner");
        let removeSvg = this.querySelector("svg");
        spin.style.display = "block";
        removeSvg.style.display = "none";
        event.preventDefault();
        this.closest("cart-quick-view").updateQuantity(this.dataset.idproduct, 0);
      });
    }
  };
  customElements.define("cart-remove-button", CartRemoveButton);
  var CartQuickView = class extends HTMLElement {
    constructor() {
      super();
      this.init();
    }
    init() {
    }
    getSectionsToRender() {
      return [
        {
          section: "cart-quickview",
          selector: ".cartQuickView"
        },
        {
          section: "cart-icon-bubble",
          selector: ".header__myCart-qty"
        }
      ];
    }
    updateQuantity(idProduct, qty) {
      fetch(window.Shopify.routes.root + "cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "id": idProduct,
          "quantity": qty,
          "sections": this.getSectionsToRender().map((section) => section.section),
          "sections_url": window.location.pathname
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.getSectionsToRender().forEach((section) => {
          const elementToReplaces = document.querySelectorAll(section.selector);
          elementToReplaces.forEach((elementToReplace) => {
            const domReplace = this.getSectionInnerHTML(data.sections[section.section]);
            elementToReplace.replaceWith(domReplace.querySelector(section.selector));
          });
        });
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
    getSectionInnerHTML(html) {
      return new DOMParser().parseFromString(html, "text/html");
    }
  };
  customElements.define("cart-quick-view", CartQuickView);
})();
