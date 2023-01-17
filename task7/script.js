const countriesConteiner = document.querySelector(".country-list")
const regionSelect = document.querySelector(".region-list")
const searchInput = document.querySelector(".search")
const lightModeSwitcher = document.querySelector(".light-mode")
const filteringFailAlert = document.querySelector(".filter-fail-alert-block")
const preloader = document.querySelector(".preloader-layer")

let fetchedData = "";
let countryDataList = [];

const fetchCountryData = async () => {
   const response = await fetch('https://restcountries.com/v3.1/all')
   fetchedData = await response.json();
   countryDataList = fetchedData.slice(0, 20);
   loadCountryData = await renderCountryData(countryDataList);
   hidePreloaderScreen = await hidePreloader()
};

fetchCountryData();

const renderTemplate = (data) => {
   return `
   <div class="country-block">
               <div class="country-flag">
                  <img src="${data.flags.png}" class="flag-image">
               </div>
               <div class="country-text">
                  <p class="country-name"> ${data.name.common} </p>
                  <p class="country-info">Population: <span class="country-data">${data.population}</span></p>
                  <p class="country-info">Region: <span class="country-data">${data.region}</span></p>
                  <p class="country-info">Capital: <span class="country-data">${data.capital[0]}</span></p>
               </div>
            </div>
   `
}

const renderCountryData = (dataArray) => {
   countriesConteiner.innerHTML = ""
   dataArray.forEach(countryDataList => {
      countriesConteiner.innerHTML += renderTemplate(countryDataList)
   })
};

const filterData = () => {
   filteredCountryData = countryDataList.filter((countryDataList) => {
      if (regionSelect.value == "All") {
         return countryDataList.name.common.toString().toLowerCase().includes(searchInputResult);
      }
      else if (searchInput.value === "") {
         return countryDataList.region == regionSelect.value;
      }
      else {
         return countryDataList.region == regionSelect.value && countryDataList.name.common.toString().toLowerCase().includes(searchInputResult);
      }
   });
}

const getFilteredArray = () => {
   if (regionSelect.value == "All" && searchInput.value === "") {
      filteredCountryData = countryDataList;
      renderCountryData(filteredCountryData)
   }
   else {
      filterData()
      if (filteredCountryData.length === 0) {
         showAlert()
      }
      else {
         renderCountryData(filteredCountryData)
         filteringFailAlert.style.display = "none";
      }
   }
};

const showAlert = () => {
   countriesConteiner.innerHTML = ""
   filteringFailAlert.textContent = "No matches found";
   filteringFailAlert.style.display = "block";
}

const hidePreloader = () => {
   preloader.style.display = "none"
}

const changeCountryBlockStyle = () => {
   if (lightModeSwitcher.textContent == "Dark mode") {
      document.querySelectorAll(".country-block").forEach(element => element.style.background = "white");
      document.querySelectorAll(".country-name").forEach(element => element.style.color = "black");
      document.querySelectorAll(".country-info").forEach(element => element.style.color = "black");
   }
   else if (lightModeSwitcher.textContent == "Light mode") {
      document.querySelectorAll(".country-block").forEach(element => element.style.background = "#5f6063");
      document.querySelectorAll(".country-name").forEach(element => element.style.color = "white");
      document.querySelectorAll(".country-info").forEach(element => element.style.color = "white");
   }
}

const debounce = (fn, ms) => {
   let timeout;
   return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
   };
}

const filterDebounce = debounce(getFilteredArray, 200)

searchInput.addEventListener("input", () => {
   filteringFailAlert.style.display = "none";
   searchInputResult = searchInput.value.toString().toLowerCase();
   filterDebounce(getFilteredArray)
   changeCountryBlockStyle();
});

regionSelect.addEventListener("change", () => {
   filteringFailAlert.style.display = "none";
   getFilteredArray();
   changeCountryBlockStyle();
});

lightModeSwitcher.addEventListener("click", () => {
   if (lightModeSwitcher.textContent == "Light mode") {
      lightModeSwitcher.style.color = "black"
      lightModeSwitcher.innerHTML = "Dark mode"
      document.querySelector(".background").classList.remove('dark');
      document.querySelector(".background").classList.add('light');
   }
   else if (lightModeSwitcher.textContent == "Dark mode") {
      lightModeSwitcher.style.color = "white"
      lightModeSwitcher.innerHTML = "Light mode"
      document.querySelector(".background").classList.remove('light');
      document.querySelector(".background").classList.add('dark');
   }
});