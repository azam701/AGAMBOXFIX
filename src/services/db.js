// ============================================================
// SUPABASE CONFIG
// ============================================================
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

export const useSupabase = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

async function sbFetch(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: opts.prefer || "return=representation",
      ...opts.headers,
    },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("json") && res.status !== 204) return res.json();
  return null;
}

const LS = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

export const genId = () => "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
export const genTrxId = () => "TRX-" + Date.now().toString().slice(-8);

const SEED_PRODUCTS = [
  { id: "p1", nama: "Burger Spesial", harga: 25000, kategori: "Makanan", aktif: true, foto: null },
  { id: "p2", nama: "French Fries", harga: 15000, kategori: "Makanan", aktif: true, foto: null },
  { id: "p3", nama: "Taco Crispy", harga: 20000, kategori: "Makanan", aktif: true, foto: null },
  { id: "p4", nama: "Pizza Slice", harga: 30000, kategori: "Makanan", aktif: true, foto: null },
  { id: "p5", nama: "Es Teh Manis", harga: 8000, kategori: "Minuman", aktif: true, foto: null },
  { id: "p6", nama: "Kopi Hitam", harga: 12000, kategori: "Minuman", aktif: true, foto: null },
  { id: "p7", nama: "Jus Jeruk", harga: 18000, kategori: "Minuman", aktif: true, foto: null },
  { id: "p8", nama: "Es Krim Vanilla", harga: 10000, kategori: "Dessert", aktif: true, foto: null },
  { id: "p9", nama: "Cupcake Coklat", harga: 14000, kategori: "Dessert", aktif: true, foto: null },
  { id: "p10", nama: "Croissant", harga: 16000, kategori: "Makanan", aktif: false, foto: null },
];

export const DB = {
  async getProducts() {
    if (useSupabase) return sbFetch("products?order=nama.asc");
    const stored = LS.get("agambox_products", null);
    if (!stored) { LS.set("agambox_products", SEED_PRODUCTS); return SEED_PRODUCTS; }
    return stored;
  },
  async saveProduct(product) {
    if (useSupabase) {
      if (product.id && !product.id.startsWith("id-")) {
        return sbFetch(`products?id=eq.${product.id}`, { method: "PATCH", body: JSON.stringify(product) });
      }
      const { id, ...rest } = product;
      return sbFetch("products", { method: "POST", body: JSON.stringify(rest) });
    }
    const list = LS.get("agambox_products", SEED_PRODUCTS);
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) list[idx] = product; else list.push(product);
    LS.set("agambox_products", list);
    return product;
  },
  async deleteProduct(id) {
    if (useSupabase) return sbFetch(`products?id=eq.${id}`, { method: "DELETE" });
    const list = LS.get("agambox_products", []).filter(p => p.id !== id);
    LS.set("agambox_products", list);
  },
  async getOrders() {
    if (useSupabase) {
      const orders = await sbFetch("orders?order=tanggal.desc&limit=200");
      const items = await sbFetch("order_items?order=order_id.asc");
      return orders.map(o => ({ ...o, items: items.filter(i => i.order_id === o.id) }));
    }
    return LS.get("agambox_orders", []);
  },
  async saveOrder(order) {
    if (useSupabase) {
      const { items, ...orderRow } = order;
      const [saved] = await sbFetch("orders", { method: "POST", body: JSON.stringify(orderRow) });
      const orderItems = items.map(i => ({ order_id: saved.id, product_id: i.id, nama: i.nama, harga: i.harga, qty: i.qty, subtotal: i.harga * i.qty }));
      await sbFetch("order_items", { method: "POST", body: JSON.stringify(orderItems) });
      return { ...saved, items };
    }
    const list = LS.get("agambox_orders", []);
    list.unshift(order);
    LS.set("agambox_orders", list);
    return order;
  },
};

// ============================================================
// UTILS
// ============================================================
export const formatRupiah = n => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n || 0);
export const formatTime = iso => { const d = new Date(iso); return d.toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); };
export const getToday = () => new Date().toISOString().split("T")[0];
