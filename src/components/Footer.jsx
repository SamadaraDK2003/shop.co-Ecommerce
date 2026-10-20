const cols = {
  COMPANY: ["About", "Features", "Works", "Career"],
  HELP: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  FAQ: ["Account", "Manage Deliveries", "Orders", "Payments"],
  RESOURCES: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-100 mt-40 sm:mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="-translate-y-1/2 absolute left-4 right-4 max-w-7xl mx-auto inset-x-0 bg-black text-white rounded-3xl px-6 md:px-16 py-8 grid md:grid-cols-2 gap-6 items-center">
          <h2 className="text-3xl md:text-4xl font-black leading-tight uppercase">
            Stay up to date about our latest offers
          </h2>
          <div className="space-y-3">
            <input type="email" placeholder="Enter your email address" className="w-full rounded-full bg-white text-black px-5 py-3 outline-none" />
            <button className="w-full rounded-full bg-white text-black font-medium py-3 hover:bg-gray-200">Subscribe to Newsletter</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-48 md:pt-32 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-3xl font-black">SHOP.CO</h3>
            <p className="text-sm text-gray-500 mt-4 max-w-xs">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
            <div className="flex gap-3 mt-6">
              {["𝕏", "f", "ig", "gh"].map((s) => (
                <span key={s} className="w-8 h-8 rounded-full border border-gray-300 bg-white grid place-items-center text-xs">{s}</span>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([h, items]) => (
            <div key={h}>
              <h4 className="tracking-widest font-medium mb-4">{h}</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                {items.map((i) => <li key={i}><a href="#" className="hover:text-black">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 mt-10 pt-5 flex flex-col sm:flex-row justify-between gap-3 text-sm text-gray-500">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-2">
            {["VISA", "MC", "PayPal", "Pay", "GPay"].map((p) => (
              <span key={p} className="bg-white border border-gray-200 rounded px-2 py-1 text-[10px] font-bold">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
