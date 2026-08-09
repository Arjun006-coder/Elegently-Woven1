import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// SPA-mode config for Vercel static deployment (no SSR)
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
  ],
  resolve: {
    // Force a single React instance — prevents "useState is null" crash
    // caused by @supabase/auth-ui-react bundling its own React copy
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  build: {
    outDir: "dist-spa",
    emptyOutDir: true,
  },
});

