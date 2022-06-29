// VARIABLES //
const specOptions = document.querySelectorAll(".productSpecs__optionWrap");

const init = () => {
    specOptions.forEach(specOption => {
        specOption.addEventListener("click" , toggleOption);
    })    
}

// FUNCTION //
const removeClass = (doms , className ) => {
    doms.forEach(dom => {
        if (dom.classList.contains(className)){
            dom.classList.remove(className);
        }
    })    
}

const toggleOption = (e) => {
    let option = e.target;
    let content = e.target.parentElement.querySelectorAll(".productSpecs__content");
    let hideIcon = e.target.querySelector(".productSpecs__optionWrap-hideIcon");
    let showIcon = e.target.querySelector(".productSpecs__optionWrap-showIcon");
    if (option.classList.contains("productSpecs__activeOption")){
        option.classList.remove("productSpecs__activeOption");
        content.forEach(tmp => {
            tmp.style.display="none";
        })
        hideIcon.style.display="none";
        showIcon.style.display="block";
    }else{
        removeClass(specOptions,"productSpecs__activeOption");
        option.classList.add("productSpecs__activeOption");
        content.forEach(tmp => {
            tmp.style.display="block";
        })
        hideIcon.style.display="block";
        showIcon.style.display="none";
    }
}

init();