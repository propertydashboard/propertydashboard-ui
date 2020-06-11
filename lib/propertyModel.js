const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  id: { type: String },
  userId: { type: String },
  name: { type: String },
  price: { type: Number },
  mortgage: { type: Number },
  image: { type: Number }
})

let Property
try {
  Property = mongoose.model('property')
} catch (error) {
  Property = mongoose.model('property', propertySchema)
}

export default Property
