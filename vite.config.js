import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'templates/login.html'),
        menu: resolve(__dirname, 'templates/menu.html'),
        registro: resolve(__dirname, 'templates/registro.html'),
        contacto: resolve(__dirname, 'templates/contacto.html'),
        entrenamiento: resolve(__dirname, 'templates/entrenamiento.html'),
      }
    }
  }
})
