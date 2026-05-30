import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.agambox.kasir',
  appName: 'AGAM BOX',
  webDir: 'www',
  // App ini di-host sebagai web (TanStack Start SSR di Cloudflare).
  // WebView Android akan memuat URL produksi yang sudah dipublish di Lovable.
  // Ganti URL ini setelah project dipublish (Publish → copy URL).
  server: {
    url: 'https://project--5ef2c102-052b-489f-9e41-c69f180e36fc.lovable.app',
    cleartext: false,
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#F97316',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
};

export default config;
