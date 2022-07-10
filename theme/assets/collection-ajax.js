(() => {
  // app/scripts/collection-ajax.js
  var tag = document.querySelectorAll(".tag");
  var Query = "";
  var sort_value = document.querySelector(".select-selected");
  var render_number = 0;
  var task = false;
  renderItems = () => {
    let spinner = document.querySelector(".collection__spinner");
    spinner.style.display = "unset";
    fetch("https://www.buyboatfridges.com/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort_value).then((response) => response.text()).then((data) => {
      let html_div = document.createElement("div");
      html_div.innerHTML = data;
      let collection__tittle = document.querySelector(".collection__tittle");
      let product_count = html_div.querySelectorAll(".productCard").length;
      collection__tittle.innerHTML = collection_handle + `(${product_count})`;
      spinner.style.display = "none";
      history.replaceState(null, null, "/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort_value);
      let ProductContainer = html_div.querySelector(".collection__Productcontent");
      document.querySelector(".collection__Productcontent").innerHTML = "";
      if (product_count == 0) {
        let empty = document.querySelector(".collection__empty");
        empty.style.display = "unset";
      }
      if (product_count != 0) {
        let empty = document.querySelector(".collection__empty");
        empty.style.display = "none";
      }
      if (product_count > render_number) {
        for (i = 0; i < render_number; i++) {
          let collection_item = ProductContainer.children[i];
          let div = document.createElement("div");
          div.className = "productCard";
          div.innerHTML = collection_item.innerHTML;
          document.querySelector(".collection__Productcontent").appendChild(div);
          if (ifinity == 2) {
            let loadmore2 = document.querySelector(".collection__loadMore");
            loadmore2.style.display = "flex";
          }
        }
      } else {
        let html_dom = html_div.querySelector(".collection__Productcontent").innerHTML;
        document.querySelector(".collection__Productcontent").innerHTML = html_dom;
        let loadmore2 = document.querySelector(".collection__loadMore");
        loadmore2.style.display = "none";
      }
    });
  };
  removeTags = () => {
    var remove_Icons = document.querySelectorAll(".tag_RemoveIcon");
    if (remove_Icons != void 0) {
      remove_Icons.forEach((e) => {
        let remove_text = e.previousElementSibling.innerText;
        e.addEventListener("click", () => {
          let tags_remove = document.querySelectorAll(".remove");
          tags_remove.forEach((e2) => {
            let normal_text = e2.innerText.toLowerCase().replace(/ /g, "-");
            if (remove_text == normal_text) {
              e2.classList.remove("remove");
              e2.style.pointerEvents = "unset";
              let Query_array = Query.split("+");
              if (Query_array.length == 1) {
                clearAll();
              }
              for (let i2 = 0; i2 < Query_array.length; i2++) {
                if (Query_array[i2] == normal_text & i2 == 0) {
                  Query = Query.replace(`${normal_text}+`, "");
                }
                if (Query_array[i2] == normal_text && i2 > 0) {
                  Query = Query.replace(`+${normal_text}`, "");
                }
              }
              renderItems();
            }
          });
          e.parentElement.parentElement.style.display = "none";
        });
      });
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
    let filter = window.location.href;
    let array = filter.split("?");
    let url_array = array[0].split("/");
    if (url_array[5] != void 0 && url_array[5] != "") {
      let items = url_array[5].split("+");
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
      let clear_container = document.querySelector(".filter_Clear");
      clear_container.innerHTML = html_dom;
      let ClearAll_button = document.querySelector(".ClearAll_button");
      ClearAll_button.addEventListener("click", () => {
        clearAll();
      });
      items.forEach((e) => {
        let tags = document.querySelectorAll(".tag");
        tags.forEach((element) => {
          let normal_filter = element.innerText.toLowerCase().replace(/ /g, "-");
          if (e == normal_filter) {
            element.classList.add("remove");
          }
        });
        let html_dom2 = `
            <div class="shopingBy_tag">
   
            <div class="tag_text">
           ${e}
          </div>
          <div class="tag_RemoveIcon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
          </div>
            </div>
           `;
        var filter_container = document.querySelector(".shopping");
        var div = document.createElement("div");
        div.innerHTML = html_dom2;
        filter_container.appendChild(div);
      });
      removeTags();
      Query = url_array[5];
      if (array[1] != "" && array[1] != void 0) {
        sort_value = array[1].split("=")[1];
        let sort_options = document.querySelectorAll(".filter-option");
        sort_options.forEach((e) => {
          if (e.getAttribute("value") == array[1].split("=")[1]) {
            e.classList.add("same-as-selected");
          }
        });
      } else {
        sort_value = "price-ascending";
        document.getElementsByClassName("select-items")[0].children[4].classList.add("same-as-selected");
      }
      document.getElementsByClassName("select-items")[1].children[0].classList.add("same-as-selected");
      render_number = parseInt(document.getElementsByClassName("select-selected")[1].innerHTML);
      renderItems();
    } else {
      removeTags();
      Query = "";
      sort_value = "price-ascending";
      document.getElementsByClassName("select-items")[0].children[4].classList.add("same-as-selected");
      document.getElementsByClassName("select-items")[1].children[0].classList.add("same-as-selected");
      render_number = parseInt(document.getElementsByClassName("select-selected")[1].innerHTML);
      renderItems();
    }
  });
  clearAll = () => {
    Query = "";
    renderItems();
    document.querySelector(".filter_Clear").textContent = "";
    let remove_tags = document.querySelectorAll(".remove");
    remove_tags.forEach((e) => {
      e.classList.remove("remove");
      e.style.pointerEvents = "unset";
    });
  };
  tag.forEach((e) => {
    e.addEventListener("click", () => {
      e.style.pointerEvents = "none";
      let newString = e.innerText.toLowerCase().replace(/ /g, "-");
      var filter_container = document.querySelector(".shopping");
      if (filter_container == void 0) {
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
        let clear_container = document.querySelector(".filter_Clear");
        clear_container.innerHTML = html_dom;
      }
      let ClearAll_button = document.querySelector(".ClearAll_button");
      ClearAll_button.addEventListener("click", () => {
        clearAll();
      });
      let html_dom2 = `
         <div class="shopingBy_tag">

         <div class="tag_text">
        ${newString}
       </div>
       <div class="tag_RemoveIcon">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
       </div>
         </div>
        `;
      var filter_container = document.querySelector(".shopping");
      var div = document.createElement("div");
      div.innerHTML = html_dom2;
      filter_container.appendChild(div);
      e.classList.add("remove");
      if (Query == "")
        Query = Query + newString;
      else
        Query = Query + "+" + newString;
      renderItems();
      removeTags();
    });
  });
  loadmore = () => {
    let spinner = document.querySelector(".collection__spinner");
    let render_number2 = parseInt(document.getElementById("display").value);
    spinner.style.display = "unset";
    fetch("https://www.buyboatfridges.com/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort_value).then((response) => response.text()).then((data) => {
      let html_div = document.createElement("div");
      html_div.innerHTML = data;
      let collection__tittle = document.querySelector(".collection__tittle");
      let product_count = html_div.querySelectorAll(".productCard").length;
      let itemOnScreen = document.querySelectorAll(".productCard").length;
      collection__tittle.innerHTML = collection_handle + `(${product_count})`;
      spinner.style.display = "none";
      history.replaceState(null, null, "/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort_value);
      let ProductContainer = html_div.querySelector(".collection__Productcontent");
      for (i = 0; i < render_number2; i++) {
        if (itemOnScreen + i < product_count) {
          let collection_item = ProductContainer.children[itemOnScreen + i];
          let div = document.createElement("div");
          div.innerHTML = collection_item.innerHTML;
          div.className = "productCard";
          document.querySelector(".collection__Productcontent").appendChild(div);
        }
      }
      let ItemOnScreen = document.querySelectorAll(".productCard").length;
      if (ItemOnScreen == product_count) {
        let loadmore2 = document.querySelector(".collection__loadMore");
        loadmore2.style.display = "none";
      }
      task = false;
    });
  };
  var Load_Button = document.querySelector(".collection__loadMore");
  Load_Button.addEventListener("click", () => {
    loadmore();
  });
  var display = document.getElementById("display");
  display.addEventListener("change", (e) => {
    renderItems();
  });
  var footer = document.querySelector(".footer");
  window.addEventListener("scroll", () => {
    if (!task) {
      let products = document.querySelectorAll(".productCard").length;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - footer.offsetHeight) {
        task = true;
        let tittle = document.querySelector(".collection__tittle").innerHTML;
        let total = parseInt(tittle.split("(")[1].split(")")[0]);
        console.log(total);
        if (products < total) {
          if (ifinity == 1) {
            loadmore();
          }
        }
      }
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
            if (a2 > 0) {
              let value = window.location.href;
              sort_value = value.split("=")[1];
              render_number = a2;
              renderItems();
            } else {
              sort_value = s.options[i2].value;
              render_number = parseInt(document.getElementsByClassName("select-selected")[1].innerHTML);
              console.log(render_number);
              renderItems();
            }
            console.log(s.options[i2].value);
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
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
})();
