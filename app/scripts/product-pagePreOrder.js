// VARIABLES //
const minusBtn = document.querySelector(".productPage__quantityCont-minusBtn");
const plusBtn = document.querySelector(".productPage__quantityCont-plusBtn");
const qtyField = document.querySelector(".productPage__quantityCont-inputQty");
// const qtyFieldQuickAdd = document.querySelector(".quickAdd__inputField");
const checkBox = document.querySelector(".productPage__termConditions");

const askingProduct = document.querySelector(".productPage__askingPd");
const askingPopup = document.querySelector(".popupAsking");
const askingPopUpDefault = document.querySelector(".popupAsking__contentDefault");

const shippingProduct = document.querySelector(".productPage__shippingPd");
const shippingPopup = document.querySelector(".popupShipping");

const body = document.querySelector("body");
// const btnPreOrders = document.querySelectorAll(".productPage__btnPreOrder");
// const preOrderPopup = document.querySelector(".popupPreOrder");
// const preOrderPopUpDefault = document.querySelector(".popupPreOrder__contentDefault");
const init = () => {
    minusBtn.addEventListener("click", adjustQty )
    plusBtn.addEventListener("click" , adjustQty );
    // btnPreOrders.forEach(btnPreOrder => {
    //     btnPreOrder.addEventListener("click" , () => {
    //         preOrderPopUpDefault.style.display="block";
    //         preOrderPopup.style.display = "block";
    //         body.style.overflow="hidden";
    //     })
    // })

    // qtyFieldQuickAdd.addEventListener("change" , () => {
    //     qtyField.value = qtyFieldQuickAdd.value;
    // })
    checkBox.addEventListener("click" , () => {
        let box = checkBox.querySelector(".productPage__termConditions-checkbox");
        let checkOutBtns = document.querySelectorAll(".productPage__btnBuyNow");
        if (box.classList.contains("productPage__termConditions-checkboxActive")){
            box.classList.remove("productPage__termConditions-checkboxActive");
            checkOutBtns.forEach(checkOutBtn => {
                checkOutBtn.style.opacity = "0.5";
                checkOutBtn.style.pointerEvents = "none";
            })
        }else{
            box.classList.add("productPage__termConditions-checkboxActive");
            checkOutBtns.forEach(checkOutBtn => {
                checkOutBtn.style.opacity = "1";
                checkOutBtn.style.pointerEvents = "all";
            })
        }
    })
    askingProduct.addEventListener("click" , () => {
        askingPopUpDefault.style.display="block";
        askingPopup.style.display = "block";
        body.style.overflow="hidden";
    })
    shippingProduct.addEventListener("click" , () => {
        shippingPopup.style.display = "block";
        body.style.overflow="hidden";
    })
}

// FUNCTION //

const adjustQty = (e) => {
    if (e.target.getAttribute("name") === "minus"){
        if(qtyField.value*1 > 1)
        qtyField.value = qtyField.value*1 - 1;
        // qtyFieldQuickAdd.value = qtyField.value;
    }else{
        qtyField.value = qtyField.value*1 + 1;
        // qtyFieldQuickAdd.value = qtyField.value;
    }
}

init();


// CART-POPUP //

// Add to Cart //

const productData = JSON.parse(document.querySelector("#productPage__settings").innerText).product;
const pdQty = JSON.parse(document.querySelector("#productPage__settings").innerText).pdQuantity;

const addToCartForms = document.querySelectorAll('.productForm');

const spinner = document.querySelector(".loading__spinner");



const getSectionsToRender = () => {
    return [
        {
            section: 'cart-quickview',
            selector: '.cartQuickView',
        },
        {
            section: 'cart-icon-bubble',
            selector: '.header__myCart-qty'
        },
        {
            section: 'cart-popup',
            selector: '.cartPopupCont'
        }
    ];
}

const getSectionInnerHTML = (html) => {
    return new DOMParser()
          .parseFromString(html, 'text/html');
         
}
addToCartForms.forEach(addToCartForm => {
    let id = addToCartForm.querySelector('input[name="id"]').value;
    let quantity = addToCartForm.querySelector('input[name="quantity"]').value;
    let productUrl = `/products/${productData.handle}`;
    let formData = {
        'items': [{
            'id': id,
            'quantity': quantity,
            'properties': {
                'preOrder': 'true'
            }
         }],
        'sections': getSectionsToRender().map((section) => section.section) ,
        'sections_url' : productUrl
    };
    addToCartForm.addEventListener("submit" , e => addToCart(e,formData));
})

const addToCart = (e,formData) => {
    e.preventDefault();
    spinner.style.display="block";
    console.log(formData);
    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        spinner.style.display="none";
        if (data.status){
            let popupError = document.querySelector(".cartPopUpError");
            popupError.style.display="block";
            let errorText = popupError.querySelector(".cartPopUpError__error");
            errorText.innerText=data.description;
            body.style.overflow= "hidden";
        }else{
            getSectionsToRender().forEach((section => {
                if (section.selector === ".cartPopupCont"){
                    const parser = new DOMParser();
                    let elementToAppend = document.querySelector(".cartPopupCont");
                    let domToAdd = parser.parseFromString(data.sections[section.section],'text/html').querySelector(".cartPopup");
                    domToAdd.setAttribute("data-qty",qtyField.value);
                    elementToAppend.appendChild(domToAdd);
                }else{
                    const elementToReplaces =
                    document.querySelectorAll(section.selector);
                    elementToReplaces.forEach(elementToReplace => {
                        const domReplace = getSectionInnerHTML((data.sections[section.section]))
                        elementToReplace.replaceWith(domReplace.querySelector(section.selector));
                    })
                   
                }
            }));
        }
       
        

    })
    .catch((error) => {
        console.error('Error:', error);
    });
};
