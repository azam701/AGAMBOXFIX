import { Ico } from "./Icons";
import { formatRupiah } from "@/services/db";

export function KasirPage({
  loadingProducts, filteredProducts, categories, activeCat, setActiveCat,
  search, setSearch, filterAktif, setFilterAktif,
  cartItems, cartQtyMap, addToCart, updateQty, total, totalItems,
  handleBayar, savingOrder, setCartItems,
}) {
  return (
    <div className="kasir-layout">
      <div className="kasir-left">
        <div className="search-bar">
          <Ico.Search />
          <input placeholder="Cari nama produk..." value={search} onChange={e => setSearch(e.target.value)} />
          {search && <span style={{ cursor: "pointer", color: "var(--gray-mid)", fontSize: 18 }} onClick={() => setSearch("")}>×</span>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div className="category-filter" style={{ flex: 1 }}>
            {categories.map(c => (
              <button key={c} className={`cat-btn ${activeCat === c ? "active" : ""}`} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>
          <label className="toggle-wrap" title="Sembunyikan produk habis" onClick={() => setFilterAktif(!filterAktif)}>
            <div className={`toggle-track ${filterAktif ? "on" : ""}`}><div className="toggle-thumb" /></div>
            <span className="toggle-label">Aktif saja</span>
          </label>
        </div>

        {loadingProducts ? (
          <div className="loading-overlay"><div className="spinner" /></div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(p => {
              const inCartQty = cartQtyMap[p.id] || 0;
              return (
                <div key={p.id} className={`product-card ${!p.aktif ? "inactive" : ""} ${inCartQty > 0 ? "in-cart" : ""}`} onClick={() => addToCart(p)}>
                  {!p.aktif && <span className="habis-badge">Habis</span>}
                  {inCartQty > 0 && <span className="cart-qty-indicator">{inCartQty}</span>}
                  <div className="product-img-wrap">
                    {p.foto
                      ? <img src={p.foto} className="product-img" alt={p.nama} />
                      : <div className="product-img-placeholder"><Ico.Img /><span>{p.nama.substring(0, 8)}</span></div>}
                  </div>
                  <div className="product-info">
                    <div className="product-name">{p.nama}</div>
                    <div className="product-price">{formatRupiah(p.harga)}</div>
                    <button className="product-add" onClick={e => { e.stopPropagation(); addToCart(p); }}><Ico.Plus /></button>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div style={{ gridColumn: "1/-1", padding: "40px", textAlign: "center", color: "var(--gray-mid)" }}>
                <div style={{ fontSize: 36, marginBottom: 8, opacity: .3 }}>🔍</div>
                <div style={{ fontSize: 13 }}>Produk tidak ditemukan</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="kasir-right">
        <div className="order-header">
          <div className="order-title">
            🛒 Total Pesanan
            {totalItems > 0 && <span className="order-count">{totalItems} item</span>}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="order-empty">
            <div className="order-empty-icon">🛒</div>
            <div className="order-empty-text">Belum ada pesanan.<br />Ketuk produk untuk menambah.</div>
          </div>
        ) : (
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-photo">
                  {item.foto ? <img src={item.foto} alt="" /> : <span className="order-item-photo-ph">🍽️</span>}
                </div>
                <div className="order-item-info">
                  <div className="order-item-name">{item.nama}</div>
                  <div className="order-item-sub">{formatRupiah(item.harga)} × {item.qty} = {formatRupiah(item.harga * item.qty)}</div>
                </div>
                <div className="order-item-qty">
                  <button className="qty-btn qty-minus" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn qty-plus" onClick={() => updateQty(item.id, +1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="order-footer">
          <div className="order-subtotal-row">
            <span className="order-total-label">TOTAL</span>
            <span className="order-total-value">{formatRupiah(total)}</span>
          </div>

          <div className="pay-btns">
            <button className="pay-btn pay-btn-cash" onClick={() => handleBayar("CASH")} disabled={!cartItems.length || savingOrder}>
              {savingOrder ? <div className="spinner" style={{ borderTopColor: "#fff" }} /> : <><Ico.Cash /><span>CASH</span><span className="pay-btn-sub">Tunai</span></>}
            </button>
            <button className="pay-btn pay-btn-qris" onClick={() => handleBayar("QRIS")} disabled={!cartItems.length || savingOrder}>
              {savingOrder ? <div className="spinner" style={{ borderTopColor: "#fff" }} /> : <><Ico.Qris /><span>QRIS</span><span className="pay-btn-sub">Scan QR</span></>}
            </button>
          </div>

          {cartItems.length > 0 && (
            <button className="btn-kosongkan" onClick={() => { if (confirm("Kosongkan semua pesanan?")) setCartItems([]); }}>
              🗑️ KOSONGKAN PESANAN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
