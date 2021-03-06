// VARIABLES //
const menuMobileIcon = document.querySelector(".headerMobile__iconMenu");
const menuMobileCloseIcon = document.querySelector(".menuMobile__header-icon")
const menuMobileOverLay = document.querySelector(".menuMobile");
const menuMobile = document.querySelector(".menuMobile__container");
const megaMenuIcon = document.querySelector(".header__productMenu");
const megaMenu = document.querySelector(".header__megaMenu");


const init = () => {
    menuMobileIcon.addEventListener("click" , showMenuMobile);
    menuMobileCloseIcon.addEventListener("click" , hideMenuMobile);
    menuMobileOverLay.addEventListener("click" , hideMenuMobile);
    megaMenuIcon.addEventListener("click" , toggleMegaMenu );
}

// FUNCTION //

const toggleEnabelScroll = () => {
    const body = document.querySelector("body");
    if (body.style.overflow === "hidden" ){
        body.style.overflow = "visible";
    }else{
        body.style.overflow = "hidden";
    }
}

const showMenuMobile = () => {
    window.scroll(0,0);
    menuMobileOverLay.style.display= "block";
    menuMobile.style.display= "block";
    toggleEnabelScroll();
}

const hideMenuMobile = () => {
    menuMobile.style.display= "none";
    menuMobileOverLay.style.display= "none";
    toggleEnabelScroll();
}

const toggleMegaMenu = () => {
    if (  megaMenu.style.display === "block"){
        megaMenu.style.display = "none";
    }else{
        megaMenu.style.display = "block";
    }   
        
}


init();


//////////////////////////////////////////////////
const myCart = document.querySelector(".header__myCart");
const cartQuickViewMobile = document.querySelector(".miniCartMobile");
const cartQuickView = document.querySelector(".miniCartDestop__wrap");
myCart.addEventListener("click", e => {
    e.stopPropagation();
    if (cartQuickView.style.display === "none"){
        cartQuickView.style.display = "block";
        document.addEventListener('click' , e => {
            if (!cartQuickView.contains(e.target)) {
              cartQuickView.style.display = 'none';
            }
        })
    }else{
        cartQuickView.style.display = "none";
    }

   
    cartQuickViewMobile.style.display === "none" ?   cartQuickViewMobile.style.display = "block" : cartQuickViewMobile.style.display = "none";
    if (window.innerWidth < 1000){
        toggleEnabelScroll();
    }
})



const miniCartMobileOverlay = cartQuickViewMobile.querySelector(".miniCartMobile__overlay");
const miniCartMobileContent = cartQuickViewMobile.querySelector(".miniCartMobile__content");
const miniCartMobileBtnClose = cartQuickViewMobile.querySelector(".miniCartMobile__title-icon");

miniCartMobileOverlay.addEventListener("click" , () => {
    cartQuickViewMobile.style.display="none";
    toggleEnabelScroll();
})

miniCartMobileContent.addEventListener("click" , (e) => {
    e.stopPropagation();
})

miniCartMobileBtnClose.addEventListener('click' , () => {
    cartQuickViewMobile.style.display="none";
    toggleEnabelScroll();
})