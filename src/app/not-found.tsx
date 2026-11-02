import Link from "next/link";

export default function NotFound() {
  return (
    <div className='mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center'>
      {/* Icono / número 404 */}
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-neutral-800 dark:text-neutral-500'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.3-4.3' />
          <path d='M11 8v6' />
          <path d='M8 11h6' />
        </svg>
      </div>

      <p className='mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400'>
        Error 404
      </p>

      <h1 className='mt-2 text-3xl font-semibold tracking-tight sm:text-4xl'>
        Página no encontrada
      </h1>

      <p className='mt-3 max-w-md text-base text-gray-600 dark:text-neutral-400'>
        La página que buscas no existe, ha cambiado de nombre o ya no está
        disponible. Puede que el enlace esté roto o que hayas escrito mal la
        dirección.
      </p>

      {/* Acciones */}
      <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
        <Link
          href='/'
          className='inline-flex min-h-[48px] items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300'
        >
          Volver a la tienda
        </Link>
        <Link
          href='/ligas'
          className='inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:bg-gray-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
        >
          Explorar ligas
        </Link>
      </div>

      {/* Ayuda extra */}
      <p className='mt-8 text-xs text-gray-500 dark:text-neutral-500'>
        ¿Crees que es un error?{" "}
        <Link
          href='/'
          className='underline underline-offset-4 hover:text-gray-900 dark:hover:text-neutral-200'
        >
          Escríbenos por WhatsApp
        </Link>{" "}
        y te ayudamos a encontrar lo que buscas.
      </p>
    </div>
  );
}
