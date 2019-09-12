const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lectors: [
    {
      lector: {
        type: ObjectId,
        ref: 'Lector',
        required: true
      }
    }
  ],
  head: {
    type: ObjectId,
    ref: 'Lector',
    required: true
  },
})


const Department = mongoose.model('Department', departmentSchema)
module.exports = Department
