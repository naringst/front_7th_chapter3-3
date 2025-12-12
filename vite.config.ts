import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  return {
    plugins: [react()],
    base: isDev ? "/" : "/front_7th_chapter3-3/",
    server: {
      proxy: {
        "/api": {
          target: "https://dummyjson.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
