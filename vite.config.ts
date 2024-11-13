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
      "@@builderComponents": path.resolve(
        __dirname,
        "./src/builder/components"
      ),
      "@@builder": path.resolve(__dirname, "./src/builder"),
      "@@typography": path.resolve(__dirname, "./src/typography"),
      "@@components": path.resolve(__dirname, "./src/components"),
      "@@": path.resolve(__dirname, "./src"),
    },
  },
});
