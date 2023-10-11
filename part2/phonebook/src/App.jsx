import { useState } from "react";

function Number({ name }) {
  return <li>{name}</li>;
}

function PhoneBook({ persons }) {
  return persons.map((person) => {
    console.log("Logging person:", person);
    return <Number key={person.name} name={person.name} />;
  });
}

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const addNewPerson = (event) =>{
    event.preventDefault();
    const object = {name: newName}; 
    setPersons(persons.concat(object))
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Debug: {newName}</p>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  );
}

export default App;
