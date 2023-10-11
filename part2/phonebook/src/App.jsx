import { useState } from "react";

function Number({ name, number }) {
  return <li>{name} {number}</li>;
}

function PhoneBook({ persons }) {
  console.log(persons);
  return persons.map((person) => {
    console.log("Logging person:", person);
    return <Number key={person.id} name={person.name} number={person.number} />;
  });
}

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  var freeId = persons.length+1;

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addNewPerson = (event) => {
    event.preventDefault();
    const object = { name: newName, number: newNumber, id: freeId};
    const arrayCheck = persons.some(({ name }) => name === object.name);
    console.log(`Phonebook contains the person ${arrayCheck}`);
    if (arrayCheck) {
      console.log(`Person not added`);
      alert(`${object.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(object));
      console.log(`Person added`);
      freeId++;
    }
    setNewName("");
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
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  );
}

export default App;
