// ===== Konfiguration =====
const PROFILES = [
  { name: "Falk", emoji: "🦅", color: "#2b6cb0" },
  { name: "Leni", emoji: "🌻", color: "#d97706" },
  { name: "Lilly", emoji: "🌸", color: "#d6336c" },
  { name: "Test", emoji: "🧪", color: "#4b5563" }
];
const ORDER_EMAIL = "felix.n3003@gmail.com"; // Empfänger der Bestellzusammenfassung

// ===== State =====
let currentProfile = null;
let cart = new Set(); // Set von plantId – jede Pflanze gibt es nur einmal, keine Mengen
let favorites = new Set(); // Set von plantId – gemerkte Lieblingspflanzen pro Profil
let activeFilters = { search: "", category: "", size: "", care: "", light: "", importance: "", onlyFavorites: false };

// ===== Helpers für localStorage (pro Profil eigener Warenkorb & eigene Favoriten) =====
function profileKey(profile) {
  return `pflanzenshop_cart_${profile}`;
}
function favoritesKey(profile) {
  return `pflanzenshop_favorites_${profile}`;
}

function loadCart(profile) {
  try {
    const raw = localStorage.getItem(profileKey(profile));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function loadFavorites(profile) {
  try {
    const raw = localStorage.getItem(favoritesKey(profile));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function saveCart() {
  if (!currentProfile) return;
  localStorage.setItem(profileKey(currentProfile), JSON.stringify([...cart]));
}

function saveFavorites() {
  if (!currentProfile) return;
  localStorage.setItem(favoritesKey(currentProfile), JSON.stringify([...favorites]));
}

function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  saveFavorites();
  renderGrid();
}

function getPlant(id) {
  return PLANTS.find(p => p.id === id);
}

// ===== Profil-Gate =====
function initProfileGate() {
  const list = document.getElementById("profileList");
  list.innerHTML = "";
  PROFILES.forEach(profile => {
    const btn = document.createElement("button");
    btn.className = "profile-card";
    btn.style.setProperty("--profile-color", profile.color);
    btn.innerHTML = `<span class="profile-avatar">${profile.emoji}</span><span class="profile-name">${profile.name}</span>`;
    btn.addEventListener("click", () => selectProfile(profile.name));
    list.appendChild(btn);
  });

  const savedProfile = localStorage.getItem("pflanzenshop_active_profile");
  if (savedProfile && PROFILES.some(p => p.name === savedProfile)) {
    selectProfile(savedProfile, true);
  }
}

function selectProfile(name, skipSave) {
  currentProfile = name;
  cart = loadCart(name);
  favorites = loadFavorites(name);
  if (!skipSave) localStorage.setItem("pflanzenshop_active_profile", name);

  const profile = PROFILES.find(p => p.name === name);

  document.getElementById("profileGate").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("currentProfileLabel").textContent = `${profile ? profile.emoji : "👤"} ${name}`;

  renderGrid();
  updateCartCount();
}

document.getElementById("switchProfileBtn").addEventListener("click", () => {
  localStorage.removeItem("pflanzenshop_active_profile");
  document.getElementById("app").classList.add("hidden");
  document.getElementById("profileGate").classList.remove("hidden");
  closeAllModals();
});

// ===== Filter-Optionen befüllen =====
function initFilterOptions() {
  const categories = [...new Set(PLANTS.map(p => p.category))].sort();
  const sizes = [...new Set(PLANTS.map(p => p.size))];
  const sizeOrder = ["Klein", "Mittel", "Groß"];
  sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
  const cares = ["Niedrig", "Mittel", "Hoch"].filter(c => PLANTS.some(p => p.care === c));
  const lights = [...new Set(PLANTS.map(p => p.light))];
  const importanceOrder = ["Niedrig", "Mittel", "Hoch"];
  const importances = importanceOrder.filter(i => PLANTS.some(p => p.importance === i));

  fillSelect("categoryFilter", categories);
  fillSelect("sizeFilter", sizes);
  fillSelect("careFilter", cares);
  fillSelect("lightFilter", lights);
  fillSelect("importanceFilter", importances);
}

function fillSelect(id, values) {
  const sel = document.getElementById(id);
  values.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    sel.appendChild(opt);
  });
}

// ===== Filtern & Suchen =====
function getFilteredPlants() {
  const q = activeFilters.search.trim().toLowerCase();
  return PLANTS.filter(p => {
    if (q && !p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    if (activeFilters.category && p.category !== activeFilters.category) return false;
    if (activeFilters.size && p.size !== activeFilters.size) return false;
    if (activeFilters.care && p.care !== activeFilters.care) return false;
    if (activeFilters.light && p.light !== activeFilters.light) return false;
    if (activeFilters.importance && p.importance !== activeFilters.importance) return false;
    if (activeFilters.onlyFavorites && !favorites.has(p.id)) return false;
    return true;
  });
}

function renderGrid() {
  const grid = document.getElementById("plantGrid");
  const plants = getFilteredPlants();
  grid.innerHTML = "";

  document.getElementById("noResults").classList.toggle("hidden", plants.length > 0);
  document.getElementById("resultCount").textContent =
    `${plants.length} von ${PLANTS.length} Pflanzen`;

  plants.forEach(p => {
    const inCart = cart.has(p.id);
    const isFav = favorites.has(p.id);
    const card = document.createElement("div");
    card.className = "plant-card" + (inCart ? " in-cart" : "");
    card.innerHTML = `
      <div class="plant-card-image-wrap" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <button class="fav-btn ${isFav ? "is-fav" : ""}" data-fav="${p.id}" aria-label="Merken" title="Merken">${isFav ? "♥" : "♡"}</button>
        ${inCart ? '<span class="in-cart-ribbon">Ausgewählt ✓</span>' : ""}
      </div>
      <div class="plant-card-body">
        <h3 class="plant-card-name" data-id="${p.id}">${p.name}</h3>
        <div class="badge-row">
          <span class="badge">📏 ${p.size}</span>
          <span class="badge badge-care-${p.care}">🛠️ ${p.care}</span>
          <span class="badge">☀️ ${p.light}</span>
          <span class="badge">💧 ${p.waterWinter}</span>
          <span class="badge badge-importance-${p.importance}">❤️ ${p.importance}</span>
        </div>
        <div class="plant-card-footer">
          <button class="btn-primary ${inCart ? "is-selected" : ""}" data-toggle="${p.id}">${inCart ? "Ausgewählt ✓ (abwählen)" : "Auswählen"}</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".plant-card-image-wrap, .plant-card-name").forEach(el => {
    el.addEventListener("click", () => openDetail(el.dataset.id));
  });
  grid.querySelectorAll("[data-toggle]").forEach(btn => {
    btn.addEventListener("click", () => toggleCartItem(btn.dataset.toggle));
  });
  grid.querySelectorAll("[data-fav]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.fav);
    });
  });
}

// ===== Filter-Events =====
document.getElementById("searchInput").addEventListener("input", e => {
  activeFilters.search = e.target.value;
  renderGrid();
});
document.getElementById("categoryFilter").addEventListener("change", e => {
  activeFilters.category = e.target.value;
  renderGrid();
});
document.getElementById("sizeFilter").addEventListener("change", e => {
  activeFilters.size = e.target.value;
  renderGrid();
});
document.getElementById("careFilter").addEventListener("change", e => {
  activeFilters.care = e.target.value;
  renderGrid();
});
document.getElementById("lightFilter").addEventListener("change", e => {
  activeFilters.light = e.target.value;
  renderGrid();
});
document.getElementById("importanceFilter").addEventListener("change", e => {
  activeFilters.importance = e.target.value;
  renderGrid();
});
document.getElementById("favoritesFilterBtn").addEventListener("click", () => {
  activeFilters.onlyFavorites = !activeFilters.onlyFavorites;
  document.getElementById("favoritesFilterBtn").classList.toggle("active", activeFilters.onlyFavorites);
  renderGrid();
});
document.getElementById("resetFilters").addEventListener("click", () => {
  activeFilters = { search: "", category: "", size: "", care: "", light: "", importance: "", onlyFavorites: false };
  document.getElementById("searchInput").value = "";
  document.getElementById("favoritesFilterBtn").classList.remove("active");
  ["categoryFilter", "sizeFilter", "careFilter", "lightFilter", "importanceFilter"].forEach(id => {
    document.getElementById(id).value = "";
  });
  renderGrid();
});

// ===== Detailansicht =====
function openDetail(id) {
  const p = getPlant(id);
  if (!p) return;
  const inCart = cart.has(id);
  const isFav = favorites.has(id);
  document.getElementById("detailImage").src = p.image;
  document.getElementById("detailImage").alt = p.name;
  document.getElementById("detailCategory").textContent = p.category;
  document.getElementById("detailName").textContent = p.name;
  document.getElementById("detailSize").textContent = p.size;
  document.getElementById("detailCare").textContent = p.care;
  document.getElementById("detailLight").textContent = p.light;
  document.getElementById("detailWater").textContent = p.waterWinter;
  document.getElementById("detailImportance").textContent = p.importance;
  document.getElementById("detailDesc").textContent = p.desc;
  const addBtn = document.getElementById("detailAddBtn");
  addBtn.dataset.id = p.id;
  addBtn.classList.toggle("is-selected", inCart);
  addBtn.textContent = inCart ? "Ausgewählt ✓ (abwählen)" : "Auswählen";
  const favBtn = document.getElementById("detailFavBtn");
  favBtn.dataset.id = p.id;
  favBtn.classList.toggle("is-fav", isFav);
  favBtn.textContent = isFav ? "♥ Gemerkt" : "♡ Merken";
  document.getElementById("detailModal").classList.remove("hidden");
}

document.getElementById("detailAddBtn").addEventListener("click", e => {
  toggleCartItem(e.target.dataset.id);
  openDetail(e.target.dataset.id);
});
document.getElementById("detailFavBtn").addEventListener("click", e => {
  toggleFavorite(e.target.dataset.id);
  openDetail(e.target.dataset.id);
});
document.getElementById("detailClose").addEventListener("click", () => closeModal("detailModal"));
document.getElementById("detailBackdrop").addEventListener("click", () => closeModal("detailModal"));

// ===== Warenkorb =====
// Jede Pflanze ist ein Einzelstück – sie kann nur einmal ausgewählt sein.
// Ein erneuter Klick auf "Ausgewählt" wählt die Pflanze wieder ab.
function addToCart(id) {
  if (cart.has(id)) return;
  cart.add(id);
  saveCart();
  updateCartCount();
  flashCartButton();
  renderGrid();
}

function toggleCartItem(id) {
  if (cart.has(id)) {
    removeFromCart(id);
  } else {
    addToCart(id);
  }
}

function removeFromCart(id) {
  cart.delete(id);
  saveCart();
  updateCartCount();
  renderCart();
  renderGrid();
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.size;
}

function flashCartButton() {
  const btn = document.getElementById("cartBtn");
  btn.style.transform = "scale(1.08)";
  setTimeout(() => (btn.style.transform = "scale(1)"), 150);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const ids = [...cart];
  container.innerHTML = "";
  document.getElementById("cartEmpty").classList.toggle("hidden", ids.length > 0);

  ids.forEach(id => {
    const p = getPlant(id);
    if (!p) return;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-meta">${p.size} · ${p.category}</div>
      </div>
      <button class="remove-btn" data-remove="${id}">Entfernen</button>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => removeFromCart(b.dataset.remove)));
}

document.getElementById("cartBtn").addEventListener("click", () => {
  renderCart();
  document.getElementById("cartPanel").classList.remove("hidden");
});
document.getElementById("cartClose").addEventListener("click", () => closeModal("cartPanel"));
document.getElementById("cartBackdrop").addEventListener("click", () => closeModal("cartPanel"));

// ===== Bestellung abschicken =====
function buildOrderText() {
  const ids = [...cart];
  const lines = [];
  lines.push(`Pflanzenauswahl von: ${currentProfile}`);
  lines.push(`Datum: ${new Date().toLocaleDateString("de-DE")}`);
  lines.push("");
  if (ids.length === 0) {
    lines.push("(Keine Pflanzen ausgewählt)");
  } else {
    ids.forEach(id => {
      const p = getPlant(id);
      if (!p) return;
      lines.push(`- ${p.name} (${p.category}, ${p.size})`);
    });
  }
  lines.push("");
  lines.push(`Gesamtzahl Pflanzen: ${ids.length}`);
  return lines.join("\n");
}

document.getElementById("submitOrderBtn").addEventListener("click", () => {
  const text = buildOrderText();
  document.getElementById("orderSummary").textContent = text;
  closeModal("cartPanel");
  document.getElementById("orderModal").classList.remove("hidden");
});

document.getElementById("openMailBtn").addEventListener("click", () => {
  const subject = encodeURIComponent(`Pflanzenauswahl von ${currentProfile}`);
  const body = encodeURIComponent(buildOrderText());
  window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
});

document.getElementById("copySummaryBtn").addEventListener("click", () => {
  const text = document.getElementById("orderSummary").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copySummaryBtn");
    const original = btn.textContent;
    btn.textContent = "Kopiert! ✅";
    setTimeout(() => (btn.textContent = original), 1500);
  });
});

document.getElementById("orderClose").addEventListener("click", () => closeModal("orderModal"));
document.getElementById("orderBackdrop").addEventListener("click", () => closeModal("orderModal"));

// ===== Modal Helpers =====
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}
function closeAllModals() {
  ["detailModal", "cartPanel", "orderModal"].forEach(closeModal);
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAllModals();
});

// ===== Init =====
initFilterOptions();
initProfileGate();
