import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'

const appName = import.meta.env.VITE_APP_NAME || 'Codex'

export default function render(page: any) {
  return createInertiaApp({
    page,
    title: (title) => `${appName} - ${title}`,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true })
      return pages[`../pages/${name}.vue`]
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
