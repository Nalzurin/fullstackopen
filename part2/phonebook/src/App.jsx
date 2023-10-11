import { useState } from "react";
import Phonebook from "./Components/Phonebook";
import InputForm from "./Components/InputForm";
import Filter from "./Components/Filter";
function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterName, setFilterName] = useState("");
  const personsToShow = persons.filter((person) => {
    if (!filterName == "") {
      console.log(person.name.toLowerCase().includes(filterName.toLowerCase()));
      return person.name.toLowerCase().includes(filterName.toLowerCase());
    } else return true;
  });


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
