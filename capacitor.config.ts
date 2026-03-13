import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'online.skillskonnect.app',
  appName: 'Skills Konnect',
  webDir: 'dist',
  server: {
    // Allows the mobile app to call the live production API
    // (same backend shared with the web app at https://skillskonnect.online/)
    allowNavigation: [
      'https://skillskonnect.onrender.com',
      'https://skillskonnect.online',
    ],
    androidScheme: 'https',
    cleartext: false,
  },
  plugins: {
    // CapacitorHttp: patches window.fetch + XHR to use native HTTP on Android/iOS.
    // This bypasses WebView CORS restrictions so API calls to external servers work.
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#007A5E',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#007A5E',
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
    Preferences: {
      group: 'skillskonnect',
    },
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    // Disable for production release
    webContentsDebuggingEnabled: false,
  },
  ios: {
    contentInset: 'always',
    scrollEnabled: true,
    preferredContentMode: 'mobile',
  },
};

export default config;
