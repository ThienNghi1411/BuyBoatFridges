class MainCartRemoveBtn extends HTMLElement {
    constructor() {
    
      super();
       this.addEventListener('click', (event) => {
            console.log(this);
            let spin = this.querySelector(".cartPage__removeBtn-spinner");
            let removeSvg = this.querySelector("svg");
            spin.style.display="block";
            removeSvg.style.display="none";
            event.preventDefault();
            this.closest("main-cart").updateQuantity(this.dataset.idproduct, 0);
        });
    }
  }
  
customElements.define('maincart-remove-button', MainCartRemoveBtn);

class MainCartRemoveAllBtn extends HTMLElement {
    constructor() {
    
      super();
       this.addEventListener('click', (event) => {
            let spin = this.querySelector(".cartPage__removeBtn-spinner");
            let removeSvg = this.querySelector(".cartPage__clearCart");
            spin.style.display="block";
            removeSvg.style.display="none";
            event.preventDefault();
            this.closest("main-cart").cartClear();
        });
    }
  }
  
customElements.define('maincart-remove-all-button', MainCartRemoveAllBtn);

class MainCartQtyField extends HTMLElement {
    constructor() {
        super();
        this.init();
    }
    init(){
        let spin = this.querySelector(".cartPage__removeBtn-spinner");
   
        let spinCont = this.querySelector(".cartPage__qtyField-spinnerCont")

        const idProduct = this.dataset.idproduct;
        
        const plusBtns = this.querySelectorAll(".cartPage__qtyField-plusBtn");
      
        const minusBtns = this.querySelectorAll(".cartPage__qtyField-minusBtn");
       
        const qtyInput = this.querySelector(".cartPage__qtyField-inputQty");
    
        plusBtns.forEach(plusBtn => {
            plusBtn.addEventListener("click" , () => {
                spinCont.style.display = "flex";
                spin.style.display="block";
                qtyInput.style.display="none";
                this.closest("main-cart").updateQuantity(idProduct, qtyInput.value*1+1);

            })
        })
        minusBtns.forEach(minusBtn => {
            minusBtn.addEventListener("click" , () => {
                spinCont.style.display = "flex";
                spin.style.display="block";
                qtyInput.style.display="none";
                this.closest("main-cart").updateQuantity(idProduct, qtyInput.value*1-1);

            })
        })
        qtyInput.addEventListener("change" , () => {
            let qty = qtyInput.value;
            spinCont.style.display = "flex";
            spin.style.display="block";
            qtyInput.style.display="none";
            this.closest("main-cart").updateQuantity(idProduct, qty*1);

        })

    }
  }
  
customElements.define('maincart-qty-field', MainCartQtyField);


class MainCartItems extends HTMLElement {
    constructor(){
        super();
      
    }
    init(){
        
    }
    getSectionsToRender() {
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
            section: 'main-cart',
            selector: '.cartPage'
          }
        ];
    }
    updateQuantity(idProduct, qty) {
        console.log(idProduct);
        console.log(qty);
        fetch(window.Shopify.routes.root + "cart/change.js", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': idProduct,
                'quantity': qty,
                'sections': this.getSectionsToRender().map((section) => section.section),
                'sections_url': window.location.pathname
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            this.getSectionsToRender().forEach((section => {
                const elementToReplace =
                  document.querySelector(section.selector);
                const domReplace = this.getSectionInnerHTML((data.sections[section.section])).querySelector(section.selector);
                elementToReplace.replaceWith(domReplace);
                
            }));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    getSectionInnerHTML(html) {
        return new DOMParser()
          .parseFromString(html, 'text/html');
    }
    cartClear(){
        fetch(window.Shopify.routes.root + "cart/clear.js", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'sections': this.getSectionsToRender().map((section) => section.section),
                'sections_url': window.location.pathname
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.getSectionsToRender().forEach((section => {
                const elementToReplace =
                  document.querySelector(section.selector);
                const domReplace = this.getSectionInnerHTML((data.sections[section.section])).querySelector(section.selector);
                elementToReplace.replaceWith(domReplace);
                
            }));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
customElements.define('main-cart', MainCartItems);