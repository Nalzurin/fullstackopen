import { useState, useEffect } from "react";
import axios from "axios";
import Phonebook from "./Components/Phonebook";
import InputForm from "./Components/InputForm";
import Filter from "./Components/Filter";
function App() {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const personsToShow = persons.filter((person) => {
    if (!filterName == "") {
      console.log(person.name.toLowerCase().includes(filterName.toLowerCase()));
      return person.name.toLowerCase().includes(filterName.toLowerCase());
    } else return true;
  });
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <InputForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Phonebook persons={personsToShow} />
    </div>
  );
}

export default App;
