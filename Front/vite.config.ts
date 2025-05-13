import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "google-fonts",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith(".css")) {
          return {
            code: `@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");\n${code}`,
            map: null,
          };
        }
        return null;
      },
    },
  ],
});
