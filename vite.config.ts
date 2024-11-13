import { defineConfig } from "vite";
import path from "path";
import { builderDevTools } from "@builder.io/dev-tools/vite";
import react from "@vitejs/plugin-react";
import sassDts from "vite-plugin-sass-dts";

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    sassDts({ enabledMode: ["development", "production"] }),
    builderDevTools(),
  ],

  resolve: {
    alias: {
      "@@theme": path.resolve(__dirname, "./src/theme"),
      "@@builder": path.resolve(__dirname, "./src/builder"),
      "@@": path.resolve(__dirname, "./src"),
    },
  },
});
