import DeleteButton from "./DeleteButton";

export default function Number({ name, number, id, persons, setPersons, setNotification}) {
  return (
    <>
      <p>
        {name} {number} <DeleteButton id={id} persons={persons} setPersons={setPersons} setNotification={setNotification}/>
      </p>
      
    </>
  );
}
