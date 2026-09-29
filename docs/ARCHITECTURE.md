# Architecture Document — Tasty Kitchens

## 1. System Overview
The **Tasty Kitchens** web application is built as a single-page application (SPA) using React 18 and Vite. The design philosophy emphasizes modularity, separation of concerns, native React state management, and strict compliance with required data attributes (`data-testid`) and access control rules.

```
                          ┌──────────────────────────┐
                          │         App.jsx          │
                          │   (CartProvider Context) │
                          └─────────────┬────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
        Public Route (/login)                       ProtectedRoute Wrapper
                 │                                             │
          [ LoginForm ]                 ┌──────────────────────┼──────────────────────┐
                                        ▼                      ▼                      ▼
                                     Home (/)         RestaurantDetails      Cart (/cart)
                                        │             (/restaurant/:id)               │
                    ┌───────────────────┼──────────┐           │                      ▼
                    ▼                   ▼          ▼           ▼                 CartEmpty /
                 Offers         RestaurantsHeader  │       FoodItems              CartItem
                Carousel                │          │           │                      │
                                        ▼          ▼           ▼                      ▼
                                  AllRestaurants Footer    CartContext          PaymentSuccess
                                        │                      │              (/payment-success)
                                        ▼                      ▼
                                  RestaurantCard          LocalStorage
                                                           (cartData)
```

## 2. Component Hierarchy
1. **Root Layer:**
   - `main.jsx`: Mounts the React application into the DOM root and encapsulates it in `BrowserRouter`.
   - `App.jsx`: Declares `CartProvider` and defines routing endpoints.
2. **Routing & Security Layer:**
   - `ProtectedRoute.jsx`: Intercepts protected requests. If `jwt_token` is missing, redirects to `/login`.
   - `NotFound.jsx`: Handles any unregistered routes (`*`).
3. **View Layer:**
   - `LoginForm`: Handles authentication credentials, validation, API submission, and token persistence.
   - `Home`: Manages the discovery page, rendering `Offers`, `RestaurantsHeader`, and `AllRestaurants`.
   - `Offers`: Slick carousel consuming promo images from CCBP API.
   - `RestaurantsHeader`: Renders title, subtitle, and sort dropdown.
   - `AllRestaurants`: Handles paginated restaurant card grid (`LIMIT = 9`), loading state, and page controls.
   - `RestaurantDetails`: Reads restaurant ID via `useParams()`, renders metadata banner and menu.
   - `FoodItems`: Manages dish cards, price/rating display, and cart interaction triggers.
   - `Cart`: Manages cart table, quantity adjustments, order total calculation, and "Place Order" trigger.
   - `CartEmpty`: Renders empty cart graphic and "Order Now" navigation.
   - `PaymentSuccess`: Post-checkout celebration view with "Go To Home Page" CTA.
   - `Footer`: Global footer featuring branding and social media icons with exact test IDs.

## 3. State & Data Flow
- **Authentication State:**
  - Token is stored in `Cookies` (`jwt_token`) and mirrored to `localStorage`.
  - Checked synchronously in `ProtectedRoute` and `LoginForm` using `src/utils/auth.js`.
- **Cart State:**
  - Managed via React Context (`CartContext`).
  - Synced to `localStorage` under key `cartData` on every state mutation.
  - Initialized lazily from `localStorage` on page refresh to eliminate race conditions and flicker.
- **Server State:**
  - Managed via localized React state (`useState`, `useEffect`, `useCallback`) inside components.
  - Abstraction layer provided in `src/utils/api.js` for clean error isolation and reusable headers.

## 4. Design Decisions & Trade-offs
- **React Context vs Redux:** Because application state consists primarily of cart data and authentication status, React Context with custom hooks (`useCart`) provides optimal performance, clean ergonomics, and minimal bundle footprint without Redux boilerplate.
- **Centralized Constants & Utilities:** All constants (`LIMIT`, `API_URLS`, `STORAGE_KEYS`, `SORT_BY_OPTIONS`) and utilities (`api.js`, `auth.js`, `cart.js`) are decoupled from JSX markup for modular maintainability and easy unit testing.
