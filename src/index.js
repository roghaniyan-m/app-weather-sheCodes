let celicus = null;
let weatherForm = document.querySelector("#weather-form");
// let searchByLocation = document.querySelector("#search-by-location");
function changedate() {
  let now = new Date();
  let days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];

  document.querySelector("#date-time").innerHTML = `${days[now.getDay()]
    } ${now.getHours()}:${now.getMinutes()} `;
  document.querySelector("#currentday").innerHTML = `${days[now.getDay()]}`;

}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#display-city").innerHTML = `<strong>${response.data.name},${response.data.sys.country} </strong><br/>${response.data.weather[0].main}`;
  document.querySelector("#current-degree").innerHTML = temperature;
  celicus = response.data.main.temp
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector(".temp-icon").setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#currenttemp").innerHTML = temperature + '°C'
  changedate("");
}

// function findPosition(position) {
//   console.log(position);
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//   axios.get(url).then(showWeather);
// }
function changeCity(event) {
  event.preventDefault()
  let cityname = document.querySelector("#city-name").value
  changedate();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);

}

weatherForm.addEventListener("submit", changeCity);
// searchByLocation.addEventListener("click", function () {
//   navigator.geolocation.getCurrentPosition(findPosition);
// });
let degrees = document.querySelectorAll(".degrees a");

function convertToF(event) {
  event.preventDefault();
  degrees[1].classList.add("light-gray");
  degrees[0].classList.remove("light-gray");
  document.querySelector("#current-degree").innerHTML = Math.round(celicus);
}
function convertToC(event) {
  event.preventDefault();
  degrees[0].classList.add("light-gray");
  degrees[1].classList.remove("light-gray");
  document.querySelector("#current-degree").innerHTML = Math.round(
    (celicus * 9) / 5 + 32
  );
}
degrees[0].addEventListener("click", convertToF);
degrees[1].addEventListener("click", convertToC);

