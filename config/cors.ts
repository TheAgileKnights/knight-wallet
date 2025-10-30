import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: (origin) => {
    // Allow Capacitor origins (capacitor:// and ionic://)
    if (origin?.startsWith('capacitor://') || origin?.startsWith('ionic://')) {
      return true
    }
    // Allow localhost for development
    if (origin?.includes('localhost')) {
      return true
    }
    // Add your production domain here
    const allowedOrigins = ['http://localhost:3333', 'https://kw.martipops.net']
    return allowedOrigins.includes(origin || '')
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
