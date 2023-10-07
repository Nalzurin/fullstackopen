import { useState } from "react";

function Statistics({ good, neutral, bad }) {
  if(good+neutral+bad == 0){
    return(<p>No feedback has been gathered</p>);
  }
  else{
    return (
      <>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {good + neutral + bad}</p>
        <p>Average:{(good - bad) / (good + neutral + bad)}</p>
        <p>Positive%: {(good * 100) / (good + neutral + bad)}%</p>
      </>
    );
  }
}

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const setToGood = () => {
    console.log("Positive review ++");
    setGood(good + 1);
  };
  const setToNeutral = () => {
    console.log("Neutral review ++");
    setNeutral(neutral + 1);
  };
  const setToBad = () => {
    console.log("Bad review ++");
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood()} text={"Good"} />
      <Button handleClick={() => setToNeutral()} text={"Neutral"} />
      <Button handleClick={() => setToBad()} text={"Bad"} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
