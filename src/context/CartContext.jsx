import { useState } from "react";
import CartContext from "./cart-context";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {product, size, qty}

  const add = (product, size = "Large", qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id && i.size === size);
      if (found)
        return prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { product, size, qty }];
    });

  const setQty = (id, size, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const remove = (id, size) =>
    setItems((prev) => prev.filter((i) => !(i.product.id === id && i.size === size)));

  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, setQty, remove, clear, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}
