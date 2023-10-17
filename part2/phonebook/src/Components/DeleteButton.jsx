import Requests from "../Services/Requests";
export default function DeleteButton({ id, persons, setPersons }) {
  const handleDeleteClick = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${
          persons.find((person) => (person.id === id)).name
        }`
      )
    ) {
      console.log("Deleting");
      Requests.deleteNum(id).then(() => {
        setPersons(
          persons.filter((person) => {
            console.log(person.id, " ", id);
            return person.id !== id;
          })
        );
      });
    }
  };
  return <button onClick={handleDeleteClick}>Delete</button>;
}
