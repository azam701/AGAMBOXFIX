import { useEffect, useState } from "react";
import {
  isBluetoothSupported, isConnected, getSavedPrinter,
  connectPrinter, disconnectPrinter, printTest, reconnectPrinter,
} from "@/services/printer";

export function PengaturanPage({ showToast }) {
  const [supported] = useState(isBluetoothSupported());
  const [saved, setSaved] = useState(getSavedPrinter());
  const [connected, setConnected] = useState(isConnected());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const info = await reconnectPrinter();
      if (info) setSaved(info);
      setConnected(isConnected());
    })();
  }, []);

  const handleConnect = async () => {
    if (!supported) return;
    setBusy(true);
    try {
      const info = await connectPrinter();
      setSaved(info);
      setConnected(true);
      showToast && showToast("Printer terhubung: " + info.name);
    } catch (e) {
      console.error("[PRINTER]", e);
      showToast && showToast("Gagal terhubung");
    }
    setBusy(false);
  };

  const handleTest = async () => {
    setBusy(true);
    try { await printTest(); showToast && showToast("Cetak berhasil"); }
    catch (e) { console.error(e); showToast && showToast("Gagal cetak: " + e.message); }
    setBusy(false);
  };

  const handleDisconnect = async () => {
    await disconnectPrinter();
    setSaved(null); setConnected(false);
    showToast && showToast("Printer diputuskan");
  };

  return (
    <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
      <div className="section-header">
        <div className="section-title">⚙️ Pengaturan Printer</div>
      </div>

      {!supported && (
        <div style={{ background: "#FFF8CC", border: "2px solid var(--yellow)", padding: 14, borderRadius: 12, fontSize: 13, color: "var(--black)", marginBottom: 14 }}>
          ⚠️ Browser ini tidak mendukung Bluetooth.<br />
          Fitur cetak bluetooth tersedia setelah aplikasi diinstall (PWA / Android) dan dibuka di Chrome.
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "var(--shadow)", marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--gray-mid)", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
          Status
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: connected ? "var(--success)" : "var(--gray)", marginBottom: 4 }}>
          {connected ? "🟢 Terhubung" : saved ? "🟡 Tersimpan (perlu hubungkan)" : "⚪ Belum ada printer"}
        </div>
        {saved && <div style={{ fontSize: 13, color: "var(--gray)" }}>Nama: <b>{saved.name}</b></div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={handleConnect}
          disabled={!supported || busy}
          style={{ padding: "12px", borderRadius: 12, border: "none", background: "var(--orange)", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit", opacity: (!supported || busy) ? 0.5 : 1 }}
        >
          🔗 Hubungkan Printer
        </button>
        <button
          onClick={handleTest}
          disabled={busy || !connected}
          style={{ padding: "12px", borderRadius: 12, border: "2px solid var(--black)", background: "#fff", color: "var(--black)", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit", opacity: (busy || !connected) ? 0.5 : 1 }}
        >
          🖨️ Tes Cetak
        </button>
        <button
          onClick={handleDisconnect}
          disabled={busy || !saved}
          style={{ padding: "12px", borderRadius: 12, border: "2px solid var(--red)", background: "#fff", color: "var(--red)", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit", opacity: (busy || !saved) ? 0.5 : 1 }}
        >
          ✖️ Putuskan
        </button>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: "var(--gray-mid)", lineHeight: 1.5 }}>
        Mendukung printer thermal Bluetooth ESC/POS 58mm / 80mm
        (MPT, Zjiang, Xprinter, dan printer mini generik).
      </div>
    </div>
  );
}
