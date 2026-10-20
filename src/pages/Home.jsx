import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

/*
  Images (optional, put them in the /public folder):
    public/hero.jpg      -> the couple photo
    public/casual.jpg, formal.jpg, party.jpg, gym.jpg -> dress style photos
  If an image is missing it just hides itself, nothing breaks.
*/

const brands = [
  { name: "VERSACE", cls: "font-serif tracking-tight" },
  { name: "ZARA", cls: "font-serif italic tracking-tighter" },
  { name: "GUCCI", cls: "font-serif tracking-wide" },
  { name: "PRADA", cls: "font-serif font-black tracking-widest" },
  { name: "Calvin Klein", cls: "font-sans font-light tracking-tight" },
];

const styles = [
  { name: "Casual", img: "/casual.png", span: "md:col-span-1" },
  { name: "Formal", img: "/formal.png", span: "md:col-span-2" },
  { name: "Party", img: "/party.png", span: "md:col-span-2" },
  { name: "Gym", img: "/gym.png", span: "md:col-span-1" },
];

const reviews = [
  { n: "Sarah M.", t: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
  { n: "Alex K.", t: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
  { n: "James L.", t: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends." },
  { n: "Mooen", t: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection is diverse and on-point with the latest trends." },
  { n: "Nimal P.", t: "Fast delivery, great fit and the fabric feels premium. I've already ordered twice and recommended it to my friends." },
];

const Sparkle = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M50 0C52 28 72 48 100 50C72 52 52 72 50 100C48 72 28 52 0 50C28 48 48 28 50 0Z" fill="currentColor" />
  </svg>
);

const hideOnError = (e) => (e.currentTarget.style.display = "none");

const Heading = ({ children, className = "" }) => (
  <h2 className={`font-black uppercase tracking-tight text-3xl md:text-5xl ${className}`}>{children}</h2>
);

const ViewAll = () => (
  <div className="text-center mt-8 md:mt-10">
    <Link
      to="/shop"
      className="inline-block border border-black/10 rounded-full px-16 py-3 text-sm md:text-base hover:bg-black hover:text-white transition"
    >
      View All
    </Link>
  </div>
);

export default function Home() {
  const scroller = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  useEffect(update, []);

  const scrollBy = (dir) =>
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="bg-[#F2F0F1]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 md:min-h-[580px]">
          <div className="pt-10 md:pt-24 pb-6 md:pb-16 md:pr-6">
            <h1 className="font-black uppercase tracking-tight leading-[1.02] text-[40px] sm:text-5xl lg:text-[64px]">
              Find clothes that matches your style
            </h1>
            <p className="text-black/60 mt-5 md:mt-7 max-w-md text-sm md:text-base">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-6 md:mt-8 w-full sm:w-auto text-center bg-black text-white rounded-full px-14 py-3.5 hover:bg-black/80 transition"
            >
              Shop Now
            </Link>

            <div className="flex flex-wrap md:flex-nowrap items-center gap-y-4 mt-8 md:mt-12 justify-center md:justify-start">
              {[["200+", "International Brands"], ["2,000+", "High-Quality Products"], ["30,000+", "Happy Customers"]].map(
                ([n, l], i) => (
                  <div key={l} className={`px-4 md:px-8 first:pl-0 ${i ? "md:border-l border-black/10" : ""} ${i === 2 ? "w-full md:w-auto text-center md:text-left" : ""}`}>
                    <p className="text-2xl md:text-4xl font-bold">{n}</p>
                    <p className="text-xs md:text-sm text-black/60">{l}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* hero image */}
          <div className="relative flex items-end justify-center md:justify-end min-h-[380px]">
            <Sparkle className="absolute text-black w-14 md:w-24 top-6 right-2 md:top-16 md:right-0" />
            <Sparkle className="absolute text-black w-8 md:w-14 top-1/3 left-2 md:left-0" />
            <img
              src="/hero.jpg"
              alt="Couple wearing black denim jackets"
              onError={hideOnError}
              className="relative z-10 h-[380px] md:h-[600px] w-auto max-w-full object-contain object-bottom mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* ───────── Brands bar ───────── */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-11 flex flex-wrap justify-center md:justify-between items-center gap-x-10 gap-y-5 text-2xl md:text-4xl">
          {brands.map((b) => (
            <span key={b.name} className={b.cls}>{b.name}</span>
          ))}
        </div>
      </div>

      {/* ───────── New arrivals ───────── */}
      <section className="max-w-7xl mx-auto px-4 pt-12 md:pt-16 pb-12 md:pb-16">
        <Heading className="text-center mb-8 md:mb-14">New Arrivals</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <ViewAll />
      </section>

      <div className="max-w-7xl mx-auto px-4"><hr className="border-black/10" /></div>

      {/* ───────── Top selling ───────── */}
      <section className="max-w-7xl mx-auto px-4 pt-12 md:pt-16 pb-12 md:pb-16">
        <Heading className="text-center mb-8 md:mb-14">Top Selling</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {products.slice(4, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <ViewAll />
      </section>

      {/* ───────── Browse by dress style ───────── */}
      <section className="max-w-7xl mx-auto px-4 pb-12 md:pb-20">
        <div className="bg-[#F0F0F0] rounded-[28px] md:rounded-[40px] px-5 py-10 md:px-16 md:py-[70px]">
          <Heading className="text-center mb-8 md:mb-16">Browse by dress style</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {styles.map((s) => (
              <Link
                key={s.name}
                to={`/shop?cat=${s.name}`}
                className={`relative overflow-hidden bg-white rounded-[20px] h-44 md:h-72 ${s.span} group`}
              >
                <span className="absolute top-5 left-6 md:top-8 md:left-9 text-2xl md:text-4xl font-bold z-10">{s.name}</span>
                <img
                  src={s.img}
                  alt={s.name}
                  onError={hideOnError}
                  className="absolute right-0 top-0 h-full w-3/4 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Happy customers ───────── */}
      <section className="pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 flex items-end justify-between mb-6 md:mb-10">
          <Heading>Our happy customers</Heading>
          <div className="flex gap-2 md:gap-3">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => scrollBy(dir)}
                disabled={dir < 0 ? atStart : atEnd}
                aria-label={dir < 0 ? "Previous reviews" : "Next reviews"}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/15 grid place-items-center transition hover:bg-black hover:text-white hover:border-black active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={dir < 0 ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scroller}
          onScroll={update}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-4 md:px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <article
              key={r.n}
              className="snap-start shrink-0 w-[300px] md:w-[400px] border border-black/10 rounded-[20px] p-6 md:p-8"
            >
              <p className="text-[#FFC633] text-xl md:text-2xl tracking-wide">★★★★★</p>
              <p className="font-bold text-lg md:text-xl mt-3 flex items-center gap-2">
                {r.n}
                <span className="w-5 h-5 rounded-full bg-[#01AB31] text-white text-[11px] grid place-items-center">✓</span>
              </p>
              <p className="text-black/60 mt-2 text-sm md:text-base leading-relaxed">"{r.t}"</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}