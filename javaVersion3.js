let now = new Date();
let currentDay = document.querySelector("#current-day");
let currentDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let DayToday = currentDays[now.getDay()];
currentDay.innerHTML = DayToday;
let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = now.getHours();
let currentMinutes = document.querySelector("#current-minutes");
currentMinutes.innerHTML = now.getMinutes();
let currentYear = document.querySelector("#current-year");
currentYear.innerHTML = now.getFullYear();
let currentMonth = document.querySelector("#current-month");
let currentMonths = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let monthToday = currentMonths[now.getMonth()];
currentMonth.innerHTML = monthToday;
let CurrentDate = document.querySelector("#current-date");
CurrentDate.innerHTML = now.getDate();

let chooseCity = document.querySelector("#choose-city");
chooseCity.addEventListener("submit", LetsGo);
function LetsGo(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#chosen-city");
  let cityInput = document.querySelector("#city-input");
  chosenCity.innerHTML = cityInput.value;

  let apiKey = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
  let unit = "metric";
  let currentTemp = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=${unit}`;
  axios.get(currentTemp).then(displayTemperature);

  function displayTemperature(response) {
    let currentT = Math.round(response.data.main.temp);
    let changingDegree = document.querySelector("#changing-degree");
    changingDegree.innerHTML = currentT;

    let weatherCondition = document.querySelector("#condition");
    weatherCondition.innerHTML = response.data.weather[0].main;
  }
}

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", getLocation);
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey2 = "1fa04c70c5487af6b7c48dd7dfcb0b3f";
    let unit2 = "metric";
    let myTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey2}&&units=${unit2}`;
    axios.get(myTemp).then(displayMyTemperature);
    function displayMyTemperature(response) {
      let myCurrentT = Math.round(response.data.main.temp);
      let myChangingDegree = document.querySelector("#changing-degree");
      myChangingDegree.innerHTML = myCurrentT;
      let myWeatherCondition = document.querySelector("#condition");
      myWeatherCondition.innerHTML = response.data.weather[0].main;
      let myCity = document.querySelector("#chosen-city");
      myCity.innerHTML = response.data.name;
    }
  }
}
