import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
    exclude: ['chunk-EJJUI4KJ'] // puedes poner el nombre del paquete que te indique Vite
  }
});
