const mongoose = require('mongoose')

const password = process.argv[2]

if (!password) {
  console.log('Give password as argument')
  process.exit(1)
}

const url = `mongodb://alejandroDev:${password}@ac-e01o582-shard-00-00.aolltbv.mongodb.net:27017,ac-e01o582-shard-00-01.aolltbv.mongodb.net:27017,ac-e01o582-shard-00-02.aolltbv.mongodb.net:27017/?ssl=true&replicaSet=atlas-f5fobk-shard-0&authSource=admin&appName=Cluster0`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Si solo se da la contraseña -> list all
if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(p => console.log(p.name, p.number))
    mongoose.connection.close()
  })

// Contraseña + nombre + numero -> add new
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('Usage: node mongo.js <password> [name] [number]')
  mongoose.connection.close()
}