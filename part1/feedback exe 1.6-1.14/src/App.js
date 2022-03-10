import { useState } from 'react'

const Statistic = (props) => {
  const {good, neutral, bad} = props
  let all = good + neutral + bad
  let average = (good - bad)/all
  let positive = good / all * 100
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} {'%'}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => { setGood(good + 1) }}>Good</button>
      <button onClick={() => { setNeutral(neutral + 1) }}>Neutral</button>
      <button onClick={() => { setBad(bad + 1) }}>Bad</button>

      <Statistic good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App