function formatDate(timestamp) {
  let date = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];

  let day = date.getDate();

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
  let month = months[date.getMonth()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDay}, ${day}/${month}, ${hours}:${minutes}`;
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = celsiusTemperature;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  let iconId = response.data.condition.icon;

  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconId}.png`
  );

  iconElement.setAttribute("alt", `${description}`);

  getForecast(response.data.coordinates);
}

function search(cityName) {
  let apiKey = "ec0bbcffe35aa844b4bao9b2t41866d0";
  let apiEndPoint = "https://api.shecodes.io/weather/v1/current?";
  let units = "metric";
  let apiUrl = `${apiEndPoint}query=${cityName}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
  if (cityElement.value == "") {
    alert("Please enter a city name");
  }
}

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let farenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = farenheitTemp;
  farenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = celsiusTemperature;
  celsiusElement.classList.add("active");
  farenheitElement.classList.remove("active");
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = `<div class="row">`;

  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img src=${
        forecastDay.condition.icon_url
      } alt="" class="icons" id="icons" />
      <div class="weather-forecast-temperature">
      <span class="weather-forecast-min"> 
      ${Math.round(forecastDay.temperature.minimum)} - </span>
        <span class="weather-forecast-max"> 
        ${Math.round(forecastDay.temperature.maximum)}ºC </span>
          </div>
          </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;

  let apiEndPoint = "https://api.shecodes.io/weather/v1/forecast?";
  let apiKey = "ec0bbcffe35aa844b4bao9b2t41866d0";
  let units = "metric";
  let apiUrl = `${apiEndPoint}lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

//global variables//
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitElement = document.querySelector("#farenheit");
farenheitElement.addEventListener("click", convertToFarenheit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", convertToCelsius);

//function calling
search("Lisbon");
