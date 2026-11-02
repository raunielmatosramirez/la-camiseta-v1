"use client";

import { findProduct, getTienda } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product-gallery";
import TallaSelector from "@/components/talla-selector";
import DorsalSelector from "@/components/dorsal-selector";
import ShareButton from "@/components/share-button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { use, useState } from "react";
import Link from "next/link";

export default function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const result = findProduct(slug);
  if (!result) notFound();
  const { liga, equipo, temporada, equipacion } = result;
  const tienda = getTienda();
  const { addItem } = useCart();

  const [dorsal, setDorsal] = useState<string | undefined>(undefined);
  const [talla, setTalla] = useState<string | undefined>(undefined);

  const dorsales = equipacion.dorsales ?? [];
  const tieneDorsales = dorsales.length > 0;

  // Tallas disponibles: SOLO las del dorsal elegido
  const tallasDisponibles = (() => {
    if (!dorsal) return [];
    const d = dorsales.find((x) => x.numero === dorsal);
    return d?.tallas ?? [];
  })();

  const puedeAnadir = Boolean(dorsal && talla);

  const handleDorsalChange = (d?: string) => {
    setDorsal(d);
    setTalla(undefined); // al cambiar dorsal, reseteamos talla
  };

  const handleAdd = () => {
    if (!puedeAnadir || !talla || !dorsal) return;
    const id = `${slug}-${talla}-${dorsal}`;
    addItem({
      id,
      slug,
      ligaId: liga.id,
      equipoId: equipo.id,
      ligaNombre: liga.nombre,
      equipoNombre: equipo.nombre,
      temporada: temporada.temporada,
      equipacionTipo: equipacion.tipo,
      imagen: equipacion.imagenes[0],
      precio: equipacion.precio,
      talla,
      dorsal,
      cantidad: 1,
    });
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex flex-wrap items-center gap-2 text-sm mb-6'>
        <Link
          href='/'
          className='inline-flex min-h-[44px] items-center px-1 text-gray-600 hover:underline touch-manipulation dark:text-neutral-400 dark:hover:text-neutral-200'
        >
          Inicio
        </Link>
        <span className='text-gray-400 dark:text-neutral-500'>/</span>
        <Link
          href={`/ligas/${liga.id}`}
          className='inline-flex min-h-[44px] items-center px-1 text-gray-600 hover:underline touch-manipulation dark:text-neutral-400 dark:hover:text-neutral-200'
        >
          {liga.nombre}
        </Link>
        <span className='text-gray-400 dark:text-neutral-500'>/</span>
        <Link
          href={`/ligas/${liga.id}/${equipo.id}`}
          className='inline-flex min-h-[44px] items-center px-1 text-gray-600 hover:underline touch-manipulation dark:text-neutral-400 dark:hover:text-neutral-200'
        >
          {equipo.nombre}
        </Link>
        <span className='text-gray-400 dark:text-neutral-500'>/</span>
        <span className='inline-flex min-h-[44px] items-center'>
          {equipacion.tipo} {temporada.temporada}
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <ProductGallery images={equipacion.imagenes} />
        <div className='space-y-4'>
          <div>
            <h1 className='text-2xl font-semibold'>
              {equipo.nombre} - {equipacion.tipo}
            </h1>
            <p className='text-gray-600 mt-1 dark:text-neutral-400'>
              {liga.nombre} · {temporada.temporada}
            </p>
          </div>

          <div className='text-xl font-medium'>
            {formatPrice(equipacion.precio, tienda.simboloMoneda)}
          </div>

          {tieneDorsales ? (
            <>
              {/* 1º Dorsal */}
              <DorsalSelector
                dorsales={dorsales}
                selected={dorsal}
                onChange={handleDorsalChange}
              />

              {/* 2º Tallas del dorsal elegido */}
              <TallaSelector
                tallas={tallasDisponibles}
                selected={talla}
                onChange={setTalla}
              />
            </>
          ) : (
            <p className='text-sm text-gray-600 dark:text-neutral-400'>
              Este producto no tiene dorsales disponibles.
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
            Añadir al carrito
          </button>

          <ShareButton slug={slug} />
        </div>
      </div>
    </div>
  );
}
