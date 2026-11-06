import tiendaData from "@/data/tienda.json";
import type {
  Tienda,
  Liga,
  Equipo,
  Temporada,
  Conjunto,
  Accesorio,
} from "@/types/tienda";

// El JSON ahora solo contiene datos de producto (ligas, equipos, equipaciones)
type ProductData = Omit<Tienda, "tienda">;
const data = tiendaData as ProductData;

// ─────────────────────────────────────────────
// TIENDA — lee del .env, NO del JSON
// ─────────────────────────────────────────────
export function getTienda(): Tienda["tienda"] {
  return {
    nombre: process.env.NEXT_PUBLIC_SITE_NAME ?? "La Camiseta",
    descripcion: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "",
    eslogan: process.env.NEXT_PUBLIC_SITE_ESLOGAN ?? "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_ORDER ?? "5358080925",
    direccionRecogida:
      process.env.NEXT_PUBLIC_PICKUP_ADDRESS ?? "Dirección exacta por WhatsApp",
    hosting:
      process.env.NEXT_PUBLIC_HOSTING ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://lacamiseta.netlify.app",
    moneda: process.env.NEXT_PUBLIC_CURRENCY ?? "USD",
    simboloMoneda: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL ?? "$",
  };
}

// ─────────────────────────────────────────────
// LIGAS / EQUIPOS / TEMPORADAS — del JSON
// ─────────────────────────────────────────────
export function getLigas(): Liga[] {
  return data.ligas
    .filter((l) => l.activa !== false)
    .map((l) => ({
      ...l,
      equipos: l.equipos.filter((e) => e.activa !== false),
    }));
}

export function getLigaById(ligaId: string): Liga | undefined {
  const liga = data.ligas.find((l) => l.id === ligaId && l.activa !== false);
  if (!liga) return undefined;
  return {
    ...liga,
    equipos: liga.equipos.filter((e) => e.activa !== false),
  };
}

export function getEquipo(
  ligaId: string,
  equipoId: string,
): { liga: Liga; equipo: Equipo } | undefined {
  const liga = getLigaById(ligaId);
  if (!liga) return undefined;
  const equipo = liga.equipos.find((e) => e.id === equipoId);
  if (!equipo) return undefined;
  return { liga, equipo };
}

export function getTemporadas(equipo: Equipo): string[] {
  const temporadas = equipo.temporadas.map((t) => t.temporada);
  const unique = Array.from(new Set(temporadas));
  unique.sort((a, b) => b.localeCompare(a));
  return unique;
}

export function getTemporada(
  equipo: Equipo,
  temporada: string,
): Temporada | undefined {
  return equipo.temporadas.find((t) => t.temporada === temporada);
}

// ─────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────
export function findProduct(slug: string) {
  for (const liga of data.ligas) {
    if (liga.activa === false) continue;
    for (const equipo of liga.equipos) {
      if (equipo.activa === false) continue;
      for (const temporada of equipo.temporadas) {
        for (const equipacion of temporada.equipaciones) {
          const s = makeProductSlug(
            liga.id,
            equipo.id,
            temporada.temporada,
            equipacion.id,
          );
          if (s === slug) {
            return { liga, equipo, temporada, equipacion };
          }
        }
      }
    }
  }
  return undefined;
}

export function makeProductSlug(
  ligaId: string,
  equipoId: string,
  temporada: string,
  equipacionId: string,
) {
  const t = temporada.replace(/\//g, "-");
  return `${ligaId}-${equipoId}-${t}-${equipacionId}`;
}

export function getDestacados() {
  const res = [];
  for (const d of data.destacados.equipos) {
    const g = getEquipo(d.ligaId, d.equipoId);
    if (g) res.push({ ...g, destacado: true });
  }
  return res;
}

// ─────────────────────────────────────────────
// CONJUNTOS Y ACCESORIOS
// ─────────────────────────────────────────────
export function getConjuntos(): Conjunto[] {
  return data.conjuntos ?? [];
}

export function getConjunto(id: string): Conjunto | undefined {
  return (data.conjuntos ?? []).find((c) => c.id === id);
}

export function getAccesorios(): Accesorio[] {
  return (data.accesorios ?? []).filter((a) => a.activo !== false);
}
