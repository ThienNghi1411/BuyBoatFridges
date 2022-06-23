(() => {
  // app/scripts/homePage-filter.js
  var removeClass = (doms, className) => {
    doms.forEach((dom) => {
      if (dom.classList.contains(className)) {
        dom.classList.remove(className);
      }
    });
  };
  var init = () => {
    const dropDowns = document.querySelectorAll(".filterOption__dropdown");
    dropDowns.forEach((dropDown) => {
      dropDown.addEventListener("click", () => {
        let selectCont = dropDown.querySelector(".filterOption__dropdownCont");
        selectCont.style.display = "block";
        let selectOptions = selectCont.querySelectorAll(".filterOption__dropdownCont-option");
        selectOptions.forEach((selectOption) => {
          selectOption.addEventListener("click", () => {
            removeClass(selectOptions, "filterOption__dropdownCont-optionActive");
            selectOption.classList.add("filterOption__dropdownCont-optionActive");
          });
        });
      });
      let btnConfirm = dropDown.parentElement.querySelector(".filterOption__btnConfirm");
      btnConfirm.addEventListener("click", () => {
        let placeHolder = dropDown.querySelector(".filterOption__dropdown-placeHolder");
        let selectCont = dropDown.querySelector(".filterOption__dropdownCont");
        let selectOptions = selectCont.querySelectorAll(".filterOption__dropdownCont-option");
        selectOptions.forEach((tmp) => {
          if (tmp.classList.contains("filterOption__dropdownCont-optionActive")) {
            placeHolder.innerText = tmp.innerText;
            dropDown.classList.add("backgroundActive");
            placeHolder.classList.add("filterOption__dropdown-selected");
            btnConfirm.classList.add("backgroundActive");
          }
        });
        selectCont.style.display = "none";
      });
    });
  };
  init();
})();
