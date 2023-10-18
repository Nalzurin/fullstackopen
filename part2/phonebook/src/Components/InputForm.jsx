import { useState } from "react";
import Requests from "../Services/Requests";

export default function InputForm({ persons, setPersons, setNotification }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    const object = { name: newName, number: newNumber };
    const arrayCheck = persons.find(({ name }) => name === object.name);
    if (arrayCheck !== undefined) {
      console.log(`Phonebook contains the person ${arrayCheck.name}`);
      if (
        window.confirm(
          `${object.name} already exists in phonebook, do you want to overwrite the number?`
        )
      ) {
        console.log(`Overwriting ${object.name}...`);
        object.id = arrayCheck.id;
        Requests.editNum(arrayCheck.id, object)
          .then(() => {
            setPersons(
              persons.map((person) => {
                if (person.id == arrayCheck.id) {
                  console.log("Person found!");
                  return object;
                } else {
                  console.log("Wrong person...");
                  return person;
                }
              })
            );
            setNotification({
              message: `Finished overwriting ${object.name}`,
              failure: false,
            });
            setTimeout(() => {
              setNotification({
                message: null,
                failure: false,
              });
            }, 5000);
          })
          .catch(() => {
            setNotification({
              message: `Error overwriting ${object.name}, person does not exist`,
              failure: true,
            });
            setPersons(
              persons.filter((person) => {
                console.log(person.id, " ", object.id);
                return person.id !== object.id;
              })
            );
            setTimeout(() => {
              setNotification({
                message: null,
                failure: false,
              });
            }, 5000);
          });
      }
    } else {
      Requests.addNum(object).then((data) => {
        object.id = data.id;
        setPersons(persons.concat(object));
        console.log(`Person added`);
        setNotification({
          message: `Added person ${object.name}`,
          failure: false,
        });
        setTimeout(() => {
          setNotification({
            message: null,
            failure: false,
          });
        }, 5000);
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
