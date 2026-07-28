import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Automatically use /Portofolio/ when building on GitHub Actions,
// and './' for local development (npm run dev / npm run build locally).
const base = process.env.GITHUB_PAGES === 'true' ? '/Portofolio/' : './'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
