import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/tomato_clock/', // 添加此行，确保资源路径与部署路径匹配
  plugins: [vue()],
})
