// key a1717982c4b820f213e33192282d24a1
const weatherConteiner = document.querySelector(".weather-conteiner");
const countryEntryField = document.querySelector("#location-form");
const showCurrentSearch = document.querySelector(".search-show");

const showTodayWeather = (cityInfo, filteredItemData, n) => {
   console.log(cityInfo, filteredItemData)
   return `
   <div class="current-day-weather-block">
      <div class="temperature-segment">
         <h2 class="real-temperature">${Math.round(filteredItemData[n].main.temp) + '&degC'}<br><span class="feels-like-temperature">${"Feels like " + Math.round([filteredItemData[n].main.feels_like]) + '&degC'}</span></h2>
      </div>
      <div class="location-segment">
         <h2 class="current-day-sky">${filteredItemData[n].weather[n].description}<br>${cityInfo.name + ", " + cityInfo.country}</h2>
      </div>
      <div class="image-segment">
      <img src="http://openweathermap.org/img/wn/${filteredItemData[n].weather[n]['icon']}@2x.png" class="current-day-image">
      </div>
   </div>
   `
};

const showFollowDayWeather = (filteredItemData) => {
   return `
   <div class="follow-days-weather-block">
         <div class="follow-day-name-segment">
            <h2 class="day-name">${new Date(filteredItemData.dt_txt).toLocaleString('en-us', { weekday: 'short' })}</h2>
         </div>
         <div class="follow-day-image-segment"><img src="http://openweathermap.org/img/wn/${filteredItemData.weather[0]['icon']}@2x.png" class="follow-day-image"></div>
         <div class="follow-day-sky-segment">
            <h2 class="follow-day-sky">${filteredItemData.weather[0].description}</h2>
         </div>
         <div class="follow-day-temperature-range-segment">
            <h2 class="temperature-range">${Math.round(filteredItemData.main.temp_max) + '&degC'}<br>${Math.round(filteredItemData.main.temp_min) + '&degC'}</h2>
         </div>
      </div>
   `
};

let weatherData = ''

const renderWeater = (weatherData) => {
   console.log(weatherData)
   filteredData = weatherData.list.filter((_, i) => i % 8 - 7 == 0);

   weatherConteiner.innerHTML = "";
   weatherConteiner.innerHTML += showTodayWeather(weatherData.city, filteredData, 0);

   filteredData.forEach(weatheItem => {
      weatherConteiner.innerHTML += showFollowDayWeather(weatheItem);
   })
}

const fetchWeatherData = async (country) => {
   const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${country}&units=metric&appid=a1717982c4b820f213e33192282d24a1`)
   weatherData = await response.json();
   renderWeater(weatherData);
}

fetchWeatherData('Kiev');


countryEntryField.addEventListener("change", (event) => {
   changedCountryEntryFieldValue = event.target.value;
   showCurrentSearch.textContent = `selected: ${changedCountryEntryFieldValue}`;
   fetchWeatherData(changedCountryEntryFieldValue);
});