import { defineConfig } from 'vite';
import pkg from './package.json';
import vue from '@vitejs/plugin-vue';

const isBuildingForPages = process.env.ghpages as undefined | 'yes';

export default defineConfig({
   plugins: [vue()],
   base: isBuildingForPages ? `/${pkg.name}/` : '/',
   build: {
      outDir: isBuildingForPages ? 'dist-pages' : 'dist',
   },
});
