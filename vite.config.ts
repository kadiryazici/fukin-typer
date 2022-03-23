import UnpluginIcons from 'unplugin-icons/vite';
import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import pkg from './package.json';

const isBuildingForPages = process.env.ghpages as undefined | 'yes';

export default defineConfig({
   plugins: [
      Vue(), //
      UnpluginIcons({
         autoInstall: true,
      }),
   ],
   base: isBuildingForPages ? `/${pkg.name}/` : '/',
   build: {
      outDir: isBuildingForPages ? 'dist-pages' : 'dist',
   },
});
