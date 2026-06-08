export type Amenidad = "wifi" | "enchufe" | "vista" | "privado" | "terraza" | "musica";

export interface Espacio {
  id: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  precio: number;        // por hora
  imagen: string;        // emoji
  foto: string;          // imagen de referencia de la manta
  amenidades: Amenidad[];
  disponible: boolean;
  etiqueta?: string;     // "Popular", "Nuevo", etc.
}

export interface ReservaFormData {
  espacioId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  personas: number;
  nombre: string;
  email: string;
  telefono: string;
  nota?: string;
}

export type PasoReserva = "espacios" | "fecha-hora" | "datos" | "confirmacion";