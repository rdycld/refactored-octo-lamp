import { defineConfig } from "vite";
import path from "path";
import { builderDevTools } from "@builder.io/dev-tools/vite";
import react from "@vitejs/plugin-react";
import sassDts from "vite-plugin-sass-dts";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    sassDts({ enabledMode: ["development", "production"] }),
    builderDevTools(),
    svgr({ include: "**/*.svg?react" }),
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
      "@@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@cssUtils": path.resolve(__dirname, "./src/theme/_utilities.scss"),
      "@cssVars": path.resolve(__dirname, "./src/theme/_variables.scss"),
    },
  },
});
