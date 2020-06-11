const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: { type: String },
  username: { type: String },
  salt: { type: String },
  hash: { type: String }
})

let User
try {
  User = mongoose.model('user')
} catch (error) {
  User = mongoose.model('user', userSchema)
}

export default User
