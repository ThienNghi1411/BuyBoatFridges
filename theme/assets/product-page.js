(() => {
  // app/scripts/product-page.js
  var minusBtn = document.querySelector(".productPage__quantityCont-minusBtn");
  var plusBtn = document.querySelector(".productPage__quantityCont-plusBtn");
  var qtyField = document.querySelector(".productPage__quantityCont-inputQty");
  var checkBox = document.querySelector(".productPage__termConditions");
  var init = () => {
    minusBtn.addEventListener("click", adjustQty);
    plusBtn.addEventListener("click", adjustQty);
    checkBox.addEventListener("click", () => {
      let box = checkBox.querySelector(".productPage__termConditions-checkbox");
      let checkOutBtns = document.querySelectorAll(".productPage__btnBuyNow");
      if (box.classList.contains("productPage__termConditions-checkboxActive")) {
        box.classList.remove("productPage__termConditions-checkboxActive");
        checkOutBtns.forEach((checkOutBtn) => {
          checkOutBtn.style.opacity = "0.5";
          checkOutBtn.style.pointerEvents = "none";
        });
      } else {
        box.classList.add("productPage__termConditions-checkboxActive");
        checkOutBtns.forEach((checkOutBtn) => {
          checkOutBtn.style.opacity = "1";
          checkOutBtn.style.pointerEvents = "all";
        });
      }
    });
  };
  var adjustQty = (e) => {
    if (e.target.getAttribute("name") === "minus") {
      if (qtyField.value * 1 > 1)
        qtyField.value = qtyField.value * 1 - 1;
    } else {
      qtyField.value = qtyField.value * 1 + 1;
    }
  };
  init();
  var productData = JSON.parse(document.querySelector("#productPage__settings").innerText).product;
  var pdQty = JSON.parse(document.querySelector("#productPage__settings").innerText).pdQuantity;
  var addToCartForm = document.querySelector('form[action$="/cart/add"]');
  var spinner = document.querySelector(".loading__spinner");
  addToCartForm.addEventListener("submit", (e) => addToCart(e));
  var getSectionsToRender = () => {
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
  };
  var getSectionInnerHTML = (html) => {
    return new DOMParser().parseFromString(html, "text/html");
  };
  var addToCart = (e) => {
    e.preventDefault();
    spinner.style.display = "block";
    let productUrl = `/products/${productData.handle}`;
    let formData = {
      "items": [{
        "id": productData.variants[0].id,
        "quantity": qtyField.value
      }],
      "sections": getSectionsToRender().map((section) => section.section),
      "sections_url": productUrl
    };
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      spinner.style.display = "none";
      window.scrollTo(0, 0);
      if (data.status) {
        let popupError = document.querySelector(".cartPopUpError");
        popupError.style.display = "block";
        let errorText = popupError.querySelector(".cartPopUpError__error");
        errorText.innerText = data.description;
        let body = document.querySelector("body");
        body.style.overflow = "hidden";
      } else {
        getSectionsToRender().forEach((section) => {
          if (section.selector === ".cartPopupCont") {
            const parser = new DOMParser();
            let elementToAppend = document.querySelector(".cartPopupCont");
            let domToAdd = parser.parseFromString(data.sections[section.section], "text/html").querySelector(".cartPopup");
            domToAdd.setAttribute("data-qty", qtyField.value);
            elementToAppend.appendChild(domToAdd);
          } else {
            const elementToReplace = document.querySelector(section.selector);
            const domReplace = getSectionInnerHTML(data.sections[section.section]);
            elementToReplace.replaceWith(domReplace.querySelector(section.selector));
          }
        });
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };
})();
