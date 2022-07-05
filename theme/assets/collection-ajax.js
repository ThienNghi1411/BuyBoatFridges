(() => {
  // app/scripts/collection-ajax.js
  var tag = document.querySelectorAll(".tag");
  var Query = "";
  var sort = document.getElementById("sort-by");
  removeTags = () => {
    var remove_Icons = document.querySelectorAll(".tag_RemoveIcon");
    console.log(remove_Icons);
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
              console.log(Query_array.length);
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
    removeTags();
    let filter = window.location.href;
    let array = filter.split("?");
    let url_array = array[0].split("/");
    console.log(url_array[5]);
    if (url_array[5] != void 0) {
      let items = url_array[5].split("+");
      console.log(items);
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
      items.forEach((e) => {
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
      Query = url_array[5];
      renderItems();
    } else {
      Query = "";
      renderItems();
    }
  });
  sort.addEventListener("change", (e) => {
    renderItems();
  });
  clearAll = () => {
    Query = "";
    renderItems();
    document.querySelector(".filter_Clear").textContent = "";
    let remove_tags = document.querySelectorAll(".remove");
    remove_tags.forEach((e) => {
      e.classList.remove("remove");
    });
  };
  renderItems = () => {
    let spinner = document.querySelector(".collection__spinner");
    let render_number = parseInt(document.getElementById("display").value);
    spinner.style.display = "unset";
    fetch("https://www.buyboatfridges.com/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort.value).then((response) => response.text()).then((data) => {
      let html_div = document.createElement("div");
      html_div.innerHTML = data;
      let collection__tittle = document.querySelector(".collection__tittle");
      let product_count = html_div.querySelectorAll(".productCard").length;
      collection__tittle.innerHTML = collection_handle + `(${product_count})`;
      spinner.style.display = "none";
      history.replaceState(null, null, "/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort.value);
      let ProductContainer = html_div.querySelector(".collection__Productcontent");
      document.querySelector(".collection__Productcontent").innerHTML = "";
      if (product_count == 0) {
        let empty = document.querySelector(".collection__empty");
        console.log(empty);
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
    let render_number = parseInt(document.getElementById("display").value);
    spinner.style.display = "unset";
    fetch("https://www.buyboatfridges.com/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort.value).then((response) => response.text()).then((data) => {
      let html_div = document.createElement("div");
      html_div.innerHTML = data;
      let collection__tittle = document.querySelector(".collection__tittle");
      let product_count = html_div.querySelectorAll(".productCard").length;
      collection__tittle.innerHTML = collection_handle + `(${product_count})`;
      spinner.style.display = "none";
      history.replaceState(null, null, "/collections/" + collection_handle + "/" + Query + "?sort_by=" + sort.value);
      let ProductContainer = html_div.querySelector(".collection__Productcontent");
      for (i = 0; i < render_number; i++) {
        if (render_number + i < product_count) {
          let collection_item = ProductContainer.children[render_number + i];
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
  var footer = document.querySelector(".footer").getBoundingClientRect().height;
  window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      let products = document.querySelectorAll(".productCard").length;
      let tittle = document.querySelector(".collection__tittle").innerHTML;
      let total = parseInt(tittle.split("(")[1].split(")")[0]);
      if (products < total) {
        if (ifinity == 1) {
          loadmore();
          products = document.querySelectorAll(".productCard").length;
        }
      }
    }
  });
})();
