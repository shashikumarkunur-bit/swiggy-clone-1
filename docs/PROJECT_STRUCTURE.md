# Project Structure — Tasty Kitchens

This document details every directory and source file in the repository.

```
TastyKitchensProject/
│
├── public/
│   └── vite.svg                      # Vite brand icon
│
├── src/
│   ├── components/
│   │   ├── AllRestaurants/           # Paginated restaurant grid and page controls
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── Cart/                     # Cart page, tabular layout, order total & checkout
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── CartEmpty/                # Empty cart illustration and "Order Now" navigation
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── FoodItems/                # Food item card list with ADD / quantity toggle
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── Footer/                   # Global footer with brand tagline and social icons
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── Header/                   # Navigation bar with active route highlight & logout
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── Home/                     # Discovery landing page assembling sections
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── LoginForm/                # Authentication screen with credentials validation
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── NotFound/                 # 404 page with illustration and return button
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── ProtectedRoute/           # Route wrapper preventing unauthenticated access
│   │   │   └── index.jsx
│   │   │
│   │   ├── RestaurantCard/           # Single restaurant card representation
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── RestaurantDetails/        # Restaurant profile, banner, stats, and menu items
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── RestaurantsHeader/        # Header title, caption, and rating sort dropdown
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── PaymentSuccess/           # Order completion confirmation view
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── Offers/                   # Promotional offers carousel banner
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   └── Loader/                   # Reusable Oval spinner matching test IDs
│   │       ├── index.jsx
│   │       └── index.css
│   │
│   ├── context/
│   │   └── CartContext.jsx           # Global cart context with LocalStorage sync
│   │
│   ├── constants/
│   │   └── index.js                  # Global API endpoints, sort options, and limits
│   │
│   ├── utils/
│   │   ├── api.js                    # Fetch wrapper with headers and error handling
│   │   ├── auth.js                   # JWT token read, write, and removal utilities
│   │   └── cart.js                   # Cart price and LocalStorage calculation helpers
│   │
│   ├── App.jsx                       # Main router configuration and context provider
│   ├── App.css                       # Application base styles
│   ├── App.test.jsx                  # Vitest unit and integration test suite
│   ├── index.css                     # Global design tokens, typography, and resets
│   ├── main.jsx                      # Vite entry point mounting App to DOM
│   └── setupTests.js                 # Test environment setup and browser mocks
│
├── docs/                             # Technical documentation suite
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION.md
│   ├── API_DOCUMENTATION.md
│   ├── FEATURES.md
│   ├── ROUTING.md
│   ├── AUTHENTICATION.md
│   ├── CART_LOGIC.md
│   ├── TESTING.md
│   ├── RESPONSIVENESS.md
│   ├── PROJECT_STRUCTURE.md
│   ├── DECISIONS.md
│   └── FUTURE_ENHANCEMENTS.md
│
├── README.md                         # Complete project documentation and guide
├── package.json                      # NPM dependencies and scripts
└── vite.config.js                    # Vite configuration with Vitest setup
```
