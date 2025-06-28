import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',  
    include: /src\/.*\.(jsx|tsx|js)$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', 
        '.jsx': 'jsx',  
        '.tsx': 'tsx',  
      },
    },
  },
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     loader: 'jsx',
//     include: /src\/.*\.jsx?$/,
//     exclude: [],
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         '.js': 'jsx',
//       },
//     },
//   },
// })
