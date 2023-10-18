export default function CountryInput({ country, setCountryName }) {
  const handleInputChange = (e) => {
    setCountryName(e.target.value);
    console.log("New Country: ", e.target.value);
  };
  return (
    <>
      <p>Input country:</p>
      <input value={country} onChange={handleInputChange} />
    </>
  );
}
