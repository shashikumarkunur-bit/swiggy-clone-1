import { useState, useEffect, useCallback } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import RestaurantCard from '../RestaurantCard'
import AppLoader from '../Loader'
import { fetchRestaurants } from '../../utils/api'
import { LIMIT } from '../../constants'
import './index.css'

const AllRestaurants = ({ activeSortOption, searchInput = '' }) => {
  const [restaurantsList, setRestaurantsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [hasError, setHasError] = useState(false)

  const getRestaurants = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)
    const offset = (activePage - 1) * LIMIT

    try {
      const data = await fetchRestaurants({
        offset,
        limit: LIMIT,
        sortBy: activeSortOption,
        search: searchInput,
      })
      const formattedRestaurants = (data.restaurants || []).map((item) => ({
        id: item.id,
        name: item.name,
        cuisine: item.cuisine,
        imageUrl: item.image_url,
        userRating: {
          rating: item.user_rating?.rating,
          ratingColor: item.user_rating?.rating_color,
          ratingText: item.user_rating?.rating_text,
          totalReviews: item.user_rating?.total_reviews,
        },
      }))
      setRestaurantsList(formattedRestaurants)
      setTotalRestaurants(data.total || 0)
    } catch (err) {
      console.error('Failed to fetch restaurants:', err)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [activePage, activeSortOption, searchInput])

  useEffect(() => {
    getRestaurants()
  }, [getRestaurants])

  // Reset page to 1 when sort option or search query changes
  useEffect(() => {
    setActivePage(1)
  }, [activeSortOption, searchInput])

  const totalPages = Math.ceil(totalRestaurants / LIMIT) || 1

  const onDecrementPage = () => {
    if (activePage > 1) {
      setActivePage((prev) => prev - 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  const onIncrementPage = () => {
    if (activePage < totalPages) {
      setActivePage((prev) => prev + 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  if (isLoading) {
    return <AppLoader testId="restaurants-list-loader" />
  }

  if (hasError) {
    return (
      <div className="restaurants-error-container">
        <h3>Something went wrong</h3>
        <p>We are having trouble fetching the restaurants. Please try again.</p>
        <button
          type="button"
          className="retry-btn"
          onClick={getRestaurants}
        >
          Retry
        </button>
      </div>
    )
  }

  if (restaurantsList.length === 0) {
    return (
      <div className="no-restaurants-view">
        <h3 className="no-restaurants-heading">No Results Found</h3>
        <p className="no-restaurants-caption">
          We couldn't find any restaurants matching your search.
        </p>
      </div>
    )
  }

  return (
    <div className="all-restaurants-container">
      <ul className="restaurants-list">
        {restaurantsList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>

      <div className="pagination-container">
        <button
          type="button"
          className="pagination-btn"
          testid="pagination-left-button"
          data-testid="pagination-left-button"
          onClick={onDecrementPage}
          disabled={activePage <= 1}
          aria-label="Previous Page"
        >
          <MdOutlineKeyboardArrowLeft className="pagination-arrow-icon" />
        </button>
        <p className="pagination-page-indicator">
          <span
            testid="active-page-number"
            data-testid="active-page-number"
          >
            {activePage}
          </span>{' '}
          of {totalPages}
        </p>
        <button
          type="button"
          className="pagination-btn"
          testid="pagination-right-button"
          data-testid="pagination-right-button"
          onClick={onIncrementPage}
          disabled={activePage >= totalPages}
          aria-label="Next Page"
        >
          <MdOutlineKeyboardArrowRight className="pagination-arrow-icon" />
        </button>
      </div>
    </div>
  )
}

export default AllRestaurants
