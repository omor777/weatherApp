const weatherIcons = {
  Clouds: "../images/clouds.png",
  Clear: "../images/clear.png",
  Drizzle: "../images/drizzle.png",
  Rain: "../images/rain.png",
  Snow: "../images/snow.png",
  Mist: "../images/mist.png",
  Haze: "../images/haze.png",
};

window.onload = () => {
  main();
};

function main() {
  const input = document.getElementById("search");
  const searchButton = document.getElementById("btn");
  const weatherIcon = document.getElementById("weather-icon");
  const temperature = document.getElementById("temperature");
  const city = document.getElementById("city");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const appBody = document.getElementById("app-body");

  async function updateWeather(e) {
    try {
      e.preventDefault();
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=6c2761d73e904e5f39a75e610d0153e9&units=metric`;
      const response = await fetch(api);
      const data = await response.json();

      if (response.ok) {
        appBody.classList.remove("h-0");
      } else {
        appBody.classList.add("h-0");
      }
      // update weather information
      updateWeatherInformation(
        data,
        temperature,
        city,
        windSpeed,
        humidity,
        weatherIcon,
      );
      input.value = "";
    } catch (e) {
      console.log(e);
    }
  }

  searchButton.addEventListener("click", updateWeather);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateWeather(e);
    }
  });
}

/**
 *
 * @param {Object} data
 */

function updateWeatherInformation(
  data,
  temperature,
  city,
  windSpeed,
  humidity,
  weatherIcon,
) {
  const weather = data.weather[0].main;
  temperature.textContent = `${data.main.temp.toFixed()}`;
  city.textContent = data.name;
  windSpeed.textContent = `${data.wind.speed}km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  weatherIcon.src = weatherIcons[weather];
}
