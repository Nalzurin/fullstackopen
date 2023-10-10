const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => (
  <p>
    Total of <b>{sum}</b> exercises
  </p>
);

function Part({ part }) {
  console.log("Outputting part:", part);
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => {
        console.log(part);
        return <Part key={part.id} part={part} />;
      })}

      <Total
        sum={parts.reduce((total, sum) => {
          return total + sum.exercises;
        }, 0)}
      />
    </>
  );
};

function Course({ course }) {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
}

function Courses({ courses }) {
  return (
    <>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </>
  );
}
export default Courses;