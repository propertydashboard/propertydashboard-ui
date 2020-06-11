import nanoid from 'nanoid'

import Property from '../lib/propertyModel'

const getEquity = async args => {
  const results = await Property.find(args).exec()

  return (
    results.reduce((acc, cur) => acc + cur.price, 0) -
    results.reduce((acc, cur) => acc + cur.mortgage, 0)
  )
}

const getPortfolioValue = async args => {
  const results = await Property.find(args).exec()

  return results.reduce((acc, cur) => acc + cur.price, 0)
}

export const resolvers = {
  Query: {
    getProperty: (_, args) => {
      return Property.findOne(args).exec()
    },
    getProperties: (_, args) => {
      return Property.find(args).exec()
    },
    getPortfolioValue: (_, args) => {
      return getPortfolioValue(args)
    },
    getEquity: (_, args) => {
      return getEquity(args)
    },
    getLTV: async (_, args) => {
      const equity = await getEquity(args)
      const value = await getPortfolioValue(args)

      const val = 100 - Math.floor((equity / value) * 100)
      return val ? val : 0
    }
  },
  Mutation: {
    addProperty: async (_, { input: { userId, name, price, mortgage } }) => {
      const id = nanoid()

      await Property.create({ id, userId, name, price, mortgage })

      const prop = await Property.findById(id).exec()

      return prop
    },
    updateProperty: (_, { input: { id, name, price, mortgage } }) => {
      const updatedProperty = Property.updateOne(
        { id },
        {
          name,
          price,
          mortgage
        }
      ).exec()
      return updatedProperty
    },
    removeProperty: (_, { id }) => {
      const removedProperty = Property.findOne({ id }).exec()
      Property.deleteOne({ id }).exec()

      return removedProperty
    }
  }
}
