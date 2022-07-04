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
  var scriptPopup = (data) => {
    const popup = document.querySelector(".cartPopup");
    if (popup !== null) {
      const qtyPd = document.querySelector(".cartPopup__pdQty-qty");
      qtyPd.innerText = qtyField.value;
      const totalPd = document.querySelector(".cartPopup__total-total");
      totalPd.innerText = "$" + data.price * 1 * qtyField.value * 1 / 100;
      const popupContent = document.querySelector(".cartPopup__content");
      const closeBtn = document.querySelector(".cartPopup__closeBtn");
      const overlay = document.querySelector(".cartPopup__overlay");
      const btnContinue = document.querySelector(".cartPopup__btnShopping");
      const closePopup = () => {
        popup.parentElement.parentElement.remove();
        toggleEnabelScroll();
      };
      popupContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      closeBtn.addEventListener("click", (e) => {
        closePopup();
      });
      overlay.addEventListener("click", closePopup);
      btnContinue.addEventListener("click", (e) => {
        e.stopPropagation();
        closePopup();
      });
      const toggleEnabelScroll = () => {
        const body = document.querySelector("body");
        if (body.style.overflow === "hidden") {
          body.style.overflow = "visible";
        } else {
          body.style.overflow = "hidden";
        }
      };
      toggleEnabelScroll();
    }
  };
  var cartQuickViewScript = () => {
    const emptyCart = document.querySelector(".cartQuickView__emptyCart");
    if (emptyCart === null) {
      const myCart = document.querySelector(".header__myCart");
      const cartQuickView = document.querySelector(".cartQuickView");
      const checkBox2 = document.querySelector(".cartQuickView__checkbox");
      const checkOutBtn = document.querySelector(".cartQuickView__checkOutBtn");
      const removeBtns = document.querySelectorAll(".cartQuickView__productLine-removeIcon");
      const cartQty = document.querySelector(".header__myCart-qty");
      cartQuickView.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      myCart.addEventListener("click", () => {
        if (cartQuickView.style.display === "none") {
          cartQuickView.style.display = "block";
        } else {
          cartQuickView.style.display = "none";
        }
      });
      checkBox2.addEventListener("click", () => {
        let box = checkBox2.querySelector(".cartQuickView__checkbox-box");
        if (box.classList.contains("cartQuickView__checkbox-boxActive")) {
          box.classList.remove("cartQuickView__checkbox-boxActive");
          checkOutBtn.style.opacity = "0.5";
          checkOutBtn.style.pointerEvents = "none";
        } else {
          box.classList.add("cartQuickView__checkbox-boxActive");
          checkOutBtn.style.opacity = "1";
          checkOutBtn.style.pointerEvents = "all";
        }
      });
      removeBtns.forEach((removeBtn) => {
        removeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          let idPd = removeBtn.getAttribute("idPd");
          fetch(window.Shopify.routes.root + "cart/change.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "id": idPd,
              "quantity": 0,
              "sections": "cart-quickview",
              "sections_url": window.location.pathname
            })
          }).then((response) => {
            return response.json();
          }).then((data) => {
            console.log(data);
            console.log(cartQty.innerText);
            cartQty.innerText = data.item_count;
            cartQuickView.remove();
            let node = document.createElement("div");
            node.innerHTML = data.sections["cart-quickview"];
            myCart.appendChild(node.querySelector(".cartQuickView"));
            document.querySelector(".cartQuickView").style.display = "block";
            cartQuickViewScript();
          }).catch((error) => {
            console.error("Error:", error);
          });
        });
      });
    } else {
      const myCart = document.querySelector(".header__myCart");
      const cartQuickView = document.querySelector(".cartQuickView");
      myCart.addEventListener("click", () => {
        if (cartQuickView.style.display === "none") {
          cartQuickView.style.display = "block";
        } else {
          cartQuickView.style.display = "none";
        }
      });
    }
  };
  var productData = JSON.parse(document.querySelector("#productPage__settings").innerText).product;
  var addToCartForm = document.querySelector('form[action$="/cart/add"]');
  addToCartForm.addEventListener("submit", (e) => addToCart(e));
  var addToCart = (e) => {
    e.preventDefault();
    let formData = new FormData(addToCartForm);
    let productUrl = `/products/${productData.handle}`;
    formData.append("sections", "cart-popup,cart-quickview");
    formData.append("sections_url", productUrl);
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      body: formData
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      let cartQty = document.querySelector(".header__myCart-qty");
      cartQty.innerText = cartQty.innerText * 1 + qtyField.value * 1;
      window.scrollTo(0, 0);
      let container = document.querySelector(".productPage");
      let popup = document.createElement("div");
      popup.innerHTML = data.sections["cart-popup"];
      container.parentElement.appendChild(popup);
      scriptPopup(data);
      let myCart = document.querySelector(".header__myCart");
      let cartQuickView = document.querySelector(".cartQuickView");
      cartQuickView.remove();
      let node = document.createElement("div");
      node.innerHTML = data.sections["cart-quickview"];
      myCart.appendChild(node.querySelector(".cartQuickView"));
      cartQuickViewScript();
    }).catch((error) => {
      console.error("Error:", error);
    });
  };
})();
