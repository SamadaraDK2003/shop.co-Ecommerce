import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?cat=Casual", label: "On Sale" },
  { to: "/shop", label: "New Arrivals" },
  { to: "/shop", label: "Brands" },
];

export default function Navbar() {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white">
      {open && (
        <div className="relative bg-black text-white text-xs sm:text-sm text-center py-2 px-8">
          Sign up and get 20% off your first order.{" "}
          <Link to="/shop" className="underline font-medium">Sign Up Now</Link>
          <button onClick={() => setOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:block" aria-label="Close banner">✕</button>
        </div>
      )}
      <nav className="max-w-7xl mx-auto flex items-center gap-4 lg:gap-10 px-4 py-4">
        <button className="lg:hidden text-2xl" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
        <Link to="/" className="text-2xl sm:text-3xl font-black tracking-tight">SHOP.CO</Link>

        <ul className="hidden lg:flex gap-6 text-[15px]">
          {links.map((l) => (
            <li key={l.label}><NavLink to={l.to} className="hover:underline">{l.label}</NavLink></li>
          ))}
        </ul>

        <div className="hidden md:flex flex-1 items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
          <span className="text-gray-400">🔍</span>
          <input className="bg-transparent outline-none w-full text-sm" placeholder="Search for products..." />
        </div>

        <div className="flex items-center gap-4 ml-auto md:ml-0 text-xl">
          <Link to="/cart" className="relative" aria-label="Cart">
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] rounded-full w-5 h-5 grid place-items-center">{count}</span>
            )}
          </Link>
          <button aria-label="Account">👤</button>
        </div>
      </nav>
      {menu && (
        <ul className="lg:hidden px-4 pb-4 space-y-3 border-b">
          {links.map((l) => (
            <li key={l.label}><Link to={l.to} onClick={() => setMenu(false)}>{l.label}</Link></li>
          ))}
        </ul>
      )}
      <div className="border-b border-gray-200" />
    </header>
  );
}
