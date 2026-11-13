const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ---------- MASTER PRODUCT INVENTORY ----------
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1500,  rating: 4, image: "https://placehold.co/200" },
  { id: 2, name: "Smartphone",          category: "Electronics", price: 15000, rating: 5, image: "https://placehold.co/200" },
  { id: 3, name: "T-Shirt",             category: "Apparel",     price: 500,   rating: 3, image: "https://placehold.co/200" },
  { id: 4, name: "Running Shoes",       category: "Footwear",    price: 2000,  rating: 4, image: "https://placehold.co/200" },
  { id: 5, name: "Laptop",              category: "Electronics", price: 50000, rating: 5, image: "https://placehold.co/200" },
  { id: 6, name: "Jeans",               category: "Apparel",     price: 1200,  rating: 4, image: "https://placehold.co/200" },
  { id: 7, name: "Sports Shoes",        category: "Footwear",    price: 900,   rating: 2, image: "https://placehold.co/200" }
];

// ---------- MAIN API: FILTER FIRST, THEN SORT ----------
app.get("/api/products", (req, res) => {
  let filteredProducts = [...products]; // start with ALL products

  const categories = req.query.categories;
  const minPrice   = req.query.minPrice;
  const maxPrice   = req.query.maxPrice;
  const minRating  = req.query.minRating;
  const sortBy     = req.query.sortBy;

  // 1) Category filter (only if user selected something)
  if (categories) {
    const selectedCategories = categories.split(",");
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category)
    );
  }

  // 2) Minimum price filter
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= Number(minPrice)
    );
  }

  // 3) Maximum price filter
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      product => product.price <= Number(maxPrice)
    );
  }

  // 4) Minimum rating filter
  if (minRating) {
    filteredProducts = filteredProducts.filter(
      product => product.rating >= Number(minRating)
    );
  }

  // 5) Sorting happens AFTER filtering (rule from problem statement)
  if (sortBy === "priceLowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "topRated") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // 6) Send the final list to whoever asked (frontend)
  res.json(filteredProducts);
});

// ---------- START THE SERVER ----------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});