import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter, buttonHandler }) => {
  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()) == true)

  if (filtered.length > 10) {
    return (<>Too many matches, specify another filter</>)
  }
  else if (filtered.length == 1) {
    return (
      <>
        <CountryView country={filtered[0]}/>
      </>
    )
  }
  else {
    console.log("nuber of countries are :", filtered.length)
    return (
      <>
        {filtered.map(c => <div>{c.name.common} <button id={c.name.common} onClick={buttonHandler}>show</button></div>)}
      </>
    )
  }
}

const CountryView = ({country})=>{
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={Object.values(country.flags)[0]} ></img>
    </>
  )
}

function App({ countries }) {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const buttonHandler = (event) => {
    
  }

  return (
    <div>
      <p>find countries <input value={filter} onChange={handleFilterChange} ></input></p>
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App;
