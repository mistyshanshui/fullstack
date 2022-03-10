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
    <p>{text} {value}</p>
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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handler={() => { setGood(good + 1) }} />
      <Button text={'neutral'} handler={() => { setNeutral(neutral + 1) }} />
      <Button text={'bad'} handler={() => { setBad(bad + 1) }} />
      <Statistic good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App