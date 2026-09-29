import { useState } from 'react'
import Header from '../Header'
import Offers from '../Offers'
import RestaurantsHeader from '../RestaurantsHeader'
import AllRestaurants from '../AllRestaurants'
import Footer from '../Footer'
import { SORT_BY_OPTIONS } from '../../constants'
import './index.css'

const Home = () => {
  const [activeSortOption, setActiveSortOption] = useState(
    SORT_BY_OPTIONS[0].value
  )
  const [searchInput, setSearchInput] = useState('')

  const onChangeSortOption = (e) => {
    setActiveSortOption(e.target.value)
  }

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="home-route-container">
      <Header />
      <Offers />
      <main className="home-body-container">
        <RestaurantsHeader
          activeSortOption={activeSortOption}
          onChangeSortOption={onChangeSortOption}
          searchInput={searchInput}
          onChangeSearchInput={onChangeSearchInput}
        />
        <hr className="divider-line" />
        <AllRestaurants
          activeSortOption={activeSortOption}
          searchInput={searchInput}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Home
