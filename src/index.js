let celicus = null;
let weatherForm = document.querySelector("#weather-form");
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
function getForcastTempreture(forcastCoords) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}`

}
function showWeather(response) {
  gtForcastTempreture(response.data.coord)
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#display-city").innerHTML = `<strong>${response.data.name},${response.data.sys.country} </strong>`;
  document.querySelector(".haze").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-degree").innerHTML = temperature;
  celicus = response.data.main.temp
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector(".temp-icon").setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#currenttemp").innerHTML = temperature + '°C'
  changedate("");
}

function changeCity(event) {
  event.preventDefault()
  let cityname = document.querySelector("#city-name").value
  changedate();
  callApi(cityname)
}
function callApi(cityname) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
weatherForm.addEventListener("submit", changeCity);

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

callApi('Tehran');