function displayTemperature(response) {
  console.log(response.data);
}
let apiKey = "8036c849d00de892979a86e56e32649b";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
let cityName = "London";
let units = "metric";
let apiUrl = `${apiEndPoint}q=${cityName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
