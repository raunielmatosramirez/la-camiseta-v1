import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { getTienda } from "@/lib/data";
import type { Conjunto } from "@/types/tienda";

export default function ConjuntoCard({ conjunto }: { conjunto: Conjunto }) {
  const tienda = getTienda();
  const img =
    conjunto.imagenes?.[0] ||
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=600&fit=crop";

  return (
    <Link
      href={`/conjuntos/${conjunto.id}`}
      className='group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
    >
      <div className='relative aspect-square w-full bg-white dark:bg-black'>
        <Image
          src={img}
          alt={conjunto.nombre}
          fill
          className='object-contain'
          sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw'
        />
      </div>
      <div className='flex flex-1 flex-col gap-1.5 p-2'>
        <div className='flex items-start justify-between gap-1.5'>
          <h3 className='min-w-0 truncate text-xs font-medium leading-tight group-hover:underline'>
            {conjunto.nombre}
          </h3>
          <div className='shrink-0 whitespace-nowrap text-xs'>
            {formatPrice(conjunto.precio, tienda.simboloMoneda)}
          </div>
        </div>

        <span className='mt-auto text-[9px] font-medium text-gray-500 dark:text-neutral-400'>
          Elegir talla
        </span>
      </div>
    </Link>
  );
}
