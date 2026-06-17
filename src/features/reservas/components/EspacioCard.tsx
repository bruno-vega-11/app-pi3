import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import type { Espacio } from "../types/reserva.types";
import { AMENIDAD_ICONS, AMENIDAD_LABELS } from "../data/espacios.data";

interface EspacioCardProps {
  espacio: Espacio;
  onSeleccionar: (espacio: Espacio) => void;
}

export function EspacioCard({ espacio, onSeleccionar }: EspacioCardProps) {
  return (
    <div
      className={`relative bg-white rounded-3xl p-4 sm:p-6 border transition-all duration-300 group overflow-hidden ${
        espacio.disponible
          ? "border-[#E5D9C4] hover:border-[#C8A882] hover:shadow-lg cursor-pointer"
          : "border-[#EEE8E0] opacity-60"
      }`}
    >
      {/* Etiqueta superior */}
      {espacio.etiqueta && (
        <div className="absolute -top-3 left-5">
          <Badge variant="warm">{espacio.etiqueta}</Badge>
        </div>
      )}
      {!espacio.disponible && (
        <div className="absolute -top-3 right-5">
          <Badge variant="muted">No disponible</Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FBF5EC] rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {espacio.imagen}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-[#4A3728] text-base sm:text-lg leading-tight">{espacio.nombre}</h3>
              <p className="text-sm text-[#9B7B55] mt-0.5">Hasta {espacio.capacidad} personas</p>
            </div>
            <div className="inline-flex flex-col self-start rounded-xl bg-[#D8ECD4]/40 px-3 py-1.5 sm:text-right sm:shrink-0">
              <span className="text-base sm:text-xl font-bold text-[#7BAF8E] leading-tight">Gratis</span>
              <p className="text-[11px] sm:text-xs text-[#7A6A58] leading-snug">Para estudiantes UTEC</p>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-sm text-[#7A6A58] leading-relaxed mb-4">{espacio.descripcion}</p>

      {/* Amenidades */}
      <div className="flex flex-wrap gap-2 mb-5">
        {espacio.amenidades.map((a) => (
          <span
            key={a}
            className="flex items-center gap-1 text-xs text-[#8A7060] bg-[#FAF5ED] px-2.5 py-1 rounded-full"
          >
            <span>{AMENIDAD_ICONS[a]}</span>
            <span>{AMENIDAD_LABELS[a]}</span>
          </span>
        ))}
      </div>

      {/* Foto de referencia */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-[#EDE5D8] bg-[#FAF5ED] p-3">
        <img
          src={espacio.foto}
          alt={`Referencia de ${espacio.nombre}`}
          className="w-full h-60 object-contain"
        />
      </div>

      {/* Botón */}
      <Button
        variant={espacio.disponible ? "primary" : "secondary"}
        fullWidth
        disabled={!espacio.disponible}
        onClick={() => espacio.disponible && onSeleccionar(espacio)}
      >
        {espacio.disponible ? "Reservar este espacio →" : "No disponible hoy"}
      </Button>
    </div>
  );
}