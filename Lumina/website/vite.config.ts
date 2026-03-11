import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        chunkSizeWarningLimit: 900,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom'],
                    motion: ['framer-motion', 'gsap', '@gsap/react', 'lenis'],
                    three: ['three', '@react-three/fiber', '@react-three/drei'],
                    ui: ['lucide-react', 'clsx', 'tailwind-merge'],
                },
            },
        },
    },
})
