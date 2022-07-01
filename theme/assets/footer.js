var list = document.querySelectorAll(".menu__col");
//Icon Control display
list.forEach(e => {
    let item = e.children[1];
    let icon_Open = e.children[0].children[1];
    let icon_Close = e.children[0].children[2];
    e.addEventListener("click", () => {
        if (item.classList.contains("menu_active") && window.innerWidth < 750) {
            item.classList.remove("menu_active")
            item.style.width = "0px";
            item.style.height = "0px";
            item.style.opacity = "0";
            icon_Open.style.display = "unset"
            icon_Close.style.display = "none"

        }
        else {
            if (window.innerWidth < 750) {
                item.classList.add("menu_active")
                item.style.width = "100%";
                item.style.height = "100%"
                item.style.opacity = "1";
                icon_Open.style.display = "none"
                icon_Close.style.display = "unset"
            }

        }

    })

})
//Scroll To Top
window.addEventListener("scroll", () => {
    
    let scrolltoTop_button = document.querySelector(".footer_scrolltoTop_button");

    if(window.scrollY >= 600)
    {
        scrolltoTop_button.classList.add("appear");
        scrolltoTop_button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
           
        })
    }
    if(window.scrollY <= 600)
    {
        scrolltoTop_button.classList.remove("appear");
       
    }
  

});


