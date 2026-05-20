import { useState, useEffect } from 'react'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
  personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(newName === "" || newNumber === "")
    {
      alert('Empty required field')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.find(p => p.number === newNumber)){
      alert('Number "' + newNumber +'" is already on the phonebook.')
      return
    }

    if(persons.find(p => p.name === newName))
    {
      if(window.confirm('Name "' + newName +'" is already on the phonebook, do you wish to replace the old number with this new number?')){
        const repeat = persons.find(p => p.name === newName)
        
        personService
        .update(repeat.id, newPerson)
        .then(response => {
        setPersons(persons.map(p => p.id !== repeat.id ? p : response.data))
        setNewName('')
        setNewNumber('')
        notify(`${newPerson.name}'s number was updated`)
      }).catch(error => {
            if (error.response && error.response.data.error) {
              notify(error.response.data.error, 'error')
            } else {
              notify(`${newName} has already been removed from the server`, 'error')
              setPersons(persons.filter(p => p.name !== newName))
            }
          })
      }
      return
    }

    personService
    .create(newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))

      setNewName('')
      setNewNumber('')
      notify(`${newPerson.name} was added successfully`)
    }).catch(error => notify(error.response.data.error, 'error'))
  }

  const deletePerson = (id) => {
    if (window.confirm('Delete this contact?')) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          notify(`Contact deleted successfully`)
        })
      .catch(() => notify(`Person was already removed from the server`, 'error'))
    }
  }


  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(filterWord.toLowerCase()))

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>Phonebook</h2>
        <div>Filter shown with: 
          <input value={filterWord} onChange={(e) => setFilterWord(e.target.value)} /> 
        </div>
      <h2>Add a new contact</h2>
      <h2>Numbers</h2>
      <PersonForm
        addPerson = {addPerson}
        newName = {newName}
        setNewName = {setNewName}
        newNumber = {newNumber}
        setNewNumber = {setNewNumber}
      />
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App