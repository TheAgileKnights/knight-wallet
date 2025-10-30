/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import axios from 'axios'

const appName = import.meta.env.VITE_APP_NAME || 'Knight Wallet'
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333'

// Configure axios to use absolute URLs for Capacitor
axios.defaults.baseURL = apiUrl
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: () => appName,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: false })
    ).then(async (page) => {
      if (!page.default.layout) {
        const layoutModule = await import('../pages/layouts/app.vue')
        page.default.layout = layoutModule.default
      }
      return page
    })
  },

  setup({ el, App, props, plugin }) {
    const pinia = createPinia()

    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(pinia)
      .component('Icon', Icon)
      .mount(el)
  },
})
