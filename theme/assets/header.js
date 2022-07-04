(() => {
  // app/scripts/header.js
  var menuMobileIcon = document.querySelector(".headerMobile__iconMenu");
  var menuMobileCloseIcon = document.querySelector(".menuMobile__header-icon");
  var menuMobileOverLay = document.querySelector(".menuMobile");
  var menuMobile = document.querySelector(".menuMobile__container");
  var megaMenuIcon = document.querySelector(".header__productMenu");
  var megaMenu = document.querySelector(".header__megaMenu");
  var init = () => {
    menuMobileIcon.addEventListener("click", showMenuMobile);
    menuMobileCloseIcon.addEventListener("click", hideMenuMobile);
    menuMobileOverLay.addEventListener("click", hideMenuMobile);
    megaMenuIcon.addEventListener("click", toggleMegaMenu);
  };
  var toggleEnabelScroll = () => {
    const body = document.querySelector("body");
    if (body.style.overflow === "hidden") {
      body.style.overflow = "visible";
    } else {
      body.style.overflow = "hidden";
    }
  };
  var showMenuMobile = () => {
    menuMobileOverLay.style.display = "block";
    menuMobile.style.display = "block";
    toggleEnabelScroll();
  };
  var hideMenuMobile = () => {
    menuMobile.style.display = "none";
    menuMobileOverLay.style.display = "none";
    toggleEnabelScroll();
  };
  var toggleMegaMenu = () => {
    if (megaMenu.style.display === "block") {
      megaMenu.style.display = "none";
    } else {
      megaMenu.style.display = "block";
    }
  };
  init();
  var cartQuickViewScript = () => {
    const emptyCart = document.querySelector(".cartQuickView__emptyCart");
    if (emptyCart === null) {
      const myCart = document.querySelector(".header__myCart");
      const cartQuickView = document.querySelector(".cartQuickView");
      const checkBox = document.querySelector(".cartQuickView__checkbox");
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
      checkBox.addEventListener("click", () => {
        let box = checkBox.querySelector(".cartQuickView__checkbox-box");
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
  cartQuickViewScript();
})();
