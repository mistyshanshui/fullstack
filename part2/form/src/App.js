import { useState } from 'react'

const Filter = ({ filter, handler }) => {
  return (
    <p>
      filter shown with
      <input value={filter} onChange={handler} />
    </p>
  )
}

const PersonForm = ({ submitHandler, name, nameHandler, number, numberHandler }) => {
  return (
    <form onSubmit={submitHandler} >
      <div>
        name: <input value={name} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}


const Names = ({ persons }) => {
  return (
    <>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <Names persons={persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) == true)} />
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
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const p = {
      name: newName, number: newNumber
    }

    if (undefined != persons.find(element => element.name === newName)) {
      alert(newName + "is already added to the phone book")
    }
    else {
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
      <Filter filter={filter} handler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm submitHandler={addName} name={newName} number={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App