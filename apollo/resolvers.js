const fs = require('fs')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('lib/db.json')
const db = low(adapter)

import { createPropertyModel } from '../lib/propertyModel'

const Property = createPropertyModel(db)

import nanoid from 'nanoid'

let rawdata = fs.readFileSync('properties.json')
let properties = JSON.parse(rawdata).data

const getEquity = args => {
  return (
    Property.findAll(args).reduce((acc, cur) => acc + cur.price, 0) -
    Property.findAll(args).reduce((acc, cur) => acc + cur.mortgage, 0)
  )
}

const getPortfolioValue = args => {
  return Property.findAll(args).reduce((acc, cur) => acc + cur.price, 0)
}

export const resolvers = {
  Query: {
    getProperty: (_, args) => {
      return Property.findOne(args)
    },
    getProperties: (_, args) => {
      return Property.findAll(args)
    },
    getPortfolioValue: (_, args) => {
      return getPortfolioValue(args)
    },
    getEquity: (_, args) => {
      return getEquity(args)
    },
    getLTV: (_, args) => {
      const val =
        100 - Math.floor((getEquity(args) / getPortfolioValue(args)) * 100)
      return val ? val : 0
    }
  },
  Mutation: {
    addProperty: async (_, { input: { userId, name, price, mortgage } }) => {
      const id = nanoid()

      await Property.create({ id, userId, name, price, mortgage })

      const prop = await Property.findOne({ id })

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
      )
      return updatedProperty
    },
    removeProperty: (_, { id }) => {
      const removedProperty = Property.findOne({ id })
      Property.removeOne({ id })

      return removedProperty
    }
  }
}
