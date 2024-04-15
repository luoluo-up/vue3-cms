import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入vite-plugin-vue-setup-extend
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import topLevelAwait from 'vite-plugin-top-level-await'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: i => `__tla_${i}`
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/variable.scss";`
        additionalData: `@import "@/styles/variable.scss";`
      }
    }
  }
})
