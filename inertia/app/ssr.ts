import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import AppLayout from '~/layouts/AppLayout.vue'

const appName = import.meta.env.VITE_APP_NAME || 'Codex'

export default function render(page: any) {
  return createInertiaApp({
    page,
    title: (title) => `${appName} - ${title}`,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true })
      let resolvedPage = pages[`../pages/${name}.vue`]

      resolvedPage.default.layout = resolvedPage.default.layout || AppLayout

      return resolvedPage
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
