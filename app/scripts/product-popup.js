class ProductPopupAsking extends HTMLElement{
    constructor() {
        super();
        this.init();
    }
    init(){
        const overlay = this.querySelector(".popupAsking__overlay");
        const closeBtns = this.querySelectorAll(".popupAsking__btnClose");
        const contents = this.querySelectorAll(".popupAsking__content");
        
        closeBtns.forEach(closeBtn => {
            closeBtn.addEventListener("click", () => {
                this.closePopup();
            });
        })

        contents.forEach(content => {
            content.addEventListener("click" , (e) => {
                e.stopPropagation();
            })
        })

        overlay.addEventListener("click" , () => {
            
            this.closePopup();
        });

    }
    closePopup(){
        let popupSuccess = this.querySelector(".popupAsking__success");
        if (popupSuccess !== null ){
            popupSuccess.remove();
        }
        this.style.display="none";
        const body = document.querySelector("body");
        body.style.overflow = "visible";
    }
}

customElements.define('product-popup-asking', ProductPopupAsking);

class ProductPopupPreOrder extends HTMLElement{
    constructor() {
        super();
        this.init();
    }
    init(){
        const overlay = this.querySelector(".popupPreOrder__overlay");
        const closeBtns = this.querySelectorAll(".popupPreOrder__btnClose");
        const contents = this.querySelectorAll(".popupPreOrder__content");
        closeBtns.forEach(closeBtn => {
            closeBtn.addEventListener("click", () => {
                this.closePopup();
            });
        })

        contents.forEach(content => {
            content.addEventListener("click" , (e) => {
                e.stopPropagation();
            })
        })

        overlay.addEventListener("click" , () => {
            
            this.closePopup();
        });
    }
    closePopup(){
        let popupSuccess = this.querySelector(".popupPreOrder__success");
        if (popupSuccess !== null ){
            popupSuccess.remove();
        }
        this.style.display="none";
        const body = document.querySelector("body");
        body.style.overflow = "visible";
    }
  
}

customElements.define('product-popup-preorder', ProductPopupPreOrder);