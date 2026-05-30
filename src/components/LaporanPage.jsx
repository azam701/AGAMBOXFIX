import { formatRupiah, formatTime } from "@/services/db";

export function LaporanPage({
  pendHari, pendMinggu, pendBulan,
  laporanFilter, setLaporanFilter,
  totalOmzet, jumlahTrx, rataRata,
  loadingOrders, filteredOrders, onOpenTrx,
}) {
  return (
    <div className="laporan-page">
      <div className="page-header">
        <div className="page-title">Dashboard <span>Laporan</span></div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-label">Pendapatan Hari Ini</div>
          <div className="stat-value">{formatRupiah(pendHari)}</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">📆</div>
          <div className="stat-label">Pendapatan Mingguan</div>
          <div className="stat-value">{formatRupiah(pendMinggu)}</div>
        </div>
        <div className="stat-card black">
          <div className="stat-icon">🗓️</div>
          <div className="stat-label">Pendapatan Bulanan</div>
          <div className="stat-value">{formatRupiah(pendBulan)}</div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="section-header">
          <div className="section-title">Ringkasan Periode</div>
          <div className="filter-tabs">
            {[["hari","Hari"],["minggu","Minggu"],["bulan","Bulan"]].map(([k,l]) => (
              <button key={k} className={`filter-tab ${laporanFilter === k ? "active" : ""}`} onClick={() => setLaporanFilter(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          <div className="stat-card green">
            <div className="stat-icon">💰</div>
            <div className="stat-label">Total Omzet</div>
            <div className="stat-value">{formatRupiah(totalOmzet)}</div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon">🧾</div>
            <div className="stat-label">Jumlah Transaksi</div>
            <div className="stat-value">{jumlahTrx} trx</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">📊</div>
            <div className="stat-label">Rata-rata Transaksi</div>
            <div className="stat-value">{formatRupiah(rataRata)}</div>
          </div>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Riwayat Transaksi</div>
        <span style={{ fontSize: 11, color: "var(--gray-mid)", fontWeight: 600 }}>{filteredOrders.length} transaksi</span>
      </div>

      {loadingOrders ? (
        <div style={{ padding: 40, textAlign: "center" }}><div className="spinner" /></div>
      ) : (
        <div className="trx-table">
          <div className="trx-table-header">
            <div>No. Transaksi</div>
            <div>Waktu</div>
            <div>Metode</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <div style={{ fontSize: 12, color: "var(--gray-mid)" }}>Belum ada transaksi pada periode ini.</div>
            </div>
          ) : filteredOrders.map(o => (
            <div key={o.id} className="trx-row" onClick={() => onOpenTrx && onOpenTrx(o)} title="Ketuk untuk detail">
              <div className="trx-id">{o.id}</div>
              <div className="trx-time">{formatTime(o.tanggal)}</div>
              <div className={`trx-method ${o.metode === "CASH" ? "method-cash" : "method-qris"}`}>
                {o.metode === "CASH" ? "💵 Cash" : "📱 QRIS"}
              </div>
              <div className="trx-total">{formatRupiah(o.total)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
