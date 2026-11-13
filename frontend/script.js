const API_URL = "http://localhost:5000/api/products";

// ---------- what the user has chosen right now ----------
const state = {
  categories: [],
  minPrice: 0,
  maxPrice: 50000,
  minRating: null,
  sortBy: "default"
};

// ---------- grab UI pieces ----------
const grid          = document.getElementById("productGrid");
const emptyState    = document.getElementById("emptyState");
const countLabel    = document.getElementById("countLabel");
const minSlider     = document.getElementById("minPrice");
const maxSlider     = document.getElementById("maxPrice");
const minLabel      = document.getElementById("minLabel");
const maxLabel      = document.getElementById("maxLabel");
const sortSelect    = document.getElementById("sortBy");
const categoryBoxes = document.querySelectorAll(".category-box");
const ratingRadios  = document.querySelectorAll(".rating-radio");

// ---------- turn user choices into a question URL ----------
function buildURL() {
  const params = new URLSearchParams();
  if (state.categories.length > 0) params.set("categories", state.categories.join(","));
  if (state.minPrice > 0)          params.set("minPrice", state.minPrice);
  if (state.maxPrice < 50000)      params.set("maxPrice", state.maxPrice);
  if (state.minRating)             params.set("minRating", state.minRating);
  if (state.sortBy !== "default")  params.set("sortBy", state.sortBy);
  const q = params.toString();
  return API_URL + (q ? "?" + q : "");
}

// ---------- ask backend, then paint the answer ----------
async function loadProducts() {
  try {
    const res = await fetch(buildURL());
    const products = await res.json();
    render(products);
  } catch (err) {
    grid.innerHTML = "<p>⚠️ Cannot reach backend. Is 'node server.js' running?</p>";
  }
}

function render(products) {
  countLabel.textContent = products.length + " product(s) found";

  if (products.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;      // show "No items match" screen
    return;
  }

  emptyState.hidden = true;
  grid.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}" />
      <div class="name">${p.name}</div>
      <div class="stars">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div>
      <div class="price">₹${p.price}</div>
    </div>
  `).join("");
}

// ---------- price sliders: min can never cross max ----------
function updatePriceState() {
  state.minPrice = Number(minSlider.value);
  state.maxPrice = Number(maxSlider.value);
  minLabel.textContent = "₹" + state.minPrice;
  maxLabel.textContent = "₹" + state.maxPrice;
}

minSlider.addEventListener("input", () => {
  if (Number(minSlider.value) > Number(maxSlider.value)) minSlider.value = maxSlider.value;
  updatePriceState();
  loadProducts();                 // instant — no submit button anywhere
});

maxSlider.addEventListener("input", () => {
  if (Number(maxSlider.value) < Number(minSlider.value)) maxSlider.value = minSlider.value;
  updatePriceState();
  loadProducts();
});

// ---------- category checkboxes ----------
categoryBoxes.forEach(box => {
  box.addEventListener("change", () => {
    state.categories = [...categoryBoxes].filter(b => b.checked).map(b => b.value);
    loadProducts();
  });
});

// ---------- rating radios ----------
ratingRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    state.minRating = radio.value;
    loadProducts();
  });
});

// ---------- sort dropdown ----------
sortSelect.addEventListener("change", () => {
  state.sortBy = sortSelect.value;
  loadProducts();
});

// ---------- reset everything ----------
function resetFilters() {
  categoryBoxes.forEach(b => (b.checked = false));
  ratingRadios.forEach(r => (r.checked = false));
  minSlider.value = 0;
  maxSlider.value = 50000;
  sortSelect.value = "default";
  state.categories = [];
  state.minRating = null;
  state.sortBy = "default";
  updatePriceState();
  loadProducts();
}
document.getElementById("resetBtn").addEventListener("click", resetFilters);
document.getElementById("resetBtn2").addEventListener("click", resetFilters);

// ---------- first paint when page opens ----------
updatePriceState();
loadProducts();