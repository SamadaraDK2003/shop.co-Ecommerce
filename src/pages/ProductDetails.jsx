import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard, { Stars } from "../components/ProductCard";
import { useCart } from "../context/useCart";

const sizes = ["Small", "Medium", "Large", "X-Large"];
const tabs = ["Product Details", "Rating & Reviews", "FAQs"];
const reviews = [
  { n: "Samantha D.", t: "Great quality and the fit is spot on. It's become my favorite shirt." },
  { n: "Alex M.", t: "The fabric feels premium and the design is unique. Got lots of compliments." },
  { n: "Ethan R.", t: "Perfect for casual days. Washes well and keeps its shape." },
  { n: "Olivia P.", t: "Looks even better in person. Would happily buy again." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const p = products.find((x) => x.id === +id) || products[0];
  const { add } = useCart();
  const [size, setSize] = useState("Large");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(1);
  // p.images = [front, back, model]. Falls back to p.img if you only have one.
  const images = p.images ?? [p.img, p.img, p.img];
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(0);
  const swatches = ["#4F4631", "#314F4A", "#31344F"];
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    add(p, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-5"><Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt; {p.cat} &gt; {p.name}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[120px_1fr] gap-3 md:gap-4">
          <div className="flex flex-col gap-3 md:gap-4">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`aspect-square rounded-[16px] bg-[#F0EEED] overflow-hidden border-2 transition ${
                  active === i ? "border-black" : "border-transparent hover:border-black/30"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="rounded-[20px] bg-[#F0EEED] overflow-hidden aspect-[3/4] md:aspect-auto md:h-full min-h-[360px]">
            <img src={images[active]} alt={p.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase">{p.name}</h1>
          <div className="my-3"><Stars rating={p.rating} /></div>
          <div className="flex items-center gap-3 text-3xl font-bold">
            ${p.price}
            {p.old && <span className="text-black/30 line-through">${p.old}</span>}
            {p.old && (
              <span className="text-sm font-medium text-red-500 bg-red-100 rounded-full px-3 py-1">
                -{Math.round(((p.old - p.price) / p.old) * 100)}%
              </span>
            )}
          </div>
          <p className="text-gray-500 my-5 border-b pb-5">This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>

          <h4 className="text-black/60 mb-3">Select Colors</h4>
          <div className="flex gap-3 border-b pb-5 mb-5">
            {swatches.map((c, i) => (
              <button
                key={c}
                onClick={() => setColor(i)}
                aria-label={`Color ${i + 1}`}
                style={{ background: c }}
                className="w-9 h-9 rounded-full grid place-items-center text-white text-sm"
              >
                {color === i && "✓"}
              </button>
            ))}
          </div>

          <h4 className="text-black/60 mb-3">Choose Size</h4>
          <div className="flex flex-wrap gap-2 border-b pb-5 mb-5">
            {sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`rounded-full px-6 py-3 text-sm ${size === s ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>{s}</button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex items-center justify-between bg-gray-100 rounded-full px-5 py-3 w-36">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
            <button onClick={addToCart} className="flex-1 bg-black text-white rounded-full py-3 hover:bg-gray-800">
              {added ? "Added to cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b mt-14 text-center">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`pb-4 text-sm sm:text-lg ${tab === i ? "border-b-2 border-black font-bold" : "text-gray-500"}`}>{t}</button>
        ))}
      </div>
      <div className="py-8">
        {tab === 1 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r) => (
              <div key={r.n} className="border border-gray-200 rounded-2xl p-6">
                <p className="text-yellow-400">★★★★★</p>
                <p className="font-bold mt-2">{r.n} <span className="text-green-500 text-sm">✔</span></p>
                <p className="text-gray-500 mt-2">"{r.t}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{tab === 0 ? "100% cotton, machine washable, regular fit." : "Free returns within 30 days. Delivery takes 3–5 business days."}</p>
        )}
      </div>

      <h2 className="text-3xl md:text-5xl font-black uppercase text-center my-10">You might also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.filter((x) => x.id !== p.id).slice(7, 11).map((x) => <ProductCard key={x.id} product={x} />)}
      </div>
    </div>
  );
}