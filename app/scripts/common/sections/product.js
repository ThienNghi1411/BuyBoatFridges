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

// const product = JSON.parse(this.container.querySelector("#productPage__settings").innerText);

const settings = JSON.parse(this.container.querySelector("#productPage__settings").innerText);
console.log(settings);
const addToCartForm = document.querySelector('form[action$="/cart/add"]');
addToCartForm.addEventListener("submit" , e => addToCart(e));
const addToCart = (e) => {
    e.preventDefault();
    let formData = new FormData(addToCartForm);

    const body = {
        formData,
        section:"cart-popup,cart-quickView",
        sections_url:""
    }

    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alert("success");
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

