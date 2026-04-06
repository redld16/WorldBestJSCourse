let inp = document.querySelector("#inp");
let inpBtn = document.querySelector(".btnSearch");
let cityName = document.querySelector(".cityName");
let dateTime = document.querySelector(".date");
let live = document.querySelector(".live");
let w_icon = document.querySelector(".icon");
let w_temperature = document.querySelector(".temperature");
let w_minTem = document.querySelector(".minTemp");
let w_maxTem = document.querySelector(".maxTemp");
let w_feelsLike = document.querySelector(".feelsLike");
let w_humidity = document.querySelector(".humidity");
let w_wind = document.querySelector(".wind");
let w_pressure = document.querySelector(".pressure");
let form = document.querySelector(".formDiv");
let details = document.querySelector(".details");
// let zipcode = document.querySelector("#zipCode");

const getWeatherData = async (city="pune") => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=809a8e28b17ffc3a86266af41c60f03c`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    if(data.cod === 200){
        showData(data);
    }else{
        alert("City not found")
    }
  } catch (error) {
    console.log("error", error);
    alert("Failed to fetch weather data");
  }
};

//convert kelvin to celcius
const kToC = (temp) => {
  return Math.floor(temp - 273.15);
};

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  return formatter.format(curDate);
};

const showData = (data) => {
  const { main, name, weather, wind, sys, dt } = data;
  console.log(name, weather)

  let temp = kToC(main.temp);
  let temp_min = kToC(main.temp_min);
  let temp_max = kToC(main.temp_max);
  let feels_like = kToC(main.feels_like);

  cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
  dateTime.innerHTML = getDateTime(dt);

  live.innerHTML = weather[0].main;
  w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

  w_temperature.innerHTML = `T ${temp}&#176`;
  w_minTem.innerHTML = `Min: ${temp_min.toFixed()}&#176`;
  w_maxTem.innerHTML = `Max: ${temp_max.toFixed()}&#176`;

  w_feelsLike.innerHTML = `${feels_like.toFixed(2)}&#176`;
  w_humidity.innerHTML = `${main.humidity}%`;
  w_wind.innerHTML = `${wind.speed} m/s`;
  w_pressure.innerHTML = `${main.pressure} hPa`;
};

window.addEventListener("load",() => getWeatherData());


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = inp.value.trim();

  if(city){
    getWeatherData(city);
    inp.value = "";
}
});
