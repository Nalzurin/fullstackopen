import ListCountry from "./ListCountry";

export default function ListCountries({ countries, countryName }) {
  if (countries === null) {
    console.log("Countries is null");
    return <p>Fetching countries</p>;
  }
  const countriesWithName = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(countryName.toLowerCase());
  });
  console.log("Filtered Countries", countriesWithName);
  if (countriesWithName.length > 10) {
    return <p>Too many possible countries to list</p>;
  }
  console.log("Mapping countries", countriesWithName);
  return countriesWithName.map((country) => {
    return <ListCountry key={country.ccn3} country={country} />;
  });
}
