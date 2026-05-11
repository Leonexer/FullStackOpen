import { useState } from 'react'
import { useEffect } from 'react'

export const Country = ({ country }) => {
const api_key = import.meta.env.VITE_WEATHER_KEY
const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`

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
        .then(data => setWeather(data))
        .catch(error => {
            console.error('Error fetching weather:', error)
            setWeather(null)
        })
    }, [country.capital[0]])


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
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temperature: {weather.main.temp} °C</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
         }
    </>
  )
}