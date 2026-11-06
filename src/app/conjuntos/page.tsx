import Link from "next/link";
import { getConjuntos } from "@/lib/data";
import ConjuntoCard from "@/components/conjunto-card";

export default function ConjuntosPage() {
  const conjuntos = getConjuntos();

  return (
    <div className='mx-auto max-w-5xl px-4 py-6'>
      <div className='mb-4'>
        <Link
          href='/'
          className='inline-flex min-h-[44px] items-center text-sm text-gray-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-200'
        >
          ← Inicio
        </Link>
        <h1 className='text-xl font-semibold md:text-2xl'>Conjuntos</h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-neutral-400'>
          {conjuntos.length}{" "}
          {conjuntos.length === 1 ? "conjunto disponible" : "conjuntos disponibles"}.
        </p>
      </div>

      {conjuntos.length === 0 ? (
        <p className='text-sm text-gray-600 dark:text-neutral-400'>
          No hay conjuntos disponibles.
        </p>
      ) : (
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {conjuntos.map((conjunto) => (
            <ConjuntoCard key={conjunto.id} conjunto={conjunto} />
          ))}
        </div>
      )}
    </div>
  );
}
