import Link from "next/link";
import type { Equipo } from "@/types/tienda";

export default function EquipoCard({
  ligaId,
  equipo,
  destacado = false,
}: {
  ligaId: string;
  equipo: Equipo;
  destacado?: boolean;
}) {
  return (
    <Link
      href={`/ligas/${ligaId}/${equipo.id}`}
      className='group relative block rounded-lg border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
    >
      {destacado && (
        <span
          className='absolute right-2 top-2 text-amber-400'
          role='img'
          aria-label='Destacado'
          title='Destacado'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-4 w-4'
            aria-hidden='true'
          >
            <path d='M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z' />
          </svg>
        </span>
      )}

      <div className='flex items-center gap-2.5'>
        {/* Contenedor del escudo: cuadrado fijo, fondo blanco, padding interno */}
        <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-black/5'>
          <img
            src={equipo.escudo}
            alt={equipo.nombre}
            className='h-full w-full object-contain'
            loading='lazy'
          />
        </div>

        <div className={`min-w-0 ${destacado ? "pr-5" : ""}`}>
          <div className='truncate text-sm font-medium group-hover:underline'>
            {equipo.nombre}
          </div>
          <div className='truncate text-xs text-gray-500 dark:text-neutral-400'>
            {equipo.temporadas.length} temporadas
          </div>
        </div>
      </div>
    </Link>
  );
}
