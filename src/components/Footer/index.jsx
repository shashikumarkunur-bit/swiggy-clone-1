import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-section">
          <img
            src="https://res.cloudinary.com/zq6l7e9q/image/upload/v1789443971/Screenshot_2026-09-15_091517.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h1 className="footer-title">Tasty Kitchens</h1>
        </div>
        <p className="footer-description">
          The only thing we are serious about is food. Contact us on
        </p>
        <div className="footer-social-icons">
          <FaPinterestSquare
            className="social-icon"
            testid="pintrest-social-icon"
            data-testid="pintrest-social-icon"
          />
          <FaInstagram
            className="social-icon"
            testid="instagram-social-icon"
            data-testid="instagram-social-icon"
          />
          <FaTwitter
            className="social-icon"
            testid="twitter-social-icon"
            data-testid="twitter-social-icon"
          />
          <FaFacebookSquare
            className="social-icon"
            testid="facebook-social-icon"
            data-testid="facebook-social-icon"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
