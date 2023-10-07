import { useState } from "react";

function Button({handleClick, text}){
  return(
    <button onClick={handleClick}>{text}</button>
  );
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const [topAnecdote, setTopAnecdote] = useState(0);


  function setSelectedRandom() {
    const val = Math.floor(Math.random() * anecdotes.length);
    if(val == selected)
    {
      setSelectedRandom();
    }
    else
    {
      setSelected(val);
    }

  }
  function vote(){
    const copy = [...votes];
    copy[selected]+=1;
    if(copy[selected]>votes[topAnecdote])
    {
      setTopAnecdote(selected);
    }
    setVotes(copy);
  }

  return (
    <div>
      <h1>Anecdote</h1>
      <h2>{anecdotes[selected]}</h2>
      <p>Votes:{votes[selected]}</p>
      <Button handleClick={()=>vote()} text="Vote"/>
      <br></br>
      <Button handleClick={()=>setSelectedRandom()} text="Get another anecdote"/>
      <br></br>
      <h1>Most voted anecdote</h1>
      <h2>{anecdotes[topAnecdote]}</h2>
      <p>Number of votes: {votes[topAnecdote]}</p>
    </div>
  );
};

export default App;
