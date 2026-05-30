import { useState, useEffect, useCallback } from "react";
import { DB, useSupabase, genId, genTrxId, getToday } from "@/services/db";
import { STYLES } from "@/components/agambox-styles";
import { Ico } from "@/components/Icons";
import { KasirPage } from "@/components/KasirPage";
import { MenuPage } from "@/components/MenuPage";
import { LaporanPage } from "@/components/LaporanPage";
import { SuccessModal } from "@/components/SuccessModal";
import { MenuModal } from "@/components/MenuModal";
import { TrxDetailModal } from "@/components/TrxDetailModal";
import { QrisModal } from "@/components/QrisModal";
import { PengaturanPage } from "@/components/PengaturanPage";
import { PanduanApkPage } from "@/components/PanduanApkPage";
import { reconnectPrinter } from "@/services/printer";

function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);
  return { toast, show };
}

export default function App() {
  const [page, setPage] = useState("kasir");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [filterAktif, setFilterAktif] = useState(false);
  const [successModal, setSuccessModal] = useState(null);
  const [menuModal, setMenuModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [laporanFilter, setLaporanFilter] = useState("hari");
  const [savingOrder, setSavingOrder] = useState(false);
  const [trxDetail, setTrxDetail] = useState(null);
  const [qrisOpen, setQrisOpen] = useState(false);
  const [orientation, setOrientation] = useState(() =>
    typeof window !== "undefined" && window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  );
  const { toast, show: showToast } = useToast();

  useEffect(() => {
    const update = () => {
      const o = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      setOrientation(o);
      console.log("[AGAMBOX] orientation:", o, window.innerWidth + "x" + window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const [form, setForm] = useState({ nama: "", harga: "", kategori: "Makanan", aktif: true, foto: null });

  useEffect(() => {
    DB.getProducts().then(data => {
      setProducts(data || []);
      setLoadingProducts(false);
    }).catch(() => setLoadingProducts(false));
  }, []);

  useEffect(() => { reconnectPrinter().catch(() => {}); }, []);

  useEffect(() => {
    if (page === "laporan") {
      setLoadingOrders(true);
      DB.getOrders().then(data => {
        setOrders(data || []);
        setLoadingOrders(false);
      }).catch(() => setLoadingOrders(false));
    }
  }, [page]);

  const categories = ["Semua", ...Array.from(new Set(products.map(p => p.kategori)))];

  const filteredProducts = products.filter(p => {
    if (filterAktif && !p.aktif) return false;
    const matchCat = activeCat === "Semua" || p.kategori === activeCat;
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = useCallback((product) => {
    if (!product.aktif) return;
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }, []);

  const total = cartItems.reduce((s, i) => s + i.harga * i.qty, 0);
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartQtyMap = cartItems.reduce((m, i) => { m[i.id] = i.qty; return m; }, {});

  const doSaveOrder = async (metode) => {
    if (!cartItems.length || savingOrder) return;
    setSavingOrder(true);
    const newOrder = {
      id: genTrxId(),
      tanggal: new Date().toISOString(),
      metode,
      total,
      items: cartItems.map(i => ({ ...i })),
    };
    try {
      const saved = await DB.saveOrder(newOrder);
      setOrders(prev => [saved, ...prev]);
      setSuccessModal(saved);
      setCartItems([]);
      setQrisOpen(false);
      showToast("Transaksi berhasil disimpan!");
    } catch {
      showToast("Transaksi gagal disimpan");
    }
    setSavingOrder(false);
  };

  const handleBayar = (metode) => {
    if (!cartItems.length || savingOrder) return;
    if (metode === "QRIS") { setQrisOpen(true); return; }
    doSaveOrder(metode);
  };

  const openAddMenu = () => {
    setEditItem(null);
    setForm({ nama: "", harga: "", kategori: "Makanan", aktif: true, foto: null });
    setMenuModal(true);
  };
  const openEdit = (p) => {
    setEditItem(p);
    setForm({ nama: p.nama, harga: String(p.harga), kategori: p.kategori, aktif: p.aktif, foto: p.foto || null });
    setMenuModal(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) { console.log("[AGAMBOX] upload dibatalkan"); return; }
    console.log("[AGAMBOX] foto berhasil dipilih:", file.name, Math.round(file.size / 1024) + "KB");
    const reader = new FileReader();
    reader.onload = ev => {
      setForm(f => ({ ...f, foto: ev.target.result }));
      console.log("[AGAMBOX] foto dimuat sebagai data URL");
    };
    reader.onerror = () => console.error("[AGAMBOX] gagal baca foto");
    reader.readAsDataURL(file);
  };

  const handleSaveMenu = async () => {
    if (!form.nama || !form.harga) return;
    const product = {
      id: editItem ? editItem.id : genId(),
      nama: form.nama.trim(),
      harga: parseInt(form.harga),
      kategori: form.kategori,
      aktif: form.aktif,
      foto: form.foto || null,
    };
    try {
      await DB.saveProduct(product);
      if (editItem) setProducts(prev => prev.map(p => p.id === editItem.id ? product : p));
      else setProducts(prev => [...prev, product]);
      setMenuModal(false);
      showToast(editItem ? "Menu diperbarui." : "Menu ditambahkan!");
    } catch { showToast("Gagal menyimpan menu."); }
  };

  const toggleAktif = async (p) => {
    const updated = { ...p, aktif: !p.aktif };
    await DB.saveProduct(updated);
    setProducts(prev => prev.map(x => x.id === p.id ? updated : x));
  };

  const hapusMenu = async (id) => {
    if (!window.confirm("Hapus menu ini?")) return;
    try {
      await DB.deleteProduct(id);
      setProducts(prev => {
        const next = prev.filter(p => p.id !== id);
        console.log("[AGAMBOX] sukses hapus menu:", id, "→ sisa", next.length);
        return next;
      });
      showToast("Menu dihapus.");
    } catch (err) {
      console.error("[AGAMBOX] gagal hapus menu:", err);
      showToast("Gagal hapus menu.");
    }
  };

  const now = new Date();
  const todayStr = getToday();
  const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now); monthAgo.setMonth(monthAgo.getMonth() - 1);

  const filteredOrders = orders.filter(o => {
    if (laporanFilter === "hari") return o.tanggal && o.tanggal.startsWith(todayStr);
    if (laporanFilter === "minggu") return new Date(o.tanggal) >= weekAgo;
    return new Date(o.tanggal) >= monthAgo;
  });

  const totalOmzet = filteredOrders.reduce((s, o) => s + (o.total || 0), 0);
  const jumlahTrx = filteredOrders.length;
  const rataRata = jumlahTrx > 0 ? Math.round(totalOmzet / jumlahTrx) : 0;

  const pendHari = orders.filter(o => o.tanggal?.startsWith(todayStr)).reduce((s, o) => s + o.total, 0);
  const pendMinggu = orders.filter(o => new Date(o.tanggal) >= weekAgo).reduce((s, o) => s + o.total, 0);
  const pendBulan = orders.filter(o => new Date(o.tanggal) >= monthAgo).reduce((s, o) => s + o.total, 0);

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-brand">AGAM <span>BOX</span></div>
          {[
            { key: "kasir", label: "Kasir", icon: <Ico.Cashier /> },
            { key: "menu", label: "Menu", icon: <Ico.Menu /> },
            { key: "laporan", label: "Laporan", icon: <Ico.Report /> },
            { key: "pengaturan", label: "Pengaturan", icon: <span>⚙️</span> },
            { key: "panduan", label: "Build APK", icon: <span>📱</span> },
          ].map(t => (
            <button key={t.key} className={`nav-tab ${page === t.key ? "active" : ""}`} onClick={() => setPage(t.key)}>
              {t.icon} {t.label}
            </button>
          ))}
          <span className={`orient-badge ${orientation}`} title="Debug orientation">
            {orientation === "landscape" ? "🖥️ Landscape" : "📱 Portrait"}
          </span>
          <span className={`db-badge ${useSupabase ? "supabase" : "local"}`}>
            {useSupabase ? "☁️ Supabase" : "💾 Local"}
          </span>
        </nav>

        <div className="content">
          {page === "kasir" && (
            <KasirPage
              loadingProducts={loadingProducts}
              filteredProducts={filteredProducts}
              categories={categories}
              activeCat={activeCat} setActiveCat={setActiveCat}
              search={search} setSearch={setSearch}
              filterAktif={filterAktif} setFilterAktif={setFilterAktif}
              cartItems={cartItems} cartQtyMap={cartQtyMap}
              addToCart={addToCart} updateQty={updateQty}
              total={total} totalItems={totalItems}
              handleBayar={handleBayar} savingOrder={savingOrder}
              setCartItems={setCartItems}
            />
          )}
          {page === "menu" && (
            <MenuPage
              products={products}
              openAddMenu={openAddMenu}
              openEdit={openEdit}
              toggleAktif={toggleAktif}
              hapusMenu={hapusMenu}
            />
          )}
          {page === "laporan" && (
            <LaporanPage
              pendHari={pendHari} pendMinggu={pendMinggu} pendBulan={pendBulan}
              laporanFilter={laporanFilter} setLaporanFilter={setLaporanFilter}
              totalOmzet={totalOmzet} jumlahTrx={jumlahTrx} rataRata={rataRata}
              loadingOrders={loadingOrders} filteredOrders={filteredOrders}
              onOpenTrx={(o) => { console.log("[AGAMBOX] buka detail trx:", o.id); setTrxDetail(o); }}
            />
          )}
          {page === "pengaturan" && <PengaturanPage showToast={showToast} />}
          {page === "panduan" && <PanduanApkPage />}
        </div>

        <SuccessModal successModal={successModal} onClose={() => setSuccessModal(null)} />
        <MenuModal
          open={menuModal}
          onClose={() => setMenuModal(false)}
          editItem={editItem}
          form={form} setForm={setForm}
          onSave={handleSaveMenu}
          onPhotoUpload={handlePhotoUpload}
        />
        <TrxDetailModal trx={trxDetail} onClose={() => setTrxDetail(null)} />
        <QrisModal
          open={qrisOpen}
          total={total}
          saving={savingOrder}
          onConfirm={() => doSaveOrder("QRIS")}
          onClose={() => !savingOrder && setQrisOpen(false)}
        />

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
