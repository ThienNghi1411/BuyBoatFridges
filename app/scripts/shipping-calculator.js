class ShippingCalculator extends HTMLElement {
  constructor() {
    super();

    this.url = this.dataset.url;
    this.form = this.querySelector('.cartPage__form');
    this.country = this.querySelector('[name*=country]');
    this.province = this.querySelector('[name*=province]');
    this.zip = this.querySelector('[name*=zip]');
  
    this.country.addEventListener('change', this.countryChange.bind(this));

    this.form.addEventListener('submit', this.onSubmit.bind(this));
    this.countryChange();

    this.dataString = "";

  }


  countryChange(){
    const province = JSON.parse(this.country.options[this.country.selectedIndex].dataset.provinces);

    this.province.innerHTML = '';

    if(province.length){
      province.forEach(item=>{
        const option = document.createElement('option');
        option.value = item[0];
        option.textContent = item[1];
        this.province.insertAdjacentElement('beforeend', option);
      });

      // this.province.closest('.form-field').style.display = null;
    }else{
      // this.province.closest('.form-field').style.display = 'none';
    }
  }

  onSubmit(e){
    this.querySelector(".cartPage__calculateShipBtn-btnText").style.display="none";
    this.querySelector(".cartPage__calculateShipBtn-btnTextOnSubmit").style.display="block";
    e.preventDefault();
    this.classList.add('calculating');
    let formData = new FormData(this.form);
    let searchParams = new URLSearchParams(formData).toString();
    fetch(this.url + '?' + searchParams).then(e=>e.json()).then(e=>{
      this.renderResult(e);
      this.querySelector(".cartPage__calculateShipBtn-btnText").style.display="block";
      this.querySelector(".cartPage__calculateShipBtn-btnTextOnSubmit").style.display="none";
    })
    .finally(()=>{
     
    })
  }

  renderResult(e){
    this.dataString = JSON.parse(this.querySelector("#dataShipping").innerText);
    for (let key in this.dataString){
      this.dataString[key] = this.dataString[key].replace("{{code}}" , this.zip.value);
      this.dataString[key] = this.dataString[key].replace("{{province}}" , this.province.value);
      this.dataString[key] = this.dataString[key].replace("{{country}}" , this.country.value);
      key === "many_shipping_rates" && e.shipping_rates ? this.dataString[key] = this.dataString[key].replace("{{number}}" , e.shipping_rates.length) : "";
    }

    let shippingTitle = this.dataString.not_found_shipping_rate;
    if(e.shipping_rates && e.shipping_rates.length > 1){
      shippingTitle = this.dataString.many_shipping_rates;
    }
    else if(e.shipping_rates && e.shipping_rates.length == 1){
      shippingTitle = this.dataString.one_shipping_rate;
    }
    this.querySelector('.cartPage__resCalculate-title').innerText = shippingTitle;

    let domUl = document.createElement("ul");
    domUl.classList.add("cartPage__resCalculate-listRes");
    if (e.shipping_rates){
      e.shipping_rates.forEach(shipping_rate => {
        let dom = document.createElement("li");
        dom.classList.add("cartPage__resCalculate-listRes-option")
        dom.innerText = `${shipping_rate.name} at $${shipping_rate.price} ${shipping_rate.currency}`
        domUl.appendChild(dom);
        
      })
    }
    this.querySelector(".cartPage__resCalculate-listRes").replaceWith(domUl);
  
  }
}

customElements.define('shipping-calculator', ShippingCalculator);
