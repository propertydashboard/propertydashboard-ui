import Head from 'next/head'
import Header from './header'

const Layout = props => (
  <>
    <Head>
      <title>With Cookies</title>
    </Head>

    <Header />

    <main className="row">
      <div className="col"></div>
      <div className="col-6">{props.children}</div>
      <div className="col"></div>
    </main>
  </>
)

export default Layout
