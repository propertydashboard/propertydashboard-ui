import gql from 'graphql-tag'

export const typeDefs = gql`
  type Property {
    id: String
    userId: String
    name: String
    price: Int
    mortgage: Int
    image: String
  }

  type Query {
    getProperty(id: String): Property
    getProperties(userId: String): [Property]
    getPortfolioValue(userId: String): Int
    getEquity(userId: String): Int
    getLTV(userId: String): Int
  }

  input PropertyInput {
    userId: String
    id: String
    name: String
    price: Int
    mortgage: Int
    image: String
  }

  type Mutation {
    addProperty(input: PropertyInput): Property
    updateProperty(input: PropertyInput): Property
    removeProperty(id: String): Property
  }
`
