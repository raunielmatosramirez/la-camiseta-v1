"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { getTienda } from "@/lib/data";
import type { Accesorio } from "@/types/tienda";

export default function AccesorioCard({ accesorio }: { accesorio: Accesorio }) {
  const tienda = getTienda();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const img =
    accesorio.imagenes?.[0] ||
    "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=600&fit=crop";

  const handleAdd = () => {
    addItem({
      id: `accesorio-${accesorio.id}`,
      slug: accesorio.id,
      tipo: "accesorio",
      equipoNombre: accesorio.nombre,
      equipacionTipo: accesorio.categoria,
      imagen: img,
      precio: accesorio.precio,
      talla: "Estándar",
      cantidad: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className='overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
      <div className='relative aspect-square w-full bg-white dark:bg-black'>
        <Image
          src={img}
          alt={accesorio.nombre}
          fill
          className='object-contain'
          sizes='(max-width: 1023px) 50vw, 33vw'
        />
      </div>
      <div className='p-2.5'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-sm font-medium'>{accesorio.nombre}</h3>
          <div className='whitespace-nowrap text-sm'>
            {formatPrice(accesorio.precio, tienda.simboloMoneda)}
          </div>
        </div>

        <p className='mt-0.5 text-xs text-gray-500 dark:text-neutral-400'>
          {accesorio.categoria} · {accesorio.descripcion}
        </p>

        <p className='mt-0.5 text-xs text-gray-500 dark:text-neutral-400'>
          Talla estándar
        </p>

        <button
          type='button'
          onClick={handleAdd}
          className='mt-2 flex w-full min-h-[40px] items-center justify-center rounded-lg bg-black px-3 text-xs font-medium text-white transition hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300'
        >
          {added ? "Añadido" : "Añadir al carrito"}
        </button>
      </div>
    </article>
  );
}
