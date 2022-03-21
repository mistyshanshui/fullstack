import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService.getAll()
      .then(allEntries => setPersons(allEntries))
  }, [])
  
  const addName = (event) => {
    event.preventDefault()

    const p = {
      name: newName, number: newNumber
    }

    if (undefined != persons.find(element => element.name === newName)) {
      alert(newName + "is already added to the phone book")
    }
    else {
      phonebookService.create(p)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
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