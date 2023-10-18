import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_API;
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/";
const getCountries = () => {
  const request = axios.get(`${baseURL}all`);
  return request
    .then((response) => response.data)
    .catch((response) => alert(response.message));
};
const getCountry = (country) => {
  const request = axios.get(`${baseURL}name/${country}`);
  return request.then((response) => response.data);
};
const getWeather = ({ lat, lon }) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
  );
  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

export default { getCountries, getCountry, getWeather };
