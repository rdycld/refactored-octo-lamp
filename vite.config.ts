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
      "@@": path.resolve(__dirname, "./src"),
      "@@builder": path.resolve(__dirname, "./src/builder"),
      "@@builderComponents": path.resolve(
        __dirname,
        "./src/builder/components"
      ),
      "@@components": path.resolve(__dirname, "./src/components"),
      "@@theme": path.resolve(__dirname, "./src/theme"),
      "@@typography": path.resolve(__dirname, "./src/typography"),
      "@@ui": path.resolve(__dirname, "./src/ui"),
    },
  },
});
