// VARIABLES //
const minusBtn = document.querySelector(".productPage__quantityCont-minusBtn");
const plusBtn = document.querySelector(".productPage__quantityCont-plusBtn");
const qtyField = document.querySelector(".productPage__quantityCont-inputQty");
// const qtyFieldQuickAdd = document.querySelector(".quickAdd__inputField");
const checkBox = document.querySelector(".productPage__termConditions");
const askingProduct = document.querySelector(".productPage__askingPd");
const askingPopup = document.querySelector(".popupAsking");
const askingPopUpDefault = document.querySelector(".popupAsking__contentDefault");
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

