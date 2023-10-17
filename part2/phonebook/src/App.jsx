import { useState, useEffect } from "react";
import Requests from "./Services/Requests"
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
    Requests.getBook().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <InputForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Phonebook persons={personsToShow} personsAll={persons} setPersons={setPersons}/>
    </div>
  );
}

export default App;
