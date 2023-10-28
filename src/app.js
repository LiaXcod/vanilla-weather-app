function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "8036c849d00de892979a86e56e32649b";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
let cityName = "London";
let units = "metric";
let apiUrl = `${apiEndPoint}q=${cityName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
