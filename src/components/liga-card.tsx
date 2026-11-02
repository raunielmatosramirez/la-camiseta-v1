import Image from "next/image";
import Link from "next/link";
import type { Liga } from "@/types/tienda";

export default function LigaCard({ liga }: { liga: Liga }) {
  return (
    <Link
      href={`/ligas/${liga.id}`}
      className='group flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
    >
      {/* Contenedor del logo: cuadrado fijo, fondo blanco, padding interno */}
      <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white p-1 ring-1 ring-black/5'>
        <img
          src={
            liga.logo ||
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200&h=200&fit=crop"
          }
          alt={liga.nombre}
          className='h-full w-full object-contain'
          loading='lazy'
        />
      </div>

      <div className='min-w-0'>
        <div className='truncate text-sm font-medium group-hover:underline'>
          {liga.nombre}
        </div>
        <div className='truncate text-xs text-gray-500 dark:text-neutral-400'>
          {liga.pais} · {liga.equipos.length} equipos
        </div>
      </div>
    </Link>
  );
}
