var forget_btn = document.querySelector(".Forget");

var Cancel = document.querySelector(".Cancel");
var Login_Form = document.querySelector(".login-form");
var Forget_Form = document.querySelector(".forget-form");
if(forget_btn!= undefined)
{
    forget_btn.addEventListener("click",()=>{
        Login_Form.style.display = "none";
        Forget_Form.classList.remove("forget")
      
    })
}
if(Cancel!= undefined)
{
    Cancel.addEventListener("click",()=>{
        Login_Form.style.display = "unset";
        Forget_Form.classList.add("forget")
    })
}
