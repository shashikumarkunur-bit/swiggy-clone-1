# Cart Logic & Persistence — Tasty Kitchens

## 1. Cart Data Model
Cart items are stored under the exact key `cartData` in browser Local Storage. Each item object conforms strictly to the following specification:

```json
{
  "cost": 345,
  "quantity": 2,
  "id": "c3b24b72-3356-4c26-a2cf-8379eb9053cd",
  "imageUrl": "https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg",
  "name": "Chicken Salad"
}
```

### Required Fields
- `cost` (`number`): Price per single serving.
- `quantity` (`number`): Current count ordered (strictly positive integer).
- `id` (`string`): Unique food item identifier.
- `imageUrl` (`string`): URL of the food photo.
- `name` (`string`): Title of the dish.

---

## 2. Cart Operations & Transitions

### A. Adding an Item (`addCartItem`)
- Triggered by clicking the `ADD` button on an unselected dish.
- If the item does not exist in `cartList`, it is appended with `quantity: 1`.
- If it already exists, its quantity is incremented by 1.

### B. Incrementing Quantity (`incrementCartItemQuantity`)
- Triggered by clicking `+` (`data-testid="increment-count"` or `data-testid="increment-quantity"`).
- Updates item: `quantity = quantity + 1`.

### C. Decrementing Quantity (`decrementCartItemQuantity`)
- Triggered by clicking `-` (`data-testid="decrement-count"` or `data-testid="decrement-quantity"`).
- If `quantity > 1`, decrements by 1: `quantity = quantity - 1`.
- If `quantity === 1`, removes the item entirely from `cartList` (`.filter(item => item.quantity > 0)`).
- When an item is removed, its card switches back from the quantity controller to the initial `ADD` button.

### D. Clearing the Cart (`removeAllCartItems`)
- Invoked upon clicking the "Place Order" button.
- Empties `cartList` array (`[]`).
- Calls `localStorage.removeItem('cartData')`.

---

## 3. Subtotal & Order Total Calculations
- **Item Total:** `cost × quantity`
  - Example: `₹250 × 2 = ₹500`
- **Order Total:** `∑ (item.cost × item.quantity)` for all items in `cartList`.
- Rendered with `data-testid="total-price"`.

---

## 4. Persistence & Refresh Synchronization
- On initial load / page refresh:
  ```javascript
  const [cartList, setCartList] = useState(() => {
    try {
      const stored = localStorage.getItem('cartData')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  ```
- Every update to `cartList` synchronizes to `localStorage` automatically via a `useEffect` hook.
- Refreshing the browser preserves the exact cart contents, quantities, subtotals, and overall order total without state loss.
