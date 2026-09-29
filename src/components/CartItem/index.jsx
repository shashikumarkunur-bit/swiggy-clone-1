import { HiOutlineMinusSm } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import './index.css'

const CartItem = ({ cartItemDetails }) => {
  const { incrementCartItemQuantity, decrementCartItemQuantity } = useCart()
  const { id, name, cost, quantity, imageUrl } = cartItemDetails

  const onIncrement = () => {
    incrementCartItemQuantity(id)
  }

  const onDecrement = () => {
    decrementCartItemQuantity(id)
  }

  return (
    <li
      className="cart-item-row"
      testid="cartItem"
      data-testid="cartItem"
    >
      <div className="cart-item-product-info">
        <img src={imageUrl} alt={name} className="cart-item-image" />
        <h4 className="cart-item-name">{name}</h4>
      </div>

      <div className="cart-quantity-controller">
        <button
          type="button"
          className="cart-quantity-btn"
          testid="decrement-quantity"
          data-testid="decrement-quantity"
          onClick={onDecrement}
          aria-label="decrease quantity"
        >
          <HiOutlineMinusSm className="cart-controller-icon" />
        </button>
        <span
          className="cart-item-quantity"
          testid="item-quantity"
          data-testid="item-quantity"
        >
          {quantity}
        </span>
        <button
          type="button"
          className="cart-quantity-btn"
          testid="increment-quantity"
          data-testid="increment-quantity"
          onClick={onIncrement}
          aria-label="increase quantity"
        >
          <BsPlus className="cart-controller-icon" />
        </button>
      </div>

      <div className="cart-item-price-container">
        <FaRupeeSign className="cart-rupee-icon" />
        <span className="cart-item-total-cost">{cost * quantity}</span>
      </div>
    </li>
  )
}

export default CartItem
