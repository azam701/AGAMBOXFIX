import { Ico } from "./Icons";
import { formatRupiah, formatTime } from "@/services/db";

export function TrxDetailModal({ trx, onClose }) {
  if (!trx) return null;
  const tgl = new Date(trx.tanggal);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">🧾 Detail Transaksi</div>
          <button className="modal-close" onClick={onClose}><Ico.X /></button>
        </div>
        <div className="modal-body">
          <div className="trx-detail-meta">
            <div><b>ID</b><span style={{fontFamily:"monospace",color:"var(--orange)",fontWeight:700}}>{trx.id}</span></div>
            <div><b>Metode</b><span style={{fontWeight:700,color:trx.metode==="CASH"?"var(--success)":"#7c3aed"}}>{trx.metode==="CASH"?"💵 Cash":"📱 QRIS"}</span></div>
            <div><b>Tanggal</b><span>{tgl.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})}</span></div>
            <div><b>Jam</b><span>{tgl.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span></div>
          </div>

          <div style={{fontSize:12,fontWeight:700,color:"var(--gray)",marginTop:10,marginBottom:4}}>Item Pesanan</div>
          <div className="trx-detail-list">
            {(trx.items || []).map((it, i) => (
              <div key={i} className="trx-detail-item">
                <span>{it.nama} <span style={{color:"var(--gray-mid)"}}>×{it.qty}</span></span>
                <span style={{fontWeight:700}}>{formatRupiah((it.harga||0)*(it.qty||0))}</span>
              </div>
            ))}
            {(!trx.items || trx.items.length === 0) && (
              <div style={{textAlign:"center",color:"var(--gray-mid)",fontSize:12,padding:10}}>Tidak ada item.</div>
            )}
          </div>

          <div className="receipt-row total" style={{display:"flex",justifyContent:"space-between",padding:"10px 4px",borderTop:"2px solid var(--black)",marginTop:6}}>
            <span style={{fontWeight:800}}>TOTAL</span>
            <span style={{fontWeight:800,color:"var(--orange)",fontSize:16}}>{formatRupiah(trx.total)}</span>
          </div>

          <button className="btn-new-trx" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}
