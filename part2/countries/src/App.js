import { useState } from 'react'
import axios from 'axios'

const CountryList = ({ countries, buttonHandler }) => {
  return (
    <>
      {countries.map(c => <div key={c.name.common}>{c.name.common} <button id={c.name.common} onClick={buttonHandler}>show</button> </div>)}
    </>
  )
}

const WeatherView = ({ weather }) => {
  return (
    <>
      <p>temperature {weather.temperature}</p>
      <img src={weather.icon} alt="weather icon"></img>
      <p>wind {weather.wind}</p>
    </>
  )
}

const CountryView = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={Object.values(country.flags)[0]} alt="flag"></img>
    </>
  )
}

const Countries = ({ filtered, buttonHandler, weather }) => {
  if (filtered.length > 10) {
    return (<>Too many matches, specify another filter</>)
  }
  else if (filtered.length === 1) {
    return (
      <>
        <CountryView country={filtered[0]} />
        <WeatherView weather={weather} />
      </>
    )
  }
  else {
    return (
      <CountryList countries={filtered} buttonHandler={buttonHandler} />
    )
  }
}

function App({ countries }) {
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [weather, setWeather] = useState({ temperature: 0, icon: '', wind: 0 })

  const filterCountries = (filter) => {
    return countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  const fetchWeather = (country) => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + process.env.REACT_APP_API_KEY
    axios
      .get(url)
      .then((response) => {
        const w = { temperature: response.data.main.temp, icon: 'https://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png', wind: response.data.wind.speed }
        console.log(w)
        setWeather(w)
      })
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const found = filterCountries(event.target.value)
    if (found.length === 1) {
      fetchWeather(found[0])
    }
    setFiltered(found)
  }

  const buttonHandler = (event) => {
    const found = filterCountries(event.target.id)
    fetchWeather(found[0])
    setFiltered([found[0]])
  }

  return (
    <div>
      <p>find countries <input value={filter} onChange={handleFilterChange} ></input></p>
      <Countries filtered={filtered} buttonHandler={buttonHandler} weather={weather} />
    </div>
  )
}

export default App;
