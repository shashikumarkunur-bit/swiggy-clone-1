import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaRupeeSign, FaClock } from 'react-icons/fa'
import Header from '../Header'
import FoodItems from '../FoodItems'
import Footer from '../Footer'
import AppLoader from '../Loader'
import { fetchRestaurantDetails } from '../../utils/api'
import './index.css'

const RestaurantDetails = () => {
  const { id } = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getRestaurantData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const data = await fetchRestaurantDetails(id)
      const formattedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: (data.food_items || []).map((food) => ({
          cost: food.cost,
          foodType: food.food_type,
          id: food.id,
          imageUrl: food.image_url,
          name: food.name,
          rating: food.rating,
        })),
      }
      setRestaurantData(formattedData)
    } catch (err) {
      console.error('Failed to fetch restaurant details:', err)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRestaurantData()
  }, [id])

  return (
    <div className="restaurant-details-route">
      <Header />
      {isLoading ? (
        <AppLoader testId="restaurant-details-loader" />
      ) : hasError || !restaurantData ? (
        <div className="restaurant-details-error">
          <h3>Something went wrong</h3>
          <p>We are unable to get the restaurant details. Please try again.</p>
          <button
            type="button"
            className="retry-btn"
            onClick={getRestaurantData}
          >
            Retry
          </button>
        </div>
      ) : (
        <main className="restaurant-details-container">
          {/* Restaurant Banner */}
          <section className="restaurant-banner-section">
            <div className="restaurant-banner-content">
              <img
                src={restaurantData.imageUrl}
                alt="restaurant"
                className="restaurant-banner-image"
              />
              <div className="restaurant-banner-info">
                <h1 className="restaurant-detail-name">
                  {restaurantData.name}
                </h1>
                <p className="restaurant-detail-cuisine">
                  {restaurantData.cuisine}
                </p>
                <p className="restaurant-detail-location">
                  {restaurantData.location}
                </p>
                <div className="restaurant-detail-stats">
                  <div className="stat-box">
                    <div className="stat-top">
                      <FaStar className="banner-star-icon" />
                      <span className="stat-highlight">
                        {restaurantData.rating}
                      </span>
                    </div>
                    <span className="stat-caption">
                      {restaurantData.reviewsCount}+ Ratings
                    </span>
                  </div>
                  <div className="vertical-divider" />
                  <div className="stat-box">
                    <div className="stat-top">
                      <FaRupeeSign className="banner-rupee-icon" />
                      <span className="stat-highlight">
                        {restaurantData.costForTwo}
                      </span>
                    </div>
                    <span className="stat-caption">Cost for two</span>
                  </div>
                  {restaurantData.opensAt && (
                    <>
                      <div className="vertical-divider" />
                      <div className="stat-box">
                        <div className="stat-top">
                          <FaClock className="banner-clock-icon" />
                          <span className="stat-highlight-small">
                            {restaurantData.opensAt}
                          </span>
                        </div>
                        <span className="stat-caption">Opening Hours</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Food Items Section */}
          <section className="food-items-section">
            <FoodItems foodItems={restaurantData.foodItems} />
          </section>
        </main>
      )}
      <Footer />
    </div>
  )
}

export default RestaurantDetails
