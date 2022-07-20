(() => {
  // app/scripts/product-card.js
  var ProductCard = class extends HTMLElement {
    constructor() {
      super();
      this.init();
      this.product = JSON.parse(this.querySelector(".productCard_settings").innerText).data;
      this.preOrder = false;
      if (this.querySelector('input[name="properties[preOrder]"]')) {
        this.preOrder = true;
      }
    }
    init() {
      const addToCartForm = this.querySelector(".productCard__form");
      addToCartForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.addToCart();
      });
    }
    getSectionInnerHTML(html) {
      return new DOMParser().parseFromString(html, "text/html");
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
        },
        {
          section: "cart-popup",
          selector: ".cartPopupCont"
        }
      ];
    }
    addToCart() {
      let spinner = document.querySelector(".spinnerAddToCart");
      spinner.style.display = "block";
      let formData = {};
      if (this.preOrder) {
        formData = {
          "items": [{
            "id": this.product.variants[0].id,
            "quantity": 1,
            "properties": {
              "preOrder": "true"
            }
          }],
          "sections": this.getSectionsToRender().map((section) => section.section)
        };
      } else {
        formData = {
          "items": [{
            "id": this.product.variants[0].id,
            "quantity": 1
          }],
          "sections": this.getSectionsToRender().map((section) => section.section)
        };
      }
      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status) {
          let popupError = document.querySelector(".cartPopUpError");
          popupError.style.display = "block";
          let errorText = popupError.querySelector(".cartPopUpError__error");
          errorText.innerText = data.description;
          let body = document.querySelector("body");
          body.style.overflow = "hidden";
        } else {
          this.getSectionsToRender().forEach((section) => {
            if (section.selector === ".cartPopupCont") {
              const parser = new DOMParser();
              let elementToAppend = document.querySelector(".cartPopupCont");
              let domToAdd = parser.parseFromString(data.sections[section.section], "text/html").querySelector(".cartPopup");
              domToAdd.setAttribute("data-qty", 1);
              domToAdd.setAttribute("data-price", this.product.variants[0].price);
              domToAdd.setAttribute("data-img", this.product.featured_image);
              elementToAppend.appendChild(domToAdd);
            } else {
              const elementToReplaces = document.querySelectorAll(section.selector);
              elementToReplaces.forEach((elementToReplace) => {
                const domReplace = this.getSectionInnerHTML(data.sections[section.section]);
                elementToReplace.replaceWith(domReplace.querySelector(section.selector));
              });
            }
          });
        }
        spinner.style.display = "none";
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  };
  customElements.define("product-card", ProductCard);
})();
