import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
