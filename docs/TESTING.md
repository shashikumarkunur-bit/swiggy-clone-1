# Testing Document — Tasty Kitchens

## 1. Test Architecture
The test suite utilizes **Vitest** paired with **@testing-library/react** and **jsdom** to simulate user behavior, verify component rendering, validate accessibility, and ensure exact test ID compatibility.

### Running Tests
```bash
npm test
```

---

## 2. Required Test ID Reference Matrix
All test IDs mandated by the project specification are strictly implemented:

| Element / Feature | Required `data-testid` | Component | Verification Status |
|---|---|---|---|
| Restaurant Card Item | `restaurant-item` | `RestaurantCard` | Verified |
| Offers Carousel Loader | `restaurants-offers-loader` | `Offers` / `Loader` | Verified |
| Restaurant List Loader | `restaurants-list-loader` | `AllRestaurants` / `Loader` | Verified |
| Pagination Previous Button | `pagination-left-button` | `AllRestaurants` | Verified |
| Pagination Next Button | `pagination-right-button` | `AllRestaurants` | Verified |
| Active Page Number | `active-page-number` | `AllRestaurants` | Verified |
| Restaurant Details Loader | `restaurant-details-loader` | `RestaurantDetails` / `Loader` | Verified |
| Food Item Card | `foodItem` | `FoodItems` | Verified |
| Food Active Count | `active-count` | `FoodItems` | Verified |
| Food Decrement Button | `decrement-count` | `FoodItems` | Verified |
| Food Increment Button | `increment-count` | `FoodItems` | Verified |
| Cart Item Row | `cartItem` | `CartItem` | Verified |
| Cart Decrement Button | `decrement-quantity` | `CartItem` | Verified |
| Cart Increment Button | `increment-quantity` | `CartItem` | Verified |
| Cart Item Quantity Text | `item-quantity` | `CartItem` | Verified |
| Cart Total Price | `total-price` | `Cart` | Verified |
| Pinterest Social Icon | `pintrest-social-icon` | `Footer` | Verified |
| Instagram Social Icon | `instagram-social-icon` | `Footer` | Verified |
| Twitter Social Icon | `twitter-social-icon` | `Footer` | Verified |
| Facebook Social Icon | `facebook-social-icon` | `Footer` | Verified |

---

## 3. Required Alt Attributes Reference Matrix
| Image Purpose | Required `alt` Value | Component |
|---|---|---|
| Website Logo (Header & Login) | `alt="website logo"` | `Header`, `LoginForm` |
| Website Login Landing Graphic | `alt="website login"` | `LoginForm` |
| Carousel Offer Image | `alt="offer"` | `Offers` |
| Restaurant Catalog Card Image | `alt="restaurant"` | `RestaurantCard` |
| Restaurant Details Banner Image | `alt="restaurant"` | `RestaurantDetails` |
| Empty Cart Illustration | `alt="empty cart"` | `CartEmpty` |
| Page Not Found Illustration | `alt="not found"` | `NotFound` |
| Footer Brand Logo | `alt="website-footer-logo"` | `Footer` |

---

## 4. Manual Test Cases & Execution Checklist
- [x] **Authentication:** Login with `rahul`/`rahul@2021` grants access. Invalid credentials display error message.
- [x] **Logout:** Clicking Logout clears tokens and redirects to `/login`.
- [x] **Route Protection:** Direct navigation to `/cart` or `/restaurant/123` when logged out redirects to `/login`.
- [x] **Offers Carousel:** Slides smoothly and loads promotional graphics.
- [x] **Sorting:** Switching between `Lowest` and `Highest` updates the restaurant catalog order.
- [x] **Pagination:** Clicking next loads the next 9 items, updates page indicator to "2 of 4", and disables previous button on page 1.
- [x] **Restaurant Details:** Opening a restaurant loads banners, cuisine tags, cost for two, and food items.
- [x] **Menu Interactions:** Clicking `ADD` increases quantity from 0 to 1 and shows `[-] 1 [+]`. Clicking `+` increments to 2. Clicking `-` twice returns to `ADD`.
- [x] **Cart View:** Displays selected items, updates quantity, recalculates price (`cost × quantity`) and overall order total.
- [x] **Cart Persistence:** Refreshing the browser retains cart contents intact from `cartData`.
- [x] **Empty Cart:** When all items are removed or initially empty, displays "No Orders Yet!" and "Order Now" button.
- [x] **Place Order:** Clears cart and navigates to `/payment-success`.
- [x] **Payment Success:** Displays checkmark, completion message, and "Go To Home Page" CTA.
- [x] **404 Page:** Random URLs trigger "Page Not Found" with link back to Home.
