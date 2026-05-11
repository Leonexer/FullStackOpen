     
export const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}  <button onClick ={() => deletePerson(person.id)}> delete </button>
        </p>
      ))}
    </>
  )
}