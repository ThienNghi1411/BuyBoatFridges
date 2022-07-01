var tag = document.querySelectorAll(".tag");
var Query = '';
tag.forEach(e => {
    e.addEventListener("click", () => {
        //Double Door -> double-door
        let newString = e.innerText.toLowerCase().replace(/ /g, '-');
        var filter_container = document.querySelector(".shopping");
        if(filter_container==undefined)
        {
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

        if (Query == '') Query = Query + newString;
        else Query = Query + '+' + newString;
        // console.log(Query);

        fetch('https://www.buyboatfridges.com/collections/' + collection_handle + '/' + Query)
            .then(response => response.text())
            .then(data => {

                // console.log(data)
                let html_div = document.createElement('div');
                html_div.innerHTML = data;

                let html_dom = html_div.querySelector('.collection__Productcontent').innerHTML;
                document.querySelector('.collection__Productcontent').innerHTML = html_dom;

                history.replaceState(null, null, '/collections/' + collection_handle + '/' + Query);
            })

    })

})
var sort = document.getElementById("sort-by")
sort.addEventListener("change", (e) => {
    fetch('https://www.buyboatfridges.com/collections/' + collection_handle + '/' + Query + '?sort_by=' + sort.value)
        .then(response => response.text())
        .then(data => {

            console.log(data)
            let html_div = document.createElement('div');
            html_div.innerHTML = data;

            let html_dom = html_div.querySelector('.collection__Productcontent').innerHTML;
            document.querySelector('.collection__Productcontent').innerHTML = html_dom;

            history.replaceState(null, null, '/collections/' + collection_handle + '/' + Query + '?sort_by=' + sort.value);
        })

})