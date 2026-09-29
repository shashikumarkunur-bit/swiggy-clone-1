# Routing Document — Tasty Kitchens

## 1. Route Table
The application utilizes `react-router-dom` v6 for client-side navigation.

| Route | Component | Access Type | Redirect Behavior |
|---|---|---|---|
| `/login` | `LoginForm` | Public | If already authenticated, redirects to `/` |
| `/` | `Home` | Protected | If unauthenticated, redirects to `/login` |
| `/restaurant/:id` | `RestaurantDetails` | Protected | If unauthenticated, redirects to `/login` |
| `/cart` | `Cart` | Protected | If unauthenticated, redirects to `/login` |
| `/payment-success` | `PaymentSuccess` | Protected | If unauthenticated, redirects to `/login` |
| `*` | `NotFound` | Public Catch-all | Renders 404 Page Not Found view |

## 2. Route Specifications

### `/login`
- Accessible without authentication.
- Checks `getJwtToken()`. If valid token exists in cookies or localStorage, programmatically navigates to `/` using `replace: true`.
- Contains login card, form inputs, validation feedback, and food splash image.

### `/` (Home)
- Protected by `ProtectedRoute`.
- Houses the promotional offers carousel, restaurants header with sort dropdown, paginated restaurant list, and footer.

### `/restaurant/:id` (Restaurant Details)
- Protected by `ProtectedRoute`.
- Extracts `:id` using `useParams()` and retrieves restaurant metadata and menu items.
- If user refreshes on this page, authentication is preserved and details reload seamlessly.

### `/cart` (Cart)
- Protected by `ProtectedRoute`.
- Reads `cartData` from Local Storage through `CartContext`.
- If cart is empty, renders `CartEmpty`.
- If cart has items, renders item table, item quantity controls, total price, and "Place Order" button.

### `/payment-success` (Payment Success)
- Protected by `ProtectedRoute`.
- Navigated to immediately following a successful "Place Order" action.
- Features `FaCheckCircle` icon, congratulatory text, and a "Go To Home Page" link pointing to `/`.

### `*` (Catch-all)
- Matches any unmapped route (e.g. `/invalid-page`, `/xyz`).
- Renders `NotFound` view with `alt="not found"` image and a button to return to `/`.
