import { useState, useEffect } from "react";
import CountryInput from "./Components/CountryInput";
import APICalls from "./Services/APICalls";
import ListCountries from "./Components/ListCountries";

function App() {
  const [countries, setCountries] = useState(null);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    APICalls.getCountries().then((data) => {
      setCountries(data);
      console.log("Data retrieved");
    });
  }, []);

  return (
    <>
      <h1>Country Information:</h1>
      <CountryInput countryName={countryName} setCountryName={setCountryName} />
      <ListCountries countries={countries} countryName={countryName} />
    </>
  );
}

export default App;
