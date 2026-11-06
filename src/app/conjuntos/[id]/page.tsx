"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { getConjunto, getTienda } from "@/lib/data";
import TallaSelector from "@/components/talla-selector";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

export default function ConjuntoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const conjunto = getConjunto(id);
  if (!conjunto) notFound();

  const tienda = getTienda();
  const { addItem } = useCart();
  const [talla, setTalla] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  const tallas = [...(conjunto.tallas ?? [])].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
  const requiereTalla = tallas.length > 0;
  const puedeAnadir = !requiereTalla || Boolean(talla);
  const img =
    conjunto.imagenes?.[0] ||
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=600&fit=crop";

  const handleAdd = () => {
    if (!puedeAnadir) return;
    addItem({
      id: `conjunto-${conjunto.id}-${talla ?? "unica"}`,
      slug: conjunto.id,
      tipo: "conjunto",
      equipoNombre: conjunto.nombre,
      equipacionTipo: "Conjunto",
      imagen: img,
      precio: conjunto.precio,
      talla,
      cantidad: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-6 flex flex-wrap items-center gap-2 text-sm'>
        <Link
          href='/'
          className='inline-flex min-h-[44px] items-center px-1 text-gray-600 hover:underline touch-manipulation dark:text-neutral-400 dark:hover:text-neutral-200'
        >
          Inicio
        </Link>
        <span className='text-gray-400 dark:text-neutral-500'>/</span>
        <Link
          href='/conjuntos'
          className='inline-flex min-h-[44px] items-center px-1 text-gray-600 hover:underline touch-manipulation dark:text-neutral-400 dark:hover:text-neutral-200'
        >
          Conjuntos
        </Link>
        <span className='text-gray-400 dark:text-neutral-500'>/</span>
        <span className='inline-flex min-h-[44px] items-center'>
          {conjunto.nombre}
        </span>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='relative aspect-square w-full overflow-hidden rounded-lg bg-white dark:bg-black'>
          <Image
            src={img}
            alt={conjunto.nombre}
            fill
            className='object-contain'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
        </div>

        <div className='space-y-4'>
          <div>
            <h1 className='text-2xl font-semibold'>{conjunto.nombre}</h1>
          </div>

          <div className='text-xl font-medium'>
            {formatPrice(conjunto.precio, tienda.simboloMoneda)}
          </div>

          {requiereTalla ? (
            <TallaSelector
              tallas={tallas}
              selected={talla}
              onChange={setTalla}
            />
          ) : (
            <p className='text-sm text-gray-600 dark:text-neutral-400'>
              Talla estándar
            </p>
          )}

          <button
            type='button'
            onClick={handleAdd}
            disabled={!puedeAnadir}
            className={`w-full min-h-[56px] rounded-lg px-4 py-3 text-base font-medium transition ${
              !puedeAnadir
                ? "cursor-not-allowed bg-gray-300 text-gray-600 opacity-60 dark:bg-neutral-700 dark:text-neutral-400"
                : "bg-black text-white hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300"
            }`}
          >
            {added ? "Añadido al carrito" : "Añadir al carrito"}
          </button>

          {requiereTalla && !puedeAnadir && (
            <p className='text-xs text-amber-600 dark:text-amber-400'>
              Selecciona una talla para continuar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
