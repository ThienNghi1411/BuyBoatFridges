(() => {
  // app/scripts/login.js
  var forget_btn = document.querySelector(".Forget");
  var Cancel = document.querySelector(".Cancel");
  var Login_Form = document.querySelector(".login-form");
  var Forget_Form = document.querySelector(".forget-form");
  if (forget_btn != void 0) {
    forget_btn.addEventListener("click", () => {
      Login_Form.style.display = "none";
      Forget_Form.classList.remove("forget-form");
    });
  }
  if (Cancel != void 0) {
    Cancel.addEventListener("click", () => {
      Login_Form.style.display = "unset";
      Forget_Form.classList.add("forget-form");
    });
  }
})();
