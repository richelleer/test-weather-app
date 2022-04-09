// function scripts

function titleCase(input) {
  input = input.toLowerCase().split(" ");
  for (let index = 0; index < input.length; index++) {
    input[index] = input[index].charAt(0).toUpperCase() + input[index].slice(1);
  }
  return input.join(" ");
}

function updateCurrentDayDateTime() {
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
  let current = new Date();
  let currentDay = days[current.getDay()];
  let currentDate = current.getDate();
  let currentMonth = months[current.getMonth()];
  let currentHour = current.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = current.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let currentDayDateTime = document.querySelector("#currentDayDateTime");
  currentDayDateTime.innerHTML = `${currentDay} | ${currentDate} ${currentMonth} | ${currentHour}:${currentMinute}`;
}

function updateWeather(response) {
  document.querySelector("#select-city").innerHTML = titleCase(
    response.data.name
  );
  document.querySelector("#select-description").innerHTML = titleCase(
    response.data.weather[0].description
  );
  document.querySelector("#select-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#select-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#select-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function updateLocation(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  if (city.value !== "") {
    axios.get(apiUrl).then(updateWeather);
    document.querySelector("#search-city").value = "";
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value.trim().toLowerCase();
  updateLocation(city);
}

function updateCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleCurrentLocation() {
  navigator.geolocation.getCurrentPosition(updateCurrentPosition);
}

// main script

let apiKey = "d54be85d6f78a8c7bcebd460f6de3fe5";
let units = "metric";

updateCurrentDayDateTime();
updateLocation("Singapore");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let buttonCurrentLocation = document.querySelector("#current-location-button");
buttonCurrentLocation.addEventListener("click", handleCurrentLocation);
