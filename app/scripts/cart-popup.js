console.log('a');
// VARIABLES //
const popup = document.querySelector(".cartPopup");
const closeBtn = document.querySelector(".cartPopup__closeBtn");



const init = () => {
    toggleEnabelScroll();
    closeBtn.addEventListener("click",closePopup)
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

const closePopup = () => {
   popup.remove();
   toggleEnabelScroll();
}


init();