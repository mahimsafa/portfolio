import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mahimsafa.com",
  build: {
    assets: "assets",
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
    },
  },
  integrations: [tailwind(), solidJs(), sitemap()],
});
