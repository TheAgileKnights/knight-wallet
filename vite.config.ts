import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from '@tailwindcss/vite'
import { renameSync, existsSync, rmdirSync } from 'node:fs'
import { join } from 'node:path'

const isCapacitorBuild = process.env.CAPACITOR_BUILD === 'true'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    vue(),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
    tailwindcss(),
    // Plugin to move index.html to root after build
    isCapacitorBuild && {
      name: 'move-index',
      closeBundle() {
        const src = join(process.cwd(), 'public/assets/inertia/index.html')
        const dest = join(process.cwd(), 'public/assets/index.html')
        if (existsSync(src)) {
          renameSync(src, dest)
          // Clean up empty directory
          try {
            rmdirSync(join(process.cwd(), 'public/assets/inertia'))
          } catch (e) {}
        }
      },
    },
  ].filter(Boolean),

  publicDir: isCapacitorBuild ? 'public/images' : false,

  build: isCapacitorBuild
    ? {
        outDir: 'public/assets',
        emptyOutDir: false,
        rollupOptions: {
          input: 'inertia/index.html',
        },
      }
    : undefined,

  server: {
    allowedHosts: ['kw.martipops.net', 'localhost'],
  },

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '/images': `${getDirname(import.meta.url)}/public/images`,
    },
  },
})
