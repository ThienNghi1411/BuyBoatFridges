<<<<<<< HEAD
const removeClass = (doms , className) => {
    doms.forEach(dom => {
        if (dom.classList.contains(className)){
            dom.classList.remove(className);
        }
    })
}

const init = () => {
    const dropDowns = document.querySelectorAll(".filterOption__dropdown");
    dropDowns.forEach( dropDown  => {
        dropDown.addEventListener("click" , () => {
            const dropDownList = dropDown.querySelector(".filterOption__dropdownCont");
            dropDownList.style.display = "block";
            const dropDownOptions = dropDownList.querySelectorAll(".filterOption__dropdownCont-option");
            dropDownOptions.forEach(dropDownOption => {
                dropDownOption.addEventListener("click" , (e) => {
                    e.stopPropagation();
                    let btnConfirm = dropDown.parentElement.querySelector(".filterOption__btnConfirm");
                    let placeHolder = dropDown.querySelector(".filterOption__dropdown-placeHolder");
                    placeHolder.innerText = dropDownOption.innerText;
                    dropDown.classList.add("backgroundActive");
                    placeHolder.classList.add("filterOption__dropdown-selected");
                    btnConfirm.classList.add("backgroundActive");
                    btnConfirm.setAttribute("value" ,dropDownOption.innerText );
                    dropDownList.style.display = "none";
                })
            })
        })
    })
    const btnConfirms = document.querySelectorAll(".filterOption__btnConfirm");

    let url = "/collections/fridges/"
    btnConfirms.forEach( (btnConfirm) => {
        btnConfirm.addEventListener("click" , () => {
            if (btnConfirm.classList.contains("backgroundActive")){
                for (let i = 0 ; i < btnConfirms.length ; i++ ){
                    if (btnConfirms[i].getAttribute("value") !== ""){
                        let value = btnConfirms[i].getAttribute("value").replaceAll(" ","-").toLowerCase();
                        url += value+"+";
                    }

                }
                url = url.substring(0,url.length-1);
                window.location.href = url;
            }
        })
    })
}

init();
=======
>>>>>>> TheNgan
