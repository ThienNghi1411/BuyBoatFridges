var list = document.querySelectorAll(".menu__col");
//Icon Control display
list.forEach(e=>{
    let item = e.children[1];
    let icon_Open = e.children[0].children[1];
    let icon_Close = e.children[0].children[2];
    e.addEventListener("click",()=>{
        if(item.classList.contains("menu_active"))
    {
        item.classList.remove("menu_active")
        icon_Open.style.display = "unset"
        icon_Close.style.display = "none"
        
    }
    else
    {  
        item.classList.add("menu_active")
        icon_Open.style.display = "none"
        icon_Close.style.display = "unset"
    }

 })
  
})
//Scroll To Top
var scrolltoTop_button = document.querySelector(".footer_scrolltoTop_button");
scrolltoTop_button.addEventListener("click",()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
})