import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import './index.css'

const RestaurantCard = ({ restaurant }) => {
  const { id, name, cuisine, imageUrl, userRating } = restaurant
  const rating = userRating?.rating || restaurant.rating || 0
  const totalReviews =
    userRating?.totalReviews ||
    userRating?.total_reviews ||
    restaurant.totalReviews ||
    0

  return (
    <li
      className="restaurant-card-item"
      testid="restaurant-item"
      data-testid="restaurant-item"
    >
      <Link to={`/restaurant/${id}`} className="restaurant-card-link">
        <img src={imageUrl} alt="restaurant" className="restaurant-card-image" />
        <div className="restaurant-card-details">
          <h3 className="restaurant-name">{name}</h3>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-rating-container">
            <div className="rating-badge">
              <FaStar className="star-icon" />
              <span className="rating-value">{rating}</span>
            </div>
            <span className="rating-count">({totalReviews} ratings)</span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
