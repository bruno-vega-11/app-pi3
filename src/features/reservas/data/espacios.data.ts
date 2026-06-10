import type { Espacio } from "../types/reserva.types";
import fotoMantaRoja from "../../../images/manta.png";
import fotoMantaAzul from "../../../images/manta3.jpg";
import fotoMantaVerde from "../../../images/manta2.png";
import fotoMantaAmarilla from "../../../images/manta4.png";

export const ESPACIOS: Espacio[] = [
  {
    id: "1",
    nombre: "Manta Pequeña",
    descripcion: "Tamaño: 1,5 m × 2 m. Manta compacta y ligera. Ideal para estudiar al aire libre, tomar un café entre clases o descansar a la sombra. Perfecta para grupos pequeños.",
    capacidad: 4,
    precio: 0,
    imagen: "🧺",
    foto: fotoMantaRoja,
    amenidades: ["vista", "terraza"],
    disponible: true,
    etiqueta: "Popular",
  },
  {
    id: "2",
    nombre: "Manta Mediana",
    descripcion: "Tamaño: 1,8 m × 2 m. Manta mediana con buena superficie para sentarse cómodamente en el césped. Perfecta para almuerzos rápidos, sesiones de fotos o tardes soleadas con amigos. Recomendada para grupos de 3 a 4 personas.",
    capacidad: 4,
    precio: 0,
    imagen: "🌿",
    foto: fotoMantaAzul,
    amenidades: ["vista"],
    disponible: true,
  },
  {
    id: "3",
    nombre: "Manta Grande",
    descripcion: "Tamaño: 2 m × 2,5 m. Manta amplia con espacio de sobra para tenderse o compartir en grupo. Ideal para proyectos en equipo, cumpleaños informales o tardes largas leyendo junto al MAC. Perfecta para grupos medianos de 4 a 6 personas.",
    capacidad: 6,
    precio: 0,
    imagen: "🌳",
    foto: fotoMantaVerde,
    amenidades: ["vista", "privado"],
    disponible: true,
  },
  {
    id: "4",
    nombre: "Manta Grande",
    descripcion: "Tamaño: 2,2 m × 2,5 m. La manta más grande del catálogo, pensada para quedarse varias horas en el parque sin apretarse. Ideal para días nublados, sesiones de estudio prolongadas o reuniones de club universitario. Perfecta para grupos de 5 a 6 personas.",
    capacidad: 6,
    precio: 0,
    imagen: "⛺",
    foto: fotoMantaAmarilla,
    amenidades: ["enchufe", "privado"],
    disponible: false,
    etiqueta: "Ocupada",
  },
];

export const HORARIOS_DISPONIBLES = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

export const AMENIDAD_LABELS: Record<string, string> = {
  wifi:     "WiFi",
  enchufe:  "Amigos y historias",
  vista:    "Tu y tus audífonos",
  privado:  "Tarde tranquila",
  terraza:  "Para relajarte",
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