# Responsive Design — Tasty Kitchens

## 1. Responsive Philosophy
Tasty Kitchens is built with a mobile-first and fluid responsive mindset. Rather than merely scaling down desktop elements, layouts reorganize intelligently across device form factors to ensure optimal legibility, tap targets, and performance.

---

## 2. Breakpoints & Target Devices
- **Desktop (Large):** `≥ 1024px` (1440px, 1200px, 1024px)
- **Tablet:** `768px - 1023px`
- **Mobile (Standard & Small):** `320px - 767px` (425px, 375px, 320px)

---

## 3. Component-by-Component Responsive Adaptation

### A. Navigation Header (`Header`)
- **Desktop:** Horizontal arrangement featuring logo on the left and navigation links (Home, Cart with badge, Logout button) on the right.
- **Mobile (≤ 768px):** Collapses desktop nav items into a clean hamburger menu toggle (`FiMenu` / `FiX`). When opened, renders a dropdown with full-width touch-friendly tap targets.

### B. Authentication Screen (`LoginForm`)
- **Desktop:** Split-screen layout. Left panel features centered login card with form inputs; right panel displays full-height food hero visual.
- **Mobile (≤ 860px):** Food hero image container is cleanly hidden (`display: none`), focusing user attention entirely on the login card with no horizontal scrolling or cluttered overflow.

### C. Promotional Carousel (`Offers`)
- **Desktop:** Full-width bounded carousel banner (max-width 1200px) with custom navigation arrows.
- **Mobile:** Automatically adapts slide widths to 100% viewport width, with touch swipe support provided by `react-slick`.

### D. Restaurants Listing (`AllRestaurants`)
- **Desktop (≥ 1024px):** 3-column CSS Grid (`grid-template-columns: repeat(3, 1fr)`).
- **Tablet (641px - 1023px):** 2-column CSS Grid (`grid-template-columns: repeat(2, 1fr)`).
- **Mobile (≤ 640px):** 1-column stacked list (`grid-template-columns: 1fr`). Images maintain aspect ratio and padding remains comfortable.

### E. Restaurant Details & Menu (`RestaurantDetails`, `FoodItems`)
- **Banner Info:** Stacks horizontally on desktop with vertical divider lines; rearranges gracefully on mobile with wrapping stats.
- **Food Items Grid:** 2-column layout on desktop; single-column stacked card list on tablet and mobile.

### F. Shopping Cart (`Cart`)
- **Desktop:** Tabular layout with column headers (Item, Quantity, Price) and aligned totals.
- **Mobile (≤ 768px):** Adapts rows with product details on top, quantity controllers inline, and price aligned cleanly.

### G. Global Footer (`Footer`)
- Centered vertical layout with brand logo, concise tagline, and evenly spaced social icons with generous touch targets.
