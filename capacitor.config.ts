import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.martipops.knightwallet',
  appName: 'knight-wallet',
  webDir: 'public/assets',
  server: {
    // For live reload during development, uncomment and set your local IP
    // url: 'http://YOUR_LOCAL_IP:3333',
    // cleartext: true,
  },
}

export default config
