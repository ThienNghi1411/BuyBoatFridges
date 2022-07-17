(() => {
  // app/scripts/product-pagePreOrder.js
  console.log(window.location.search);
  if (window.location.search === "?contact_posted=true") {
    window.scroll(0, 0);
  }
  var minusBtn = document.querySelector(".productPage__quantityCont-minusBtn");
  var plusBtn = document.querySelector(".productPage__quantityCont-plusBtn");
  var qtyField = document.querySelector(".productPage__quantityCont-inputQty");
  var checkBox = document.querySelector(".productPage__termConditions");
  var askingProduct = document.querySelector(".productPage__askingPd");
  var askingPopup = document.querySelector(".popupAsking");
  var askingPopUpDefault = document.querySelector(".popupAsking__contentDefault");
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
      window.scroll(0, 0);
      askingPopup.style.display = "block";
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
})();
