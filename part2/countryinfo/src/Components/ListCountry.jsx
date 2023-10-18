import { useState } from "react";
import CountryInfo from "./CountryInfo";

export default function ListCountry({ country }) {
  const [showInfo, setShowInfo] = useState(false);
  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  return (
    <div style={{margin:10}}>
      <h3 style={{display: "inline", paddingRight: 10}}>{country.name.common}</h3>
      <button onClick={handleInfoClick}>Show Info</button>
      <CountryInfo showInfo={showInfo} country={country} />

    </div>
  );
}
