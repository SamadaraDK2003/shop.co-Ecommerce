import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const colors = ["#00c12b", "#f50606", "#f5dd06", "#f57906", "#06caf5", "#063af5", "#7d06f5", "#f506a4", "#fff", "#000"];
const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"];
const cats = ["Casual", "Formal", "Party", "Gym"];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat");
  const [maxPrice, setMaxPrice] = useState(300);
  const [size, setSize] = useState("Large");
  const [color, setColor] = useState(null);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(() => {
    let r = products.filter((p) => (!cat || p.cat === cat) && p.price <= maxPrice);
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [cat, maxPrice, sort]);

  const Filters = (
    <aside className="border border-gray-200 rounded-2xl p-5 space-y-5 h-fit">
      <h3 className="font-bold text-xl">Filters</h3>
      <ul className="space-y-3 text-gray-500 border-b pb-5">
        {cats.map((c) => (
          <li key={c}>
            <button onClick={() => setParams(cat === c ? {} : { cat: c })} className={cat === c ? "text-black font-bold" : "hover:text-black"}>{c}</button>
          </li>
        ))}
      </ul>
      <div className="border-b pb-5">
        <h4 className="font-bold mb-3">Price: up to ${maxPrice}</h4>
        <input type="range" min="50" max="300" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-black" />
      </div>
      <div className="border-b pb-5">
        <h4 className="font-bold mb-3">Colors</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <button key={c} onClick={() => setColor(c)} style={{ background: c }} aria-label={c}
              className={`w-9 h-9 rounded-full border ${color === c ? "ring-2 ring-black ring-offset-2" : "border-gray-300"}`} />
          ))}
        </div>
      </div>
      <div className="border-b pb-5">
        <h4 className="font-bold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button key={s} onClick={() => setSize(s)} className={`rounded-full px-4 py-2 text-sm ${size === s ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>{s}</button>
          ))}
        </div>
      </div>
      <button className="w-full bg-black text-white rounded-full py-3" onClick={() => setShowFilters(false)}>Apply Filter</button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-5">Home &gt; Shop{cat ? ` > ${cat}` : ""}</p>
      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>{Filters}</div>
        <section>
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <h1 className="text-3xl font-bold">{cat || "All Products"}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>Showing {list.length} Products</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-black font-medium bg-transparent">
                <option value="popular">Most Popular</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <button className="lg:hidden bg-gray-100 rounded-full px-4 py-2 text-black" onClick={() => setShowFilters(!showFilters)}>Filters</button>
            </div>
          </div>
          {list.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-gray-500 py-20 text-center">No products match these filters. Try raising the price limit.</p>
          )}
        </section>
      </div>
    </div>
  );
}
