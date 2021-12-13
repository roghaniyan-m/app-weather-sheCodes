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

  document.querySelector("#date-time").innerHTML = `${
    days[now.getDay()]
  } ${now.getHours()}:${now.getMinutes()} <br/> Haze`;
}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#display-city strong").innerHTML = response.data.name;
  document.querySelector("#current-degree").innerHTML = temperature;
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

  changedate();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
searchBtn.addEventListener("click", changeCity);
searchByLocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(findPosition);
});

// let degrees = document.querySelectorAll(".degrees a");

// function convertToF(event) {
//   event.preventDefault();
//   degrees[1].classList.add("light-gray");
//   degrees[0].classList.remove("light-gray");
//   document.querySelector("#current-degree").innerHTML = celicus;
// }
// function convertToC(event) {
//   event.preventDefault();
//   degrees[0].classList.add("light-gray");
//   degrees[1].classList.remove("light-gray");
//   document.querySelector("#current-degree").innerHTML = Math.round(
//     celicus * 9.5
//   );
// }
// degrees[0].addEventListener("click", convertToF);
// degrees[1].addEventListener("click", convertToC);
// let btn1 = document.querySelector("#button-1");
// let btn2 = document.querySelector("#button-2");
// let btn3 = document.querySelector("#button-3");
// function changeImg1() {
//   let img = document.querySelector("img");
//   img.src = "images/image.png";
//   btn1.classList.add("active");
//   btn2.classList.remove("active");
//   btn3.classList.remove("active");
// }
// btn1.addEventListener("click", changeImg1);

// function changeImg2() {
//   let img = document.querySelector("img");
//   img.src = "images/image2.png";
//   btn1.classList.remove("active");
//   btn2.classList.add("active");
//   btn3.classList.remove("active");
// }
// btn2.addEventListener("click", changeImg2);

// function changeImg3() {
//   let img = document.querySelector("img");
//   img.src = "images/image3.png";
//   btn1.classList.remove("active");
//   btn2.classList.remove("active");
//   btn3.classList.add("active");
// }
// btn3.addEventListener("click", changeImg3);
