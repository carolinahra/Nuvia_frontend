import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'templates/login.html'),
        menu: resolve(__dirname, 'templates/menu.html'),
        registro: resolve(__dirname, 'templates/registro.html'),
        contacto: resolve(__dirname, 'templates/contacto.html'),
      }
    }
  }
})
