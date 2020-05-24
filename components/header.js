import Link from 'next/link'
import { useUser } from '../lib/hooks'

const Header = () => {
  const user = useUser()

  return (
    <header className="row media bg-info pt-3 pb-3 mb-5">
      <div className="col"></div>
      <div className="col-6 d-flex">
        <Link href="/">
          <a className="nav-link text-white">
            <h1 className="h3 text-white">Propertydashboard.io</h1>
          </a>
        </Link>

        <nav className="media-body d-inline">
          <ul className="nav justify-content-end">
            {user ? (
              <>
                <li class="nav-item">
                  <a href="/api/logout" className="nav-link text-white">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li class="nav-item">
                <Link href="/login">
                  <a className="nav-link text-white">Login</a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="col"></div>
    </header>
  )
}

export default Header
