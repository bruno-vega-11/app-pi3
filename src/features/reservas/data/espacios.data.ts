import type { Espacio } from "../types/reserva.types";

export const ESPACIOS: Espacio[] = [
  {
    id: "1",
    nombre: "Manta Roja",
    descripcion: "Manta amplia ubicada cerca de los árboles, con sombra natural en las tardes. Perfecta para grupos pequeños.",
    capacidad: 4,
    precio: 0,
    imagen: "🧺",
    amenidades: ["vista", "terraza"],
    disponible: true,
    etiqueta: "Popular",
  },
  {
    id: "2",
    nombre: "Manta Azul",
    descripcion: "Ubicada en el centro del jardín con vista panorámica. Ideal para disfrutar el sol.",
    capacidad: 4,
    precio: 0,
    imagen: "🌿",
    amenidades: ["vista"],
    disponible: true,
  },
  {
    id: "3",
    nombre: "Manta Verde",
    descripcion: "En la zona más tranquila del campus, rodeada de vegetación. Para una merienda relajada.",
    capacidad: 6,
    precio: 0,
    imagen: "🌳",
    amenidades: ["vista", "privado"],
    disponible: true,
  },
  {
    id: "4",
    nombre: "Manta Amarilla",
    descripcion: "Zona techada para días nublados. Con acceso a enchufes cercanos.",
    capacidad: 6,
    precio: 0,
    imagen: "⛺",
    amenidades: ["enchufe", "privado"],
    disponible: false,
    etiqueta: "Ocupada",
  },
];

export const HORARIOS_DISPONIBLES = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
];

export const AMENIDAD_LABELS: Record<string, string> = {
  wifi:     "WiFi",
  enchufe:  "Enchufes",
  vista:    "Vista al jardín",
  privado:  "Zona tranquila",
  terraza:  "Semi-techado",
  musica:   "Música",
};

export const AMENIDAD_ICONS: Record<string, string> = {
  wifi:     "📶",
  enchufe:  "🔌",
  vista:    "🌄",
  privado:  "🌿",
  terraza:  "⛅",
  musica:   "🎵",
};