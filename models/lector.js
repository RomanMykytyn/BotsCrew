const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const degrees = ['assistant', 'associate professor', 'professor']

const lectorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    default: () => Math.floor(Math.random() * (1000 - 1)) + 1,
  },
  degree: {
    type: String,
    default: () => degrees[Math.floor(Math.random() * degrees.length)],
  },
})


const Lector = mongoose.model('Lector', lectorSchema)
module.exports = Lector
