"use client";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { getTienda } from "@/lib/data";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function TrashIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M3 6h18' />
      <path d='M8 6V4h8v2' />
      <path d='M19 6l-1 14H6L5 6' />
      <path d='M10 11v5' />
      <path d='M14 11v5' />
    </svg>
  );
}

function CartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' />
      <path d='M3 6h18' />
      <path d='M16 10a4 4 0 0 1-8 0' />
    </svg>
  );
}

function etiquetaEquipacion(tipo: string) {
  const normalizado = tipo.trim().toLowerCase();
  if (normalizado === "local") return "1ª equipación";
  if (normalizado === "visitante") return "2ª equipación";
  if (
    normalizado === "tercera" ||
    normalizado === "3ra" ||
    normalizado === "3ª"
  ) {
    return "3ª equipación";
  }
  if (normalizado === "portero") return "Equipación de portero";
  return tipo;
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={className}
      aria-hidden='true'
    >
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z' />
    </svg>
  );
}

function EmptyCart() {
  return (
    <div className='mx-auto max-w-3xl px-4 py-16'>
      <div className='flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-neutral-700 dark:bg-neutral-900/60'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm dark:bg-neutral-950 dark:text-neutral-500'>
          <CartIcon className='h-8 w-8' />
        </div>
        <h1 className='mt-4 text-xl font-semibold'>Tu carrito está vacío</h1>
        <p className='mt-1 max-w-sm text-sm text-gray-600 dark:text-neutral-400'>
          Explora las competiciones y encuentra la camiseta que estás buscando.
        </p>
        <Link
          href='/#competiciones'
          className='mt-5 inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
        >
          Explorar camisetas
        </Link>
      </div>
    </div>
  );
}

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, clearCart, total, count } =
    useCart();
  const tienda = getTienda();
  const symbol = tienda.simboloMoneda;
  const [nombre, setNombre] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const timerRef = useRef<number | null>(null);
  const nombreCompleto = nombre.trim();
  const nombreValido = nombreCompleto.length > 0;

  // Detectar el flag de pedido enviado al montar y al volver a la pestaña
  useEffect(() => {
    const checkOrderSent = () => {
      try {
        if (sessionStorage.getItem("order_sent") === "1") {
          sessionStorage.removeItem("order_sent");
          setSent(true);
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => router.push("/"), 4000);
        }
      } catch {
        // sessionStorage bloqueado, ignorar
      }
    };

    // Comprobar al montar
    checkOrderSent();

    // Comprobar cuando la pestaña vuelve a estar visible
    document.addEventListener("visibilitychange", checkOrderSent);

    // Comprobar cuando la ventana recibe foco
    window.addEventListener("focus", checkOrderSent);

    return () => {
      document.removeEventListener("visibilitychange", checkOrderSent);
      window.removeEventListener("focus", checkOrderSent);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [router]);

  const handleCheckout = () => {
    if (items.length === 0 || !nombreValido) return;
    const origin =
      typeof window !== "undefined" ? window.location.origin : tienda.hosting;
    let message = "Pedido La Camiseta:\n\n";
    message += `Nombre completo: ${nombreCompleto}\n\n`;

    items.forEach((item, idx) => {
      const tipo = item.tipo ?? "camiseta";
      if (tipo === "camiseta") {
        message += `${idx + 1}. ${item.equipoNombre} - ${etiquetaEquipacion(item.equipacionTipo ?? "")} (${item.temporada})\n`;
        message += `   Liga: ${item.ligaNombre}\n`;
      } else {
        message += `${idx + 1}. ${item.equipoNombre} - ${
          tipo === "conjunto" ? "Conjunto" : item.equipacionTipo ?? "Accesorio"
        }\n`;
      }
      if (item.talla) message += `   Talla: ${item.talla}\n`;
      if (item.dorsal) message += `   Dorsal: ${item.dorsal}\n`;
      message += `   Cantidad: ${item.cantidad}\n`;
      message += `   Precio unitario: ${formatPrice(item.precio, symbol)}\n`;
      message += `   Subtotal: ${formatPrice(item.precio * item.cantidad, symbol)}\n`;
      if (tipo === "camiseta") {
        message += `   Enlace: ${origin}/producto/${item.slug}\n`;
      }
      message += "\n";
    });

    message += `Artículos: ${count}\n`;
    message += `Total: ${formatPrice(total, symbol)}\n`;
    message += `Recogida: ${tienda.direccionRecogida}\n`;
    message += "Coordinamos disponibilidad, pago y entrega por WhatsApp.";

    // Flag para detectar al volver a la pestaña
    try {
      sessionStorage.setItem("order_sent", "1");
    } catch {
      // ignore
    }

    window.open(getWhatsAppOrderLink(message), "_blank", "noopener,noreferrer");
    clearCart();
  };

  // ── Estado de éxito ──
  if (sent) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M20 6 9 17l-5-5' />
          </svg>
        </div>
        <h1 className='mt-4 text-2xl font-semibold tracking-tight'>
          ¡Pedido enviado!
        </h1>
        <p className='mt-2 max-w-md text-sm text-gray-600 dark:text-neutral-400'>
          Hemos abierto WhatsApp con tu pedido. Envíalo y te confirmamos
          disponibilidad, pago y entrega lo antes posible.
        </p>
        <p className='mt-4 text-xs text-gray-500 dark:text-neutral-500'>
          Volviendo al inicio en unos segundos…
        </p>
        <Link
          href='/'
          className='mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300'
        >
          Ir ahora al inicio
        </Link>
      </div>
    );
  }

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-6 flex flex-wrap items-end justify-between gap-3'>
        <div>
          <p className='text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400'>
            La Camiseta
          </p>
          <h1 className='mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight'>
            Tu carrito
            <span className='rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-neutral-800 dark:text-neutral-300'>
              {count}
            </span>
          </h1>
          <p className='mt-1 text-sm text-gray-600 dark:text-neutral-400'>
            Revisa tu pedido antes de enviarlo por WhatsApp.
          </p>
        </div>
        <button
          type='button'
          onClick={clearCart}
          className='inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 active:bg-gray-200 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 dark:hover:text-neutral-200'
        >
          <TrashIcon className='h-3.5 w-3.5' />
          Vaciar carrito
        </button>
      </div>

      <div className='grid gap-6 lg:grid-cols-3 lg:items-start'>
        <div className='space-y-3 lg:col-span-2'>
          {items.map((item) => {
            const esCamiseta = (item.tipo ?? "camiseta") === "camiseta";
            const etiqueta = esCamiseta
              ? etiquetaEquipacion(item.equipacionTipo ?? "")
              : item.tipo === "conjunto"
                ? "Conjunto"
                : item.equipacionTipo ?? "Accesorio";
            return (
            <article
              key={item.id}
              className='rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none sm:p-4'
            >
              <div className='flex gap-3 sm:gap-4'>
                {esCamiseta ? (
                  <Link
                    href={`/producto/${item.slug}`}
                    className='group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white dark:bg-black sm:h-28 sm:w-28'
                  >
                    <Image
                      src={item.imagen}
                      alt={item.equipoNombre}
                      fill
                      className='object-cover transition duration-300 group-hover:scale-105'
                      sizes='(max-width: 640px) 96px, 112px'
                    />
                  </Link>
                ) : (
                  <div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white dark:bg-black sm:h-28 sm:w-28'>
                    <Image
                      src={item.imagen}
                      alt={item.equipoNombre}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 96px, 112px'
                    />
                  </div>
                )}

                <div className='flex min-w-0 flex-1 flex-col'>
                  <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0'>
                      <div className='flex flex-wrap items-center gap-2'>
                        {esCamiseta ? (
                          <Link
                            href={`/producto/${item.slug}`}
                            className='block max-w-full truncate text-sm font-semibold hover:underline sm:text-base'
                          >
                            {item.equipoNombre}
                          </Link>
                        ) : (
                          <span className='block max-w-full truncate text-sm font-semibold sm:text-base'>
                            {item.equipoNombre}
                          </span>
                        )}
                        <span className='rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-neutral-800 dark:text-neutral-300'>
                          {etiqueta}
                        </span>
                      </div>
                      {item.ligaNombre && item.temporada && (
                        <p className='mt-0.5 truncate text-xs text-gray-600 dark:text-neutral-400'>
                          {item.ligaNombre} · {item.temporada}
                        </p>
                      )}
                      <div className='mt-2 flex flex-wrap gap-1.5'>
                        {item.talla && (
                          <span className='rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-neutral-800 dark:text-neutral-300'>
                            Talla {item.talla}
                          </span>
                        )}
                        {item.dorsal && (
                          <span className='rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-neutral-800 dark:text-neutral-300'>
                            Dorsal {item.dorsal}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.equipoNombre}${item.talla ? ` talla ${item.talla}` : ""}`}
                      title='Eliminar'
                      className='flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-red-50 active:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/10 dark:active:bg-red-500/20 dark:hover:text-red-400'
                    >
                      <TrashIcon className='h-4 w-4' />
                    </button>
                  </div>

                  <div className='mt-auto flex flex-wrap items-end justify-between gap-3 pt-3'>
                    <div className='flex items-center rounded-lg border border-gray-200 dark:border-neutral-700'>
                      <button
                        type='button'
                        onClick={() =>
                          updateQuantity(item.id, item.cantidad - 1)
                        }
                        disabled={item.cantidad <= 1}
                        aria-label='Restar una unidad'
                        className='flex min-h-[44px] min-w-[44px] items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
                      >
                        −
                      </button>
                      <span className='w-10 text-center text-sm font-medium'>
                        {item.cantidad}
                      </span>
                      <button
                        type='button'
                        onClick={() =>
                          updateQuantity(item.id, item.cantidad + 1)
                        }
                        aria-label='Sumar una unidad'
                        className='flex min-h-[44px] min-w-[44px] items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50 active:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
                      >
                        +
                      </button>
                    </div>
                    <div className='text-right'>
                      <p className='text-xs text-gray-500 dark:text-neutral-400'>
                        {formatPrice(item.precio, symbol)} c/u
                      </p>
                      <p className='text-sm font-semibold'>
                        {formatPrice(item.precio * item.cantidad, symbol)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>

        <aside className='lg:sticky lg:top-20 lg:col-span-1'>
          <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none'>
            <h2 className='text-base font-semibold'>Resumen</h2>

            <div className='mt-4'>
              <label htmlFor='nombre-completo' className='text-sm font-medium'>
                Nombre completo
              </label>
              <input
                id='nombre-completo'
                name='nombre'
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder='Nombre y apellidos'
                autoComplete='name'
                required
                className='mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-base outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-neutral-700 dark:bg-neutral-950 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-800'
              />
              <p className='mt-1 text-[11px] text-gray-500 dark:text-neutral-500'>
                Lo usamos para identificar tu pedido.
              </p>
            </div>

            <div className='mt-4 space-y-3 text-sm'>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-gray-600 dark:text-neutral-400'>
                  Artículos ({count})
                </span>
                <span>{formatPrice(total, symbol)}</span>
              </div>
              <div className='flex items-start justify-between gap-4'>
                <span className='text-gray-600 dark:text-neutral-400'>
                  Envío
                </span>
                <span className='text-right text-gray-600 dark:text-neutral-400'>
                  Se coordina por WhatsApp
                </span>
              </div>
            </div>

            <div className='mt-4 border-t border-gray-200 pt-4 dark:border-neutral-800'>
              <div className='flex items-end justify-between gap-4'>
                <span className='text-sm font-medium'>Total</span>
                <span className='text-xl font-semibold tracking-tight'>
                  {formatPrice(total, symbol)}
                </span>
              </div>

              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckout();
                }}
                disabled={!nombreValido}
                className={`mt-4 flex w-full min-h-[56px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-medium transition touch-manipulation ${
                  !nombreValido
                    ? "cursor-not-allowed bg-gray-300 text-gray-600 opacity-60 dark:bg-neutral-700 dark:text-neutral-400"
                    : "bg-black text-white hover:bg-gray-900 active:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300"
                }`}
                style={{
                  WebkitTouchCallout: "none",
                  touchAction: "manipulation",
                }}
              >
                <WhatsAppIcon />
                Finalizar pedido por WhatsApp
              </button>

              <Link
                href='/#competiciones'
                onClick={(e) => e.stopPropagation()}
                className='mt-3 flex w-full min-h-[52px] items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition hover:bg-gray-50 active:bg-gray-100 touch-manipulation dark:border-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
                style={{
                  WebkitTouchCallout: "none",
                  touchAction: "manipulation",
                }}
              >
                Seguir comprando
              </Link>

              <p
                className={`mt-3 text-center text-[11px] ${
                  nombreValido
                    ? "text-gray-500 dark:text-neutral-500"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {nombreValido
                  ? "No se realiza ningún pago en la web."
                  : "Escribe tu nombre completo para continuar."}
              </p>
            </div>

            <div className='mt-4 rounded-xl bg-gray-50 p-3 text-xs dark:bg-neutral-950'>
              <p className='font-medium text-gray-700 dark:text-neutral-300'>
                Recogida
              </p>
              <p className='mt-1 text-gray-600 dark:text-neutral-400'>
                {tienda.direccionRecogida}
              </p>
              <p className='mt-1 text-gray-500 dark:text-neutral-500'>
                Coordinamos disponibilidad, pago y entrega por WhatsApp.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
