/**
 * Devuelve la URL base del sitio SIN barra final.
 * Prioriza NEXT_PUBLIC_SITE_URL. Fallback: window.location.origin en cliente,
 * o un dominio por defecto en SSR.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (envUrl && envUrl.trim() !== "") {
    return envUrl.trim().replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://lacamiseta.netlify.app";
}

/**
 * Construye la URL absoluta de un producto.
 * Ej: buildProductUrl("laliga/real-madrid/2026-27/local-2026-27")
 *     → `${NEXT_PUBLIC_SITE_URL}/producto/laliga/real-madrid/2026-27/local-2026-27`
 */
export function buildProductUrl(slug: string): string {
  const base = getSiteUrl();
  const cleanSlug = slug.replace(/^\/+/, "");
  return `${base}/producto/${cleanSlug}`;
}
