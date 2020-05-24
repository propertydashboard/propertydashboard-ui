import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Layout from '../components/layout'

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
      image
    }
  }
`

  const {
    data: { getProperties, getPortfolioValue, getEquity, getLTV }
  } = useQuery(loadDashboardQuery)

  const [graph, setGraph] = useState('')

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  })

  const getGraph = postcode => {
    fetch(
      `https://api.zoopla.co.uk/api/v1/area_value_graphs.js?area=${postcode}&api_key=yaak6kxwh6s97dun9m85kg3f&size=large`
    )
      .then(res => res.json())
      .then(res => setGraph(res.value_trend_graph_url))
  }

  return user ? (
    <Layout>
      <h1 className="h4 font-weight-light mt-5">Portfolio overview:</h1>
      <table className="table mb-5">
        <thead>
          <tr>
            <th scope="col">Portfolio Value</th>
            <th scope="col">Equity</th>
            <th scope="col">Portfolio LTV</th>
            <th scope="col">Number of properties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>£{getPortfolioValue}K</td>
            <td>£{getEquity}K</td>
            <td>{getLTV}%</td>
            <td>{getProperties && getProperties.length}</td>
          </tr>
        </tbody>
      </table>

      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active text-secondary"
            id="nav-properties-tab"
            data-toggle="tab"
            href="#nav-properties"
            role="tab"
            aria-controls="nav-properties"
            aria-selected="true"
          >
            Properties
          </a>
          <a
            className="nav-item nav-link text-secondary"
            id="nav-performance-tab"
            data-toggle="tab"
            href="#nav-performance"
            role="tab"
            aria-controls="nav-performance"
            aria-selected="false"
          >
            Portfolio Analysis
          </a>
          <a
            className="nav-item nav-link text-secondary"
            id="nav-admin-tab"
            data-toggle="tab"
            href="#nav-admin"
            role="tab"
            aria-controls="nav-admin"
            aria-selected="false"
          >
            Admin
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-properties"
          role="tabpanel"
          aria-labelledby="nav-properties-tab"
        >
          {getProperties && <PropertyList properties={getProperties} />}
          <button
            type="button"
            className="btn btn-outline-secondary btn-block"
            data-toggle="modal"
            data-target="#addModal"
          >
            Add a property
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-block"
            data-toggle="modal"
            data-target="#removeModal"
          >
            Remove a property
          </button>
          <AddPropertyForm />
          <RemovePropertyForm properties={getProperties} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-performance"
          role="tabpanel"
          aria-labelledby="nav-performance-tab"
        >
          <h1 className="h4 font-weight-light mt-5">Performance:</h1>
          {graph && (
            <img src={graph} alt="" className="d-block mx-auto mt-5 mb-3" />
          )}
          <div className="form-group mt-5 mb-5">
            <select
              onChange={e => getGraph(e.target.value)}
              className="form-control"
            >
              <option value="">Select property to analyse</option>
              <option value="m27">Swinton</option>
              <option value="l13">Old Swan</option>
              <option value="rm11">Hornchurch</option>
            </select>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-admin"
          role="tabpanel"
          aria-labelledby="nav-admin-tab"
        >
          Admin
        </div>
      </div>

      <p className="h6 font-weight-light mt-3 mb-3">
        Polygon Labs Limited 2020
      </p>
    </Layout>
  ) : null
}

export default withApollo(Dashboard)
