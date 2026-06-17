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
  /** Respuestas alternativas aceptadas (opcional, minúsculas o mayúsculas da igual) */
  acceptedAnswers: [] as string[],
  maxAttempts: 4,
  hints: [
    { emoji: "🤓🖼️", text: "Tres protagonistas comparten el mismo destino, pero el secreto para encontrarlos no está en ellos, sino en aquello sobre lo que descansan." }
  ],
};

// ═══════════════════════════════════════════════════════════
//  2. ¿QUÉ OBRA ES? — zoom progresivo sobre una imagen
// ═══════════════════════════════════════════════════════════
export const OBRA_ZOOM_CONFIG = {
  /**
   * Imagen de la obra en public/obras/
   * Ej: si guardas public/obras/mi-obra.jpg → imageSrc: "/obras/mi-obra.jpg"
   */
  imageSrc: "/obras/obra_del_dia.jpeg",
  /** Nombre correcto de la obra */
  answer: "CARNAVAL EN SAN JUAN",
  /** Variantes aceptadas (opcional) */
  acceptedAnswers: ["mareas fuertes", "mareas de luz"] as string[],
  maxAttempts: 3,
  /**
   * Punto de enfoque del zoom inicial (0 = izquierda/arriba, 1 = derecha/abajo).
   * Ajusta para que el primer recorte muestre un detalle interesante.
   */
  focus: { x: 0.45, y: 0.35 },
  /**
   * Porcentaje de la imagen visible en cada fase:
   * - Intento 1: muy cerca (8%)
   * - Tras fallo 1: 20%
   * - Tras fallo 2: 50%
   * - Tras fallo 3: 100% (se revela completa)
   */
  zoomLevels: [8, 20, 50, 100] as const,
  hints: [
    { emoji: "📍", text: "Está expuesta en el MAC UTEC" },
  ],
};

// ═══════════════════════════════════════════════════════════
//  3. AUDIO — escucha y elige la obra correcta
// ═══════════════════════════════════════════════════════════
export const AUDIO_CONFIG = {
  /** Archivo en public/audio/ → ruta web: /audio/nombre.mp3 */
  audioSrc: "/audio/audio.mp3",
  description: "Escucha el audio del curador e identifica de qué obra se trata.",
  correctId: "a",
  options: [
    { id: "a", label: "Mareas de Luz", sublabel: "Fernando de Szyszlo" },
    { id: "b", label: "Paisaje Andino", sublabel: "Jorge Vinatea" },
    { id: "c", label: "Abstracción Costera", sublabel: "Ricardo Grau" },
    { id: "d", label: "Espacio Infinito", sublabel: "Héctor Velarde" },
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
