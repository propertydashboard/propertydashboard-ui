import React, { FunctionComponent } from 'react'
import Link from 'next/link'

interface PropertyListObjectProps {
  id: string
  name: string
  price: number
  mortgage: number
  image: string
}

interface PropertyListProps {
  properties: PropertyListObjectProps[]
}

const PropertyList: FunctionComponent<PropertyListProps> = ({ properties }) => {
  return (
    <div className="d-flex  mb-5">
      {properties.map(p => {
        return (
          <div key={p.name + p.id} className="card m-2">
            <img src={p.image} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">
                Property based in {p.name}, currently valued at £{p.price}k
              </p>
              <Link href={`/property/${p.id}`}>
                <a className="text-secondary">View/Edit</a>
              </Link>
            </div>
          </div>
        )
      })}
      <style jsx>{`
        .card {
          min-width: calc(33.3% - 13px);
          max-width: calc(33.3% - 13px);
        }

        .card img {
          max-height: 200px;
        }
      `}</style>
    </div>
  )
}

export default PropertyList
