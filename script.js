let now = new Date();

let currentTime = document.querySelector("#current-time");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${month} ${date}, ${year} ${hours}:${minutes}`;

// WEATHER INFO

let url = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "2ee8b17e3f4ed047319249a4840b266e";
let imperial = "imperial";
let locationInput = document.querySelector("#location-input");
let form = document.querySelector("form");
let h1 = document.querySelector("h1");
let currentLocationButton = document.querySelector("#current-location-button");
let currentTemp = document.querySelector("#current-temp");
let weatherDescription = document.querySelector("#weather-desc");
let weatherIcon = document.querySelector("#weather-icon");
let windSpeed = document.querySelector("#wind-speed");
let fahrenheitTemperature;
let listedTemperature = document.querySelector("#current-temp");
let precipitation = document.querySelector("#precipitation");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row main">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let dailyWeather = Math.round(forecastDay.temp.day);
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="card">
          <div class="card-body">
            <p>
              <img id="first-card-icon" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="weather-icon" />
            </p>
            <p class="card-text">
              <span id="first-card-weather">${dailyWeather}</span> °F
            </p>
            <h5 class="card-day">${formatDay(forecastDay.dt)} </h5>
          </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiForecastURL = `${forecastURL}lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&units=${imperial}&appid=${apiKey}`;
  axios.get(apiForecastURL).then(displayForecast);
}

function displayWeather(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let weatherIconId = response.data.weather[0].icon;
  currentTemp.innerHTML = `${cityTemp} °F`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemperature = cityTemp;
  getForecast(response.data.coord);
}

function searchLocation(event) {
  event.preventDefault();
  let city = locationInput.value;
  let apiURL = `${url}q=${city}&units=${imperial}&appid=${apiKey}`;
  h1.innerHTML = locationInput.value.toUpperCase();
  axios.get(apiURL).then(displayWeather);
}

function displayCurrentLocationWeather(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let weatherIconId = response.data.weather[0].icon;
  h1.innerHTML = response.data.name.toUpperCase();
  currentTemp.innerHTML = `${cityTemp} °F`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
  fahrenheitTemperature = cityTemp;
}

function searchCurrentLocation(location) {
  navigator.geolocation.getCurrentPosition(function (location) {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let imperial = "imperial";
    let url = "https://api.openweathermap.org/data/2.5/weather?";
    let apiURLCurrent = `${url}lat=${lat}&lon=${lon}&units=${imperial}&appid=${apiKey}`;
    axios.get(apiURLCurrent).then(displayCurrentLocationWeather);
  });
}

function displayLocationOnPageLoad() {
  let city = "falls Church";
  let apiURL = `${url}q=${city}&units=${imperial}&appid=${apiKey}`;
  h1.innerHTML = city.toUpperCase();
  axios.get(apiURL).then(displayWeather);
}

displayLocationOnPageLoad();

form.addEventListener("submit", searchLocation);
currentLocationButton.addEventListener("click", searchCurrentLocation);

// Display forecast info
