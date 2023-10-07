import { useState } from 'react';

function Button({handleClick, text}){
  return(
    <button onClick={handleClick}>{text}</button>
  );
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const setToGood = ()=>{
    console.log("Positive review ++")
    setGood(good+1);
  }
  const setToNeutral = ()=>{
    console.log("Neutral review ++")
    setNeutral(neutral+1);
  }
  const setToBad = ()=>{
    console.log("Bad review ++")
    setBad(bad+1);
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={()=> setToGood()} text={"Good"} />
      <Button handleClick={()=> setToNeutral()} text={"Neutral"} />
      <Button handleClick={()=> setToBad()} text={"Bad"} />
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>

    </>
  );
}

export default App;
