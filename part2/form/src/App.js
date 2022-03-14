import { useState } from 'react'

const Names = ({ persons }) => {
  console.log("Names", persons)
  return (
    <>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('ddd')

  const addName = (event) => {
    event.preventDefault()

    const p = {
      name: newName, number : newNumber
    }
    
    if(undefined != persons.find(element => element.name === newName) ){
      alert(newName + "is already added to the phone book")
    }
    else{
      setPersons(persons.concat(p))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with         
        <input value={filter} onChange={handleFilterChange}/>
      </p>
      <h2>add a new</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons.filter( p => p.name.toLowerCase().includes(filter.toLowerCase()) == true)} />
    </div>
  )
}

export default App