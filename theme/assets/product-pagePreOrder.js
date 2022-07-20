(() => {
  // app/scripts/product-pagePreOrder.js
  var minusBtn = document.querySelector(".productPage__quantityCont-minusBtn");
  var plusBtn = document.querySelector(".productPage__quantityCont-plusBtn");
  var qtyField = document.querySelector(".productPage__quantityCont-inputQty");
  var checkBox = document.querySelector(".productPage__termConditions");
  var askingProduct = document.querySelector(".productPage__askingPd");
  var askingPopup = document.querySelector(".popupAsking");
  var askingPopUpDefault = document.querySelector(".popupAsking__contentDefault");
  var shippingProduct = document.querySelector(".productPage__shippingPd");
  var shippingPopup = document.querySelector(".popupShipping");
  var body = document.querySelector("body");
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
    askingProduct.addEventListener("click", () => {
      askingPopUpDefault.style.display = "block";
      askingPopup.style.display = "block";
      body.style.overflow = "hidden";
    });
    shippingProduct.addEventListener("click", () => {
      shippingPopup.style.display = "block";
      body.style.overflow = "hidden";
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
  var addToCartForms = document.querySelectorAll(".productForm");
  var spinner = document.querySelector(".loading__spinner");
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
  addToCartForms.forEach((addToCartForm) => {
    let id = addToCartForm.querySelector('input[name="id"]').value;
    let quantity = addToCartForm.querySelector('input[name="quantity"]').value;
    let productUrl = `/products/${productData.handle}`;
    let formData = {
      "items": [{
        "id": id,
        "quantity": quantity,
        "properties": {
          "preOrder": "true"
        }
      }],
      "sections": getSectionsToRender().map((section) => section.section),
      "sections_url": productUrl
    };
    addToCartForm.addEventListener("submit", (e) => addToCart(e, formData));
  });
  var addToCart = (e, formData) => {
    e.preventDefault();
    spinner.style.display = "block";
    console.log(formData);
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      spinner.style.display = "none";
      if (data.status) {
        let popupError = document.querySelector(".cartPopUpError");
        popupError.style.display = "block";
        let errorText = popupError.querySelector(".cartPopUpError__error");
        errorText.innerText = data.description;
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
            const elementToReplaces = document.querySelectorAll(section.selector);
            elementToReplaces.forEach((elementToReplace) => {
              const domReplace = getSectionInnerHTML(data.sections[section.section]);
              elementToReplace.replaceWith(domReplace.querySelector(section.selector));
            });
          }
        });
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };
})();
