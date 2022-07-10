class CartPopUp extends HTMLElement {
    constructor() {
        super();
        console.log(this.dataset);
        this.init();
    }
    init(){ 
        const qty = this.querySelector(".cartPopup__pdQty-qty");
        qty.innerText = this.dataset.qty;
        const total = this.querySelector(".cartPopup__total-total");
        total.innerText = "$" + (this.dataset.price*1)*(this.dataset.qty*1)/100;
        const overlay = this.querySelector(".cartPopup__overlay");
        const popupContent = this.querySelector(".cartPopup__content");
        const popupContentMobile = this.querySelector(".cartPopup__contentMobile");
        const closeBtn = this.querySelector(".cartPopup__closeBtn");
        const btnContinue = this.querySelector(".cartPopup__btnShopping");
        popupContentMobile.addEventListener("click" , (e) => {
            e.stopPropagation();
        })
        popupContent.addEventListener("click" , (e) => {
            e.stopPropagation();
        })
        closeBtn.addEventListener("click" , (e) => {
            e.stopPropagation();
            this.closePopup();
        })
        overlay.addEventListener("click" , (e) => {
            e.stopPropagation();
            this.closePopup();
        })
        btnContinue.addEventListener("click", (e) => {
            e.stopPropagation();
            this.closePopup();
        });
        this.toggleEnabelScroll();
    }
    closePopup(){
        this.remove();
        this.toggleEnabelScroll();
    }
    toggleEnabelScroll(){
        const body = document.querySelector("body");
        if (body.style.overflow === "hidden" ){
            body.style.overflow = "visible";
        }else{
            body.style.overflow = "hidden";
        }
    }
    toggleCheckBox(){

    }
}


customElements.define('cart-popup', CartPopUp);

class CartPopUpError extends HTMLElement{
    constructor() {
        super();
        this.init();
    }
    init(){
        const overlay = this.querySelector(".cartPopUpError__overlay");
        const closeBtn = this.querySelector(".cartPopUpError__iconClose");
        const content = this.querySelector(".cartPopUpError__content");
        content.addEventListener("click" , (e) => {
            e.stopPropagation();
        })
        overlay.addEventListener("click" , () => {
            this.closePopup();
        });
        closeBtn.addEventListener("click", () => {
            this.closePopup();
        });
    }

    closePopup(){
        this.style.display="none";
        this.toggleEnabelScroll();
    }
    toggleEnabelScroll(){
        const body = document.querySelector("body");
        if (body.style.overflow === "hidden" ){
            body.style.overflow = "visible";
        }else{
            body.style.overflow = "hidden";
        }
    }
}

customElements.define('cart-popup-error', CartPopUpError);