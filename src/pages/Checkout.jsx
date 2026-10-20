import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const Field = ({ label, ...rest }) => (
  <label className="block text-sm">
    <span className="text-gray-500">{label}</span>
    <input required {...rest} className="mt-1 w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black" />
  </label>
);

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);
  const total = subtotal + (items.length ? 15 : 0);

  if (done)
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-black uppercase">Order placed</h1>
        <p className="text-gray-500 mt-3">Thanks for shopping with us. A confirmation is on its way to your email.</p>
        <Link to="/" className="inline-block mt-8 bg-black text-white rounded-full px-12 py-3">Back to home</Link>
      </div>
    );

  if (!items.length)
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link to="/shop" className="underline">Go to shop</Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-4xl md:text-5xl font-black uppercase mb-6">Checkout</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }}
        className="grid lg:grid-cols-[1fr_380px] gap-5 items-start"
      >
        <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-2xl font-bold">Shipping details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First name" />
            <Field label="Last name" />
          </div>
          <Field label="Email" type="email" />
          <Field label="Address" />
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="City" />
            <Field label="Postal code" />
            <Field label="Phone" type="tel" />
          </div>
          <h2 className="text-2xl font-bold pt-4">Payment</h2>
          <Field label="Card number" inputMode="numeric" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry" placeholder="MM/YY" />
            <Field label="CVC" inputMode="numeric" />
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
          <h2 className="text-2xl font-bold">Your order</h2>
          {items.map(({ product: p, size, qty }) => (
            <div key={p.id + size} className="flex justify-between text-sm">
              <span>{p.name} ({size}) × {qty}</span>
              <span className="font-bold">${p.price * qty}</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between text-gray-500"><span>Delivery Fee</span><span>$15</span></div>
          <div className="flex justify-between text-xl font-bold"><span>Total</span><span>${total}</span></div>
          <button type="submit" className="w-full bg-black text-white rounded-full py-4 hover:bg-gray-800">Place Order</button>
        </div>
      </form>
    </div>
  );
}
