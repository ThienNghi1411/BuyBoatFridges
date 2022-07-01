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
        let container = document.querySelector(".productPage");
        let popup = document.createElement("div");
        popup.innerHTML = data.sections["cart-popup"];
        container.parentElement.appendChild(popup);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

