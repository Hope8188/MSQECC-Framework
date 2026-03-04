/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        superposition: "#F4F4F5",
        entanglement: "#00f3ff",
        horizon: "#0a0a0c",
      },
      fontFamily: {
        geist: ['Inter', 'Helvetica Now', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at bottom center, rgba(59, 130, 246, 0.15), transparent 60%)',
      }
    },
  },
  plugins: [],
}
