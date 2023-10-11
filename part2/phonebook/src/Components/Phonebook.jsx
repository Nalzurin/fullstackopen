import Number from "./Number"
export default function Phonebook({ persons }) {
    console.log(persons);
    return persons.map((person) => {
      console.log("Logging person:", person);
      return <Number key={person.id} name={person.name} number={person.number} />;
    });
  }