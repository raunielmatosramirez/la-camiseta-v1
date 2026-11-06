"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  // Ignoramos la primera imagen (índice 0) — esa se usa en la card exterior
  const galleryImages = images?.slice(1) ?? [];

  const [active, setActive] = useState(0);

  if (galleryImages.length === 0) return null;

  return (
    <div className='space-y-2'>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg bg-white dark:bg-black'>
        <Image
          key={galleryImages[active]}
          src={galleryImages[active]}
          alt='Producto'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 50vw'
          priority={active === 0}
        />
      </div>

      {galleryImages.length > 1 && (
        <div className='flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] touch-pan-x'>
          {galleryImages.map((img, idx) => (
            <button
              type='button'
              key={idx}
              onClick={() => setActive(idx)}
              className={`relative z-10 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-white active:scale-[0.98] touch-manipulation dark:bg-black ${
                active === idx
                  ? "border-black dark:border-white"
                  : "border-gray-200 dark:border-neutral-700"
              }`}
            >
              <Image
                src={img}
                alt='Miniatura'
                fill
                className='object-cover'
                sizes='80px'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
