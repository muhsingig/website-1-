import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hostCities: resolve(__dirname, 'host-cities.html'),
        teams: resolve(__dirname, 'teams.html'),
        standings: resolve(__dirname, 'standings.html'),
        fixtures: resolve(__dirname, 'fixtures.html'),
      },
    },
  },
});
