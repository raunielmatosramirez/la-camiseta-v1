import { getLigas, getDestacados } from "@/lib/data";
import LigaCard from "@/components/liga-card";
import EquipoCard from "@/components/equipo-card";
import ComoComprar from "@/components/como-comprar";

export default function Home() {
  const ligas = getLigas();
  const destacados = getDestacados();

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
      </section>
      <ComoComprar />
    </div>
  );
}
