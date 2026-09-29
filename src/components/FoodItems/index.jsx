import { HiOutlineMinusSm } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import { FaRupeeSign, FaStar } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import './index.css'

export const FoodItemCard = ({ foodItem }) => {
  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useCart()

  const { id, name, cost, imageUrl, rating } = foodItem

  const cartItem = cartList.find((item) => item.id === id)
  const quantity = cartItem ? cartItem.quantity : 0

  const onClickAdd = () => {
    addCartItem({
      id,
      name,
      cost,
      imageUrl,
      quantity: 1,
    })
  }

  const onClickIncrement = () => {
    incrementCartItemQuantity(id)
  }

  const onClickDecrement = () => {
    decrementCartItemQuantity(id)
  }

  return (
    <li
      className="food-item-card"
      testid="foodItem"
      data-testid="foodItem"
    >
      <img src={imageUrl} alt={name} className="food-item-image" />
      <div className="food-item-details">
        <h4 className="food-item-name">{name}</h4>
        <div className="food-item-cost-container">
          <FaRupeeSign className="rupee-icon" />
          <span className="food-item-cost">{cost}</span>
        </div>
        <div className="food-item-rating">
          <FaStar className="star-icon" />
          <span className="rating-value">{rating}</span>
        </div>
        <div className="food-item-action">
          {quantity === 0 ? (
            <button
              type="button"
              className="add-food-btn"
              onClick={onClickAdd}
            >
              ADD
            </button>
          ) : (
            <div className="food-quantity-controller">
              <button
                type="button"
                className="quantity-controller-btn"
                testid="decrement-count"
                data-testid="decrement-count"
                onClick={onClickDecrement}
                aria-label="Decrease quantity"
              >
                <HiOutlineMinusSm className="controller-icon" />
              </button>
              <span
                className="active-food-count"
                testid="active-count"
                data-testid="active-count"
              >
                {quantity}
              </span>
              <button
                type="button"
                className="quantity-controller-btn"
                testid="increment-count"
                data-testid="increment-count"
                onClick={onClickIncrement}
                aria-label="Increase quantity"
              >
                <BsPlus className="controller-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

const FoodItems = ({ foodItems = [], foodItem }) => {
  if (foodItem) {
    return <FoodItemCard foodItem={foodItem} />
  }

  return (
    <ul className="food-items-list">
      {foodItems.map((item) => (
        <FoodItemCard key={item.id} foodItem={item} />
      ))}
    </ul>
  )
}

export default FoodItems
