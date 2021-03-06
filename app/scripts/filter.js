//render content
document.addEventListener('DOMContentLoaded', function () {
  renderOption()
  // console.log(window.location.href);
  let filter = window.location.href;
  let array = filter.split("?");
  let url_array = array[0].split("/");
  console.log(url_array.length)
  console.log(array)
  if (url_array[5] != undefined && url_array[5] != '' || array[1] != '' && array[1] != undefined) {
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
    if (url_array[5] != undefined && url_array[5] != '') {
      //render container
      let clear_container = document.querySelector(".filter_Clear");
      clear_container.innerHTML = html_dom;
      //render filter item
      let filter_container = document.querySelector(".shopping");
      let filter_array = url_array[5].split("+");
      console.log(filter_array.length)
      for (i = 0; i < filter_array.length; i++) {
        let html_dom2 = `
      <div class="shopingBy_tag">
      <div class="tag_text">
      ${filter_array[i]}
    </div>
    <div class="tag_RemoveIcon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
    </div>
      </div>
     `
        var div = document.createElement('div');
        div.innerHTML = html_dom2
        filter_container.appendChild(div);
      }
    }
    if (array[1] != '' && array[1] != undefined) {
      if (array[1].includes('page')) {
        let url_value = array[1].split("&")[1].split("=")[1];
        let sort_options = document.querySelectorAll(".filter-option");
        sort_options.forEach(e => {
          if (e.getAttribute("value") == url_value) {
            e.classList.add("same-as-selected")
          }

        })
      }
      else {
        let sort_options = document.querySelectorAll(".filter-option");
        sort_options.forEach(e => {
          if (e.getAttribute("value") == array[1].split("=")[1]) {
            e.classList.add("same-as-selected")
          }

        })
      }

    }

  }
  else {
    // document.querySelector(".filter-option").click();
  }
});
//Url matching
document.addEventListener('DOMContentLoaded', function () {
  var removeIcon = document.querySelectorAll(".tag_RemoveIcon");
  // console.log(removeIcon)
  removeIcon.forEach(e => {
    e.addEventListener("click", () => {
      let removeFilter = e.parentElement.parentElement;
      console.log(removeFilter)
      let filterText = e.previousElementSibling.innerText;
      let filter_container = document.querySelector(".shopping");

      removeFilter.remove();
      if (filter_container.childElementCount == 0) {
        let sort_value = document.querySelector("#sort-by").value;
        window.location.href = 'https://www.buyboatfridges.com/collections/' + collection_handle.toLowerCase() + '?sort_by=' + sort_value;
      }
      else {
        //get the array
        let filter = window.location.href;
        let array = filter.split("?");
        let url_array = array[0].split("/");
        let filter_array = url_array[5].split("+");

        if (filterText == filter_array[0]) {
          let string = filterText + '+';
          let finalUrl = window.location.href.replace(string, '');
          window.location.href = finalUrl;
        }
        else {
          let string = '+' + filterText;
          let finalUrl = window.location.href.replace(string, '');
          // console.log(string);
          // console.log(filter_container.childElementCount);
          window.location.href = finalUrl;
        }



      }



    })
  })



})
//Clear All Button
document.addEventListener('DOMContentLoaded', function () {
  let clearAll = document.querySelector(".ClearAll_button");
  if (clearAll != null) {
    clearAll.addEventListener("click", () => {
      let sort_value = document.querySelector("#sort-by").value;
      window.location.href = 'https://www.buyboatfridges.com/collections/' + collection_handle.toLowerCase() + '?sort_by=' + sort_value;
    })
  }

})

document.addEventListener('DOMContentLoaded', function () {
  let empty = document.querySelector(".collection__empty");
  let collection_content = document.querySelector(".collection__Productcontent").childElementCount;
  //check item
  if (collection_content == 0) {
    empty.style.display = "unset";
  }
})


renderOption = ()=>{
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    console.log(ll)
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
  
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        // console.log(s);
        sl = s.length;
        // e.stopPropagation();
        h = this.parentNode.previousSibling; // div = select-selectd
        // console.log(h.innerHTML)
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            //set value ----------
            h.setAttribute("value", s.options[i].value)
            let a = parseInt(s.options[i].value)
            console.log(s.options[i].value)
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
  
            Shopify.queryParams = {};
            // if (location.search.length) {
            //   var params = location.search.substr(1).split('&');
  
            //   for (var i = 0; i < params.length; i++) {
            //     var keyValue = params[i].split('=');
  
            //     if (keyValue.length) {
            //       Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
            //     }
            //   }
            // }
            Shopify.queryParams.sort_by = s.options[i].value;
            location.search = new URLSearchParams(Shopify.queryParams).toString();
            // console.log(y)
            for (k = 0; k < yl; k++) {
              y[k].classList.remove("same-as-selected");
            }
            this.classList.add("same-as-selected")
            // this.setAttribute("class", "");
            break;
          }
        }
        h.click();
  
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
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
}

document.addEventListener("shopify:section:load", ()=>{
  renderOption();
});

