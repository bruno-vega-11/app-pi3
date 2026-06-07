import type { Espacio } from "../types/reserva.types";

export const ESPACIOS: Espacio[] = [
  {
    id: "rincon-sol",
    nombre: "Rincón del Sol",
    descripcion: "Espacio acogedor junto a la ventana con luz natural todo el día. Perfecto para una tarde tranquila.",
    capacidad: 4,
    precio: 8,
    imagen: "☀️",
    amenidades: ["wifi", "enchufe", "vista"],
    disponible: true,
    etiqueta: "Popular",
  },
  {
    id: "salon-verde",
    nombre: "Salón Verde",
    descripcion: "Rodeado de plantas y con música ambiental suave. El ambiente más relajante de nuestra meriendería.",
    capacidad: 6,
    precio: 12,
    imagen: "🌿",
    amenidades: ["wifi", "musica", "enchufe"],
    disponible: true,
  },
  {
    id: "terraza-luna",
    nombre: "Terraza Luna",
    descripcion: "Terraza semi-cubierta con vistas al jardín. Ideal para grupos y ocasiones especiales.",
    capacidad: 10,
    precio: 18,
    imagen: "🌙",
    amenidades: ["terraza", "vista", "musica"],
    disponible: true,
    etiqueta: "Nuevo",
  },
  {
    id: "salon-privado",
    nombre: "Sala Privada",
    descripcion: "Espacio completamente privado para reuniones íntimas o celebraciones pequeñas.",
    capacidad: 8,
    precio: 25,
    imagen: "🫖",
    amenidades: ["privado", "wifi", "enchufe", "musica"],
    disponible: false,
  },
];

export const HORARIOS_DISPONIBLES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

export const AMENIDAD_LABELS: Record<string, string> = {
  wifi:     "WiFi",
  enchufe:  "Enchufes",
  vista:    "Vista",
  privado:  "Privado",
  terraza:  "Terraza",
  musica:   "Música",
};

export const AMENIDAD_ICONS: Record<string, string> = {
  wifi:     "📶",
  enchufe:  "🔌",
  vista:    "🪟",
  privado:  "🔒",
  terraza:  "🌤️",
  musica:   "🎵",
};