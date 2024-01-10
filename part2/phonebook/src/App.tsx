import { useRef, useState } from "react"

function Filter({filter, setFilter, updateShown}: {filter: string, setFilter: React.Dispatch<React.SetStateAction<string>>, updateShown: Function}) {
  return (
    <>
    filter shown with
    <input
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
        updateShown(e.target.value);
      }}
    />
    </>
  )
}

function PersonForm({persons, updateShown, filter}:
  {
    persons: Person[],
    updateShown: Function,
    filter: string
  }
  ) {

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (persons.find(p => p.name === newName)) {
        alert(`${newName} is already in the phonebook`);
        return;
      }
      setNewName('');
      setNewPhone('');

      persons.push({
        name: newName,
        id: persons.length,
        phoneNum: newPhone
      })
      updateShown(filter);
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

function PersonList({shownPersons}: {shownPersons: Person[]}) {
  return (
    <>
    {shownPersons.map(person => <div key={person.id}>{person.name} {person.phoneNum}</div>)}
    </>
  )
  
  
}


interface Person {
  id: number,
  name: string,
  phoneNum: string
}

function App() {

  const persons = useRef<Person[]>([]);
  const [filter, setFilter] = useState('');
  const [shownPersons, setShownPersons] = useState<Person[]>([...persons.current])

  function updateShown(filter: string) {
    let re = new RegExp(filter.toLowerCase());
    let shownPersons_ = persons.current.filter(person => re.test(person.name.toLowerCase()))
    setShownPersons(shownPersons_);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} updateShown={updateShown}></Filter>
      <h2>Add a new</h2>
      <PersonForm 
        persons={persons.current}
        updateShown={updateShown}
        filter={filter} />
      <h2>Numbers</h2>
      <PersonList shownPersons={shownPersons}/>
    </div>
  )
}

export default App
