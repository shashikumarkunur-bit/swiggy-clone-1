import { useNavigate } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa'
import Header from '../Header'
import CartItem from '../CartItem'
import CartEmpty from '../CartEmpty'
import Footer from '../Footer'
import { useCart } from '../../context/CartContext'
import { calculateOrderTotal } from '../../utils/cart'
import './index.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cartList, removeAllCartItems } = useCart()

  const onClickPlaceOrder = () => {
    removeAllCartItems()
    navigate('/payment-success')
  }

  const totalPrice = calculateOrderTotal(cartList)

  const renderCartContent = () => {
    if (cartList.length === 0) {
      return <CartEmpty />
    }

    return (
      <div className="cart-content-container">
        <div className="cart-table-header">
          <span className="header-item">Item</span>
          <span className="header-quantity">Quantity</span>
          <span className="header-price">Price</span>
        </div>
        <ul className="cart-list">
          {cartList.map((item) => (
            <CartItem key={item.id} cartItemDetails={item} />
          ))}
        </ul>
        <hr className="cart-divider" />
        <div className="cart-summary-section">
          <div className="order-total-row">
            <span className="order-total-text">Order Total:</span>
            <div className="total-amount-wrapper">
              <FaRupeeSign className="summary-rupee-icon" />
              <span
                className="total-amount"
                testid="total-price"
                data-testid="total-price"
              >
                {totalPrice}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="place-order-btn"
            onClick={onClickPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-route-container">
      <Header />
      <main className="cart-body-container">{renderCartContent()}</main>
      <Footer />
    </div>
  )
}

export default Cart
