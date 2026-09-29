import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import AppLoader from '../Loader'
import { fetchOffers } from '../../utils/api'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const Offers = () => {
  const [offersList, setOffersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getOffers = async () => {
      setIsLoading(true)
      try {
        const offers = await fetchOffers()
        setOffersList(offers)
      } catch (e) {
        console.error('Error fetching offers:', e)
      } finally {
        setIsLoading(false)
      }
    }

    getOffers()
  }, [])

  if (isLoading) {
    return <AppLoader testId="restaurants-offers-loader" />
  }

  if (offersList.length === 0) {
    return null
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    pauseOnHover: true,
  }

  return (
    <div className="offers-carousel-container">
      <Slider {...settings}>
        {offersList.map((offer) => (
          <div key={offer.id} className="carousel-slide">
            <img
              src={offer.image_url}
              alt="offer"
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Offers
