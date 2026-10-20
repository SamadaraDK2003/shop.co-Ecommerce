import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const Row = ({ l, v, red }) => (
  <div className="flex justify-between text-lg">
    <span className="text-gray-500">{l}</span>
    <span className={`font-bold ${red ? "text-red-500" : ""}`}>{v}</span>
  </div>
);

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const nav = useNavigate();

  const discount = applied ? Math.round(subtotal * 0.2) : 0;
  const delivery = items.length ? 15 : 0;
  const total = subtotal - discount + delivery;

  if (!items.length)
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-black uppercase">Your cart is empty</h1>
        <p className="text-gray-500 mt-3">Add something you like and it will show up here.</p>
        <Link to="/shop" className="inline-block mt-8 bg-black text-white rounded-full px-12 py-3">Browse products</Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-5"><Link to="/">Home</Link> &gt; Cart</p>
      <h1 className="text-4xl md:text-5xl font-black uppercase mb-6">Your cart</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="border border-gray-200 rounded-2xl divide-y">
          {items.map(({ product: p, size, qty }) => (
            <div key={p.id + size} className="flex gap-4 p-4 sm:p-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gray-100 grid place-items-center shrink-0">
                <div className="w-1/2 h-1/2 rounded" style={{ background: p.color }} />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold sm:text-xl">{p.name}</h3>
                    <p className="text-sm">Size: <span className="text-gray-500">{size}</span></p>
                  </div>
                  <button onClick={() => remove(p.id, size)} className="text-red-500 self-start" aria-label="Remove item">🗑</button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold">${p.price}</span>
                  <div className="flex items-center gap-5 bg-gray-100 rounded-full px-4 py-2">
                    <button onClick={() => setQty(p.id, size, qty - 1)} aria-label="Decrease">−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(p.id, size, qty + 1)} aria-label="Increase">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <Row l="Subtotal" v={`$${subtotal}`} />
          {applied && <Row l="Discount (-20%)" v={`-$${discount}`} red />}
          <Row l="Delivery Fee" v={`$${delivery}`} />
          <hr />
          <div className="flex justify-between text-xl font-bold"><span>Total</span><span>${total}</span></div>
          <div className="flex gap-3">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Add promo code" className="flex-1 min-w-0 bg-gray-100 rounded-full px-5 py-3 outline-none" />
            <button onClick={() => setApplied(promo.trim().toUpperCase() === "SHOP20")} className="bg-black text-white rounded-full px-6">Apply</button>
          </div>
          {promo && !applied && <p className="text-xs text-gray-500">Try the code SHOP20.</p>}
          <button onClick={() => nav("/checkout")} className="w-full bg-black text-white rounded-full py-4 hover:bg-gray-800">Go to Checkout</button>
        </div>
      </div>
    </div>
  );
}
