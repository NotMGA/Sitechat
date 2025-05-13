// src/config/apiConfig.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn(
    "Attention : VITE_API_BASE_URL n'est pas définie. Utilisation d'une URL de fallback ou risque d'erreur."
  );
}

export default API_BASE_URL;
