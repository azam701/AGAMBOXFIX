import { Ico } from "./Icons";

export function MenuModal({ open, onClose, editItem, form, setForm, onSave, onPhotoUpload }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{editItem ? "✏️ Edit Menu" : "➕ Tambah Menu"}</div>
          <button className="modal-close" onClick={onClose}><Ico.X /></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Foto Produk</label>
            <div className="photo-upload">
              {form.foto && <img src={form.foto} alt="preview" />}
              {!form.foto && (
                <>
                  <Ico.Img />
                  <div className="photo-upload-txt">Ketuk untuk upload foto<br /><span style={{ color: "var(--gray-mid)", fontSize: 10 }}>JPG, PNG, WEBP</span></div>
                </>
              )}
              {form.foto && <div className="photo-change-hint">Ketuk untuk ganti foto</div>}
              <input
                type="file"
                accept="image/*"
                onChange={onPhotoUpload}
                onClick={(e) => { e.currentTarget.value = ""; console.log("[AGAMBOX] file picker dibuka"); }}
              />
            </div>
            {form.foto && (
              <button style={{ marginTop: 6, fontSize: 11, color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }} onClick={() => setForm(f => ({ ...f, foto: null }))}>
                ✕ Hapus foto
              </button>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Nama Produk *</label>
            <input className="form-input" placeholder="Contoh: Nasi Goreng Spesial" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Harga (Rp) *</label>
            <input className="form-input" type="number" placeholder="15000" value={form.harga} onChange={e => setForm(f => ({ ...f, harga: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Kategori</label>
            <select className="form-select" value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
              <option>Makanan</option>
              <option>Minuman</option>
              <option>Dessert</option>
              <option>Snack</option>
              <option>Lainnya</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="status-radio">
              <label className="radio-opt" style={{ cursor: "pointer" }} onClick={() => setForm(f => ({ ...f, aktif: true }))}>
                <div className={`radio-circle ${form.aktif ? "aktif-sel" : ""}`}>{form.aktif && <div className="radio-dot" />}</div>
                <span style={{ color: form.aktif ? "var(--success)" : "var(--gray-mid)" }}>● Aktif</span>
              </label>
              <label className="radio-opt" style={{ cursor: "pointer" }} onClick={() => setForm(f => ({ ...f, aktif: false }))}>
                <div className={`radio-circle ${!form.aktif ? "habis-sel" : ""}`}>{!form.aktif && <div className="radio-dot" />}</div>
                <span style={{ color: !form.aktif ? "var(--red)" : "var(--gray-mid)" }}>○ Habis</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>Batal</button>
            <button className="btn-save" onClick={onSave} disabled={!form.nama || !form.harga}>
              {editItem ? "Simpan Perubahan" : "Tambah Menu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
