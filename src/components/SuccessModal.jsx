import { useState } from "react";
import { formatRupiah, formatTime } from "@/services/db";
import { printReceipt, isBluetoothSupported } from "@/services/printer";

export function SuccessModal({ successModal, onClose }) {
  const [printing, setPrinting] = useState(false);
  const [status, setStatus] = useState(null);
  if (!successModal) return null;

  const handlePrint = async () => {
    setPrinting(true); setStatus(null);
    try {
      if (!isBluetoothSupported()) {
        setStatus({ ok: false, msg: "Fitur cetak bluetooth tersedia setelah aplikasi diinstall (PWA / Android)" });
      } else {
        await printReceipt(successModal);
        setStatus({ ok: true, msg: "Cetak berhasil" });
      }
    } catch (e) {
      setStatus({ ok: false, msg: e.message || "Gagal terhubung" });
    }
    setPrinting(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">🎉 Transaksi Berhasil!</div>
        </div>
        <div className="modal-body">
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div className="success-check">✅</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "var(--black)" }}>
              Pembayaran {successModal.metode} Diterima
            </div>
            <div style={{ fontSize: 11, color: "var(--gray-mid)", marginTop: 3 }}>{successModal.id}</div>
          </div>
          <div className="receipt">
            {successModal.items?.map(item => (
              <div key={item.id} className="receipt-row">
                <span className="receipt-label">{item.nama} ×{item.qty}</span>
                <span className="receipt-val">{formatRupiah(item.harga * item.qty)}</span>
              </div>
            ))}
            <div className="receipt-row total">
              <span className="receipt-label">TOTAL</span>
              <span className="receipt-val" style={{ color: "var(--orange)" }}>{formatRupiah(successModal.total)}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Metode</span>
              <span className={`receipt-val ${successModal.metode === "CASH" ? "receipt-method-cash" : "receipt-method-qris"}`}>
                {successModal.metode === "CASH" ? "💵 Cash" : "📱 QRIS"}
              </span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Waktu</span>
              <span className="receipt-val">{formatTime(successModal.tanggal)}</span>
            </div>
          </div>

          {status && (
            <div style={{
              marginTop: 10, padding: "8px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              background: status.ok ? "#DCFCE7" : "#FEE2E2",
              color: status.ok ? "#166534" : "#991B1B",
            }}>
              {status.ok ? "✅ " : "❌ "}{status.msg}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
            <button
              onClick={handlePrint}
              disabled={printing}
              style={{ padding: "12px", borderRadius: 12, border: "2px solid var(--black)", background: "#fff", color: "var(--black)", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              {printing ? "Mencetak..." : "🖨️ CETAK STRUK"}
            </button>
            <button
              onClick={onClose}
              style={{ padding: "12px", borderRadius: 12, border: "none", background: "var(--orange)", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              ✅ SELESAI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
