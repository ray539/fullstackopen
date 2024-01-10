interface PartData {
  name: string,
  exercises: number,
  id: number
}

interface CourseData {
  id: number,
  name: string,
  parts: PartData[]
}

function Course({course} : {course: CourseData}) {
  let totalExercises = course.parts.reduce((curr, x) => curr + x.exercises, 0);

  return (
    <>
    <h2>{course.name}</h2>
    {course.parts.map(p => <p key={p.id}> {`${p.name} ${p.exercises}`} </p>)}
    <p><b>total of {totalExercises} exercises</b></p>
    </>
  )
}

export default Course;