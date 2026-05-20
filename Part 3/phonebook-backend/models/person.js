const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)