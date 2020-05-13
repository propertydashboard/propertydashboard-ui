import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import PropertyList from '../components/PropertyList'
import AddPropertyForm from '../components/AddPropertyForm'
import RemovePropertyForm from '../components/RemovePropertyForm'

const loadDashboardQuery = gql`
  query loadDashboardQuery {
    getPortfolioValue
    getEquity
    getLTV
    getProperties {
      id
      name
      price
    }
  }
`

function Dashboard() {
  const {
    data: { getProperties, getPortfolioValue, getEquity, getLTV }
  } = useQuery(loadDashboardQuery)

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Portfolio value: £{getPortfolioValue}K</h2>
      <h2>Equity: £{getEquity}K</h2>
      <h2>Portfolio LTV: {getLTV}%</h2>
      {getProperties && <PropertyList properties={getProperties} />}
      <AddPropertyForm />
      <RemovePropertyForm properties={getProperties} />
    </div>
  )
}

export default withApollo(Dashboard)
