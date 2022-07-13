// VARIABLES //
const header = document.querySelector(".header");
const sliderBanner = document.querySelector(".pageBanner");
console.log(sliderBanner);
const init = () => {
    window.onload = () => {
        window.onscroll = () => {
          stickyMenu();
        };
    };      
}

// FUNCTION //
const stickyMenu = () => {
    let checkPointSticky = 1;
    if (sliderBanner === null ){
        checkPointSticky = 200;
    }else{
        checkPointSticky = sliderBanner.offsetTop;
    }

    if (window.pageYOffset > checkPointSticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
    
}

init();