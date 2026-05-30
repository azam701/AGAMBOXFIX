# App Assets

- `icon.png` — 1024×1024 launcher icon (orange + "A" mark)
- `splash.png` — 1536×1536 splash screen

Diproses oleh `@capacitor/assets`:

```bash
npx capacitor-assets generate --android \
  --iconBackgroundColor "#F97316" \
  --splashBackgroundColor "#F97316"
```

Akan generate semua resolusi mipmap & drawable ke `android/app/src/main/res/`.
