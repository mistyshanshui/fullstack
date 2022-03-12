
const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises.toString()}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Total = ({parts}) => {
  return(
    <>
      <p><strong>total of {parts.reduce((sum, part)=> sum + part.exercises, 0)} exercises</strong></p>
    </>
  )
}

const Course = ({ course }) => {
  console.log(course.name, course.parts);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course;
