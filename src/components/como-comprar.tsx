import Link from "next/link";

const pasos = [
  {
    titulo: "Elige tu camiseta",
    descripcion: "Entra por competición, equipo y temporada hasta encontrar la que buscas.",
  },
  {
    titulo: "Personalízala",
    descripcion: "Selecciona tu talla y añade el dorsal si está disponible.",
  },
  {
    titulo: "Pide por WhatsApp",
    descripcion: "Añade al carrito y envía tu pedido para confirmar disponibilidad, pago y envío.",
  },
];

export default function ComoComprar() {
  return (
    <section
      aria-labelledby="como-comprar"
      className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
    >
      <div className="mb-4">
        <h2 id="como-comprar" className="text-base font-medium">
          Cómo comprar
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          Tres pasos y listo. No se realiza ningún pago en la web.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {pasos.map((paso, index) => (
          <li
            key={paso.titulo}
            className="rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
              {index + 1}
            </span>
            <h3 className="mt-2 text-sm font-medium">{paso.titulo}</h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-neutral-400">{paso.descripcion}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-3 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500 dark:text-neutral-400">
          Coordinamos disponibilidad, forma de pago y envío por WhatsApp.
        </p>
        <Link
          href="#competiciones"
          className="text-sm font-medium underline underline-offset-4 transition hover:text-gray-600 dark:hover:text-neutral-300"
        >
          Elegir camiseta
        </Link>
      </div>
    </section>
  );
}
