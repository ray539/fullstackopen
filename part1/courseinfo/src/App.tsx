
interface Part {
  name: string,
  exercises: number
}

function Header(props: {course: string}) {
  return (
    <h1>{props.course}</h1>
  )
}

function Part(props: {partName: string, numExercises: number}) {
  return (
    <p>{props.partName} {props.numExercises}</p>
  )
}

function Content(props: {parts: Part[]}) {
  return (
    <div>
      {props.parts.map(p => <Part partName={p.name} numExercises={p.exercises}></Part>)}
    </div>
  )
}

function NumExercises(props: {parts: Part[]}) {
  let total = 0;
  props.parts.forEach(p => {total += p.exercises});
  return (
    <p>total number of exercises: {total}</p>
  )
}



function App() {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <NumExercises parts={parts}></NumExercises>
    </div>
  )
}

export default App
