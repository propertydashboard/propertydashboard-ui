import React, { FunctionComponent } from 'react'
import Link from 'next/link'

interface PropertyListObjectProps {
  id: string
  name: string
  price: number
  mortgage: number
}

interface PropertyListProps {
  properties: PropertyListObjectProps[]
}

const PropertyList: FunctionComponent<PropertyListProps> = ({ properties }) => {
  return (
    <ul>
      {properties.map(p => {
        return (
          <li key={p.name + p.id}>
            <Link href={`/property/${p.id}`}>
              <a>{p.name}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default PropertyList
