// src/features/juegos/data/juegos.data.ts
// ─────────────────────────────────────────────────────────
//  CONFIGURACIÓN DEL RETO DIARIO
//  Cambia estos valores para cada nuevo reto sin tocar los componentes
// ─────────────────────────────────────────────────────────

export const WORDLE_CONFIG = {
  word: "MAREAS",       // siempre MAYÚSCULAS
  maxAttempts: 6,
  hints: [
    { emoji: "📅", text: "Creada en 1973 por un artista peruano" },
    { emoji: "🎨", text: "Técnica mixta sobre lienzo" },
    { emoji: "🌊", text: "Evoca el movimiento del agua y la naturaleza" },
    { emoji: "👤", text: "Fernando de Szyszlo — precursor del abstraccionismo peruano" },
  ],
};

export const FOTO_CONFIG = {
  location: "Sala 3 · Piso 2",
  emoji: "🖼️",
  description:
    "Busca la pieza de colores vibrantes cerca de la ventana principal. Verás formas geométricas y trazos expresivos de gran formato.",
  validationPrompt:
    'El estudiante debía fotografiar una obra de arte en el MAC UTEC (Museo de Arte Contemporáneo). ¿La imagen muestra claramente una obra de arte: pintura, escultura o instalación artística? Responde SOLO con JSON sin markdown: {"esObra":true,"mensaje":"1 oración en español felicitando al estudiante"}',
};

export const AUDIO_CONFIG = {
  clues: [
    '"Una obra que desafía la percepción del espacio…"',
    '"El artista captura el movimiento del agua y la luz…"',
    '"Colores que evocan el océano peruano en tempestad…"',
    '"Una de las obras más emblemáticas del MAC UTEC…"',
  ],
  correctId: "a",
  options: [
    { id: "a", label: "Mareas de Luz",       sublabel: "Fernando de Szyszlo" },
    { id: "b", label: "Paisaje Andino",      sublabel: "Jorge Vinatea"        },
    { id: "c", label: "Abstracción Costera", sublabel: "Ricardo Grau"         },
    { id: "d", label: "Espacio Infinito",    sublabel: "Héctor Velarde"        },
  ],
};

export const PREMIOS = [
  { icon: "👕", name: "Polo UTEC",       desc: "Polo oficial edición especial MAC",  color: "#C8A882" },
  { icon: "☕", name: "Café gratis",     desc: "Un café en la cafetería UTEC",        color: "#7BAF8E" },
  { icon: "🧁", name: "Postre MAC",      desc: "Un postre en La Meriendería",         color: "#F0A0A0" },
  { icon: "📚", name: "Catálogo MAC",    desc: "Catálogo impreso de las obras",       color: "#A0B8D8" },
  { icon: "🎨", name: "Set de arte",     desc: "Kit de pintura UTEC",                 color: "#D4A8D0" },
  { icon: "🏷️", name: "Descuento 20%", desc: "20% off en la tienda del MAC",         color: "#A8C8A0" },
];