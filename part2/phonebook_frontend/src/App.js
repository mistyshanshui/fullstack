import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

const NOTICE = 0
const ERROR = 1

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


const Name = ({ person, onDelete }) => {
  return (
    <p>{person.name} {person.number} <button id={person.id} onClick={onDelete}>delete</button></p>
  )
}

const Persons = ({ persons, filter, onDelete }) => {
  const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) == true)

  return (
    <>
      {filtered.map(p => <Name key={p.id} person={p} onDelete={onDelete} />)}
    </>
  )
}

const Notification = ({ message, type }) => {
  const errorMessageStyle = {
    color: "red",
    background: "gray",
    fontSize: 30,
    borderStyle: 'solid',
    padding: 10
  }

  const noticeMessageStyle = {
    color: "green",
    background: "lightgreen",
    fontSize: 30,
    borderStyle: 'solid',
    padding: 10
  }

  const messageStyle = type == ERROR ? errorMessageStyle : noticeMessageStyle
  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(NOTICE)

  const displayMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const addName = (event) => {
    if (newName === '' || newNumber === '') {
      return
    }

    event.preventDefault()

    const p = {
      name: newName, number: newNumber
    }

    const found = persons.find(element => element.name === newName)
    if (found) {
      if (window.confirm(newName + " is already added to the phone book, replace the old number with a new one?")) {
        const newEntry = { ...found, number: newNumber }
        phonebookService.update(found.id, newEntry)
          .then(data => {
            setPersons(persons.map(p => p.id === found.id ? data : p))
            displayMessage('Updated phone number for ' + found.name, NOTICE)
          })
      }
    }
    else {
      phonebookService.create(p)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          displayMessage('Added ' + p.name, NOTICE)
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

  const onDelete = (event) => {
    const person = persons.find(p => p.id == event.target.id)
    if (window.confirm("delete " + person.name + "?")) {
      phonebookService.deleteEntry(event.target.id)
        .catch(error => {
          displayMessage('information for ' + person.name + ' has already been removed from server.', ERROR)
        })
      setPersons(persons.filter(p => p.id != person.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm submitHandler={addName} name={newName} number={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  )
}

export default App