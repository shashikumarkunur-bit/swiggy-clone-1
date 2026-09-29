import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { removeJwtToken } from '../../utils/auth'
import { useCart } from '../../context/CartContext'
import './index.css'

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { cartList } = useCart()

  const onLogout = () => {
    removeJwtToken()
    navigate('/login', { replace: true })
  }

  const isHomeActive = location.pathname === '/'
  const isCartActive = location.pathname === '/cart'
  const cartItemsCount = cartList.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="header-logo-link">
          <img
            src="https://res.cloudinary.com/zq6l7e9q/image/upload/v1789443971/Screenshot_2026-09-15_091517.png"
            alt="website logo"
            className="header-logo"
          />
          <span className="header-title">Tasty Kitchens</span>
        </Link>

        
        <nav className="desktop-nav-items">
          <Link
            to="/"
            className={`nav-link ${isHomeActive ? 'active-nav-link' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className={`nav-link ${isCartActive ? 'active-nav-link' : ''}`}
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </nav>

       
        <button
          type="button"
          className="mobile-hamburger-btn"
          onClick={() => setShowMobileMenu((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
        >
          {showMobileMenu ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      
      {showMobileMenu && (
        <nav className="mobile-nav-items">
          <Link
            to="/"
            className={`mobile-nav-link ${isHomeActive ? 'active-nav-link' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className={`mobile-nav-link ${isCartActive ? 'active-nav-link' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
          <button
            type="button"
            className="logout-btn mobile-logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header
