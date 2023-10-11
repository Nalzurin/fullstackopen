import { useState } from "react";

export default function InputForm({ persons, setPersons }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    const object = { name: newName, number: newNumber, id: freeId };
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
    setNewNumber("");
  };

  var freeId = persons.length + 1;

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <>
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
    </>
  );
}
