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
  let currentYear = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay}, ${currentMonth} ${currentDate} | ${hour}:${minutes}`;
}

// City Search Bar

function showCityWeather(response) {
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let showCurrentTemp = document.querySelector("#temp-high");
  let highLowTemp = document.querySelector("#temp-high-low");
  let showCity = document.querySelector("#current-city");
  let currentDateTime = document.querySelector("#current-date");
  showCity.innerHTML = `${cityName}`;
  currentDateTime.innerHTML = formatDate(response.data.dt * 1000);
  showCurrentTemp.innerHTML = `${currentTemp} °F`;
  highLowTemp.innerHTML = `${highTemp}° / ${lowTemp}°`;
  console.log(response.data);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  let apiKey = "1e684f713ecf64c09805b72e982eb3d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityWeather);
}

let citySearch = document.querySelector("#city-search-bar");
citySearch.addEventListener("submit", search);

// Geolocation button
function showWeather(response) {
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let showCurrentTemp = document.querySelector("#temp-high");
  let highLowTemp = document.querySelector("#temp-high-low");
  let showCity = document.querySelector("#current-city");
  showCity.innerHTML = `${cityName}`;
  showCurrentTemp.innerHTML = `${currentTemp} °F`;
  highLowTemp.innerHTML = `${highTemp}° / ${lowTemp}°`;
  console.log(response.data);
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

function degreesC(event) {
  event.preventDefault();
  let displayHighTemp = document.querySelector("#temp-high");
  let displayLowTemp = document.querySelector("#temp-low");

  if (checkBox.checked) {
    displayHighTemp.innerHTML = `20 °C`;
    displayLowTemp.innerHTML = `5 °C`;
  } else {
    displayHighTemp.innerHTML = `68 °F`;
    displayLowTemp.innerHTML = `41 °F`;
  }
}

let checkBox = document.querySelector("#checkbox");
checkBox.addEventListener("change", degreesC);
