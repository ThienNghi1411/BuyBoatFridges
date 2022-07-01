// VARIABLES //
const specOptions = document.querySelectorAll(".productSpecs__optionWrap");
const contentDestop = document.querySelectorAll(".contentDestop");

const init = () => {
    specOptions.forEach( (specOption,i) => {
        specOption.addEventListener("click" , e => toggleOption(e,i));
    })
    if (window.innerWidth >= 1000){
        specOptions[0].classList.add("productSpecs__activeOption");
        contentDestop[0].style.display="flex";
    }
}

// FUNCTION //
const removeClass = (doms , className ) => {
    doms.forEach(dom => {
        if (dom.classList.contains(className)){
            dom.classList.remove(className);
        }
    })    
}

const removeContent = () => {
    contentDestop.forEach(content => {
        content.style.display = "none";
    })
}

const toggleOption = (e,i) => {
    let option = e.currentTarget;
    let content = e.currentTarget.parentElement.querySelectorAll(".productSpecs__content");
    let hideIcon = e.currentTarget.querySelector(".productSpecs__optionWrap-hideIcon");
    let showIcon = e.currentTarget.querySelector(".productSpecs__optionWrap-showIcon");
    //destop screen

    if (option.classList.contains("productSpecs__activeOption")){
        option.classList.remove("productSpecs__activeOption");
        content.forEach(tmp => {
            tmp.style.display="none";
        })
        hideIcon.style.display="none";
        showIcon.style.display="block";
        contentDestop[i].style.display = "none";
    }else{
        removeClass(specOptions,"productSpecs__activeOption");
        removeContent();
        option.classList.add("productSpecs__activeOption");
        content.forEach(tmp => {
            tmp.style.display="block";
        })
        hideIcon.style.display="block";
        showIcon.style.display="none";
        contentDestop[i].style.display = "flex";
    }
}

init();