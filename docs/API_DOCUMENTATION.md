# API Documentation — Tasty Kitchens

All endpoints interact with the official CCBP Tasty Kitchens REST API service (`https://apis.ccbp.in`).

---

## 1. User Authentication
- **Method:** `POST`
- **Endpoint:** `https://apis.ccbp.in/login`
- **Purpose:** Authenticates user credentials and issues a JSON Web Token (JWT).
- **Headers:**
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Request Body:**
  ```json
  {
    "username": "rahul",
    "password": "rahul@2021"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response (400 Bad Request):**
  ```json
  {
    "status_code": 400,
    "error_msg": "username and password didn't match"
  }
  ```

---

## 2. Promotional Offers Carousel
- **Method:** `GET`
- **Endpoint:** `https://apis.ccbp.in/restaurants-list/offers`
- **Purpose:** Retrieves promotional banners for the home carousel.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "offers": [
      {
        "id": 1,
        "image_url": "https://assets.ccbp.in/frontend/react-js/tasty-kitchens/offers/offer-1.png"
      }
    ]
  }
  ```

---

## 3. Restaurants Listing (Paginated & Sorted)
- **Method:** `GET`
- **Endpoint:** `https://apis.ccbp.in/restaurants-list`
- **Query Parameters:**
  - `offset`: `number` (Default: `(activePage - 1) * 9`)
  - `limit`: `number` (Strict requirement: `9`)
  - `sort_by_rating`: `Lowest` | `Highest`
  - `search`: `string` (Optional search keyword)
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Example Request:**
  `https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort_by_rating=Lowest`
- **Response (200 OK):**
  ```json
  {
    "restaurants": [
      {
        "has_online_delivery": true,
        "user_rating": {
          "rating_text": "Average",
          "rating_color": "CDD614",
          "total_reviews": 345,
          "rating": 3.4
        },
        "name": "Village Traditional Foods",
        "has_table_booking": false,
        "is_delivering_now": true,
        "cost_for_two": 700,
        "cuisine": "North Indian, Chinese",
        "image_url": "https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg",
        "id": "2200043",
        "menu_type": "FOOD",
        "location": "Begumpet, Hyderabad",
        "opens_at": "10:00 AM, Tomorrow",
        "group_by_sub_category": false
      }
    ],
    "total": 30
  }
  ```

---

## 4. Restaurant Details & Menu
- **Method:** `GET`
- **Endpoint:** `https://apis.ccbp.in/restaurants-list/{id}`
- **Path Parameter:** `id` (e.g. `2200043`)
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "rating": 3.4,
    "id": "2200043",
    "name": "Village Traditional Foods",
    "cost_for_two": 700,
    "cuisine": "North Indian, Chinese",
    "image_url": "https://assets.ccbp.in/frontend/react-js/...",
    "reviews_count": 345,
    "opens_at": "10:00 AM, Tomorrow",
    "location": "1-8-303, Sindhi Colony Rd, Begumpet, Hyderabad",
    "items_count": 15,
    "food_items": [
      {
        "name": "Chicken Salad",
        "cost": 345,
        "food_type": "NON-VEG",
        "image_url": "https://assets.ccbp.in/frontend/react-js/...",
        "id": "2200043ddf818ab-15eb-4d7f-8284-589f24ed3c48",
        "rating": 4
      }
    ]
  }
  ```

---

## 5. Centralized Error Handling
All API interactions pass through `src/utils/api.js`. Network failures, bad request bodies, and server timeouts are caught via standard `try/catch` and transformed into user-friendly localized UI error states with actionable "Retry" buttons.
