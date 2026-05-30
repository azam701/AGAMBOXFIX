import { useState } from "react";

const card = { background: "#fff", borderRadius: 14, padding: 16, boxShadow: "var(--shadow)", marginBottom: 12 };
const stepNum = { display: "inline-flex", width: 28, height: 28, borderRadius: "50%", background: "var(--orange)", color: "#fff", fontWeight: 900, alignItems: "center", justifyContent: "center", marginRight: 10, fontSize: 14, flexShrink: 0 };
const stepRow = { display: "flex", alignItems: "flex-start", marginBottom: 10 };
const codeBox = { background: "#0f172a", color: "#a7f3d0", padding: "10px 12px", borderRadius: 8, fontFamily: "ui-monospace,Menlo,monospace", fontSize: 12, overflowX: "auto", margin: "8px 0", whiteSpace: "pre-wrap", wordBreak: "break-all", position: "relative" };
const linkBtn = { display: "inline-block", padding: "10px 14px", borderRadius: 10, background: "var(--black)", color: "#fff", fontWeight: 800, fontSize: 13, textDecoration: "none", marginTop: 6 };
const sectionTitle = { fontSize: 14, fontWeight: 900, color: "var(--black)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.3 };

function Code({ children }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div style={codeBox}>
      <button onClick={copy} style={{ position: "absolute", top: 6, right: 6, background: "var(--orange)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
        {copied ? "✓" : "Copy"}
      </button>
      {children}
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div style={stepRow}>
      <span style={stepNum}>{n}</span>
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.55, color: "var(--black)" }}>
        <div style={{ fontWeight: 800, marginBottom: 4 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

export function PanduanApkPage() {
  return (
    <div style={{ flex: 1, overflow: "auto", padding: 16, maxWidth: 760, margin: "0 auto" }}>
      <div className="section-header">
        <div className="section-title">📱 Panduan Build APK</div>
      </div>

      <div style={{ ...card, background: "linear-gradient(135deg, var(--orange), #fb923c)", color: "#fff" }}>
        <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>AGAM BOX → APK Android</div>
        <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.95 }}>
          APK dibuild otomatis di <b>GitHub Actions</b> (gratis, tanpa Android Studio).
          Ikuti 3 tahap berikut: <b>1)</b> Hubungkan GitHub <b>2)</b> Tunggu build <b>3)</b> Download APK.
        </div>
      </div>

      {/* TAHAP 1 */}
      <div style={card}>
        <div style={sectionTitle}>① Hubungkan ke GitHub</div>
        <Step n="1" title="Klik tombol GitHub di Lovable">
          Di editor Lovable, lihat <b>pojok kanan atas</b>. Klik ikon/menu <b>GitHub</b> → <b>Connect to GitHub</b>.
        </Step>
        <Step n="2" title="Authorize Lovable GitHub App">
          Pilih akun GitHub kamu. Beri izin <b>Lovable</b> mengakses repository.
        </Step>
        <Step n="3" title="Create Repository">
          Pilih akun/organisasi → klik <b>Create Repository</b>. Nama bebas, misal <code>agam-box</code>.
        </Step>
        <div style={{ fontSize: 12, color: "var(--gray-mid)", marginTop: 6, padding: 10, background: "#FFF8CC", borderRadius: 8 }}>
          💡 Setiap perubahan di Lovable otomatis ter-push ke repo ini, dan workflow APK langsung jalan.
        </div>
      </div>

      {/* TAHAP 2 */}
      <div style={card}>
        <div style={sectionTitle}>② Tunggu Build di Actions</div>
        <Step n="1" title="Buka repo di GitHub">
          Setelah connect, buka repo yang baru dibuat (Lovable akan tampilkan link-nya).
        </Step>
        <Step n="2" title="Klik tab Actions">
          Di halaman repo, klik tab <b>Actions</b> (di antara Code dan Projects).
        </Step>
        <Step n="3" title="Cari workflow “Build Android APK”">
          Run terbaru akan tampil paling atas. Status <b>🟡 kuning</b> = sedang build, <b>🟢 hijau</b> = selesai, <b>🔴 merah</b> = error.
        </Step>
        <Step n="4" title="Tunggu ±5–8 menit">
          Build pertama paling lama (download Android SDK). Build berikutnya lebih cepat karena cache.
        </Step>
      </div>

      {/* TAHAP 3 */}
      <div style={card}>
        <div style={sectionTitle}>③ Download &amp; Install APK</div>
        <Step n="1" title="Klik run yang sudah hijau">
          Scroll ke bawah, di bagian <b>Artifacts</b> ada file <code>agambox-release-apk</code>.
        </Step>
        <Step n="2" title="Download ZIP">
          Klik untuk download. Ekstrak ZIP → kamu dapat file <code>.apk</code>.
        </Step>
        <Step n="3" title="Kirim ke HP Android">
          Bisa via WhatsApp / Google Drive / kabel USB. Buka file di HP.
        </Step>
        <Step n="4" title="Install">
          Android akan minta izin <b>“Install from unknown sources”</b> — aktifkan untuk Chrome/File Manager. Lalu tap <b>Install</b>.
        </Step>
      </div>

      {/* PENTING */}
      <div style={{ ...card, border: "2px solid var(--orange)" }}>
        <div style={sectionTitle}>⚠️ Penting Sebelum Build</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--black)" }}>
          Setelah project <b>di-publish</b> di Lovable (tombol <b>Publish</b> kanan atas), kamu dapat URL seperti
          <code> https://agambox.lovable.app</code>.
          <br /><br />
          Edit file <code>capacitor.config.ts</code> di repo, ganti <code>server.url</code> ke URL publish kamu:
        </div>
        <Code>{`server: {
  url: "https://NAMA-KAMU.lovable.app",
  cleartext: false
}`}</Code>
        <div style={{ fontSize: 12, color: "var(--gray)" }}>
          Commit → push → workflow rebuild APK otomatis dengan URL benar.
        </div>
      </div>

      {/* TROUBLESHOOT */}
      <div style={card}>
        <div style={sectionTitle}>🛠️ Troubleshoot</div>
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          <b>Build merah (gagal)?</b><br />
          Buka run yang merah → klik job <b>build</b> → lihat langkah yang bertanda ❌. Paling sering: lupa edit <code>server.url</code> atau permission GitHub Actions di-disable.
          <br /><br />
          <b>APK ditolak waktu install?</b><br />
          APK release belum di-sign. Ganti baris terakhir di <code>.github/workflows/android.yml</code>:
        </div>
        <Code>{`./gradlew assembleDebug --no-daemon`}</Code>
        <div style={{ fontSize: 13 }}>
          APK debug selalu signed (untuk sideload pribadi cukup).
        </div>
        <div style={{ fontSize: 13, marginTop: 10 }}>
          <b>Printer Bluetooth tidak terdeteksi di APK?</b><br />
          Buka URL publish langsung di Chrome Android — Web Bluetooth lebih reliable. Atau migrasi ke plugin native <code>@capacitor-community/bluetooth-le</code>.
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <a href="https://docs.github.com/en/actions/quickstart" target="_blank" rel="noopener noreferrer" style={linkBtn}>
          📖 Dokumentasi GitHub Actions
        </a>
      </div>

      <div style={{ fontSize: 11, color: "var(--gray-mid)", textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
        Detail lengkap ada di file <code>ANDROID_BUILD.md</code> dalam repo.
      </div>
    </div>
  );
}
