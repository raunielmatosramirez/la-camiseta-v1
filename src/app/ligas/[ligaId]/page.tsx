import { getLigaById } from "@/lib/data";
import { notFound } from "next/navigation";
import EquipoCard from "@/components/equipo-card";
import Link from "next/link";

export default async function LigaPage({ params }: { params: Promise<{ ligaId: string }> }) {
  const { ligaId } = await params;
  const liga = getLigaById(ligaId);
  if (!liga) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-sm text-gray-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-200">Inicio</Link>
        <span className="text-gray-400 dark:text-neutral-500">/</span>
        <span className="text-sm">{liga.nombre}</span>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{liga.nombre}</h1>
        <p className="text-gray-600 mt-1 dark:text-neutral-400">{liga.pais}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {liga.equipos.map((equipo) => (
          <EquipoCard key={equipo.id} ligaId={liga.id} equipo={equipo} />
        ))}
      </div>
    </div>
  );
}
