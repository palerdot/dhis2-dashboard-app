/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    // testMatch: ["./tests/**/*.test.tsx"],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    globals: true,
  },
})
