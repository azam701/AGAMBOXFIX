# AGAM BOX — Build Android APK

Stack: **React + Capacitor 8** • Target: **Android**
App ID: `id.agambox.kasir` • Nama: **AGAM BOX**

---

## Cara kerja

Karena aplikasi ini server-rendered (TanStack Start di Cloudflare), APK
dibangun sebagai **WebView shell** yang memuat URL produksi Lovable yang
sudah dipublish. Semua fitur (kasir, QRIS, localStorage, dll) tetap jalan.

> ⚠️ Setelah project di-publish di Lovable, **edit `capacitor.config.ts`**
> dan ganti `server.url` ke URL publish kamu (mis. `https://agambox.lovable.app`).
> Lalu commit & push — workflow akan rebuild APK otomatis.

---

## Build via GitHub Actions (recommended, zero-setup)

1. Push repo ini ke GitHub.
2. Buka tab **Actions** → workflow **Build Android APK** akan jalan otomatis di tiap push ke `main`.
3. Setelah hijau (±5 menit), buka run → bagian **Artifacts** → download
   `agambox-release-apk.zip` → ekstrak → dapat file `.apk`.
4. Kirim ke HP Android → install (aktifkan "Install from unknown sources").

> APK release masih **unsigned**. Untuk Play Store kamu perlu tanda tangan;
> untuk install sideload di HP sendiri, unsigned + `allowDebuggable` cukup.
> Jika Android menolak, ganti `assembleRelease` → `assembleDebug` di
> `.github/workflows/android.yml` (debug APK selalu signed dengan debug key).

---

## Build lokal (alternatif)

Prasyarat: **JDK 17**, **Android Studio / Android SDK**, **Node + Bun**.

```bash
bun install
npx cap add android
npx cap sync android
npx capacitor-assets generate --android \
  --iconBackgroundColor "#F97316" \
  --splashBackgroundColor "#F97316"

# Tambahkan permissions: copy isi android-permissions.xml
# ke android/app/src/main/AndroidManifest.xml SEBELUM tag <application>

cd android
./gradlew assembleDebug         # → app/build/outputs/apk/debug/app-debug.apk
# atau
./gradlew assembleRelease       # → app/build/outputs/apk/release/app-release-unsigned.apk
```

Buka di Android Studio: `npx cap open android`.

---

## Permission yang dipasang

- `INTERNET`, `ACCESS_NETWORK_STATE`
- `CAMERA`
- `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `READ_MEDIA_IMAGES`
- `BLUETOOTH`, `BLUETOOTH_ADMIN`, `BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`
- `ACCESS_FINE_LOCATION` (wajib untuk scan BLE Android 6–11)

---

## Catatan Web Bluetooth (printer thermal)

Android System WebView mendukung Web Bluetooth **sejak Chrome 89**, tapi
sering disabled by default. Untuk fitur cetak struk lebih reliable di APK,
nanti bisa migrasi ke plugin native:

```bash
bun add @capacitor-community/bluetooth-le
```

Untuk sekarang, jika printer tidak terdeteksi di APK, gunakan **Chrome
Android** langsung dengan URL publish — Web Bluetooth pasti jalan.

---

## File yang ditambah / diubah

- `capacitor.config.ts` — config Capacitor
- `resources/icon.png`, `resources/splash.png` — asset sumber
- `android-permissions.xml` — daftar permission untuk di-merge
- `.github/workflows/android.yml` — auto-build APK
- `www/index.html` — fallback shell (saat offline / sebelum WebView load)
- `package.json` — deps: `@capacitor/core`, `@capacitor/android`,
  `@capacitor/cli`, `@capacitor/assets`, `@capacitor/splash-screen`
