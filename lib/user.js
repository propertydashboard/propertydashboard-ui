import crypto from 'crypto'
import nanoid from 'nanoid'

import User from './userModel'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ username, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  console.log('===createuser===')
  const id = nanoid()
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  console.log('===befiore await===')
  await User.create({ id, username, salt, hash })

  console.log('===mongo===')

  return { username, id }
}

export async function findUser({ username, password }) {
  // Here you should lookup for the user in your DB and compare the password:
  //
  const user = await User.findOne({ username }).exec()
  if (!user) throw new Error('user not recognised')
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === hash

  if (passwordsMatch) {
    return { username, id: user.id }
  }
}
