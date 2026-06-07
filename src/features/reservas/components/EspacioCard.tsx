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
      className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 group ${
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
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-[#FBF5EC] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {espacio.imagen}
        </div>
        <div>
          <h3 className="font-semibold text-[#4A3728] text-lg leading-tight">{espacio.nombre}</h3>
          <p className="text-sm text-[#9B7B55] mt-0.5">Hasta {espacio.capacidad} personas</p>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <span className="text-xl font-bold text-[#7BAF8E]">Gratis€</span>
          <p className="text-xs text-[#C4B09A]">a todos los estudiantes de UTEC</p>
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