const raw = [
  { id: 1, name: "T-shirt with Tape Details", price: 120, old: null, rating: 4.5, color: "#1f1f1f", cat: "Casual", img: "/120.png" },
  { id: 2, name: "Skinny Fit Jeans", price: 240, old: 260, rating: 3.5, color: "#2f4a73", cat: "Casual", img: "/240.png" },
  { id: 3, name: "Checkered Shirt", price: 180, old: null, rating: 4.5, color: "#7a1f2b", cat: "Formal", img: "/180.png" },
  { id: 4, name: "Sleeve Striped T-shirt", price: 130, old: 160, rating: 4.5, color: "#e2571f", cat: "Casual", img: "/130.png" },
  { id: 5, name: "Vertical Striped Shirt", price: 212, old: 232, rating: 5, color: "#5f7a5a", cat: "Formal", img: "/212.png" },
  { id: 6, name: "Courage Graphic T-shirt", price: 145, old: null, rating: 4, color: "#d9682b", cat: "Casual", img: "/145.png" },
  { id: 7, name: "Loose Fit Bermuda Shorts", price: 80, old: null, rating: 3, color: "#6e93c4", cat: "Gym", img: "/80.png" },
  { id: 8, name: "Faded Skinny Jeans", price: 210, old: null, rating: 4.5, color: "#222", cat: "Party", img: "/bw.png" },
  { id: 9, name: "Gradient Graphic T-shirt", price: 145, old: null, rating: 3.5, color: "#c9b8e8", cat: "Casual", img: "/graphic.png" },
  { id: 10, name: "Polo with Tipping Details", price: 180, old: null, rating: 4.5, color: "#b86b77", cat: "Party", img: "/polo.png" },
  { id: 11, name: "Black Striped T-shirt", price: 120, old: 150, rating: 5, color: "#444", cat: "Gym", img: "/120.png" },
  { id: 12, name: "One Life Graphic T-shirt", price: 260, old: 300, rating: 4, color: "#8a8a8a", cat: "Casual", img: "/260.png",
  images: ["/260.png", "/back.png", "/front.png", "/man.png"]
}
];

export const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

// every product gets a brand so the Brands page has something to filter
export const products = raw.map((p, i) => ({ ...p, brand: brands[i % brands.length] }));
