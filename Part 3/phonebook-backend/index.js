
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.use(express.json())
app.use(cors())

// Solucion stringify
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Ruta 1: lista completa
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Ruta 2: página de info
app.get('/info', (request, response) => {
  const count = persons.length
  const time  = new Date()
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `)
})

// Ruta 3: una sola persona por ID
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // Valida que un nombre haya sido cread
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  // Valida que contenga numero
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  // Busca si el nombre ya existe
  if (persons.some(p => p.name === body.name)) {
    return response.status(409).json({ 
      error: 'name must be unique' 
    })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})
 
const PORT = process.env.PORT || 3001     //Para quer se utilize el mismo puerto en Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
