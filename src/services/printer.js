// ============================================================
// BLUETOOTH ESC/POS PRINTER (Web Bluetooth API)
// Compatible: thermal mini printer 58mm/80mm (MPT, Zjiang, Xprinter, generic)
// ============================================================

const LS_KEY = "agambox_printer";

// Service UUIDs umum untuk thermal printer Bluetooth
const KNOWN_SERVICES = [
  "000018f0-0000-1000-8000-00805f9b34fb", // generic thermal (paling umum)
  "0000ff00-0000-1000-8000-00805f9b34fb", // varian Zjiang/Xprinter
  "0000ffe0-0000-1000-8000-00805f9b34fb", // varian HM-10 / generik
  "49535343-fe7d-4ae5-8fa9-9fafd205e455", // varian Microchip
  "e7810a71-73ae-499d-8c15-faa9aef0c3f2", // varian lain
];

let device = null;
let characteristic = null;

export const isBluetoothSupported = () =>
  typeof navigator !== "undefined" && !!navigator.bluetooth;

export const getSavedPrinter = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; }
};
const savePrinter = (info) => { try { localStorage.setItem(LS_KEY, JSON.stringify(info)); } catch {} };
const clearPrinter = () => { try { localStorage.removeItem(LS_KEY); } catch {} };

export const isConnected = () => !!(device && device.gatt && device.gatt.connected && characteristic);

async function findWritableCharacteristic(server) {
  for (const svcUuid of KNOWN_SERVICES) {
    try {
      const svc = await server.getPrimaryService(svcUuid);
      const chars = await svc.getCharacteristics();
      for (const ch of chars) {
        if (ch.properties.write || ch.properties.writeWithoutResponse) {
          return ch;
        }
      }
    } catch { /* try next */ }
  }
  // fallback: scan all services
  const services = await server.getPrimaryServices();
  for (const svc of services) {
    const chars = await svc.getCharacteristics();
    for (const ch of chars) {
      if (ch.properties.write || ch.properties.writeWithoutResponse) {
        return ch;
      }
    }
  }
  throw new Error("Karakteristik tulis tidak ditemukan pada printer.");
}

export async function connectPrinter() {
  if (!isBluetoothSupported()) {
    throw new Error("UNSUPPORTED");
  }
  device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: KNOWN_SERVICES,
  });
  const server = await device.gatt.connect();
  characteristic = await findWritableCharacteristic(server);
  const info = { id: device.id, name: device.name || "Printer Bluetooth" };
  savePrinter(info);
  device.addEventListener("gattserverdisconnected", () => {
    console.log("[PRINTER] disconnected");
    characteristic = null;
  });
  console.log("[PRINTER] connected:", info.name);
  return info;
}

export async function reconnectPrinter() {
  if (!isBluetoothSupported()) return null;
  const saved = getSavedPrinter();
  if (!saved) return null;
  try {
    // getDevices() butuh permission persisten (Chrome 85+) — bisa null di banyak case
    if (navigator.bluetooth.getDevices) {
      const devices = await navigator.bluetooth.getDevices();
      const match = devices.find(d => d.id === saved.id);
      if (match) {
        device = match;
        const server = await device.gatt.connect();
        characteristic = await findWritableCharacteristic(server);
        console.log("[PRINTER] auto-reconnect ok:", saved.name);
        return saved;
      }
    }
  } catch (e) { console.warn("[PRINTER] auto-reconnect gagal:", e); }
  return saved; // info tersimpan, user perlu klik Hubungkan
}

export async function disconnectPrinter() {
  try { if (device && device.gatt && device.gatt.connected) device.gatt.disconnect(); } catch {}
  device = null; characteristic = null;
  clearPrinter();
}

async function writeChunks(bytes) {
  if (!characteristic) throw new Error("Printer belum terhubung.");
  const CHUNK = 180; // BLE MTU limit
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.slice(i, i + CHUNK);
    if (characteristic.properties.writeWithoutResponse) {
      await characteristic.writeValueWithoutResponse(slice);
    } else {
      await characteristic.writeValue(slice);
    }
    await new Promise(r => setTimeout(r, 30));
  }
}

// ===== ESC/POS encoder =====
const ESC = 0x1B, GS = 0x1D, LF = 0x0A;
const enc = new TextEncoder();

function concat(arrays) {
  let len = 0; arrays.forEach(a => len += a.length);
  const out = new Uint8Array(len);
  let off = 0;
  for (const a of arrays) { out.set(a, off); off += a.length; }
  return out;
}

function pad(left, right, width = 32) {
  const space = Math.max(1, width - left.length - right.length);
  return left + " ".repeat(space) + right;
}

function buildReceipt(order, width = 32) {
  const cmds = [];
  cmds.push(new Uint8Array([ESC, 0x40])); // init
  cmds.push(new Uint8Array([ESC, 0x61, 0x01])); // center
  cmds.push(new Uint8Array([ESC, 0x45, 0x01])); // bold on
  cmds.push(new Uint8Array([GS, 0x21, 0x11])); // double size
  cmds.push(enc.encode("AGAM BOX\n"));
  cmds.push(new Uint8Array([GS, 0x21, 0x00])); // normal
  cmds.push(new Uint8Array([ESC, 0x45, 0x00])); // bold off
  cmds.push(enc.encode("Warkop Kuliner Agam\n"));
  cmds.push(enc.encode("=".repeat(width) + "\n"));
  cmds.push(new Uint8Array([ESC, 0x61, 0x00])); // left

  const d = new Date(order.tanggal);
  const tgl = d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  const jam = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  cmds.push(enc.encode(pad("Tanggal", tgl, width) + "\n"));
  cmds.push(enc.encode(pad("Jam", jam, width) + "\n"));
  cmds.push(enc.encode(pad("No.Trx", String(order.id), width) + "\n"));
  cmds.push(enc.encode("-".repeat(width) + "\n"));

  (order.items || []).forEach(it => {
    cmds.push(enc.encode(it.nama + "\n"));
    const left = `  ${it.qty} x ${it.harga.toLocaleString("id-ID")}`;
    const right = (it.harga * it.qty).toLocaleString("id-ID");
    cmds.push(enc.encode(pad(left, right, width) + "\n"));
  });
  cmds.push(enc.encode("-".repeat(width) + "\n"));

  cmds.push(new Uint8Array([ESC, 0x45, 0x01]));
  cmds.push(enc.encode(pad("TOTAL", "Rp " + (order.total || 0).toLocaleString("id-ID"), width) + "\n"));
  cmds.push(new Uint8Array([ESC, 0x45, 0x00]));
  cmds.push(enc.encode(pad("Metode", order.metode, width) + "\n"));
  cmds.push(enc.encode("=".repeat(width) + "\n"));
  cmds.push(new Uint8Array([ESC, 0x61, 0x01]));
  cmds.push(enc.encode("Terima kasih\n"));
  cmds.push(enc.encode("Selamat menikmati\n"));
  cmds.push(new Uint8Array([LF, LF, LF, LF]));
  // Try cut (diabaikan jika printer tidak punya cutter)
  cmds.push(new Uint8Array([GS, 0x56, 0x00]));
  return concat(cmds);
}

export async function printReceipt(order) {
  if (!isConnected()) {
    // Coba reconnect cepat
    if (device && device.gatt) {
      try {
        const server = await device.gatt.connect();
        characteristic = await findWritableCharacteristic(server);
      } catch (e) { throw new Error("Printer tidak terhubung. Hubungkan dulu di Pengaturan."); }
    } else {
      throw new Error("Printer tidak terhubung. Hubungkan dulu di Pengaturan.");
    }
  }
  const bytes = buildReceipt(order, 32);
  await writeChunks(bytes);
}

export async function printTest() {
  const sample = {
    id: "TEST-001",
    tanggal: new Date().toISOString(),
    metode: "CASH",
    total: 25000,
    items: [
      { nama: "Tes Cetak Item 1", qty: 1, harga: 15000 },
      { nama: "Tes Cetak Item 2", qty: 2, harga: 5000 },
    ],
  };
  await printReceipt(sample);
}
