import { MouseEventHandler, useState } from "react"

function StatisticsLine(props: {statName: string, value: number | string}) {
  return (
    <div>{props.statName} {props.value}</div>
  )
}

function Statistics(props: {good: number, neutral: number, bad: number}) {
  let all = props.good + props.neutral + props.bad;
  let sum = props.good - props.bad;
  return (
    <>
    {
    all > 0 ?
      <div>
        <StatisticsLine statName="good" value={props.good}></StatisticsLine>
        <StatisticsLine statName="neutral" value={props.neutral}></StatisticsLine>
        <StatisticsLine statName="bad" value={props.bad}></StatisticsLine>
        <StatisticsLine statName="all" value={all}></StatisticsLine>
        <StatisticsLine statName="average" value={`${(sum / all).toFixed(1)}`}></StatisticsLine>
        <StatisticsLine statName="positive" value={`${((props.good / all) * 100).toFixed(1)} %`}></StatisticsLine>
      </div>
      :
      <p>no feedback yet</p>
    }
    </>
  )
}

function Button(props: {onClick: MouseEventHandler<HTMLButtonElement> | undefined, label: string}) {
  return (
    <button onClick={props.onClick}> {props.label} </button>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  

  return (
    <>
    <h1>give feedback</h1>
    <Button onClick={() => {setGood(good + 1)}} label="good"></Button>
    <Button onClick={() => {setNeutral(neutral + 1)}} label="neutral"></Button>
    <Button onClick={() => {setBad(bad + 1)}} label="bad"></Button>
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  )
}

export default App
