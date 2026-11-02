export interface Dorsal {
  numero: string;
  tallas: string[];
}

export interface Equipacion {
  id: string;
  tipo: string;
  imagenes: string[];
  precio: number;
  tallas: string[];
  dorsales: Dorsal[];
}

export interface Temporada {
  temporada: string;
  equipaciones: Equipacion[];
}

export interface Equipo {
  id: string;
  nombre: string;
  alias: string[];
  escudo: string;
  temporadas: Temporada[];
}

export interface Liga {
  id: string;
  nombre: string;
  pais: string;
  logo: string;
  equipos: Equipo[];
}

export interface Destacado {
  ligaId: string;
  equipoId: string;
}

export interface Tienda {
  tienda: {
    nombre: string;
    descripcion: string;
    eslogan: string;
    whatsapp: string;
    direccionRecogida: string;
    hosting: string;
    moneda: string;
    simboloMoneda: string;
  };
  destacados: {
    equipos: Destacado[];
  };
  ligas: Liga[];
}

export interface CartItem {
  id: string;
  slug: string;
  ligaId: string;
  equipoId: string;
  ligaNombre: string;
  equipoNombre: string;
  temporada: string;
  equipacionTipo: string;
  imagen: string;
  precio: number;
  talla: string;
  dorsal?: string;
  cantidad: number;
}
