import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['globe.gl', 'three']
  },
  resolve: {
    alias: {
      'three/webgpu': 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js',
      'three/tsl': 'three/examples/jsm/nodes/Nodes.js'
    }
  },
  define: {
    global: 'globalThis',
  },
  build: {
    target: 'esnext',
    outDir: 'out',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      }
    }
  },
  publicDir: 'static',
  server: {
    port: 9000,
    host: true,
  },
});