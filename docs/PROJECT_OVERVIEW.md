# Project Overview — Tasty Kitchens

## 1. Executive Summary
**Tasty Kitchens** is an enterprise-grade, responsive food ordering web application built using React, React Router, and modern frontend design principles. The platform connects food enthusiasts with top-rated restaurants, providing an intuitive end-to-end user journey: browsing offers, exploring curated restaurant listings, sorting and paginating through dining establishments, exploring individual menus, managing a persistent shopping cart, placing orders, and confirming payment.

## 2. Target Audience
- **Consumers & Diners:** Individuals looking to explore restaurants, review ratings, inspect dish prices, and seamlessly order meals online.
- **Instructors & Evaluators:** Reviewers validating adherence to React conventions, component modularity, state management with React Context & Hooks, resilient API integration, and full test ID compliance.

## 3. Major Workflows
1. **Authentication Flow:**
   - Public access to `/login` with credentials validation (`rahul` / `rahul@2021`).
   - Secure token storage (`jwt_token` stored in Cookies and Local Storage).
   - Protected routes (`/`, `/restaurant/:id`, `/cart`, `/payment-success`) automatically redirect unauthenticated traffic to `/login`.
   - Authenticated users attempting to visit `/login` are forwarded to `/`.
   - Explicit logout clears tokens and redirects to `/login`.

2. **Discovery & Exploration Flow:**
   - **Offers Carousel:** Dynamic banners highlighting promotions fetched from the CCBP offers endpoint.
   - **Popular Restaurants Listing:** Paginated list of restaurants (strictly 9 items per page) with culinary tags, ratings, review counts, and images.
   - **Sorting & Filtering:** Real-time ordering by customer ratings (`Lowest` and `Highest`).
   - **Pagination:** Clean page navigation preserving selected sort criteria.

3. **Restaurant & Menu Inspection Flow:**
   - Dedicated restaurant details view (`/restaurant/:id`) presenting restaurant banner, cuisine, location, rating, cost for two, and opening hours.
   - Food menu items with images, dish titles, prices, ratings, and instant ADD / quantity modification toggles.

4. **Cart & Ordering Flow:**
   - Persistent cart synchronized with Local Storage (`cartData`).
   - Incremental and decremental quantity updates with immediate subtotal and order total recalculation.
   - Empty cart handling with an engaging illustration and quick-return "Order Now" action.
   - Order placement workflow that clears the cart and directs the user to the Payment Success screen.

5. **Payment Confirmation Flow:**
   - Visual success confirmation with green checkmark icon, acknowledgment text, and "Go To Home Page" CTA.

## 4. Application Pages
| Page | Route | Status | Description |
|---|---|---|---|
| **Login** | `/login` | Public / Redirects if Auth | Form with username, password, validation error states, and brand visuals |
| **Home** | `/` | Protected | Promo carousel, restaurant sorting, paginated restaurant cards, footer |
| **Restaurant Details** | `/restaurant/:id` | Protected | Restaurant banner info, operational hours, full food items list with add-to-cart |
| **Cart** | `/cart` | Protected | Table/card summary of selected dishes, item subtotals, order total, place order button |
| **Payment Success** | `/payment-success` | Protected | Order placed confirmation screen with return to home navigation |
| **Not Found** | `*` | Catch-all | 404 error page with illustration and return to homepage button |

## 5. Architectural Boundaries
- **No External State Libraries:** Relies on native React Context (`CartContext`) and Hooks (`useState`, `useEffect`, `useCallback`, `useParams`, `useNavigate`).
- **Data Persistence:** Client-side persistence using browser `localStorage` and `Cookies`.
- **API Contracts:** Integrates with official CCBP endpoints without mock replacement.
