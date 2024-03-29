import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      // This is the path to the src folder
      '@': '/src'
    }
  },
  build: {
    outDir: 'docs'
  },
  assetsInclude: ['**/*.md'],
  server: {
    host: true,
    port: '1109',

  },
  plugins: [
    vue()
  ],
})
