import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const PaymentSuccess = () => {
  return (
    <div className="payment-success-route">
      <Header />
      <main className="payment-success-body">
        <div className="payment-success-card">
          <FaCheckCircle className="payment-success-icon" />
          <h1 className="payment-success-heading">Payment Successful</h1>
          <p className="payment-success-description">
            Thank you for ordering
            <br />
            Your payment is successfully completed.
          </p>
          <Link to="/" className="go-to-home-btn">
            Go To Home Page
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PaymentSuccess
