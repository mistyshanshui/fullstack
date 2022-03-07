const Header=(props)=>{
  console.log(props)
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Part=(props)=>{
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}
const Content=(props)=>{
  console.log(props)
  return(
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )
}

const Total=(props)=>{
  console.log(props)
  let count = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return(
    <>
      <p>Number of exercises {count}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  let parts = [part1, part2, part3]
  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />      
      <Total parts={parts} />
    </div>
  )
}

export default App