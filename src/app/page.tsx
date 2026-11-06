import Link from "next/link";
import { getLigas, getDestacados, getConjuntos, getAccesorios } from "@/lib/data";
import LigaCard from "@/components/liga-card";
import EquipoCard from "@/components/equipo-card";
import ConjuntoCard from "@/components/conjunto-card";
import AccesorioCard from "@/components/accesorio-card";
import ComoComprar from "@/components/como-comprar";

export default function Home() {
  const ligas = getLigas();
  const destacados = getDestacados();
  const conjuntos = getConjuntos();
  const accesorios = getAccesorios();
  const conjuntosVisibles = conjuntos.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <section>
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl font-semibold">La Camiseta</h1>
          <p className="text-gray-600 text-sm mt-1 dark:text-neutral-400">Viste tu historia.</p>
        </div>
        <div className="mb-6">
          <h2 id="competiciones" className="text-base font-medium mb-2 scroll-mt-20">
            Competiciones
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {ligas.map((liga) => (
              <LigaCard key={liga.id} liga={liga} />
            ))}
          </div>
        </div>
        {destacados.length > 0 && (
          <div>
            <h2 className="text-base font-medium mb-2">Destacados</h2>
            <div className="grid grid-cols-2 gap-2">
              {destacados.map((d) => (
                <EquipoCard key={`${d.liga.id}-${d.equipo.id}`} ligaId={d.liga.id} equipo={d.equipo} destacado={d.destacado} />
              ))}
            </div>
          </div>
        )}
        {conjuntos.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base font-medium mb-2">Conjuntos</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {conjuntosVisibles.map((conjunto) => (
                <ConjuntoCard key={conjunto.id} conjunto={conjunto} />
              ))}
            </div>
            {conjuntos.length > conjuntosVisibles.length && (
              <div className="mt-2 text-center">
                <Link
                  href="/conjuntos"
                  className="inline-flex min-h-[40px] items-center rounded-lg border border-gray-200 px-4 text-sm font-medium transition hover:bg-gray-50 active:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
                >
                  Ver más
                </Link>
              </div>
            )}
          </div>
        )}
        {accesorios.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base font-medium mb-2">Accesorios</h2>
            <div className="grid grid-cols-2 gap-2">
              {accesorios.map((accesorio) => (
                <AccesorioCard key={accesorio.id} accesorio={accesorio} />
              ))}
            </div>
          </div>
        )}
      </section>
      <ComoComprar />
    </div>
  );
}
