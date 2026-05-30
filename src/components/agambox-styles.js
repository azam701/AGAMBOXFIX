export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --yellow:#FFD600;--yellow-light:#FFF8CC;--yellow-dark:#E6C200;
  --orange:#FF6B00;--orange-light:#FFF0E6;--orange-dark:#E65C00;
  --black:#0F0F0F;--gray-dark:#1A1A1A;--gray:#555;--gray-mid:#999;
  --gray-light:#E8E8E8;--white:#FFFFFF;--bg:#F5F5F5;
  --success:#22C55E;--red:#EF4444;
  --shadow:0 2px 10px rgba(0,0,0,0.07);--shadow-lg:0 8px 32px rgba(0,0,0,0.13);
}
html,body,#root{height:100%;font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);}
.app{display:flex;flex-direction:column;height:100vh;overflow:hidden;}

.nav{background:var(--black);display:flex;align-items:center;padding:0 14px;height:54px;gap:4px;flex-shrink:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.35);}
.nav-brand{font-family:'Syne',sans-serif;font-size:19px;font-weight:800;color:var(--yellow);letter-spacing:1px;margin-right:16px;flex-shrink:0;}
.nav-brand span{color:var(--orange);}
.nav-tab{padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;color:#aaa;cursor:pointer;border:none;background:transparent;transition:all .15s;display:flex;align-items:center;gap:5px;white-space:nowrap;font-family:inherit;}
.nav-tab:hover{color:#fff;background:rgba(255,255,255,.08);}
.nav-tab.active{color:var(--black);background:var(--yellow);}
.content{flex:1;overflow:hidden;display:flex;}

.db-badge{margin-left:auto;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;flex-shrink:0;}
.db-badge.supabase{background:#1DB954;color:#fff;}
.db-badge.local{background:#555;color:#FFD600;}

.kasir-layout{display:flex;width:100%;height:100%;overflow:hidden;}
.kasir-left{flex:1;display:flex;flex-direction:column;overflow:hidden;padding:14px;gap:10px;min-width:0;}
.kasir-right{width:330px;flex-shrink:0;background:var(--white);display:flex;flex-direction:column;border-left:1px solid var(--gray-light);overflow:hidden;}

.search-bar{display:flex;align-items:center;gap:8px;background:var(--white);border:2px solid var(--gray-light);border-radius:12px;padding:9px 13px;transition:border-color .15s;flex-shrink:0;}
.search-bar:focus-within{border-color:var(--yellow);}
.search-bar input{flex:1;border:none;outline:none;font-size:14px;font-family:inherit;color:var(--black);background:transparent;}
.search-bar svg{color:var(--gray-mid);flex-shrink:0;}

.category-filter{display:flex;gap:6px;overflow-x:auto;flex-shrink:0;padding-bottom:2px;}
.category-filter::-webkit-scrollbar{height:0;}
.cat-btn{padding:5px 13px;border-radius:20px;font-size:12px;font-weight:700;border:2px solid var(--gray-light);background:var(--white);color:var(--gray);cursor:pointer;white-space:nowrap;transition:all .15s;font-family:inherit;}
.cat-btn:hover{border-color:var(--orange);color:var(--orange);}
.cat-btn.active{background:var(--orange);border-color:var(--orange);color:var(--white);}

.filter-aktif-row{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.toggle-wrap{display:flex;align-items:center;gap:6px;cursor:pointer;user-select:none;}
.toggle-track{width:34px;height:18px;border-radius:9px;background:var(--gray-light);position:relative;transition:background .2s;}
.toggle-track.on{background:var(--orange);}
.toggle-thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.2);}
.toggle-track.on .toggle-thumb{transform:translateX(16px);}
.toggle-label{font-size:11px;font-weight:700;color:var(--gray);}

.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;overflow-y:auto;flex:1;padding-bottom:4px;}
.product-grid::-webkit-scrollbar{width:5px;}
.product-grid::-webkit-scrollbar-thumb{background:var(--gray-light);border-radius:3px;}

.product-card{background:var(--white);border-radius:14px;cursor:pointer;border:2px solid transparent;transition:all .15s;display:flex;flex-direction:column;align-items:center;box-shadow:var(--shadow);overflow:hidden;position:relative;}
.product-card:hover:not(.inactive){border-color:var(--yellow);transform:translateY(-2px);box-shadow:var(--shadow-lg);}
.product-card.inactive{opacity:.45;cursor:not-allowed;filter:grayscale(.8);}
.product-card.in-cart{border-color:var(--orange);}

.product-img-wrap{width:100%;aspect-ratio:1;background:var(--bg);overflow:hidden;display:flex;align-items:center;justify-content:center;}
.product-img{width:100%;height:100%;object-fit:cover;}
.product-img-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:var(--gray-mid);font-size:11px;width:100%;height:100%;}
.product-img-placeholder svg{opacity:.35;}

.product-info{padding:8px 8px 10px;width:100%;text-align:center;}
.product-name{font-size:12px;font-weight:700;color:var(--black);line-height:1.3;margin-bottom:3px;}
.product-price{font-size:11px;font-weight:700;color:var(--orange);}
.product-add{width:26px;height:26px;border-radius:7px;background:var(--yellow);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--black);transition:all .15s;margin:0 auto 2px;font-family:inherit;}
.product-add:hover{background:var(--orange);color:#fff;transform:scale(1.1);}
.habis-badge{position:absolute;top:6px;right:6px;background:#ef4444;color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;}
.cart-qty-indicator{position:absolute;top:6px;left:6px;background:var(--orange);color:#fff;font-size:10px;font-weight:800;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;}

.order-header{padding:14px 16px;border-bottom:1px solid var(--gray-light);background:var(--yellow);flex-shrink:0;}
.order-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--black);display:flex;align-items:center;gap:8px;}
.order-count{background:var(--black);color:var(--yellow);font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;}
.order-items{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;}
.order-items::-webkit-scrollbar{width:3px;}
.order-items::-webkit-scrollbar-thumb{background:var(--gray-light);}

.order-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--gray-mid);gap:8px;padding:20px;}
.order-empty-icon{font-size:40px;opacity:.25;}
.order-empty-text{font-size:12px;text-align:center;line-height:1.5;}

.order-item{background:var(--bg);border-radius:10px;padding:8px 10px;display:flex;align-items:center;gap:8px;}
.order-item-photo{width:36px;height:36px;border-radius:8px;background:var(--gray-light);overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.order-item-photo img{width:100%;height:100%;object-fit:cover;}
.order-item-photo-ph{font-size:18px;opacity:.4;}
.order-item-info{flex:1;min-width:0;}
.order-item-name{font-size:12px;font-weight:700;color:var(--black);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.order-item-sub{font-size:11px;color:var(--orange);font-weight:600;margin-top:1px;}
.order-item-qty{display:flex;align-items:center;gap:5px;}
.qty-btn{width:24px;height:24px;border-radius:6px;border:none;cursor:pointer;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .1s;font-family:inherit;}
.qty-minus{background:var(--gray-light);color:var(--gray);}
.qty-minus:hover{background:var(--red);color:#fff;}
.qty-plus{background:var(--yellow);color:var(--black);}
.qty-plus:hover{background:var(--orange);color:#fff;}
.qty-num{font-size:13px;font-weight:800;color:var(--black);min-width:18px;text-align:center;}

.order-footer{border-top:1px solid var(--gray-light);padding:12px 14px;background:var(--white);flex-shrink:0;}
.order-subtotal-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.order-total-label{font-size:12px;color:var(--gray);font-weight:600;}
.order-total-value{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--black);}

.pay-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;}
.pay-btn{padding:12px 8px;border:none;border-radius:11px;cursor:pointer;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;letter-spacing:.5px;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:3px;}
.pay-btn:disabled{opacity:.35;cursor:not-allowed;transform:none!important;}
.pay-btn-cash{background:linear-gradient(135deg,#22C55E,#16a34a);color:#fff;box-shadow:0 3px 12px rgba(34,197,94,.35);}
.pay-btn-cash:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 5px 16px rgba(34,197,94,.45);}
.pay-btn-qris{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;box-shadow:0 3px 12px rgba(139,92,246,.35);}
.pay-btn-qris:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 5px 16px rgba(139,92,246,.45);}
.pay-btn-sub{font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;font-weight:600;opacity:.85;}

.btn-kosongkan{width:100%;padding:8px;background:transparent;border:1.5px solid var(--gray-light);border-radius:9px;cursor:pointer;font-size:11px;color:var(--gray-mid);font-weight:700;font-family:inherit;transition:all .15s;}
.btn-kosongkan:hover{border-color:var(--red);color:var(--red);}

.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(3px);padding:16px;}
.modal{background:var(--white);border-radius:20px;width:100%;max-width:400px;box-shadow:var(--shadow-lg);overflow:hidden;animation:slideUp .2s ease;}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-header{padding:18px 20px;background:var(--yellow);display:flex;justify-content:space-between;align-items:center;}
.modal-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:var(--black);}
.modal-close{width:30px;height:30px;border-radius:8px;border:none;background:rgba(0,0,0,.1);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.modal-close:hover{background:rgba(0,0,0,.2);}
.modal-body{padding:18px 20px;}

.success-check{width:64px;height:64px;background:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 14px;}
.receipt{background:var(--bg);border-radius:12px;padding:12px 14px;margin:10px 0;border:1px dashed var(--gray-light);}
.receipt-row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--gray-light);}
.receipt-row:last-child{border:none;}
.receipt-row.total{font-weight:800;font-size:14px;margin-top:4px;}
.receipt-label{color:var(--gray);}
.receipt-val{font-weight:600;color:var(--black);}
.receipt-method-cash{color:var(--success);}
.receipt-method-qris{color:#7c3aed;}
.btn-new-trx{width:100%;padding:13px;background:var(--yellow);color:var(--black);border:none;cursor:pointer;border-radius:12px;font-size:14px;font-weight:800;font-family:'Syne',sans-serif;transition:all .15s;margin-top:4px;}
.btn-new-trx:hover{background:var(--yellow-dark);}

.menu-page{width:100%;overflow-y:auto;padding:18px;}
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px;}
.page-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--black);}
.page-title span{color:var(--orange);}
.btn-primary{padding:10px 18px;background:linear-gradient(135deg,var(--orange),#FF8C00);color:#fff;border:none;cursor:pointer;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;transition:all .15s;display:flex;align-items:center;gap:6px;box-shadow:0 3px 10px rgba(255,107,0,.3);}
.btn-primary:hover{transform:translateY(-1px);}

.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;}
.menu-card{background:var(--white);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);border:2px solid transparent;transition:all .15s;}
.menu-card:hover{border-color:var(--yellow);}
.menu-card-img{width:100%;aspect-ratio:16/9;background:var(--bg);display:flex;align-items:center;justify-content:center;overflow:hidden;}
.menu-card-img img{width:100%;height:100%;object-fit:cover;}
.menu-card-img-ph{display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--gray-mid);font-size:11px;}
.menu-card-body{padding:12px;}
.menu-card-name{font-size:13px;font-weight:700;color:var(--black);margin-bottom:3px;}
.menu-card-price{font-size:12px;font-weight:700;color:var(--orange);margin-bottom:2px;}
.menu-card-cat{font-size:10px;color:var(--gray-mid);margin-bottom:10px;}
.menu-card-footer{display:flex;gap:7px;align-items:center;}

.status-radio{display:flex;gap:10px;margin-bottom:10px;}
.radio-opt{display:flex;align-items:center;gap:5px;cursor:pointer;font-size:12px;font-weight:700;}
.radio-circle{width:14px;height:14px;border-radius:50%;border:2px solid var(--gray-light);display:flex;align-items:center;justify-content:center;transition:all .15s;}
.radio-circle.aktif-sel{border-color:var(--success);background:var(--success);}
.radio-circle.habis-sel{border-color:var(--red);background:var(--red);}
.radio-dot{width:5px;height:5px;border-radius:50%;background:#fff;}

.btn-edit-sm{padding:5px 10px;background:var(--yellow-light);border:none;cursor:pointer;border-radius:7px;font-size:11px;font-weight:700;color:#7a6000;font-family:inherit;transition:all .15s;}
.btn-edit-sm:hover{background:var(--yellow);}
.btn-del-sm{padding:5px 9px;background:#fee2e2;border:none;cursor:pointer;border-radius:7px;font-size:11px;font-weight:700;color:var(--red);font-family:inherit;transition:all .15s;}
.btn-del-sm:hover{background:#fca5a5;}

.form-group{margin-bottom:13px;}
.form-label{font-size:12px;font-weight:700;color:var(--black);display:block;margin-bottom:5px;}
.form-input{width:100%;padding:9px 11px;border:2px solid var(--gray-light);border-radius:10px;font-size:13px;font-family:inherit;color:var(--black);outline:none;transition:border-color .15s;background:var(--white);}
.form-input:focus{border-color:var(--yellow);}
.form-select{width:100%;padding:9px 11px;border:2px solid var(--gray-light);border-radius:10px;font-size:13px;font-family:inherit;color:var(--black);outline:none;background:var(--white);transition:border-color .15s;}
.form-select:focus{border-color:var(--yellow);}

.photo-upload{width:100%;aspect-ratio:16/9;border:2px dashed var(--gray-light);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;overflow:hidden;position:relative;background:var(--bg);}
.photo-upload:hover{border-color:var(--orange);background:var(--orange-light);}
.photo-upload img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
.photo-upload-txt{font-size:12px;color:var(--gray-mid);font-weight:600;text-align:center;margin-top:6px;}
.photo-upload input{display:none;}
.photo-change-hint{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);color:#fff;font-size:10px;font-weight:700;text-align:center;padding:5px;opacity:0;transition:opacity .2s;}
.photo-upload:hover .photo-change-hint{opacity:1;}

.modal-footer{display:flex;gap:10px;margin-top:6px;}
.btn-cancel{flex:1;padding:11px;background:var(--gray-light);border:none;cursor:pointer;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;color:var(--gray);}
.btn-save{flex:2;padding:11px;background:linear-gradient(135deg,var(--orange),#FF8C00);color:#fff;border:none;cursor:pointer;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;}
.btn-save:hover{opacity:.9;}
.btn-save:disabled{opacity:.4;cursor:not-allowed;}

.laporan-page{width:100%;overflow-y:auto;padding:18px;}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
.stat-card{background:var(--white);border-radius:14px;padding:16px;box-shadow:var(--shadow);border-left:4px solid var(--yellow);}
.stat-card.orange{border-left-color:var(--orange);}
.stat-card.black{border-left-color:var(--black);}
.stat-card.green{border-left-color:var(--success);}
.stat-card.purple{border-left-color:#8b5cf6;}
.stat-card.blue{border-left-color:#3b82f6;}
.stat-icon{font-size:24px;margin-bottom:6px;}
.stat-label{font-size:10px;font-weight:700;color:var(--gray-mid);text-transform:uppercase;letter-spacing:.5px;}
.stat-value{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:var(--black);margin-top:3px;line-height:1.2;}

.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;}
.section-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--black);}
.filter-tabs{display:flex;gap:5px;}
.filter-tab{padding:5px 13px;border-radius:8px;font-size:11px;font-weight:700;border:2px solid var(--gray-light);background:var(--white);color:var(--gray);cursor:pointer;font-family:inherit;transition:all .15s;}
.filter-tab.active{background:var(--yellow);border-color:var(--yellow);color:var(--black);}

.trx-table{background:var(--white);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);}
.trx-table-header{display:grid;grid-template-columns:1.4fr 1.8fr 1fr 1.6fr;padding:10px 14px;background:var(--black);color:var(--yellow);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
.trx-row{display:grid;grid-template-columns:1.4fr 1.8fr 1fr 1.6fr;padding:11px 14px;border-bottom:1px solid var(--gray-light);font-size:12px;transition:background .1s;}
.trx-row:last-child{border:none;}
.trx-row:hover{background:var(--bg);}
.trx-id{font-weight:700;color:var(--orange);font-family:monospace;font-size:10px;}
.trx-time{color:var(--gray);}
.trx-method{font-weight:700;}
.method-cash{color:var(--success);}
.method-qris{color:#7c3aed;}
.trx-total{font-weight:800;color:var(--black);text-align:right;}
.empty-state{padding:36px;text-align:center;color:var(--gray-mid);}
.empty-state-icon{font-size:36px;opacity:.25;margin-bottom:8px;}

.spinner{width:20px;height:20px;border:2px solid var(--gray-light);border-top-color:var(--orange);border-radius:50%;animation:spin .6s linear infinite;margin:0 auto;}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-overlay{display:flex;align-items:center;justify-content:center;height:100%;width:100%;}

.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--black);color:var(--yellow);padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;z-index:9999;animation:toastIn .2s ease;box-shadow:var(--shadow-lg);}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* ===== PORTRAIT (stack vertikal) ===== */
@media(max-width:768px) and (orientation: portrait){
  .kasir-layout{flex-direction:column;}
  .kasir-right{width:100%;height:280px;border-left:none;border-top:1px solid var(--gray-light);flex-shrink:0;}
  .kasir-left{overflow-y:auto;}
  .product-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr));}
  .stats-grid{grid-template-columns:repeat(2,1fr);}
  .trx-table-header,.trx-row{grid-template-columns:1.2fr 1fr 1.4fr;}
  .trx-table-header div:nth-child(2),.trx-row div:nth-child(2){display:none;}
  .menu-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));}
  .nav-brand{font-size:15px;margin-right:6px;}
  .nav-tab{padding:5px 9px;font-size:11px;}
}
/* ===== LANDSCAPE (kiri produk, kanan checkout) ===== */
@media (orientation: landscape) and (max-height: 600px){
  .kasir-layout{flex-direction:row !important;}
  .kasir-left{flex:1;overflow-y:auto;padding:8px;gap:6px;}
  .kasir-right{width:260px !important;height:100% !important;border-left:1px solid var(--gray-light) !important;border-top:none !important;flex-shrink:0;}
  .product-grid{grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:6px;}
  .product-name{font-size:11px;}
  .product-price{font-size:10px;}
  .order-header{padding:8px 12px;}
  .order-title{font-size:13px;}
  .order-items{padding:6px;}
  .order-footer{padding:8px 10px;}
  .order-total-value{font-size:18px;}
  .pay-btn{padding:8px 4px;font-size:12px;}
  .nav{height:42px;}
  .nav-brand{font-size:14px;margin-right:6px;}
  .nav-tab{padding:4px 8px;font-size:11px;}
}
@media(max-width:480px) and (orientation: portrait){
  .product-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr));}
  .stats-grid{grid-template-columns:1fr 1fr;}
  .kasir-left{padding:8px;}
  .pay-btn{font-size:13px;}
}

/* ===== DEBUG ORIENTATION BADGE ===== */
.orient-badge{font-size:10px;font-weight:800;padding:3px 8px;border-radius:8px;margin-left:6px;letter-spacing:.5px;}
.orient-badge.portrait{background:#3b82f6;color:#fff;}
.orient-badge.landscape{background:#22C55E;color:#fff;}

/* ===== TRX DETAIL ===== */
.trx-row{cursor:pointer;}
.trx-row:hover{background:var(--yellow-light) !important;}
.trx-detail-list{background:var(--bg);border-radius:10px;padding:10px 12px;margin:8px 0;max-height:240px;overflow-y:auto;}
.trx-detail-item{display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px dashed var(--gray-light);}
.trx-detail-item:last-child{border:none;}
.trx-detail-meta{display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;margin-bottom:8px;}
.trx-detail-meta div{background:var(--bg);padding:6px 10px;border-radius:8px;}
.trx-detail-meta b{display:block;font-size:10px;color:var(--gray-mid);font-weight:700;text-transform:uppercase;}

/* ===== PHOTO UPLOAD (pastikan input bisa diklik di mobile) ===== */
.photo-upload input[type="file"]{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:5;display:block !important;}
`;
