const weather_Icon = document.querySelector(".img-weather-icon");
const temp = document.querySelector(".temp");
const current_location = document.querySelector(".current-location");
const current_situation = document.querySelector(".current-situation");
const input = document.querySelector("#search-input");
const btn = document.querySelector("button");

class Weather {
  constructor(city, region, country, time, icon, text, tempFahr, tempCelsus) {
    this.city = city;
    this.region = region;
    this.country = country;
    this.tempFahr = tempFahr;
    this.tempCelsus = tempCelsus;
    this.text = text;
    this.icon = icon;
  }
}

async function weatherCall(
  url = "https://api.weatherapi.com/v1/current.json?key=677a09d6247d420c998192548240204&q=algeria&aqi=no"
) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    const location = data.location;
    const current = data.current;

    const weatherResult = new Weather(
      location.name,
      location.region,
      location.country,
      location.region,
      current.condition.icon,
      current.condition.text,
      current.temp_f,
      current.temp_c
    );
    weather_Icon.src = weatherResult.icon;
    temp.textContent = `current temperature : ${weatherResult.tempCelsus} °C / ${weatherResult.tempFahr} °F`;
    current_location.textContent = `current location : ${weatherResult.city}, ${weatherResult.country}`;
    current_situation.textContent = `currently : ${weatherResult.text}`;
  } catch (e) {
    console.log(e);
  }
}
weatherCall();

function handleSearch(input) {
  const url = `https://api.weatherapi.com/v1/current.json?key=677a09d6247d420c998192548240204&q=${input}&aqi=no`;
  weatherCall(url);
}

btn.addEventListener("click", () => {
  const location = input.value;
  handleSearch(location);
  input.value = "";
});
