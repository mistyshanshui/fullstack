import { useState } from 'react'


function App() {
  const anecdotes = [
    '1 If it hurts, do it more often',
    '2 Adding manpower to a late software project makes it later!',
    '3 The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '4 Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '5 Premature optimization is the root of all evil.',
    '6 Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    '7 Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const randomIndex = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const votesHandler = () => {
    const copy = [...points] // copy value
    //let newVotes = votes // copy by reference, wrong result, votes doesn't display
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{points[selected]}</p>
      <p>{anecdotes[selected]}</p>
      <button onClick={votesHandler}>vote</button>
      <button onClick={randomIndex}>next anecdotes</button>

    </div>
  );
}

export default App;
