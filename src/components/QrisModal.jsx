import qrisImg from "@/assets/qris-warkop-agam.jpg";
import { formatRupiah } from "@/services/db";

export function QrisModal({ open, total, onConfirm, onClose, saving }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 380 }}>
        <div className="modal-header">
          <div className="modal-title">📱 Bayar dengan QRIS</div>
        </div>
        <div className="modal-body" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 6 }}>
            Scan QR di bawah ini
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "var(--orange)", marginBottom: 10 }}>
            {formatRupiah(total)}
          </div>
          <div style={{ background: "#fff", padding: 8, borderRadius: 12, border: "2px solid var(--gray-light)", marginBottom: 14 }}>
            <img src={qrisImg} alt="QRIS Warkop Kuliner Agam" style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }} />
          </div>
          <button
            className="btn-new-trx"
            onClick={onConfirm}
            disabled={saving}
            style={{ background: "var(--success)", color: "#fff" }}
          >
            {saving ? "Menyimpan..." : "✅ Sudah Bayar"}
          </button>
          <button
            onClick={onClose}
            disabled={saving}
            style={{
              marginTop: 8, width: "100%", padding: "10px", border: "2px solid var(--gray-light)",
              background: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer",
              fontFamily: "inherit", color: "var(--gray)",
            }}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
