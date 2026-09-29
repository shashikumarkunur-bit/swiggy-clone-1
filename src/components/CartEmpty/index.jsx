import { Link } from 'react-router-dom'
import './index.css'

const CartEmpty = () => {
  return (
    <div className="empty-cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="order-now-btn">
        Order Now
      </Link>
    </div>
  )
}

export default CartEmpty
