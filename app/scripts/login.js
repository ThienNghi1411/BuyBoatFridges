var forget_btn = document.querySelector(".Forget");
var Cancel = document.querySelector(".Cancel");
var Login_Form = document.querySelector(".login-form");
var Forget_Form = document.querySelector(".forget-form");
console.log(Forget_Form)
if(forget_btn!= undefined)
{
    forget_btn.addEventListener("click",()=>{
        Login_Form.style.display = "none";
        Forget_Form.style.display = "unset";     
    })
}
if(Cancel!= undefined)
{
    Cancel.addEventListener("click",()=>{
        Login_Form.style.display = "unset";
        Forget_Form.style.display = "none";    
    })
}
