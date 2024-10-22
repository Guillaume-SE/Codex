/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import type { DefineComponent } from 'vue'
import { createSSRApp, h } from 'vue'
import AppLayout from '~/layouts/AppLayout.vue'
import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Codex'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${appName} - ${title}`,

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )

    page.default.layout = page.default.layout || AppLayout

    return page
  },

  setup({ el, App, props, plugin }) {
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
