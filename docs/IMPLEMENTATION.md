# Implementation Details — Tasty Kitchens

This document explains feature-by-feature implementation covering components, state, API interactions, logic, and edge cases.

---

## 1. Authentication (`LoginForm`)
- **File:** `src/components/LoginForm/index.jsx` & `index.css`
- **State:**
  - `username` (`string`): Controlled input for user handle.
  - `password` (`string`): Controlled input for password.
  - `errorMsg` (`string`): Error message received from CCBP API or local validation.
  - `showSubmitError` (`boolean`): Controls rendering of the error `<p>`.
  - `isLoading` (`boolean`): Disables the submit button and updates text to "Logging in...".
- **Logic:**
  - Performs `.trim()` on both fields to prevent accidental whitespace issues from clipboard paste.
  - POST request to `https://apis.ccbp.in/login` with `{ username, password }`.
  - On success (`data.jwt_token`), persists token via `setJwtToken()` in Cookies and LocalStorage, then replaces route to `/`.
  - On failure, displays `data.error_msg || 'Invalid username or password'`.
  - If user is already authenticated upon mounting, `useEffect` triggers navigation to `/`.
- **Edge Cases:**
  - Empty field submission prevented by HTML5 `required` attribute and explicit JavaScript fallback check.
  - Network disconnection or server error handled inside `try/catch` with helpful fallback message.

---

## 2. Protected Routing (`ProtectedRoute`)
- **File:** `src/components/ProtectedRoute/index.jsx`
- **Logic:**
  - Validates authentication token via `isAuthenticated()` (`src/utils/auth.js`).
  - If token is missing, returns `<Navigate to="/login" replace />`.
  - If valid, renders the nested child components.

---

## 3. Home Discovery & Carousel (`Home`, `Offers`)
- **Files:** `src/components/Home/index.jsx`, `src/components/Offers/index.jsx`
- **State:**
  - `offersList` (`array`): Carousel items retrieved from `fetchOffers()`.
  - `isLoading` (`boolean`): Controls the `restaurants-offers-loader`.
- **Logic:**
  - Fetches promotional banners from `https://apis.ccbp.in/restaurants-list/offers`.
  - Passes data to `react-slick` slider with infinite autoplay, dots, and responsive arrows.
  - Each image element includes `alt="offer"`.

---

## 4. Restaurant Header & Sorting (`RestaurantsHeader`)
- **File:** `src/components/RestaurantsHeader/index.jsx` & `index.css`
- **Props:**
  - `activeSortOption`: Current sort value (`Lowest` | `Highest`).
  - `onChangeSortOption`: Callback updating the parent sort state.
- **Logic:**
  - Displays "Popular Restaurants" and description: *"Select Your favourite restaurant special dish and make your day happy..."*.
  - Renders sort dropdown with `BsFilterLeft` icon and options populated from `SORT_BY_OPTIONS`.

---

## 5. Restaurant Listing & Pagination (`AllRestaurants`)
- **File:** `src/components/AllRestaurants/index.jsx` & `index.css`
- **State:**
  - `restaurantsList` (`array`): Current 9 restaurant items.
  - `isLoading` (`boolean`): Displays loader with `data-testid="restaurants-list-loader"`.
  - `activePage` (`number`): Active pagination page (1-indexed).
  - `totalRestaurants` (`number`): Total count returned from API (used to compute `totalPages = Math.ceil(total / 9)`).
  - `hasError` (`boolean`): Error state flag.
- **Logic:**
  - Constructs URL with `offset = (activePage - 1) * 9` and `limit = 9`.
  - Preserves selected `activeSortOption`.
  - When sorting changes, `activePage` resets to 1.
  - Left arrow button (`data-testid="pagination-left-button"`) disabled when `activePage <= 1`.
  - Right arrow button (`data-testid="pagination-right-button"`) disabled when `activePage >= totalPages`.
  - Displays current page indicator: `<span data-testid="active-page-number">{activePage}</span> of {totalPages}`.

---

## 6. Restaurant Details & Menu (`RestaurantDetails`, `FoodItems`)
- **Files:** `src/components/RestaurantDetails/index.jsx`, `src/components/FoodItems/index.jsx`
- **Logic:**
  - Extracts restaurant ID from URL path using `useParams()`.
  - Fetches metadata: banner image (`alt="restaurant"`), name, cuisine, location, rating, reviews count, cost for two, and opening hours (`opens_at`).
  - Maps `food_items` through `FoodItems` component.
  - Each item displays:
    - Food image, name, price (with `FaRupeeSign`), rating.
    - If item quantity in cart is 0: renders `ADD` button.
    - If item quantity in cart > 0: renders `[-] count [+]` controller with `HiOutlineMinusSm` and `BsPlus`.
    - Clicking `+` increments quantity; clicking `-` decrements quantity, removing item when count reaches 0.

---

## 7. Persistent Cart & Order Placement (`Cart`, `CartEmpty`, `PaymentSuccess`)
- **Files:** `src/components/Cart/index.jsx`, `src/components/CartEmpty/index.jsx`, `src/components/PaymentSuccess/index.jsx`
- **Logic:**
  - If `cartList` is empty, renders `CartEmpty` with `alt="empty cart"` and "Order Now" navigation button.
  - If `cartList` has items, renders table header (Item, Quantity, Price) and cart items list.
  - Calculates live subtotal for each row (`cost * quantity`) and order total (`data-testid="total-price"`).
  - Clicking "Place Order":
    - Invokes `removeAllCartItems()` which purges `cartData` from Local Storage and resets Context state.
    - Navigates user to `/payment-success`.
  - Payment Success view renders `FaCheckCircle` icon, "Payment Successful", "Thank you for ordering", "Your payment is successfully completed.", and "Go To Home Page" button routing to `/`.

---

## 8. Not Found / 404 Route (`NotFound`)
- **File:** `src/components/NotFound/index.jsx`
- **Logic:**
  - Rendered when path matches `*`.
  - Features 404 illustration with `alt="not found"`, title "Page Not Found", and "Home Page" button navigating to `/`.
