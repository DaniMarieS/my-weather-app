// Date & Time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay} ${hour}:${minutes}`;
}

// City Search Bar

function showCityWeather(response) {
  let cityName = response.data.name;
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let showCurrentTemp = document.querySelector("#temp-high");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  let highLowTemp = document.querySelector("#temp-high-low");
  let showCity = document.querySelector("#current-city");
  let currentDateTime = document.querySelector("#current-date");
  let weatherIcon = document.querySelector("#weather-icon");
  showCity.innerHTML = `${cityName}`;
  currentDateTime.innerHTML = formatDate(response.data.dt * 1000);
  fahrenheitTemperature = response.data.main.temp;
  showCurrentTemp.innerHTML = Math.round(fahrenheitTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${currentWindSpeed} mph`;
  highLowTemp.innerHTML = `H: ${highTemp}° L: ${lowTemp}°`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}
function search(city) {
  let apiKey = "1e684f713ecf64c09805b72e982eb3d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-input");
  search(cityInput.value);
}

let citySearch = document.querySelector("#city-search-bar");
citySearch.addEventListener("submit", handleSubmit);

// Geolocation button
function showWeather(response) {
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let showCurrentTemp = document.querySelector("#temp-high");
  let highLowTemp = document.querySelector("#temp-high-low");
  let showCity = document.querySelector("#current-city");
  let currentDateTime = document.querySelector("#current-date");
  let weatherIcon = document.querySelector("#weather-icon");
  currentDateTime.innerHTML = formatDate(response.data.dt * 1000);
  showCity.innerHTML = `${cityName}`;
  showCurrentTemp.innerHTML = `${currentTemp}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${currentWindSpeed} mph`;
  highLowTemp.innerHTML = `H: ${highTemp}°  L: ${lowTemp}°`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}

function retrievePosition(position) {
  let apiKey = "1e684f713ecf64c09805b72e982eb3d9";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", findCurrentLocation);
// °F/C change

function displayCelciusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let showCurrentTemp = document.querySelector("#temp-high");
  showCurrentTemp.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let showCurrentTemp = document.querySelector("#temp-high");
  showCurrentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// weekly forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "forecast";
}

search("Denver");
displayForecast();
