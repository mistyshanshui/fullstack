import { useState } from 'react'

const Button = (props)=>{
  const {text, handler} = props
  return(
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  const { good, neutral, bad } = props
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = good / all * 100
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback give</p>
      </>
    )
  }
  else {
    return (
      <>
        <h1>statistics</h1>
        <StatisticLine text={'good'} value={good}/>
        <StatisticLine text={'neutral'} value={neutral}/>
        <StatisticLine text={'bad'} value={bad}/>
        <StatisticLine text={'average'} value={average}/>
        <StatisticLine text={'positive'} value={positive + '%'}/>
      </>
    )
  }
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const randomNumber = ()=>{
    setSelected(int(Math.random() * anecdotes.length))
  }

  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

export default App