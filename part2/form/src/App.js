import { useState } from 'react'

const Names = ({ persons }) => {
  console.log("Names", persons)
  return (
    <>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  const addName = (event) => {
    event.preventDefault()

    const p = {
      name: newName
    }
    setPersons(persons.concat(p))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />
    </div>
  )
}

export default App