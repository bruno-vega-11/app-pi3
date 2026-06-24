// src/features/juegos/data/juegos.data.ts
// ─────────────────────────────────────────────────────────
//  CONFIGURACIÓN DEL RETO DIARIO
//  Cambia estos valores para cada nuevo reto sin tocar los componentes
// ─────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════
//  1. AHORCADO — adivina el nombre completo de la obra
// ═══════════════════════════════════════════════════════════
export const AHORCADO_CONFIG = {
  answer: "TRES CHOLOS DURMIENDO",
  acceptedAnswers: [] as string[],
  maxAttempts: 4,
  hints: [
    { emoji: "🤓🖼️", text: "Tres protagonistas comparten el mismo destino, pero el secreto para encontrarlos no está en ellos, sino en aquello sobre lo que descansan." }
  ],
  // ── Info de la obra (se muestra al ganar o perder) ──────
  artworkSrc: "/obras/tres-cholos.jpg",
  artist: "Camilo Blas",
  funFact: "Esta obra captura la cotidianidad del pueblo andino peruano con una ternura única. Los tres personajes descansan con una dignidad silenciosa que invita a reflexionar sobre la identidad y la cultura serrana del Perú.",
};

// ═══════════════════════════════════════════════════════════
//  2. ¿QUÉ OBRA ES? — zoom progresivo sobre una imagen
// ═══════════════════════════════════════════════════════════
export const OBRA_ZOOM_CONFIG = {
  imageSrc: "/obras/hola.jpg",
  answer: "CARNAVAL EN SAN JUAN",
  acceptedAnswers: ["mareas fuertes", "mareas de luz"] as string[],
  maxAttempts: 3,
  focus: { x: 0.45, y: 0.35 },
  zoomLevels: [8, 20, 50, 100] as const,
  hints: [
    { emoji: "📍", text: "Está expuesta en el MAC UTEC" },
  ],
  // ── Info de la obra (se muestra al ganar o perder) ──────
  artist: "Nombre del artista",
  funFact: "Esta obra celebra la festividad andina del carnaval con una explosión de color y movimiento. Las figuras danzantes parecen cobrar vida en el lienzo, transmitiendo la alegría colectiva de una tradición que une a comunidades enteras cada año.",
};

import audioLatente from "../../../audios/Generated Audio June 17, 2026 - 10_51AM.wav";
import latenteObra from "../../../images/latenteobra.jpg";
import vinateaObra from "../../../images/vinatea.jpeg";
import grauObra from "../../../images/grau.jpg";
import velardeObra from "../../../images/velarde.jpg";

// ═══════════════════════════════════════════════════════════
//  3. AUDIO — escucha y elige la obra correcta
// ═══════════════════════════════════════════════════════════
export const AUDIO_CONFIG = {
  audioSrc: audioLatente,
  description: "Escucha el audio del curador e identifica de qué obra se trata.",
  correctId: "a",
  options: [
    {
      id: "a",
      label: "Latente",
      sublabel: "Victor Zuñiga Aedo",
      artworkSrc: latenteObra,
      description: "Una ciudad que existe en dos escalas: de cerca son manchas abstractas de óleo grueso; de lejos tu cerebro construye edificios, calles y un estadio completo.",
      funFact: "Esta pintura juega con tu mente. Si te acercas muchísimo al lienzo, verás que los edificios desaparecen y solo quedan manchas de pintura al óleo abstractas y gruesas. Sin embargo, al dar unos pasos hacia atrás, tu cerebro mágicamente une todos esos colores para construir las calles, las casas y el gran estadio.",
    },
    {
      id: "b",
      label: "Paisaje Andino",
      sublabel: "Jorge Vinatea",
      artworkSrc: vinateaObra,
      description: "Una obra que retrata la majestuosidad de los Andes peruanos con colores vívidos y figuras humanas en armonía con la naturaleza serrana.",
      funFact: "",
    },
    {
      id: "c",
      label: "Abstracción Costera",
      sublabel: "Ricardo Grau",
      artworkSrc: grauObra,
      description: "Una exploración abstracta del litoral peruano donde el mar, la neblina y la arena se fusionan en formas orgánicas sin contorno definido.",
      funFact: "",
    },
    {
      id: "d",
      label: "Espacio Infinito",
      sublabel: "Héctor Velarde",
      artworkSrc: velardeObra,
      description: "Una obra que evoca la inmensidad del universo a través de planos limpios y líneas precisas, invitando a la contemplación del silencio visual.",
      funFact: "",
    },
  ],
};

export const PREMIOS = [
  { icon: "👕", name: "Polo UTEC", desc: "Polo oficial edición especial MAC", color: "#C8A882" },
  { icon: "☕", name: "Café gratis", desc: "Un café en la cafetería UTEC", color: "#7BAF8E" },
  { icon: "🧁", name: "Postre MAC", desc: "Un postre en La Meriendería", color: "#F0A0A0" },
  { icon: "📚", name: "Catálogo MAC", desc: "Catálogo impreso de las obras", color: "#A0B8D8" },
  { icon: "🎨", name: "Set de arte", desc: "Kit de pintura UTEC", color: "#D4A8D0" },
  { icon: "🏷️", name: "Descuento 20%", desc: "20% off en la tienda del MAC", color: "#A8C8A0" },
];
