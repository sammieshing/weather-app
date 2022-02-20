let now = new Date();

function pad(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}

let minutes = pad(now.getMinutes());
let hours = pad(now.getHours());
let year = now.getFullYear();
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

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
  "December"
];

let month = months[now.getMonth()];

let displayDate = document.querySelector("#display-time");
displayDate.innerHTML = `${day}, ${date} ${month} ${year} ${hours}:${minutes}`;

//api display temperature

// function showTemperature(response) {
//   console.log(response);
//   let temperature = Math.round(response.data.main.temp);
//   let displayTemp = document.querySelector("#temperature");
//   displayTemp.innerHTML = `${temperature}°C`;
// }

// city change

function showCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#change-city");
  changeCity.innerHTML = form.input.value;

  let apiKey = "9acc1ba10c354b22cdd73fddfa649e54";
  let unit = "metric";
  let city = form.input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showNewTemperature);
}

// function weatherAppWorks(event) {
//   showCity(event);
//   showTemperature(event);
// }

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

//current location API

function showCurentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9acc1ba10c354b22cdd73fddfa649e54";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showNewTemperature);
}

function showNewTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}°C`;
  document.querySelector("#change-city").innerHTML = response.data.name;
  document.querySelector ("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
}

navigator.geolocation.getCurrentPosition(showCurentPosition);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showNewTemperature);