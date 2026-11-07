import Image from "next/image";
import Link from "next/link";

export default function ConjuntosCard({ count }: { count: number }) {
  return (
    <Link
      href='/conjuntos'
      className='group flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
    >
      <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white p-1 ring-1 ring-black/5'>
        <Image
          src='/conjuntos-pequenos.svg'
          alt='Conjuntos pequeños'
          width={36}
          height={36}
          unoptimized
          className='h-full w-full object-contain'
        />
      </div>

      <div className='min-w-0'>
        <div className='truncate text-sm font-medium group-hover:underline'>
          Conjuntos pequeños
        </div>
        <div className='truncate text-xs text-gray-500 dark:text-neutral-400'>
          Para niños · {count} disponibles
        </div>
      </div>
    </Link>
  );
}
