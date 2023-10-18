import ListLanguages from "./ListLanguages";
import WeatherInfo from "./WeatherInfo";

export default function CountryInfo({ showInfo, country }) {
  console.log("Listing Country", country);
  if (showInfo) {
    return (
      <>
        <p>Flag and Coat of Arms</p>
        <img src={country.flags.png} />
        <img
          style={{
            display: "inline",
            maxWidth: 220,
            maxHeight: 220,
            paddingLeft: 50,
          }}
          src={country.coatOfArms.png}
          alt={country.coatOfArms.alt}
        />
        <p>
          Native Name:
          {Object.values(country.name.nativeName)[0].official}
        </p>
        <p>Languages:</p>
        <ul>
          <ListLanguages country={country} />
        </ul>
        <p>Capital: {country.capital[0]}</p>
        <p>Continent: {country.region}</p>
        {Object.keys(country.capitalInfo).length === 0 &&
        country.capitalInfo.constructor === Object ? null : (
          <WeatherInfo
            lat={country.capitalInfo.latlng[0]}
            lon={country.capitalInfo.latlng[1]}
          />
        )}
      </>
    );
  } else {
    return;
  }
}
