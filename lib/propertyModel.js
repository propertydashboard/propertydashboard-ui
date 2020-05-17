export const createPropertyModel = db => {
  return {
    findOne(obj) {
      return db
        .get('properties')
        .find(obj)
        .value()
    },

    updateOne(obj, updatedValues) {
      return db
        .get('properties')
        .find(obj)
        .assign(updatedValues)
        .write()
    },

    removeOne(obj) {
      return db
        .get('properties')
        .remove(obj)
        .write()
    },

    findAll(obj) {
      return db
        .get('properties')
        .filter(obj)
        .value()
    },

    create(property) {
      const newProperty = { ...property }
      db.get('properties')
        .push(newProperty)
        .write()

      return newProperty
    }
  }
}
