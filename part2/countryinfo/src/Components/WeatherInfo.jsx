import { useState, useEffect } from "react";
import APICalls from "../Services/APICalls";

export default function WeatherInfo({ lat, lon }) {
  const [weatherInfo, setWeatherInfo] = useState(null);
  if (lat === null || lon === null) {
    return;
  }
  useEffect(() => {
    APICalls.getWeather({ lat, lon }).then((data) => {
      console.log(data);
      setWeatherInfo(data);
      console.log("Weather retrieved", weatherInfo);
    });
  }, []);
  if (weatherInfo === null) {
    return <p>Fetching weather...</p>;
  }

  return (
    <>
      <p>Capital Weather:</p>
      <p>Temperature: {(weatherInfo.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
      />
      <p>{weatherInfo.weather.main}</p>
      <p>Wind Speed: {weatherInfo.wind.speed} m/s</p>
    </>
  );
}
