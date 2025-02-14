import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/admin': {
        target: isProd ? 'https://weatherbot.100dollarlandingpages.com' : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: isProd ? 'https://weatherbot.100dollarlandingpages.com' : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
