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
        alimentacion: resolve(__dirname, 'templates/alimentacion.html'),
        perfil: resolve(__dirname, 'templates/perfil.html'),
        editarPerfil: resolve(__dirname, 'templates/editar-perfil.html'),
        calorias: resolve(__dirname, 'templates/calorias.html'),
        estadisticas: resolve(__dirname, 'templates/estadisticas.html'),
      }
    }
  }
})
