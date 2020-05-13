const fs = require('fs')
let rawdata = fs.readFileSync('properties.json')
let properties = JSON.parse(rawdata).data

const getEquity = () => {
  return (
    properties.reduce((acc, cur) => acc + cur.price, 0) -
    properties.reduce((acc, cur) => acc + cur.mortgage, 0)
  )
}

const getPortfolioValue = () => {
  return properties.reduce((acc, cur) => acc + cur.price, 0)
}

export const resolvers = {
  Query: {
    getProperty: (_, args) => {
      return properties.find(element => args.id === element.id)
    },
    getProperties: () => {
      return properties
    },
    getPortfolioValue,
    getEquity,
    getLTV: () => {
      return 100 - parseInt((getEquity() / getPortfolioValue()) * 100, 10)
    }
  },
  Mutation: {
    addProperty: (_, { input: { id, name, price, mortgage } }) => {
      properties.push({ id, name, price, mortgage })
      const newProperties = {
        data: properties
      }
      let data = JSON.stringify(newProperties)
      fs.writeFileSync('properties.json', data)
      return properties.find(element => input.id === element.id)
    },
    updateProperty: (_, { input: { id, name, price, mortgage } }) => {
      const propertyIndex = properties.findIndex(element => element.id === id)
      const updatedProperties = properties.filter(
        (element, index) => index !== propertyIndex
      )
      properties = updatedProperties
      properties.push({
        id,
        name,
        price,
        mortgage
      })
      const newProperties = {
        data: properties
      }
      let data = JSON.stringify(newProperties)
      fs.writeFileSync('properties.json', data)
      return properties.find(element => id === element.id)
    },
    removeProperty: (_, { id }) => {
      const _properties = properties
      properties = properties.filter(element => element.id !== id)
      const newProperties = {
        data: properties
      }
      let data = JSON.stringify(newProperties)
      fs.writeFileSync('properties.json', data)
      return _properties.find(element => id === element.id)
    }
  }
}
