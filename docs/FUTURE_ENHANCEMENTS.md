# Future Enhancements — Tasty Kitchens

This document captures realistic extensions strictly aligned with the Tasty Kitchens problem domain.

---

## 1. User Profile Screen (`/profile`)
- Display authenticated user metadata: username, avatar, membership status (e.g. `PRIME_USER`), and saved delivery addresses.
- Allow users to configure notification preferences and theme choices.

## 2. Real-Time Order Tracking & History
- Dedicated order history dashboard allowing users to view prior receipts, itemized costs, order dates, and statuses (e.g. "Delivered", "Preparing").
- Visual progress stepper simulating live delivery stages from kitchen preparation to doorstep arrival.

## 3. Advanced Dish Search & Dietary Filters
- Global or in-restaurant search filtering dishes by dietary tags (`VEG`, `NON-VEG`, `Spicy`, `Chef's Special`).
- Price range sliders and preparation time filters.

## 4. Multi-Restaurant Order Warning
- Contextual warning modal when attempting to add items from a second restaurant while the cart already contains items from the first restaurant, allowing users to either clear or proceed.

## 5. Offline Resiliency & Service Worker
- Progressive Web App (PWA) offline caching for restaurant menus and previous orders using Workbox service workers.
