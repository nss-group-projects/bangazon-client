import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/state'

export default function Navbar() {
  const { token, profile } = useAppContext()
  const hamburger = useRef()
  const navbar = useRef()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    }
  }, [token])

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  const getLoggedInButtons = () => {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          <span className="icon">
            <i className="fas fa-user-circle is-medium"></i>
          </span>
        </a>
        <div className="navbar-dropdown is-right">
          <Link href="/cart"><a className="navbar-item">Cart</a></Link>
          <Link href="/my-orders"><a className="navbar-item">My Orders</a></Link>
          <Link href="/payments"><a className="navbar-item">Payment Methods</a></Link>
          <Link href="/profile"><a className="navbar-item">Profile</a></Link>
          {
            profile.store ?
              <>
                <Link href={`/stores/${profile.store.id}`}><a className="navbar-item">View Your Store</a></Link>
                <Link href="/products/new"><a className="navbar-item">Add a new Product</a></Link>
              </>
              :
              <Link href="/stores/new"><a className="navbar-item">Interested in selling?</a></Link>
          }
          <hr className="navbar-divider"></hr>
          <a className="navbar-item" onClick={
            () => {
              localStorage.removeItem('token')
              setIsLoggedIn(false)
            }}
          >
            Log out
          </a>
        </div>
      </div>
    )
  }

  const getLoggedOutButtons = () => {
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Link href="/register">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
          </Link>
          <Link href="/login">
            <a className="button is-light">
              Log in
            </a>
          </Link>
        </div>
      </div>
    )
  }

  return (

    <nav className="navbar mb-3 is-warning px-5 is-fixed-top is-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

          <Link href="/">
            <img src="/images/logo.png" alt="Logo" style={{ width:"4rem", height: "4rem"}} className="relative" />
          </Link>


        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref={hamburger} onClick={showMobileNavbar}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          <Link href="/products"><a className="navbar-item">Products</a></Link>
          <Link href="/stores"><a className="navbar-item">Stores</a></Link>
        </div>
        <div className="navbar-end">
          {
            isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()
          }
        </div>
      </div>
    </nav>
  )
}
