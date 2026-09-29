import { BsFilterLeft, BsSearch } from 'react-icons/bs'
import { SORT_BY_OPTIONS } from '../../constants'
import './index.css'

const RestaurantsHeader = ({
  activeSortOption,
  onChangeSortOption,
  searchInput = '',
  onChangeSearchInput,
}) => {
  return (
    <div className="restaurants-header-section">
      <div className="restaurants-header-text">
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <p className="popular-restaurants-caption">
          Select Your favourite restaurant special dish and make your day happy...
        </p>
      </div>
      <div className="restaurants-actions-container">
        {onChangeSearchInput && (
          <div className="search-input-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              className="restaurant-search-input"
              placeholder="Search Restaurant..."
              value={searchInput}
              onChange={onChangeSearchInput}
              aria-label="Search restaurants"
            />
          </div>
        )}
        <div className="sort-by-container">
          <BsFilterLeft className="filter-icon" />
          <span className="sort-by-label">Sort By</span>
          <select
            className="sort-by-select"
            value={activeSortOption}
            onChange={onChangeSortOption}
            aria-label="Sort by rating"
          >
            {SORT_BY_OPTIONS.map((eachOption) => (
              <option key={eachOption.id} value={eachOption.value}>
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantsHeader
