import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Замените <НАЗВАНИЕ_РЕПОЗИТОРИЯ> на имя вашего репозитория
const repoName = 'https://kbakyiiika.github.io/qwert/';

export default defineConfig({
  plugins: [react()],
  base: `/qwert/`, // Указываем базовый путь для GitHub Pages
  build: {
    outDir: 'dist', // Папка, в которую будет собираться проект
  },
  server: {
    port: 8081, // Порт для локального сервера
  },
});
