export default function Filter({ filterName, setFilterName }) {
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <>
      <div>
        Filter: <input value={filterName} onInput={handleFilterNameChange} />
      </div>
    </>
  );
}
