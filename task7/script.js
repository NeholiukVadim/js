const countriesConteiner = document.querySelector(".country-list")
const regionSelect = document.querySelector(".region-list")
const searchInput = document.querySelector(".search")
const lightModeSwitcher = document.querySelector(".light-mode")
const filteringFailAlert = document.querySelector(".filter-fail-alert-block")
const preloader = document.querySelector(".preloader-layer")

let fetchedData = "";

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

const filterByRegion = () => {
   filteredCountryRegionData = countryDataList.filter((countryDataList) => {
      return countryDataList.region == regionSelect.value;
   });
}

const getRegionFilteredArray = () => {
   if (regionSelect.value == "All") {
      renderCountryData(countryDataList);
   }
   else {
      filterByRegion()
      countryDataList = filteredCountryRegionData;
      renderCountryData(countryDataList);
   };
};

const filterByName = () => {
   filteredCountryNameData = countryDataList.filter((countryDataList) => {
      return countryDataList.name.common.toString().toLowerCase().includes(searchInputResult);
   });
}

const showAlert = () => {
   countriesConteiner.innerHTML = ""
   filteringFailAlert.textContent = "No matches found";
   filteringFailAlert.style.display = "block";
}

const getNameFilteredArray = () => {
   if (searchInput.value === "") {
      getRegionFilteredArray()
   }
   else {
      filterByName()
      if (filteredCountryNameData.length == 0) {
         showAlert()
      }
      else {
         renderCountryData(filteredCountryNameData);
         filteringFailAlert.style.display = "none";
      }
   }
};

const hidePreloader = () => {
   preloader.style.display = "none"
}

const fetchCountryData = async () => {
   const response = await fetch('https://restcountries.com/v3.1/all')
   fetchedData = await response.json();
   countryDataList = fetchedData.slice(0, 20);
   loadCountryData = await renderCountryData(countryDataList);
   hidePreloaderScreen = await hidePreloader()
};

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

regionSelect.addEventListener("change", () => {
   filteringFailAlert.style.display = "none";
   countryDataList = fetchedData.slice(0, 20);
   getRegionFilteredArray();
   changeCountryBlockStyle();
});

searchInput.addEventListener("input", () => {
   filteringFailAlert.style.display = "none";
   searchInputResult = searchInput.value.toString().toLowerCase();
   getNameFilteredArray();
   changeCountryBlockStyle();
});

lightModeSwitcher.addEventListener("click", () => {
   if (lightModeSwitcher.textContent == "Light mode") {
      lightModeSwitcher.style.color = "black"
      lightModeSwitcher.innerHTML = "Dark mode"
      document.querySelector(".search").style.background = "white";
      document.querySelector(".region-list").style.background = "white";
      document.querySelector(".header").style.background = "white";
      document.querySelector(".header-article").style.color = "black";
      document.querySelector(".region-list").style.color = "black";
      document.querySelector(".search").style.color = "black";
      document.querySelector(".background").style.background = "#f1f1f1"
      changeCountryBlockStyle()
   }
   else if (lightModeSwitcher.textContent == "Dark mode") {
      lightModeSwitcher.style.color = "white"
      lightModeSwitcher.innerHTML = "Light mode"
      document.querySelector(".search").style.background = "#5f6063";
      document.querySelector(".region-list").style.background = "#5f6063";
      document.querySelector(".header").style.background = "#5f6063";
      document.querySelector(".header-article").style.color = "white";
      document.querySelector(".region-list").style.color = "white";
      document.querySelector(".search").style.color = "white";
      document.querySelector(".background").style.background = "#242530"
      changeCountryBlockStyle()
   }
});

fetchCountryData();