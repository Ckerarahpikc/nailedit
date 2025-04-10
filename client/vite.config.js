import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5175,
    https: {
      key: fs.readFileSync("../localhost+2-key.pem"),
      cert: fs.readFileSync("../localhost+2.pem"),
    },
    hmr: {
      protocol: "wss",
      host: "localhost",
    },
  },
  plugins: [react()],
});
