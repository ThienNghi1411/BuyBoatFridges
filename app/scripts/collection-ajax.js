//gobal variables
import {Control} from './collection.js';
var tag = document.querySelectorAll(".tag");
var Query = '';
var sort_value = document.querySelector(".select-selected");
let render_number = 0;
var task = false;

//Render Items with Query & sort
renderItems = () => {
    let spinner = document.querySelector(".collection__spinner");
    spinner.style.display = "unset";
    fetch('https://www.buyboatfridges.com/collections/' + collection_handle.toLowerCase() + '/' + Query + '?sort_by=' + sort_value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors'
    }
    ).then(response => response.text())
        .then(data => {
            // console.log(data)
            let html_div = document.createElement('div');
            html_div.innerHTML = data;
            let collection__tittle = document.querySelector(".collection__tittle");
            let product_count = html_div.querySelectorAll('.productCard').length;
            console.log(html_div.querySelectorAll('.productCard'))
            collection__tittle.innerHTML = collection_title+' '+`(${product_count})`
            spinner.style.display = "none";
            history.replaceState(null, null, '/collections/' + collection_handle.toLowerCase()  + '/' + Query + '?sort_by=' + sort_value);
            // product_count tong san pham
            // render_number so sp can render
            let ProductContainer = html_div.querySelector('.collection__Productcontent');
            // console.log(ProductContainer.children[7]);
            document.querySelector('.collection__Productcontent').innerHTML = '';
            // console.log(product_count)
            // console.log(render_number)
            if (product_count == 0) {
                let empty = document.querySelector(".collection__empty");
                // console.log(empty)
                empty.style.display = "unset";
            }
            if (product_count != 0) {
                let empty = document.querySelector(".collection__empty");
                empty.style.display = "none";
            }
            if(Shopify.designMode)
            {
                render_value=document.querySelector(".collection__itemDisplay").children[0].children[2].children[0].innerText;
                render_number = parseInt(render_value)
            }
            if (product_count > render_number) {
                for (i = 0; i < render_number; i++) {
                    let collection_item = ProductContainer.children[i];
                    let div = document.createElement('div');
                    div.className = "productCard";
                    div.innerHTML = collection_item.innerHTML;
                    document.querySelector('.collection__Productcontent').appendChild(div);
                    // console.log(ProductContainer);
                    // console.log(collection_item)
                    if (ifinity == 2) {
                        let loadmore = document.querySelector(".collection__loadMore");
                        loadmore.style.display = "flex";
                    }
                }
            }
            else {
                // console.log(html_div)
                let html_dom = html_div.querySelector('.collection__Productcontent').innerHTML;
                document.querySelector('.collection__Productcontent').innerHTML = html_dom;
                let loadmore = document.querySelector(".collection__loadMore");
                loadmore.style.display = "none";
                // let empty = document.querySelector(".collection__empty");
                // empty.style.display="none";       
            }
        })
}
//remove tag
removeTags = () => {
    var remove_Icons = document.querySelectorAll(".tag_RemoveIcon");
    // console.log(remove_Icons)
    if (remove_Icons != undefined) {
        remove_Icons.forEach(e => {
            let remove_text = e.previousElementSibling.innerText;
            e.addEventListener("click", () => {
                task = false
                let tags_remove = document.querySelectorAll(".remove");
                // console.log(tags_remove)
                tags_remove.forEach(e => {
                    let normal_text = e.innerText.toLowerCase().replace(/ /g, '-');
                    // console.log(normal_text)
                    if (remove_text == normal_text) {
                        e.classList.remove("remove")
                        e.style.pointerEvents = "unset"
                        let Query_array = Query.split('+');
                        // console.log(normal_text);
                        // console.log(Query_array.length)
                        if (Query_array.length == 1) {
                            clearAll();
                        }
                        for (let i = 0; i < Query_array.length; i++) {

                            if (Query_array[i] == normal_text & i == 0) {
                                Query = Query.replace(`${normal_text}+`, '');

                            }
                            if (Query_array[i] == normal_text && i > 0) {
                                Query = Query.replace(`+${normal_text}`, '');
                            }
                        }
                        // console.log(Query)
                        renderItems();
                    }
                })
                e.parentElement.parentElement.style.display = "none";

            })
        })
    }
}
//url matching
document.addEventListener('DOMContentLoaded', function () {
    //first item
    renderOption();
    // document.querySelector("#display").nextElementSibling.nextElementSibling.children[0].click();
    // console.log( document.querySelector(".filter-option").innerHTML)
    let filter = window.location.href;
    let array = filter.split("?");
    let url_array = array[0].split("/");
    // console.log(url_array[].length)
    // console.log(array[1])
    // console.log(array[1])
    console.log(url_array)
    if (url_array[5] != undefined && url_array[5] != ''|| array[1]!='' && array[1]!=undefined) {
        let items = url_array[5].split("+")
        // console.log(items);
        let html_dom = `<div class="filter__tittle  filter_active">
        <div class="tittle__text">SHOPING BY:</div>
        <div class="Icon__Control">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/></svg>
        </div>
        <div class="Icon__Control plus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
        </div>
        </div>
         <div class="item__wrap shopping">    
         </div>
            <div class="ClearAll_button">
            Clear All
         </div>  
         `
        let clear_container = document.querySelector(".filter_Clear");
        if(url_array[5].length>0)
        {
            clear_container.innerHTML = html_dom;
            let ClearAll_button = document.querySelector(".ClearAll_button");
            ClearAll_button.addEventListener("click", () => {
                clearAll();
            })
              items.forEach(e => {
                let tags = document.querySelectorAll(".tag");
                // console.log(tags);
                tags.forEach(element => {
                    let normal_filter = element.innerText.toLowerCase().replace(/ /g, '-');
                    if (e == normal_filter) {
                        element.classList.add("remove");
                    }
                })
                let html_dom2 = `
                <div class="shopingBy_tag">
                <div class="tag_text">
               ${e}
              </div>
              <div class="tag_RemoveIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
              </div>
                </div>
               `
                var filter_container = document.querySelector(".shopping");
                var div = document.createElement('div');
                div.innerHTML = html_dom2
                filter_container.appendChild(div);
                
            })
            
            removeTags()
        }
        Query = url_array[5];
        // console.log(array[1])
        if (array[1] != '' && array[1] != undefined) {
            sort_value = array[1].split("=")[1];
            let sort_options = document.querySelectorAll(".filter-option");
            sort_options.forEach(e => {
                if (e.getAttribute("value") == array[1].split("=")[1]) {
                    e.classList.add("same-as-selected")
                    e.classList.add("no-after")
                    if(e.nextElementSibling!=null)  e.nextElementSibling.classList.add("no-after")
                }
            })
        }
        else {
            // document.querySelector(".select-items").children[1].click()
          sort_value = 'best-selling';         
        }
        document.getElementsByClassName("select-items")[1].children[0].classList.add("same-as-selected")
        render_number = parseInt(document.getElementsByClassName("select-selected")[1].innerHTML); 
        renderItems()
        Control();
    }
    else {
        Control();
        removeTags()
        Query = '';  
        let sort_default = document.querySelector(".select-items").children[4];
        sort_default.click();
        document.querySelector(".filter-option").classList.add("no-after");
        sort_value = 'price-ascending';
        document.getElementsByClassName("select-items")[0].children[4].classList.add("same-as-selected")
        document.getElementsByClassName("select-items")[1].children[0].classList.add("same-as-selected")
        document.getElementsByClassName("select-items")[1].children[0].classList.add("no-after")
        render_number = parseInt(document.getElementsByClassName("select-selected")[1].innerHTML);
        // renderItems()
    }
})
// clearAll
clearAll = () => {
    task = false
    Query = '';
    renderItems();
    document.querySelector(".filter_Clear").textContent = '';
    let remove_tags = document.querySelectorAll(".remove");
    remove_tags.forEach(e => {
        e.classList.remove("remove");
        e.style.pointerEvents = "unset"
    })
}
//add tag shopping by
tag.forEach(e => {
    e.addEventListener("click", () => {
        task = false
        e.style.pointerEvents = "none";
        //Double Door -> double-door
        let newString = e.innerText.toLowerCase().replace(/ /g, '-');
        var filter_container = document.querySelector(".shopping");
        //render container
        if (filter_container == undefined) {
            let html_dom = `<div class="filter__tittle  filter_active">
        <div class="tittle__text">SHOPING BY:</div>
        <div class="Icon__Control">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/></svg>
        </div>
        <div class="Icon__Control plus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
        </div>
        </div>
         <div class="item__wrap shopping">    
         </div>
            <div class="ClearAll_button">
            Clear All
         </div>
         `
            let clear_container = document.querySelector(".filter_Clear");
            clear_container.innerHTML = html_dom;
           
        }
        //Clear All Button
        let ClearAll_button = document.querySelector(".ClearAll_button");
        ClearAll_button.addEventListener("click", () => {
            clearAll();
        })
        //render tag item
        let html_dom2 = `
         <div class="shopingBy_tag">
         <div class="tag_text">
        ${newString}
       </div>
       <div class="tag_RemoveIcon">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
       </div>
         </div>
        `
        var filter_container = document.querySelector(".shopping");
        var div = document.createElement('div');
        div.innerHTML = html_dom2
        filter_container.appendChild(div);
        //Hide tag filter
        e.classList.add("remove");
        //update Query value
        if (Query == '') Query = Query + newString;
        else Query = Query + '+' + newString;
        // console.log(Query);
        //render data
        renderItems();
        //add event remove tag
        removeTags();
        var content = document.querySelector(".filter__tittle");
  //Icon Control display
      let item = content.nextElementSibling;
      let icon_Open = content.children[2];
      let icon_Close = content.children[1];
      content.addEventListener("click", () => {

          if(content.classList.contains("filter_active"))
          {
              let clear_All = content.nextElementSibling.nextElementSibling;
              // console.log(clear_All)
              if(clear_All!=null)
              {
                clear_All.style.display="none";
              }
              content.classList.remove("filter_active")
              item.style.display = "none";
              icon_Open.style.display = "unset"
              icon_Close.style.display = "none"
              content.parentElement.style.marginBottom="20px"
              content.parentElement.style.paddingBottom="20px"

          }
          else
          {
            
            let clear_All = content.nextElementSibling.nextElementSibling;
            // console.log(clear_All)
              if(clear_All!=null)
              {
                clear_All.style.display="flex";
                clear_All.style.padding="10px 0px 30px 0px";
              }
              content.classList.add("filter_active")
              item.style.display = "flex";
              // item.style.flexDirection ="column";
              icon_Open.style.display = "none"
              icon_Close.style.display = "unset"
              content.parentElement.style.marginBottom ="0px"
              content.parentElement.style.paddingBottom ="30px"
          }
         
      })
  
    })
})
//loadmore
loadmore = () => {
    // console.log(sort_value)
    // console.log(Query)
    let spinner = document.querySelector(".collection__spinner");
    let render_number = parseInt(document.getElementById("display").value);
    spinner.style.display = "unset";
    fetch('https://www.buyboatfridges.com/collections/' + collection_handle.toLowerCase()  + '/' + Query + '?sort_by=' + sort_value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )
        .then(response => response.text())
        .then(data => {
            // console.log(data)
            let html_div = document.createElement('div');
            html_div.innerHTML = data;
            // let html_dom = html_div.querySelector('.collection__Productcontent').innerHTML;
            // document.querySelector('.collection__Productcontent').innerHTML = html_dom;
            // console.log(html_div)
            let collection__tittle = document.querySelector(".collection__tittle");
            let product_count = html_div.querySelectorAll('.productCard').length;
            console.log(html_div.querySelectorAll('.productCard'))
            let itemOnScreen = document.querySelector(".collection__Productcontent").childElementCount;
            collection__tittle.innerHTML = collection_handle + `(${product_count})`
            spinner.style.display = "none";
            history.replaceState(null, null, '/collections/' + collection_handle.toLowerCase()  + '/' + Query + '?sort_by=' + sort_value);
            // product_count tong san pham
            // render_number so sp can render
            console.log(product_count)
            console.log(itemOnScreen)
            let ProductContainer = html_div.querySelector('.collection__Productcontent');
            // console.log(ProductContainer.children[7]);             
            for (i = 0; i < render_number; i++) {
                if (itemOnScreen + i < product_count) {
                    //new items = items onscreen + i
                    let collection_item = ProductContainer.children[itemOnScreen + i];
                    let div = document.createElement('div');
                    div.innerHTML = collection_item.innerHTML;
                    div.className = "productCard";
                    // console.log(ProductContainer);
                    // console.log(collection_item)
                    document.querySelector('.collection__Productcontent').appendChild(div);
                }
            }
            let ItemOnScreen =  document.querySelector(".collection__Productcontent").childElementCount;
            // console.log(ItemOnScreen)
            // console.log(product_count)
            if (ItemOnScreen == product_count) {
                let loadmore = document.querySelector(".collection__loadMore");
                loadmore.style.display = "none";
            }
            task = false
        })
}
//button loadmore
var Load_Button = document.querySelector(".collection__loadMore");
Load_Button.addEventListener("click", () => {
    loadmore();
})
//infinity load
var footer = document.querySelector(".footer");
// console.log(footer.offsetHeight)
window.addEventListener('scroll', () => {
    if (!task) {
        let products =  document.querySelector(".collection__Productcontent").childElementCount;
        if (window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - footer.offsetHeight) {
            // console.log("Hahahaha") 
            task = true;
            let tittle = document.querySelector(".collection__tittle").innerHTML;
            let total = parseInt(tittle.split('(')[1].split(')')[0]);
            // console.log(total)
            if (products < total) {
                if (ifinity == 1) {
                    loadmore();
                    // products= document.querySelectorAll(".productCard").length;
                }
            }
        }
    }
});
// console.log(document.documentElement.scrollHeight)
// option-select

renderOption = () =>{
    var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    // console.log(ll)
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        // sort_value = selElmnt.options[j].value
        c.setAttribute("value", selElmnt.options[j].value);
        c.classList.add("filter-option");
        c.addEventListener("click", function (e) {      
            task = false
            let after_items = document.querySelectorAll(".no-after");
            after_items.forEach(e=>{
                e.classList.remove("no-after")
            })
            document.querySelector(".filter-option").classList.add("no-after");
            document.querySelectorAll(".select-items")[1].children[0].classList.add("no-after");
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            // console.log(s);
            sl = s.length;
            // e.stopPropagation();
            h = this.parentNode.previousSibling; // div = select-selectd
            // console.log(h)
            // console.log(h.innerHTML)
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    //set value ----------
                    h.setAttribute("value", s.options[i].value)
                    let a = parseInt(s.options[i].value)
                    if (a > 0 || a=="ALL") {
                        let value = window.location.href;
                        sort_value = value.split("=")[1];
                        render_number = a;
                        renderItems();
                    }
                    else {
                        sort_value = s.options[i].value;
                        render_number = parseInt(document.getElementsByClassName("select-selected")[1].innerHTML);
                        // console.log(render_number);
                        renderItems();
                    }
                    // console.log(s.options[i].value)
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    // console.log(y)
                    for (k = 0; k < yl; k++) {
                        y[k].classList.remove("same-as-selected");
                    }
                    this.classList.add("same-as-selected")
                    this.classList.add("no-after")
                    if(this.nextElementSibling!=null) this.nextElementSibling.classList.add("no-after")
                    // this.setAttribute("class", "");
                    break;
                }
            }
            // h.click();

        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("shopify:section:load", ()=>{
    renderOption();
});
