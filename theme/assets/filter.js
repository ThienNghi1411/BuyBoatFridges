(() => {
  // app/scripts/filter.js
  document.addEventListener("DOMContentLoaded", function() {
    let filter = window.location.href;
    let array = filter.split("?");
    let url_array = array[0].split("/");
    console.log(url_array.length);
    console.log(array);
    if (url_array[5] != void 0 && url_array[5] != "" || array[1] != "" && array[1] != void 0) {
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
   `;
      if (url_array[5] != void 0 && url_array[5] != "") {
        let clear_container = document.querySelector(".filter_Clear");
        clear_container.innerHTML = html_dom;
        let filter_container = document.querySelector(".shopping");
        let filter_array = url_array[5].split("+");
        console.log(filter_array.length);
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
     `;
          var div = document.createElement("div");
          div.innerHTML = html_dom2;
          filter_container.appendChild(div);
        }
      }
      if (array[1] != "" && array[1] != void 0) {
        if (array[1].includes("page")) {
          let url_value = array[1].split("&")[1].split("=")[1];
          let sort_options = document.querySelectorAll(".filter-option");
          sort_options.forEach((e) => {
            if (e.getAttribute("value") == url_value) {
              e.classList.add("same-as-selected");
            }
          });
        } else {
          let sort_options = document.querySelectorAll(".filter-option");
          sort_options.forEach((e) => {
            if (e.getAttribute("value") == array[1].split("=")[1]) {
              e.classList.add("same-as-selected");
            }
          });
        }
      }
    } else {
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    var removeIcon = document.querySelectorAll(".tag_RemoveIcon");
    removeIcon.forEach((e) => {
      e.addEventListener("click", () => {
        let removeFilter = e.parentElement.parentElement;
        console.log(removeFilter);
        let filterText = e.previousElementSibling.innerText;
        let filter_container = document.querySelector(".shopping");
        removeFilter.remove();
        if (filter_container.childElementCount == 0) {
          let sort_value = document.querySelector("#sort-by").value;
          window.location.href = "https://www.buyboatfridges.com/collections/" + collection_handle.toLowerCase() + "?sort_by=" + sort_value;
        } else {
          let filter = window.location.href;
          let array = filter.split("?");
          let url_array = array[0].split("/");
          let filter_array = url_array[5].split("+");
          if (filterText == filter_array[0]) {
            let string = filterText + "+";
            let finalUrl = window.location.href.replace(string, "");
            window.location.href = finalUrl;
          } else {
            let string = "+" + filterText;
            let finalUrl = window.location.href.replace(string, "");
            window.location.href = finalUrl;
          }
        }
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    let clearAll = document.querySelector(".ClearAll_button");
    if (clearAll != null) {
      clearAll.addEventListener("click", () => {
        let sort_value = document.querySelector("#sort-by").value;
        window.location.href = "https://www.buyboatfridges.com/collections/" + collection_handle.toLowerCase() + "?sort_by=" + sort_value;
      });
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    let empty = document.querySelector(".collection__empty");
    let collection_content = document.querySelector(".collection__Productcontent").childElementCount;
    if (collection_content == 0) {
      empty.style.display = "unset";
    }
  });
  var x;
  var i;
  var j;
  var l;
  var ll;
  var selElmnt;
  var a;
  var b;
  var c;
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    console.log(ll);
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.setAttribute("value", selElmnt.options[j].value);
      c.classList.add("filter-option");
      c.addEventListener("click", function(e) {
        var y, i2, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i2 = 0; i2 < sl; i2++) {
          if (s.options[i2].innerHTML == this.innerHTML) {
            s.selectedIndex = i2;
            h.innerHTML = this.innerHTML;
            h.setAttribute("value", s.options[i2].value);
            let a2 = parseInt(s.options[i2].value);
            console.log(s.options[i2].value);
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            Shopify.queryParams = {};
            Shopify.queryParams.sort_by = s.options[i2].value;
            location.search = new URLSearchParams(Shopify.queryParams).toString();
            for (k = 0; k < yl; k++) {
              y[k].classList.remove("same-as-selected");
            }
            this.classList.add("same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    var x2, y, i2, xl, yl, arrNo = [];
    x2 = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x2.length;
    yl = y.length;
    for (i2 = 0; i2 < yl; i2++) {
      if (elmnt == y[i2]) {
        arrNo.push(i2);
      } else {
        y[i2].classList.remove("select-arrow-active");
      }
    }
    for (i2 = 0; i2 < xl; i2++) {
      if (arrNo.indexOf(i2)) {
        x2[i2].classList.add("select-hide");
      }
    }
  }
  document.addEventListener("click", closeAllSelect);
  document.addEventListener("shopify:section:load", function(event) {
  });
})();
