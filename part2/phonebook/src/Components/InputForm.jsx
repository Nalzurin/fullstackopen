import { useState } from "react";
import Requests from "../Services/Requests";

export default function InputForm({ persons, setPersons }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    const object = { name: newName, number: newNumber };
    const arrayCheck = persons.find(({ name }) => name === object.name);
    console.log(`Phonebook contains the person ${arrayCheck}`);
    if (arrayCheck !== undefined) {
      if (
        window.confirm(
          `${object.name} already exists in phonebook, do you want to overwrite the number?`
        )
      ) {
        console.log(`Overwriting ${object.name}...`);
        object.id = arrayCheck.id;
        Requests.editNum(arrayCheck.id, object);
        setPersons(
          persons.map((person) => {
            if (person.id == arrayCheck.id) {
              console.log("Person found!");
              return object;
            }
            else
            {
              console.log("Wrong person...");
              return person;
            }
          })
        );
      }
    } else {
      Requests.addNum(object).then((data) => {
        object.id = data.id;
        setPersons(persons.concat(object));
        console.log(`Person added`);
      });
    }

    setNewName("");
    setNewNumber("");
  };
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
