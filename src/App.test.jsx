import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import FoodItems from './components/FoodItems'
import Cart from './components/Cart'
import CartItem from './components/CartItem'
import CartEmpty from './components/CartEmpty'
import PaymentSuccess from './components/PaymentSuccess'
import NotFound from './components/NotFound'
import AppLoader from './components/Loader'
import RestaurantsHeader from './components/RestaurantsHeader'
import { calculateItemTotal, calculateOrderTotal } from './utils/cart'
import { STORAGE_KEYS } from './constants'

describe('Tasty Kitchens Comprehensive Test Suite', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Header Component', () => {
    it('renders logo with alt="website logo" and navigation items', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <Header />
          </CartProvider>
        </MemoryRouter>
      )

      const logo = screen.getByAltText('website logo')
      expect(logo).toBeInTheDocument()
      expect(screen.getByText('Tasty Kitchens')).toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Cart')).toBeInTheDocument()
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
  })

  describe('Footer Component', () => {
    it('renders footer logo and all required social icons with data-testid attributes', () => {
      render(<Footer />)

      expect(screen.getByAltText('website-footer-logo')).toBeInTheDocument()
      expect(screen.getByTestId('pintrest-social-icon')).toBeInTheDocument()
      expect(screen.getByTestId('instagram-social-icon')).toBeInTheDocument()
      expect(screen.getByTestId('twitter-social-icon')).toBeInTheDocument()
      expect(screen.getByTestId('facebook-social-icon')).toBeInTheDocument()
    })
  })

  describe('LoginForm Component', () => {
    it('renders input elements, labels, and images correctly', () => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      )

      expect(screen.getByAltText('website logo')).toBeInTheDocument()
      expect(screen.getByAltText('website login')).toBeInTheDocument()
      expect(screen.getByLabelText('USERNAME')).toBeInTheDocument()
      expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })
  })

  describe('FoodItems Component & Cart Interactions', () => {
    const mockFoodItem = {
      id: 'food-item-1',
      name: 'Paneer Butter Masala',
      cost: 250,
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/paneer.jpg',
      rating: 4.5,
    }

    it('displays ADD button initially and switches to controller upon adding', () => {
      render(
        <CartProvider>
          <FoodItems foodItems={[mockFoodItem]} />
        </CartProvider>
      )

      expect(screen.getByTestId('foodItem')).toBeInTheDocument()
      const addBtn = screen.getByRole('button', { name: 'ADD' })
      expect(addBtn).toBeInTheDocument()

      fireEvent.click(addBtn)

      expect(screen.getByTestId('active-count')).toHaveTextContent('1')
      expect(screen.getByTestId('increment-count')).toBeInTheDocument()
      expect(screen.getByTestId('decrement-count')).toBeInTheDocument()

      // Increment
      fireEvent.click(screen.getByTestId('increment-count'))
      expect(screen.getByTestId('active-count')).toHaveTextContent('2')

      // Decrement back
      fireEvent.click(screen.getByTestId('decrement-count'))
      expect(screen.getByTestId('active-count')).toHaveTextContent('1')

      // Decrement to 0
      fireEvent.click(screen.getByTestId('decrement-count'))
      expect(screen.getByRole('button', { name: 'ADD' })).toBeInTheDocument()
    })
  })

  describe('Cart Item Component & Pricing', () => {
    const mockCartItemDetails = {
      id: 'cart-item-1',
      name: 'Chicken Dum Biryani',
      cost: 300,
      quantity: 2,
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/biryani.jpg',
    }

    it('renders cartItem with quantity controllers and total price calculation', () => {
      render(
        <CartProvider>
          <CartItem cartItemDetails={mockCartItemDetails} />
        </CartProvider>
      )

      expect(screen.getByTestId('cartItem')).toBeInTheDocument()
      expect(screen.getByTestId('item-quantity')).toHaveTextContent('2')
      expect(screen.getByTestId('decrement-quantity')).toBeInTheDocument()
      expect(screen.getByTestId('increment-quantity')).toBeInTheDocument()
      expect(screen.getByText('600')).toBeInTheDocument() // 300 * 2
    })
  })

  describe('EmptyCart Component', () => {
    it('renders empty cart illustration with alt="empty cart" and Order Now button', () => {
      render(
        <MemoryRouter>
          <CartEmpty />
        </MemoryRouter>
      )

      expect(screen.getByAltText('empty cart')).toBeInTheDocument()
      expect(screen.getByText('No Orders Yet!')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Order Now' })).toHaveAttribute(
        'href',
        '/'
      )
    })
  })

  describe('PaymentSuccess Component', () => {
    it('renders payment success text and Go To Home Page link', () => {
      render(
        <MemoryRouter>
          <CartProvider>
            <PaymentSuccess />
          </CartProvider>
        </MemoryRouter>
      )

      expect(screen.getByText('Payment Successful')).toBeInTheDocument()
      expect(screen.getByText(/Thank you for ordering/i)).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'Go To Home Page' })
      ).toHaveAttribute('href', '/')
    })
  })

  describe('NotFound Component', () => {
    it('renders 404 message and Home Page button with alt="not found"', () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      )

      expect(screen.getByAltText('not found')).toBeInTheDocument()
      expect(screen.getByText('Page Not Found')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Home Page' })).toHaveAttribute(
        'href',
        '/'
      )
    })
  })

  describe('RestaurantsHeader Component', () => {
    it('renders Popular Restaurants title, caption, and sort dropdown', () => {
      render(
        <RestaurantsHeader
          activeSortOption="Lowest"
          onChangeSortOption={() => {}}
        />
      )

      expect(screen.getByText('Popular Restaurants')).toBeInTheDocument()
      expect(
        screen.getByText(/Select Your favourite restaurant special dish/i)
      ).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toHaveValue('Lowest')
    })
  })

  describe('Loader Component', () => {
    it('renders with supplied data-testid', () => {
      render(<AppLoader testId="restaurants-list-loader" />)
      expect(screen.getByTestId('restaurants-list-loader')).toBeInTheDocument()
    })
  })

  describe('Cart Utilities & Storage Persistence', () => {
    it('calculates item totals and full order totals accurately', () => {
      expect(calculateItemTotal(250, 3)).toBe(750)
      const list = [
        { cost: 200, quantity: 2 },
        { cost: 150, quantity: 3 },
      ]
      expect(calculateOrderTotal(list)).toBe(850)
    })

    it('persists cartData to localStorage key', () => {
      const sample = [{ id: '1', name: 'Dish', cost: 100, quantity: 1 }]
      localStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(sample))
      expect(localStorage.getItem('cartData')).toContain('Dish')
    })
  })

  describe('End-to-End Authentication and Order Flow Integration', () => {
    it('authenticates user and writes jwt_token to storage', async () => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      )

      const usernameInput = screen.getByLabelText('USERNAME')
      const passwordInput = screen.getByLabelText('PASSWORD')
      const loginButton = screen.getByRole('button', { name: /login/i })

      fireEvent.change(usernameInput, { target: { value: 'rahul' } })
      fireEvent.change(passwordInput, { target: { value: 'rahul@2021' } })
      fireEvent.click(loginButton)

      // Verify token is set in localStorage
      await waitFor(() => {
        expect(localStorage.getItem('jwt_token')).toBeTruthy()
      }, { timeout: 4000 })
    })

    it('manages complete cart lifecycle: add, increment, subtotal calculation, and clear', () => {
      const mockItem = {
        id: 'food-e2e-1',
        name: 'Veg Biryani',
        cost: 200,
        imageUrl: 'https://assets.ccbp.in/frontend/react-js/biryani.jpg',
        rating: 4.8,
      }

      render(
        <MemoryRouter>
          <CartProvider>
            <FoodItems foodItems={[mockItem]} />
            <Cart />
          </CartProvider>
        </MemoryRouter>
      )

      // Initially cart is empty
      expect(screen.getByText('No Orders Yet!')).toBeInTheDocument()

      // Click ADD on FoodItem
      const addBtn = screen.getByRole('button', { name: 'ADD' })
      fireEvent.click(addBtn)

      // Active count should be 1
      expect(screen.getByTestId('active-count')).toHaveTextContent('1')

      // Increment
      fireEvent.click(screen.getByTestId('increment-count'))
      expect(screen.getByTestId('active-count')).toHaveTextContent('2')

      // Cart table should now display the item, quantity 2, and total 400
      expect(screen.getByTestId('total-price')).toHaveTextContent('400')

      // Place order
      const placeOrderBtn = screen.getByRole('button', { name: 'Place Order' })
      fireEvent.click(placeOrderBtn)

      // Cart in localStorage is cleared
      expect(JSON.parse(localStorage.getItem('cartData') || '[]')).toEqual([])
    })
  })
})
