# Authentication Document — Tasty Kitchens

## 1. Authentication Architecture
Tasty Kitchens employs token-based authentication interacting with the CCBP Authentication API (`https://apis.ccbp.in/login`).

```
  [User Enters Credentials]
              │
              ▼
  POST https://apis.ccbp.in/login
              │
      ┌───────┴───────┐
      ▼               ▼
 [200 Success]   [400 Error]
      │               │
  JWT Token      Error Message
      │               │
  Store in       Display Error
 Cookies &       on Form Card
LocalStorage
      │
      ▼
 Navigate to /
```

## 2. Credentials Contract
- **Endpoint:** `POST https://apis.ccbp.in/login`
- **Valid Test Credentials:**
  - **Username:** `rahul` (strictly lowercase)
  - **Password:** `rahul@2021`
  *(Alternative valid test account: `praneetha` / `praneetha@2021`)*
- **Sanitization:** All inputs are trimmed via `.trim()` before network transmission to prevent whitespace-related authentication failures.

## 3. Token Storage & Lifecycle
- **Storage Keys:**
  - `Cookies.set('jwt_token', token, { expires: 30 })`
  - `localStorage.setItem('jwt_token', token)`
- **Persistence Across Refreshes:** The application reads from `Cookies.get('jwt_token')` with fallback to `localStorage.getItem('jwt_token')`, ensuring persistent login sessions across page reloads and browser restarts.
- **Session Termination (Logout):**
  - Invoking `removeJwtToken()` removes both the cookie and the local storage item.
  - User is immediately redirected to `/login` with `replace: true`.

## 4. Protected Routes
- Encapsulated via `<ProtectedRoute>` component.
- If `isAuthenticated()` returns `false`, access to `/`, `/restaurant/:id`, `/cart`, and `/payment-success` is immediately aborted and redirected to `/login`.
- If an already authenticated user accesses `/login`, `LoginForm` detects the existing token and routes the user back to `/`.

## 5. Security Principles
- Passwords are typed into `<input type="password">` fields and never logged or exposed in client UI.
- Auth headers use the standard bearer token format:
  `Authorization: Bearer <jwt_token>`
