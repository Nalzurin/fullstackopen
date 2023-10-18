import Requests from "../Services/Requests";
export default function DeleteButton({
  id,
  persons,
  setPersons,
  setNotification,
}) {
  const handleDeleteClick = () => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      console.log("Deleting");
      Requests.deleteNum(id)
        .then(() => {
          setPersons(
            persons.filter((person) => {
              console.log(person.id, " ", id);
              return person.id !== id;
            })
          );
          console.log("Delete Notification ON");
          setNotification({
            message: `Deleted ${person.name}`,
            failure: false,
          });
          setTimeout(() => {
            setNotification({
              message: null,
              failure: false,
            });
            console.log("Delete Notification OFF");
          }, 5000);
        })
        .catch(() => {
          setPersons(
            persons.filter((person) => {
              console.log(person.id, " ", id);
              return person.id !== id;
            })
          );
          setNotification({
            message: `Error deleting ${person.name}, person doesn't exist`,
            failure: true,
          });
          setTimeout(() => {
            setNotification({
              message: null,
              failure: false,
            });
          }, 5000);
        });
    }
  };
  return <button onClick={handleDeleteClick}>Delete</button>;
}
