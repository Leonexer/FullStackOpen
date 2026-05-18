import { useState } from 'react'
import { useEffect } from 'react'

export const Country = ({ country }) => {
const url = `https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current_weather=true`

  const [weather, setWeather] = useState(null)

    useEffect(() => {
    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Weather API error')
            }
        })
        .then(data => setWeather(data.current_weather))
        .catch(error => {
            console.error('Error fetching weather:', error)
            setWeather(null)
        })
    }, [country.latlng[0], country.latlng[1]])


  return (
    <>
        <h1>{country.name.common}</h1>
        <ul>
            <li>Capital: {country.capital.join(', ')}</li>
            <li>Area: {country.area}</li>
        </ul>
        <h2>Languages</h2>
        <ul>
        {
            Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
            ))
        }
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
        {
            weather &&
            <div>
                <h2>Weather in {country.name.common}</h2>
                <p>Temperature: {weather.temperature} °C</p>
                <p>Wind: {weather.windspeed} m/s</p>
            </div>
         }
    </>
  )
}