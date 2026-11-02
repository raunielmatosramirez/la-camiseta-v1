"use client";

import { getEquipo, getTemporadas, getTemporada } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import EquipacionCard from "@/components/equipacion-card";
import { use, useState } from "react";

export default function EquipoPage({ params }: { params: Promise<{ ligaId: string; equipoId: string }> }) {
  const { ligaId, equipoId } = use(params);
  const result = getEquipo(ligaId, equipoId);
  if (!result) notFound();
  const { liga, equipo } = result;
  const temporadas = getTemporadas(equipo);
  const [selected, setSelected] = useState<string>(temporadas[0] || "");
  const temporadaData = getTemporada(equipo, selected);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/" className="text-gray-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-200">Inicio</Link>
        <span className="text-gray-400 dark:text-neutral-500">/</span>
        <Link href={`/ligas/${liga.id}`} className="text-gray-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-200">{liga.nombre}</Link>
        <span className="text-gray-400 dark:text-neutral-500">/</span>
        <span>{equipo.nombre}</span>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{equipo.nombre}</h1>
        <p className="text-gray-600 mt-1 dark:text-neutral-400">{liga.nombre}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm">Temporada</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-inherit dark:border-neutral-700 dark:bg-neutral-900"
        >
          {temporadas.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {temporadaData?.equipaciones.map((equipacion) => (
          <EquipacionCard key={equipacion.id} ligaId={liga.id} equipoId={equipo.id} temporada={selected} equipacion={equipacion} />
        ))}
      </div>
    </div>
  );
}
