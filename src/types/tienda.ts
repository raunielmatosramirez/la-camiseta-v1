export interface Dorsal {
  numero: string;
  tallas: string[];
}

export type TipoProducto = "camiseta" | "conjunto" | "accesorio";

export interface Producto {
  id: string;
  tipo: TipoProducto;
  activo?: boolean;
  nombre: string;
  imagenes: string[];
  precio: number;
  tallas?: string[];
  dorsales?: Dorsal[];
}

export interface Equipacion extends Producto {
  tipo: "camiseta";
  dorsales: Dorsal[];
}

export interface Temporada {
  temporada: string;
  equipaciones: Equipacion[];
}

export interface Equipo {
  id: string;
  activa?: boolean;
  nombre: string;
  alias: string[];
  escudo: string;
  temporadas: Temporada[];
}

export interface Liga {
  id: string;
  activa?: boolean;
  nombre: string;
  pais: string;
  logo: string;
  equipos: Equipo[];
}

export interface Destacado {
  ligaId: string;
  equipoId: string;
}

export interface Conjunto extends Producto {
  tipo: "conjunto";
}

export interface Accesorio extends Producto {
  tipo: "accesorio";
  categoria: string;
  descripcion: string;
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
  conjuntos?: Conjunto[];
  accesorios?: Accesorio[];
}

export type CartItemType = "camiseta" | "conjunto" | "accesorio";

export interface CartItem {
  id: string;
  slug: string;
  tipo?: CartItemType;
  ligaId?: string;
  equipoId?: string;
  ligaNombre?: string;
  equipoNombre: string;
  temporada?: string;
  equipacionTipo?: string;
  imagen: string;
  precio: number;
  talla?: string;
  dorsal?: string;
  cantidad: number;
}
