import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import Inspect from "vite-plugin-inspect";
import { macroPlugin } from "@builder.io/vite-plugin-macro";

export default defineConfig(() => {
  return {
    plugins: [
      macroPlugin({ preset: "pandacss" }),
      Inspect(),
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      qwikReact(),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
