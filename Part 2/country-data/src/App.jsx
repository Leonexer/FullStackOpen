import { useState, useEffect } from 'react'
import { Countries } from './components/Countries'
import { Country } from './components/Country'

function App() {

  const [countries, setCountries] = useState([])
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => res.json())
      .then(data => setCountries(data))
  }, [])

  const countriesToShow = countries.filter(country =>
  country.name.common.toLowerCase().includes(filterWord.toLowerCase()))

  return (
    <div>
      <h2>Country Information</h2>
        <div>Filter shown with: 
          <input value={filterWord} onChange={(e) => setFilterWord(e.target.value)} /> 
        </div>
      {
        countriesToShow.length == 1
        ?
        <Country country ={countriesToShow[0]}/>
        :
        <Countries countriesToShow={countriesToShow} setFilterWord = {setFilterWord}/>
      }
    </div>
  )
}

export default App
