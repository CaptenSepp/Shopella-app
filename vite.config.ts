import { defineConfig, loadEnv } from "vite"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import ordersHandler from "./api/orders"
import assistantHandler from "./api/assistant"

export default defineConfig(({ mode }) => {
  const localEnvironment = loadEnv(mode, process.cwd(), "")

  // API helpers read normal server variables; Vite loads the same local values for development.
  Object.entries(localEnvironment).forEach(([key, value]) => {
    if (process.env[key] === undefined) process.env[key] = value
  })

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "shopella-local-api",
        configureServer(server) {
          server.middlewares.use("/api/orders", ordersHandler)
          server.middlewares.use("/api/assistant", assistantHandler)
        },
      },
    ],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  }
})
