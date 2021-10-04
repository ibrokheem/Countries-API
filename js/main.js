const COUNTRIES_API_BASE_URL = 'https://restcountries.com/v3.1/name/';

const elInfoDesk = document.querySelector('.js-info-desk');
const elSearchForm = document.querySelector('.js-search-form')
const elSearchInput = document.querySelector('.js-search-input')
const elCountriesList = document.querySelector('.countries-list')
const elCountriesItemTemplate = document.querySelector('#countries-item-template').content;

function getJSON(url){
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status !== 404){
        showCountries(data);
      }else{
        elInfoDesk.textContent = data.message;
        console.log(data.message)
      }
    });
}

function showCountries(data){
  elCountriesList.innerHTML = null;
  const elCountriesFragment = document.createDocumentFragment();
  data.forEach(country => {
    console.log(country);
    const elCountry = elCountriesItemTemplate.cloneNode(true)
    elCountry.querySelector('img').src = country.flags.svg;
    elCountry.querySelector("#population").textContent = country.population;
    elCountry.querySelector('#region').textContent = country.region;
    elCountry.querySelector('#capital').textContent = country.capital;
    elCountriesFragment.appendChild(elCountry);

  });
  elCountriesList.appendChild(elCountriesFragment);

            
}

function onSearchFormSubmit(evt){
  evt.preventDefault();
  const searchUrl = COUNTRIES_API_BASE_URL + elSearchInput.value.trim();
  getJSON(searchUrl);
  
}

if(elSearchForm){
  elSearchForm.addEventListener('submit', onSearchFormSubmit);
}