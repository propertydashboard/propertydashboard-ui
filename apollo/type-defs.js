import gql from 'graphql-tag'

export const typeDefs = gql`
  type Property {
    id: String
    name: String
    price: Int
    mortgage: Int
  }

  type Query {
    getProperty(id: String): Property
    getProperties: [Property]
    getPortfolioValue: Int
    getEquity: Int
    getLTV: Int
  }

  input PropertyInput {
    id: String
    name: String
    price: Int
    mortgage: Int
  }

  type Mutation {
    addProperty(input: PropertyInput): Property
    updateProperty(input: PropertyInput): Property
    removeProperty(id: String): Property
  }
`
