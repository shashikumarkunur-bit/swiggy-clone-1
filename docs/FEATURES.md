# Features Matrix — Tasty Kitchens

| Feature | Status | Component | Route | Description |
|---|---|---|---|---|
| **User Authentication** | Complete | `LoginForm` | `/login` | Secure sign-in with username/password, validation, and JWT persistence |
| **Protected Navigation** | Complete | `ProtectedRoute` | Protected routes | Guards private routes from unauthenticated access |
| **Promotional Carousel** | Complete | `Offers` | `/` | Responsive auto-playing banner slider showing promotional discounts |
| **Popular Restaurants Header** | Complete | `RestaurantsHeader` | `/` | Displays section title, descriptive caption, and sort-by rating selector |
| **Rating Sort Controls** | Complete | `RestaurantsHeader` | `/` | Allows user to sort restaurant results by Lowest or Highest rating |
| **Restaurant Catalog** | Complete | `AllRestaurants` | `/` | Grid of restaurant cards displaying image, name, cuisine, and rating |
| **Server-Side Pagination** | Complete | `AllRestaurants` | `/` | 9 items per page navigation with disabled state at boundary pages |
| **Restaurant Details** | Complete | `RestaurantDetails` | `/restaurant/:id` | Detailed restaurant banner with cuisine, rating, cost-for-two, and opening hours |
| **Food Menu Catalog** | Complete | `FoodItems` | `/restaurant/:id` | Card-based menu items with dish image, price, rating, and quantity controls |
| **Cart Quantity Logic** | Complete | `FoodItems` / `Cart` | `/restaurant/:id`, `/cart` | Direct add, increment, decrement, and item removal upon reaching quantity 0 |
| **Cart Persistence** | Complete | `CartContext` | Global / LocalStorage | Syncs cart state with `cartData` key in browser Local Storage |
| **Cart Review & Summary** | Complete | `Cart` | `/cart` | Tabular/card breakdown of selected dishes, subtotals, and overall order total |
| **Empty Cart Experience** | Complete | `CartEmpty` | `/cart` | Illustration, friendly messaging, and "Order Now" action when cart is empty |
| **Order Placement Flow** | Complete | `Cart` | `/cart` | Purges cart data and seamlessly transitions to payment confirmation |
| **Payment Confirmation** | Complete | `PaymentSuccess` | `/payment-success` | Success checkmark, order thank-you message, and "Go To Home Page" CTA |
| **Global Navigation** | Complete | `Header` | All routes | Logo, application title, active route highlights, cart badge, and logout |
| **Global Footer** | Complete | `Footer` | All routes | Branding, copyright note, and social media links with test IDs |
| **Page Not Found (404)** | Complete | `NotFound` | `*` | Catch-all error screen with graphic, clear description, and home button |
| **Responsive Design** | Complete | Global CSS | All screens | Fluid layouts optimized across mobile (320px-425px), tablet (768px), and desktop (1024px+) |
| **Loading Feedback** | Complete | `Loader` (`Oval`) | All dynamic views | Reusable spinner matching test IDs for offers, list, and details |
| **Restaurant Availability** | Complete | `RestaurantDetails` | `/restaurant/:id` | Controlled extension displaying `opens_at` time when available in API |
