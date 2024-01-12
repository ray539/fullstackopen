import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Person } from "./Common";
import personService from './services/persons'

function Filter({filter, setFilter}: {filter: string, setFilter: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <>
    filter shown with
    <input
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
    </>
  )
}

function PersonForm({persons, setPersons}:
  {
    persons: Person[],
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>,
  }
  ) {

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      let foundPerson: Person | undefined = persons.find(p => p.name === newName);
      if (foundPerson) {
        if (window.confirm(`${newName} is already in the phonebook. Replace old number with new one?`)) {
          let changedPerson: Person = {...foundPerson, number: newPhone};
          personService.changePerson(foundPerson.id, changedPerson).then(changedPersonReturned => {
            setPersons(persons.map(p => p.id === changedPersonReturned.id ? changedPersonReturned : p));
          })
        }
        setNewName('');
        setNewPhone('');
        return;
      }
      setNewName('');
      setNewPhone('');
      
      let newPerson = {
        name: newName,
        number: newPhone
      }

      personService.postNew(newPerson).then(newPersonReturned => setPersons(
        persons.concat(newPersonReturned)
      ))

    }}>
      <div>
        name: 
        <input 
          placeholder="enter name of person"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          />
      </div>
      <div>
        number:
        <input
          placeholder="enter phone number of person"
          value={newPhone}
          onChange={(e) => {
            setNewPhone(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

function PersonList({shownPersons, deletePerson}: {shownPersons: Person[], deletePerson: (id: string) => void}) {
  return (
    <>
    {shownPersons.map(person => 
      <div key={person.id}>
        {person.name} {person.number} 
        <button onClick={() => {
          if (window.confirm(`delete person ${person.name}?`)) {
            deletePerson( person.id);
          }
        }}>delete</button>
      </div>)}
    </>
  )
}



function App() {

  const [persons, setPersons] = useState<Person[]>([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  function deletePerson(id: string) {
    personService.deletePerson(id).then(res => {
      setPersons(persons.filter(p => p.id !== id))
    }).catch(() => console.log("error deleting the person"))
  }


  let re = new RegExp(filter.toLowerCase());
  let shownPersons = persons.filter(person => re.test(person.name.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <PersonList shownPersons={shownPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
