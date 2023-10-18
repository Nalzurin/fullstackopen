import { useState, useEffect } from "react";
import Requests from "./Services/Requests"
import Phonebook from "./Components/Phonebook";
import InputForm from "./Components/InputForm";
import Filter from "./Components/Filter";
import Notification from "./Components/Notification";
function App() {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState({message:null, failure: false});
  console.log(notification);
  const personsToShow = persons.filter((person) => {
    if (!filterName == "") {
      console.log(person.name.toLowerCase().includes(filterName.toLowerCase()));
      return person.name.toLowerCase().includes(filterName.toLowerCase());
    } else return true;
  });
  useEffect(() => {
    Requests.getBook().then((data) => {
      setPersons(data);
      console.log("Data retrieved");
      setNotification({message:'Retrieved the data', failure:false});
      setTimeout(() => {
        setNotification({
          message: null,
          failure: false,
        });
      }, 5000);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification}/>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <InputForm persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h2>Numbers</h2>
      <Phonebook persons={personsToShow} personsAll={persons} setPersons={setPersons} setNotification={setNotification} />
    </div>
  );
}

export default App;
