let now = new Date();

let currentTime = document.querySelector("#current-time");
let date = now.getDate();
let hours = now.getHours() % 12;
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

let locationInput = document.querySelector("#location-input");
let form = document.querySelector("form");
let h1 = document.querySelector("h1");
let currentLocationButton = document.querySelector("#current-location-button");

function displayWeather(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let weatherDescription = document.querySelector("#weather-desc");
  currentTemp.innerHTML = `${cityTemp} &#8457; `;
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function displayCurrentLocationWeather(response) {
  console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let weatherDescription = document.querySelector("#weather-desc");
  h1.innerHTML = response.data.name;
  currentTemp.innerHTML = `${cityTemp} &#8457; `;
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function searchLocation() {
  event.preventDefault();
  let apiKey = "2ee8b17e3f4ed047319249a4840b266e";
  let city = locationInput.value;
  let units = "imperial";
  let url = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${url}q=${city}&units=${units}&appid=${apiKey}`;
  h1.innerHTML = locationInput.value;
  axios.get(apiURL).then(displayWeather);
}

function searchCurrentLocation(location) {
  navigator.geolocation.getCurrentPosition(function (location) {
    let apiKey = "2ee8b17e3f4ed047319249a4840b266e";
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let units = "imperial";
    let url = "https://api.openweathermap.org/data/2.5/weather?";
    let apiURLCurrent = `${url}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiURLCurrent).then(displayCurrentLocationWeather);
  });
}

form.addEventListener("submit", searchLocation);
currentLocationButton.addEventListener("click", searchCurrentLocation);
