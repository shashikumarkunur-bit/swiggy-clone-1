# Tasty Kitchens

A production-quality, responsive food ordering React web application connecting food lovers with top-rated local dining establishments.

---

## Project Overview
**Tasty Kitchens** provides users with an intuitive, end-to-end food ordering experience. Customers can browse curated promotional deals, filter and paginate through popular restaurants, inspect menus and dish reviews, manage a persistent shopping cart with live price recalculations, and complete orders with immediate payment confirmation.

---

## Problem Statement
Online food delivery applications often suffer from disjointed state management, fragile authentication lifecycles, lack of cart persistence upon page refresh, and poor mobile accessibility. Tasty Kitchens solves these challenges by providing a seamless, highly responsive, and robust frontend architecture integrated with live REST APIs.

---

## Objective
To build, test, debug, and document an end-to-end React web application adhering strictly to:
- Standardized component architecture and file layout.
- Protected client-side routing with automatic redirection.
- Real-time API consumption with error resilience and loading indicators.
- Local Storage synchronized cart persistence.
- Complete visual and interaction fidelity matching the project design specifications.

---

## Features
- **Secure Authentication:** Token-based sign-in with JWT, persistent session cookies, and route protection.
- **Promotional Carousel:** Auto-sliding banner carousel powered by `react-slick`.
- **Popular Restaurants Listing:** Dynamic grid displaying ratings, reviews, cuisine, and photos.
- **Rating Sort Controls:** On-demand sorting by `Lowest` or `Highest` rating.
- **Server-Side Pagination:** 9 restaurants per page navigation with active indicator and disabled states.
- **Restaurant Details & Availability:** Displays restaurant banner, cuisine, location, rating, cost for two, and operational opening hours (`opens_at`).
- **Food Menu Catalog:** Instant `ADD` button transitioning into inline `[-] quantity [+]` controllers.
- **Persistent Cart:** Automatic synchronization with `cartData` in Local Storage; retains items across page reloads.
- **Order Total Calculations:** Live calculations of individual item subtotals and complete cart total.
- **Empty Cart Handling:** Contextual illustration, helpful message, and "Order Now" navigation button.
- **Checkout & Payment Success:** One-click order completion that clears cart data and presents a confirmation screen.
- **404 Catch-All:** Custom "Page Not Found" screen guiding users back to safety.
- **Responsive Layout:** Tailored layouts for Mobile, Tablet, and Desktop viewports.

---

## Tech Stack
- **Core:** React 18, JavaScript (ES6+), JSX
- **Styling:** CSS3 (Vanilla CSS, CSS Grid, Flexbox, Custom Design Tokens)
- **Routing:** React Router v6 (`react-router-dom`)
- **State Management:** React Context API (`CartContext`) + Native Hooks (`useState`, `useEffect`, `useCallback`, `useParams`, `useNavigate`)
- **Persistence:** Browser Local Storage (`cartData`) & Cookies (`jwt_token` via `js-cookie`)
- **UI & Icons:** `react-icons` (`fa`, `bs`, `hi`, `md`, `fi`)
- **Carousel:** `react-slick` & `slick-carousel`
- **Loading Spinners:** `react-loader-spinner` (`Oval`)
- **Build Tool:** Vite
- **Testing:** Vitest, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`

---

## Application Flow
```
LOGIN (/login)
     ↓
HOME (/)
     ↓
OFFERS CAROUSEL + POPULAR RESTAURANTS
     ↓
SORT (Lowest / Highest) + PAGINATE (9 per page)
     ↓
RESTAURANT DETAILS (/restaurant/:id)
     ↓
ADD FOOD ITEMS ([ ADD ] → [ - ] quantity [ + ])
     ↓
CART (/cart)
     ↓
INCREASE / DECREASE QUANTITY → LIVE TOTAL UPDATE
     ↓
PLACE ORDER → CART CLEARED
     ↓
PAYMENT SUCCESS (/payment-success)
     ↓
RETURN TO HOME (/)
```

---

## Routes
| Route | Component | Access Type | Behavior |
|---|---|---|---|
| `/login` | `LoginForm` | Public | Redirects to `/` if already authenticated |
| `/` | `Home` | Protected | Redirects to `/login` if unauthenticated |
| `/restaurant/:id` | `RestaurantDetails` | Protected | Redirects to `/login` if unauthenticated |
| `/cart` | `Cart` | Protected | Redirects to `/login` if unauthenticated |
| `/payment-success` | `PaymentSuccess` | Protected | Redirects to `/login` if unauthenticated |
| `*` | `NotFound` | Public Catch-all | Renders 404 screen |

---

## API Endpoints
- **User Login:** `POST https://apis.ccbp.in/login`
- **Promotional Offers:** `GET https://apis.ccbp.in/restaurants-list/offers`
- **Restaurants Catalog:** `GET https://apis.ccbp.in/restaurants-list?offset={offset}&limit=9&sort_by_rating={sort}`
- **Restaurant Details:** `GET https://apis.ccbp.in/restaurants-list/{id}`

---

## Authentication
- Users log in via the Login Form.
- On valid credentials, a JWT token is returned and stored under key `jwt_token` in both `Cookies` and `localStorage`.
- Protected routes evaluate `isAuthenticated()`. If absent, users are redirected to `/login`.
- Clicking **Logout** removes tokens and redirects to `/login`.

---

## Cart Persistence
Cart items are stored in Local Storage under the key **`cartData`**. State is initialized lazily from Local Storage and synchronized on every mutation via `useEffect`, ensuring that refreshing the browser retains all cart items, individual quantities, and totals.

---

## Sorting
- Default Value: `Lowest`
- Permitted Values: `Lowest`, `Highest`
- Sorting parameter is sent directly to the API (`sort_by_rating={value}`).
- Modifying the sort value automatically resets the active page to 1.

---

## Pagination
- Strictly displays **9** restaurants per page (`limit = 9`).
- Offset calculation: `offset = (activePage - 1) * 9`.
- Previous button (`data-testid="pagination-left-button"`) disables when on page 1.
- Next button (`data-testid="pagination-right-button"`) disables when reaching `totalPages`.
- Active page indicator: `<span data-testid="active-page-number">1</span> of 4`.

---

## Responsive Design
- **Desktop (≥ 1024px):** Multi-column grids, split-screen login, full tabular cart view.
- **Tablet (768px - 1023px):** 2-column restaurant grids, optimized card sizes.
- **Mobile (320px - 767px):** 1-column stacked cards, collapsed hamburger menu drawer, touch-friendly buttons.

---

## Loading States
Implemented using `Oval` from `react-loader-spinner` (`color="gold" height={40} width={50}`):
- Offers Loader: `data-testid="restaurants-offers-loader"`
- Restaurant List Loader: `data-testid="restaurants-list-loader"`
- Restaurant Details Loader: `data-testid="restaurant-details-loader"`

---

## Error Handling
All API calls are wrapped in `try/catch` handlers inside `src/utils/api.js`. If an endpoint fails, clear error messages with actionable "Retry" buttons are rendered.

---

## Empty States
When the cart contains 0 items, `CartEmpty` displays an empty cooking graphic (`alt="empty cart"`), heading "No Orders Yet!", and an "Order Now" button that routes back to `/`.

---

## Payment Success Flow
1. User reviews cart items and clicks **Place Order**.
2. Cart state is reset and `cartData` is purged from Local Storage.
3. User is routed to `/payment-success`.
4. Screen displays `FaCheckCircle`, "Payment Successful", "Thank you for ordering", "Your payment is successfully completed.", and a "Go To Home Page" button.

---

## Folder Structure
```
TastyKitchensProject/
├── public/
├── src/
│   ├── components/
│   │   ├── AllRestaurants/
│   │   ├── Cart/
│   │   ├── CartEmpty/
│   │   ├── FoodItems/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Home/
│   │   ├── LoginForm/
│   │   ├── NotFound/
│   │   ├── ProtectedRoute/
│   │   ├── RestaurantDetails/
│   │   ├── RestaurantsHeader/
│   │   ├── PaymentSuccess/
│   │   ├── Offers/
│   │   └── Loader/
│   ├── context/
│   │   └── CartContext.jsx
│   ├── constants/
│   │   └── index.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── cart.js
│   ├── App.jsx
│   ├── App.css
│   ├── App.test.jsx
│   ├── main.jsx
│   ├── index.css
│   └── setupTests.js
├── docs/
├── README.md
├── package.json
└── vite.config.js
```

---

## Component Architecture
Components are organized into reusable units:
- **`Header`**: Branding, navigation links with active state indicator, cart count badge, logout.
- **`Footer`**: Branding, copyright, social icons with exact test IDs.
- **`Home`**: Orchestrates `Offers`, `RestaurantsHeader`, and `AllRestaurants`.
- **`AllRestaurants`**: Manages restaurant cards grid and pagination controls.
- **`RestaurantDetails`**: Displays banner, cuisine, rating, cost for two, opening hours, and menu.
- **`FoodItems`**: Renders food cards with interactive add/increment/decrement quantity controls.
- **`Cart`**: Manages cart table, quantity adjustments, and total calculation.
- **`CartEmpty`**: Empty cart illustration and redirect.
- **`PaymentSuccess`**: Order confirmation screen.
- **`NotFound`**: Catch-all 404 page.

---

## Local Storage Structure
Key: **`cartData`**
```json
[
  {
    "cost": 345,
    "quantity": 2,
    "id": "c3b24b72-3356-4c26-a2cf-8379eb9053cd",
    "imageUrl": "https://assets.ccbp.in/frontend/react-js/...",
    "name": "Chicken Salad"
  }
]
```

Key: **`jwt_token`** (mirrored from cookies for cross-tab persistence)

---

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open browser at `http://localhost:5173`.

---

## How to Test
Execute the automated test suite:
```bash
npm test
```

---

## Valid Login Credentials
* **Username:** `rahul` *(all lowercase)*
* **Password:** `rahul@2021`

*(Alternate test user: `praneetha` / `praneetha@2021`)*

---

## Future Enhancements
- User profile dashboard displaying user information (`/profile`).
- Order history tracking with itemized receipts and order dates.
- Real-time delivery status stepper.
- Dish category filter tags (`VEG`, `NON-VEG`).
