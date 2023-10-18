import Number from "./Number"
export default function Phonebook({ persons, personsAll, setPersons, setNotification}) {
    console.log(persons);
    if(persons.length == 0)
    {
      return <p>Phonebook empty</p>;
    }
    return persons.map((person) => {
      console.log("Logging person:", person);
      return <Number key={person.id} name={person.name} number={person.number} id={person.id} persons={personsAll} setPersons={setPersons}  setNotification={setNotification}/>;
    });
  }