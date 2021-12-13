// let celicus = document.querySelector("#current-degree").innerHTML.trim();
let searchBtn = document.querySelector("#search-btn");
let searchByLocation = document.querySelector("#search-by-location");
function changedate() {
  let now = new Date();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  document.querySelector("#date-time").innerHTML = `${days[now.getDay()]
    } ${now.getHours()}:${now.getMinutes()} <br/> Haze`;
}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#display-city strong").innerHTML = response.data.name;
  document.querySelector("#current-degree").innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  changedate("");
}

function findPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function changeCity() {
  let cityname = document.querySelector("#city-name").value;
  if (cityname) {
    changedate();
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
}
searchBtn.addEventListener("click", changeCity);
searchByLocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(findPosition);
});

let ii =
{
  "coord": { "lon": 52.5388, "lat": 29.6036 },
  "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }],
  "base": "stations",
  "main": { "temp": 16.69, "feels_like": 14.75, "temp_min": 16.69, "temp_max": 16.69, "pressure": 1024, "humidity": 13 },
  "visibility": 10000, "wind": { "speed": 0, "deg": 0 }, "clouds": { "all": 0 }, "dt": 1639389325, "sys": { "type": 1, "id": 7500, "country": "IR", "sunrise": 1639365364, "sunset": 1639402328 }, "timezone": 12600, "id": 115019, "name": "Shiraz", "cod": 200
}
