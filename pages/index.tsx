import React, { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import PropertyList from '../components/PropertyList'
import AddPropertyForm from '../components/AddPropertyForm'
import RemovePropertyForm from '../components/RemovePropertyForm'

import { useUser } from '../lib/hooks'

function Dashboard() {
  const user = useUser()
  const loadDashboardQuery = gql`
  query loadDashboardQuery {
    getPortfolioValue(userId: "${String(user && user.id ? user.id : '')}")
    getEquity(userId: "${String(user && user.id ? user.id : '')}")
    getLTV(userId: "${String(user && user.id ? user.id : '')}")
    getProperties(userId: "${String(user && user.id ? user.id : '')}") {
      id
      name
      price
    }
  }
`

  const {
    data: { getProperties, getPortfolioValue, getEquity, getLTV }
  } = useQuery(loadDashboardQuery)

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  })

  return user ? (
    <div>
      <Link href="/api/logout">
        <a>Logout</a>
      </Link>
      <p>Currently logged in as: {JSON.stringify(user)}</p>
      <h1>Dashboard</h1>
      <h2>Portfolio value: £{getPortfolioValue}K</h2>
      <h2>Equity: £{getEquity}K</h2>
      <h2>Portfolio LTV: {getLTV}%</h2>
      {getProperties && <PropertyList properties={getProperties} />}
      <AddPropertyForm />
      <RemovePropertyForm properties={getProperties} />
    </div>
  ) : null
}

export default withApollo(Dashboard)
