import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import PaymentSuccess from './components/PaymentSuccess'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './context/CartContext'
import './App.css'

export { SORT_BY_OPTIONS as sortByOptions } from './constants'

const App = () => (
  <CartProvider>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </CartProvider>
)

export default App
