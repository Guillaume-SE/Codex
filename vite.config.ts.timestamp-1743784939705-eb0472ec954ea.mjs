// vite.config.ts
import { getDirname } from "file:///C:/Users/User/Desktop/Projets_dev/Codex/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///C:/Users/User/Desktop/Projets_dev/Codex/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import adonisjs from "file:///C:/Users/User/Desktop/Projets_dev/Codex/node_modules/@adonisjs/vite/build/src/client/main.js";
import vue from "file:///C:/Users/User/Desktop/Projets_dev/Codex/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/User/Desktop/Projets_dev/Codex/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/User/Desktop/Projets_dev/Codex/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ["resources/js/app.js"],
      reload: ["resources/views/**/*.edge"]
    }),
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.ts" } }),
    vue(),
    adonisjs({
      entrypoints: ["inertia/app/app.ts", "inertia/css/app.css"],
      reload: ["resources/views/**/*.edge"]
    })
  ],
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxcUHJvamV0c19kZXZcXFxcQ29kZXhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRGVza3RvcFxcXFxQcm9qZXRzX2RldlxcXFxDb2RleFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9EZXNrdG9wL1Byb2pldHNfZGV2L0NvZGV4L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXHJcbmltcG9ydCBpbmVydGlhIGZyb20gJ0BhZG9uaXNqcy9pbmVydGlhL2NsaWVudCdcclxuaW1wb3J0IGFkb25pc2pzIGZyb20gJ0BhZG9uaXNqcy92aXRlL2NsaWVudCdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIGFkb25pc2pzKHtcclxuICAgICAgZW50cnlwb2ludHM6IFsncmVzb3VyY2VzL2pzL2FwcC5qcyddLFxyXG5cclxuICAgICAgcmVsb2FkOiBbJ3Jlc291cmNlcy92aWV3cy8qKi8qLmVkZ2UnXSxcclxuICAgIH0pLFxyXG4gICAgaW5lcnRpYSh7IHNzcjogeyBlbmFibGVkOiB0cnVlLCBlbnRyeXBvaW50OiAnaW5lcnRpYS9hcHAvc3NyLnRzJyB9IH0pLFxyXG4gICAgdnVlKCksXHJcbiAgICBhZG9uaXNqcyh7XHJcbiAgICAgIGVudHJ5cG9pbnRzOiBbJ2luZXJ0aWEvYXBwL2FwcC50cycsICdpbmVydGlhL2Nzcy9hcHAuY3NzJ10sXHJcbiAgICAgIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICd+Lyc6IGAke2dldERpcm5hbWUoaW1wb3J0Lm1ldGEudXJsKX0vaW5lcnRpYS9gLFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULFNBQVMsa0JBQWtCO0FBQzlVLE9BQU8sYUFBYTtBQUNwQixPQUFPLGNBQWM7QUFDckIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBSm9LLElBQU0sMkNBQTJDO0FBTWxQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQSxNQUNQLGFBQWEsQ0FBQyxxQkFBcUI7QUFBQSxNQUVuQyxRQUFRLENBQUMsMkJBQTJCO0FBQUEsSUFDdEMsQ0FBQztBQUFBLElBQ0QsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLE1BQU0sWUFBWSxxQkFBcUIsRUFBRSxDQUFDO0FBQUEsSUFDcEUsSUFBSTtBQUFBLElBQ0osU0FBUztBQUFBLE1BQ1AsYUFBYSxDQUFDLHNCQUFzQixxQkFBcUI7QUFBQSxNQUN6RCxRQUFRLENBQUMsMkJBQTJCO0FBQUEsSUFDdEMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxXQUFXLHdDQUFlLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
