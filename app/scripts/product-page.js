

// VARIABLES //
const minusBtn = document.querySelector(".productPage__quantityCont-minusBtn");
const plusBtn = document.querySelector(".productPage__quantityCont-plusBtn");
const qtyField = document.querySelector(".productPage__quantityCont-inputQty");

const init = () => {
    minusBtn.addEventListener("click", adjustQty )
    plusBtn.addEventListener("click" , adjustQty )
}

// FUNCTION //

const adjustQty = (e) => {
    if (e.target.getAttribute("name") === "minus"){
        if(qtyField.value*1 > 1)
        qtyField.value = qtyField.value*1 - 1;
    }else{
        qtyField.value = qtyField.value*1 + 1;
    }
}

init();


// CART-POPUP //

const scriptPopup = (data) => {
    const popup = document.querySelector(".cartPopup");
    if (popup !== null){
        const qtyPd = document.querySelector(".cartPopup__pdQty-qty");
        qtyPd.innerText = qtyField.value;
        const totalPd = document.querySelector(".cartPopup__total-total");
        totalPd.innerText = "$"+( data.price*1 * qtyField.value*1) / 100;   
        const popupContent = document.querySelector(".cartPopup__content");
        const closeBtn = document.querySelector(".cartPopup__closeBtn");
        const overlay = document.querySelector(".cartPopup__overlay");
        const btnContinue = document.querySelector(".cartPopup__btnShopping");
        const closePopup = () => {
            popup.remove();
            toggleEnabelScroll();
        }
        popupContent.addEventListener("click" , (e) => {
            e.stopPropagation();
        })
        closeBtn.addEventListener("click", (e) => {
            
            closePopup();
        });
        overlay.addEventListener("click",closePopup);
        btnContinue.addEventListener("click", (e) => {
            e.stopPropagation();
            closePopup();
        });
        const toggleEnabelScroll = () => {
            const body = document.querySelector("body");
            if (body.style.overflow === "hidden" ){
                body.style.overflow = "visible";
            }else{
                body.style.overflow = "hidden";
            }
        }
        toggleEnabelScroll();
    }
}


// Add to Cart //
const productData = JSON.parse(document.querySelector("#productPage__settings").innerText).product;

const addToCartForm = document.querySelector('form[action$="/cart/add"]');

addToCartForm.addEventListener("submit" , e => addToCart(e));

const addToCart = (e) => {
    e.preventDefault();
    let formData = new FormData(addToCartForm);
    let productUrl = `/products/${productData.handle}`;
    formData.append("sections","cart-popup,cart-quickView");
    formData.append("sections_url", productUrl);

    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        window.scrollTo(0, 0);
        let container = document.querySelector(".productPage");
        let popup = document.createElement("div");
        popup.innerHTML = data.sections["cart-popup"];
        container.parentElement.appendChild(popup);
        scriptPopup(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

