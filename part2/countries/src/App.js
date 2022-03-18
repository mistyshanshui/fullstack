import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter }) => {
  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()) == true)
  
  if (filtered.length > 10) {
    return (<>Too many matches, specify another filter</>)
  }
  else if (filtered.length == 1){
    return (
      <>
        <h1>{filtered[0].name.common}</h1>
        <p>capital {filtered[0].capital}</p>
        <p>area {filtered[0].area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(filtered[0].languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={Object.values(filtered[0].flags)[0]} ></img>
      </>
    )
  }
  else{
    return (
      <>
        {filtered.map(c => <p key={c.name.common}>{c.name.common}</p>)}
      </>
    )
  }
}

function App({countries}) {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <p>find countries <input value={filter} onChange={handleFilterChange} ></input></p>
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App;
