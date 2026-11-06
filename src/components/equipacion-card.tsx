import Image from "next/image";
import Link from "next/link";
import { makeProductSlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { getTienda } from "@/lib/data";
import type { Equipacion } from "@/types/tienda";

// Orden canónico de tallas para mostrarlas siempre igual
const ORDEN_TALLAS = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function EquipacionCard({
  ligaId,
  equipoId,
  temporada,
  equipacion,
}: {
  ligaId: string;
  equipoId: string;
  temporada: string;
  equipacion: Equipacion;
}) {
  const tienda = getTienda();
  const slug = makeProductSlug(ligaId, equipoId, temporada, equipacion.id);
  const img =
    equipacion.imagenes?.[0] ||
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=600&fit=crop";

  // Derivar tallas únicas a partir de los dorsales
  const tallasDisponibles = Array.from(
    new Set((equipacion.dorsales ?? []).flatMap((d) => d.tallas ?? [])),
  ).sort((a, b) => {
    const ia = ORDEN_TALLAS.indexOf(a);
    const ib = ORDEN_TALLAS.indexOf(b);
    // Las tallas no listadas van al final
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  const tieneDorsales = (equipacion.dorsales?.length ?? 0) > 0;

  return (
    <Link
      href={`/producto/${slug}`}
      className='group block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
    >
      <div className='relative aspect-[3/3] w-full bg-white dark:bg-black'>
        <Image
          src={img}
          alt={equipacion.nombre}
          fill
          className='object-contain'
          sizes='(max-width: 1023px) 50vw, 33vw'
        />
      </div>
      <div className='p-2.5'>
        <div className='flex items-center justify-between'>
          <div className='text-sm font-medium'>{equipacion.nombre}</div>
          <div className='text-sm'>
            {formatPrice(equipacion.precio, tienda.simboloMoneda)}
          </div>
        </div>

        {tallasDisponibles.length > 0 ? (
          <div className='mt-0.5 text-xs text-gray-500 dark:text-neutral-400'>
            Tallas: {tallasDisponibles.join(", ")}
          </div>
        ) : (
          <div className='mt-0.5 text-xs text-gray-500 dark:text-neutral-400'>
            Sin tallas disponibles
          </div>
        )}

        {tieneDorsales && (
          <div className='text-xs text-gray-500 dark:text-neutral-400'>
            Con dorsales
          </div>
        )}
      </div>
    </Link>
  );
}
