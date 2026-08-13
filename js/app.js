// ===== Konfiguration =====
const PROFILES = ["Falk", "Leni", "Lilly", "Test"];
const ORDER_EMAIL = "felix.n3003@gmail.com"; // Empfänger der Bestellzusammenfassung

// ===== State =====
let currentProfile = null;
let cart = {}; // { plantId: qty }
let activeFilters = { search: "", category: "", size: "", care: "", light: "" };

// ===== Helpers für localStorage (pro Profil eigener Warenkorb) =====
function profileKey(profile) {
  return `pflanzenshop_cart_${profile}`;
}

function loadCart(profile) {
  try {
    const raw = localStorage.getItem(profileKey(profile));
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart() {
  if (!currentProfile) return;
  localStorage.setItem(profileKey(currentProfile), JSON.stringify(cart));
}

function getPlant(id) {
  return PLANTS.find(p => p.id === id);
}

// ===== Profil-Gate =====
function initProfileGate() {
  const list = document.getElementById("profileList");
  list.innerHTML = "";
  PROFILES.forEach(name => {
    const btn = document.createElement("button");
    btn.className = "profile-card";
    btn.innerHTML = `<span class="profile-avatar">${name.charAt(0)}</span><span class="profile-name">${name}</span>`;
    btn.addEventListener("click", () => selectProfile(name));
    list.appendChild(btn);
  });

  const savedProfile = localStorage.getItem("pflanzenshop_active_profile");
  if (savedProfile && PROFILES.includes(savedProfile)) {
    selectProfile(savedProfile, true);
  }
}

function selectProfile(name, skipSave) {
  currentProfile = name;
  cart = loadCart(name);
  if (!skipSave) localStorage.setItem("pflanzenshop_active_profile", name);

  document.getElementById("profileGate").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("currentProfileLabel").textContent = `👤 ${name}`;

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

  fillSelect("categoryFilter", categories);
  fillSelect("sizeFilter", sizes);
  fillSelect("careFilter", cares);
  fillSelect("lightFilter", lights);
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
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <div class="plant-card-image-wrap" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="plant-card-body">
        <h3 class="plant-card-name" data-id="${p.id}">${p.name}</h3>
        <div class="badge-row">
          <span class="badge">📏 ${p.size}</span>
          <span class="badge badge-care-${p.care}">🛠️ ${p.care}</span>
          <span class="badge">☀️ ${p.light}</span>
          <span class="badge">💧 ${p.waterWinter}</span>
        </div>
        <div class="plant-card-footer">
          <button class="btn-primary" data-add="${p.id}">In den Korb</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".plant-card-image-wrap, .plant-card-name").forEach(el => {
    el.addEventListener("click", () => openDetail(el.dataset.id));
  });
  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
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
document.getElementById("resetFilters").addEventListener("click", () => {
  activeFilters = { search: "", category: "", size: "", care: "", light: "" };
  document.getElementById("searchInput").value = "";
  ["categoryFilter", "sizeFilter", "careFilter", "lightFilter"].forEach(id => {
    document.getElementById(id).value = "";
  });
  renderGrid();
});

// ===== Detailansicht =====
function openDetail(id) {
  const p = getPlant(id);
  if (!p) return;
  document.getElementById("detailImage").src = p.image;
  document.getElementById("detailImage").alt = p.name;
  document.getElementById("detailCategory").textContent = p.category;
  document.getElementById("detailName").textContent = p.name;
  document.getElementById("detailSize").textContent = p.size;
  document.getElementById("detailCare").textContent = p.care;
  document.getElementById("detailLight").textContent = p.light;
  document.getElementById("detailWater").textContent = p.waterWinter;
  document.getElementById("detailDesc").textContent = p.desc;
  document.getElementById("detailAddBtn").dataset.id = p.id;
  document.getElementById("detailModal").classList.remove("hidden");
}

document.getElementById("detailAddBtn").addEventListener("click", e => {
  addToCart(e.target.dataset.id);
});
document.getElementById("detailClose").addEventListener("click", () => closeModal("detailModal"));
document.getElementById("detailBackdrop").addEventListener("click", () => closeModal("detailModal"));

// ===== Warenkorb =====
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  updateCartCount();
  flashCartButton();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById("cartCount").textContent = total;
}

function flashCartButton() {
  const btn = document.getElementById("cartBtn");
  btn.style.transform = "scale(1.08)";
  setTimeout(() => (btn.style.transform = "scale(1)"), 150);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const ids = Object.keys(cart);
  container.innerHTML = "";
  document.getElementById("cartEmpty").classList.toggle("hidden", ids.length > 0);

  ids.forEach(id => {
    const p = getPlant(id);
    if (!p) return;
    const qty = cart[id];
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-meta">${p.size} · ${p.category}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" data-dec="${id}">−</button>
        <span>${qty}</span>
        <button class="qty-btn" data-inc="${id}">+</button>
      </div>
      <button class="remove-btn" data-remove="${id}">Entfernen</button>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => changeQty(b.dataset.inc, 1)));
  container.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => changeQty(b.dataset.dec, -1)));
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
  const ids = Object.keys(cart);
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
      lines.push(`- ${p.name} (${p.category}, ${p.size}) x${cart[id]}`);
    });
  }
  lines.push("");
  lines.push(`Gesamtzahl Pflanzen: ${ids.reduce((sum, id) => sum + cart[id], 0)}`);
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
