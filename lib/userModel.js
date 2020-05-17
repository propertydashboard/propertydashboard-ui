import nanoid from 'nanoid'

export const createUserModel = db => {
  return {
    findOne(obj) {
      return db
        .get('users')
        .find(obj)
        .value()
    },

    create(user) {
      const newUser = { id: nanoid(), createdAt: Date.now(), ...user }
      db.get('users')
        .push(newUser)
        .write()

      return newUser
    }
  }
}
