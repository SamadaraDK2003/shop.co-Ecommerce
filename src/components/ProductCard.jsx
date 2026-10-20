import { Link } from "react-router-dom";

export function Stars({ rating }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-yellow-400 tracking-tight">
        {"★".repeat(Math.floor(rating))}
        {rating % 1 ? "⯨" : ""}
      </span>
      <span className="text-gray-500">{rating}/<span className="text-gray-400">5</span></span>
    </div>
  );
}

export default function ProductCard({ product: p }) {
  const off = p.old ? Math.round(((p.old - p.price) / p.old) * 100) : 0;
  return (
    <Link to={`/product/${p.id}`} className="block group">
      <div className="aspect-square rounded-[20px] bg-[#F0EEED] overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-bold mt-3 text-sm sm:text-base">{p.name}</h3>
      <Stars rating={p.rating} />
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xl font-bold">${p.price}</span>
        {p.old && <span className="text-xl font-bold text-gray-300 line-through">${p.old}</span>}
        {off > 0 && <span className="text-xs text-red-500 bg-red-100 rounded-full px-2 py-1">-{off}%</span>}
      </div>
    </Link>
  );
}
