import { Ico } from "./Icons";
import { formatRupiah } from "@/services/db";

export function MenuPage({ products, openAddMenu, openEdit, toggleAktif, hapusMenu }) {
  return (
    <div className="menu-page">
      <div className="page-header">
        <div className="page-title">Kelola <span>Menu</span></div>
        <button className="btn-primary" onClick={openAddMenu}><Ico.Plus /> Tambah Menu</button>
      </div>
      <div className="menu-grid">
        {products.map(p => (
          <div key={p.id} className="menu-card">
            <div className="menu-card-img">
              {p.foto
                ? <img src={p.foto} alt={p.nama} />
                : <div className="menu-card-img-ph"><Ico.Img /><span style={{ fontSize: 10, color: "var(--gray-mid)", marginTop: 4 }}>Belum ada foto</span></div>}
            </div>
            <div className="menu-card-body">
              <div className="menu-card-name">{p.nama}</div>
              <div className="menu-card-price">{formatRupiah(p.harga)}</div>
              <div className="menu-card-cat">📂 {p.kategori}</div>
              <div className="status-radio">
                <label className="radio-opt" onClick={() => !p.aktif && toggleAktif(p)}>
                  <div className={`radio-circle ${p.aktif ? "aktif-sel" : ""}`}>{p.aktif && <div className="radio-dot" />}</div>
                  <span style={{ color: p.aktif ? "var(--success)" : "var(--gray-mid)" }}>Aktif</span>
                </label>
                <label className="radio-opt" onClick={() => p.aktif && toggleAktif(p)}>
                  <div className={`radio-circle ${!p.aktif ? "habis-sel" : ""}`}>{!p.aktif && <div className="radio-dot" />}</div>
                  <span style={{ color: !p.aktif ? "var(--red)" : "var(--gray-mid)" }}>Habis</span>
                </label>
              </div>
              <div className="menu-card-footer">
                <button className="btn-edit-sm" onClick={() => openEdit(p)}>✏️ Edit</button>
                <button className="btn-del-sm" onClick={() => hapusMenu(p.id)}><Ico.Trash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
