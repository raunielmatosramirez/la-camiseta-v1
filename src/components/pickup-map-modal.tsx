"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_ADDRESS = "Dirección exacta por WhatsApp";
const FALLBACK_COORDS = "23.133982,-82.362472";

export default function PickupMapModal() {
  const address =
    process.env.NEXT_PUBLIC_PICKUP_ADDRESS ?? FALLBACK_ADDRESS;
  const coords = (
    process.env.NEXT_PUBLIC_PICKUP_COORDS ?? FALLBACK_COORDS
  ).replace(/\s+/g, "");
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const query = encodeURIComponent(coords);
  const embedUrl = `https://www.google.com/maps?q=${query}&hl=es&z=17&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'
        aria-label='Ver tienda física en el mapa'
        className='fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white shadow-lg transition hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300 sm:bottom-6 sm:right-6'
      >
        <MapPinIcon className='h-5 w-5' />
        <span>Tienda física</span>
      </button>

      {open && (
        <div
          role='presentation'
          onClick={() => setOpen(false)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='pickup-map-title'
            onClick={(event) => event.stopPropagation()}
            className='flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-neutral-900'
          >
            <div className='flex items-start justify-between gap-3 border-b border-gray-200 p-4 dark:border-neutral-800'>
              <div className='min-w-0'>
                <h2
                  id='pickup-map-title'
                  className='text-base font-semibold'
                >
                  Tienda física
                </h2>
                <p className='mt-0.5 truncate text-sm text-gray-600 dark:text-neutral-400'>
                  {address}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type='button'
                onClick={() => setOpen(false)}
                aria-label='Cerrar mapa'
                className='inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
              >
                <CloseIcon className='h-5 w-5' />
              </button>
            </div>

            <div className='relative aspect-[4/3] w-full bg-gray-100 dark:bg-neutral-800'>
              <iframe
                title='Mapa de la tienda física'
                src={embedUrl}
                className='absolute inset-0 h-full w-full border-0'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                allowFullScreen
              />
            </div>

            <div className='flex flex-col gap-2 p-4 sm:flex-row sm:justify-end'>
              <a
                href={mapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300'
              >
                Abrir en Google Maps
                <ExternalIcon className='h-4 w-4' />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={className}
    >
      <path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z' />
      <circle cx='12' cy='10' r='3' />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={className}
    >
      <path d='M18 6 6 18M6 6l12 12' />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={className}
    >
      <path d='M15 3h6v6' />
      <path d='M10 14 21 3' />
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
    </svg>
  );
}
