import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      //检测请求路径中的/api，有就处理
      '/api': {
        //更换的目标源，后台服务所在的源
        target: 'http://localhost:8080',
        //是否更换源
        changeOrigin: true,
        //路径重写，本项目启动在端口5173拼接后为5173/api，替换源8080后将/api替换为空字符串，再次拼接后就是8080/xxxx，就是后台api的访问接口
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
