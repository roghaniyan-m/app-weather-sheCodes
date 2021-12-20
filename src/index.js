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


}
function formatDate(time) {
  let date = new Date(time * 1000);
  let days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];
  let day = date.getDay();

  return days[day]
}
function showForcast(response) {

  var htmlDailyForcast = ``;
  response.data.daily.forEach(function (items, index) {
    if (index < 7) {
      htmlDailyForcast = htmlDailyForcast + `
    <li>
    <div  class="day">${formatDate(items.dt)}</div><img src="http://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png" class="temp-icon" /><div class="currenttemp"><span class="stronger-color">${Math.round(items.temp.min)} ° </span><span>${Math.round(items.temp.max)} ° </span></div>
  </li>
  `}
  })
  document.querySelector('#daily-forcast').innerHTML = htmlDailyForcast

}
function getForcastTempreture(forcastCoords) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${forcastCoords.lat}&lon=${forcastCoords.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForcast)



}

function showWeather(response) {
  getForcastTempreture(response.data.coord)
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#display-city").innerHTML = `<strong>${response.data.name},${response.data.sys.country} </strong>`;
  document.querySelector(".haze").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-degree").innerHTML = temperature;
  celicus = response.data.main.temp
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

  changedate("");
}

function changeCity(event) {
  event.preventDefault()
  let cityname = document.querySelector("#city-name").value
  changedate();
  if (cityname) {
    document.querySelector('#city-name').classList.remove('red-border')
    callApi(cityname)
  }
  else {
    document.querySelector('#city-name').classList.add('red-border')
  }
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