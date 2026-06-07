import { HORARIOS_DISPONIBLES } from "../data/espacios.data";

interface HorarioSelectorProps {
  horaInicio: string;
  horaFin: string;
  personas: number;
  capacidadMaxima: number;
  onCambioInicio: (h: string) => void;
  onCambioFin: (h: string) => void;
  onCambioPersonas: (p: number) => void;
}

export function HorarioSelector({
  horaInicio, horaFin, personas, capacidadMaxima,
  onCambioInicio, onCambioFin, onCambioPersonas,
}: HorarioSelectorProps) {
  const horasFinDisponibles = horaInicio
    ? HORARIOS_DISPONIBLES.filter((h) => h > horaInicio)
    : [];

  return (
    <div className="space-y-6">
      {/* Hora de llegada */}
      <div>
        <label className="block text-sm font-medium text-[#7A5C3A] mb-3">
          Hora de llegada
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {HORARIOS_DISPONIBLES.map((h) => (
            <button
              type="button"
              key={h}
              onClick={() => { console.log("click hora:",h),onCambioInicio(h); onCambioFin(""); }}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                horaInicio === h
                  ? "bg-[#C8A882] text-white shadow-sm"
                  : "bg-[#FAF5ED] text-[#7A6A58] hover:bg-[#F0E8D8] cursor-pointer"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Hora de salida */}
      {horaInicio && (
        <div>
          <label className="block text-sm font-medium text-[#7A5C3A] mb-3">
            Hora de salida
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {horasFinDisponibles.map((h) => (
              <button
              type="button"
                key={h}
                onClick={() => onCambioFin(h)}
                className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  horaFin === h
                    ? "bg-[#A8C4B4] text-white shadow-sm"
                    : "bg-[#FAF5ED] text-[#7A6A58] hover:bg-[#F0E8D8] cursor-pointer"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Número de personas */}
      <div>
        <label className="block text-sm font-medium text-[#7A5C3A] mb-3">
          ¿Cuántas personas? (máx. {capacidadMaxima})
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onCambioPersonas(Math.max(1, personas - 1))}
            className="w-10 h-10 rounded-full bg-[#F0E8D8] text-[#7A5C3A] font-bold text-lg hover:bg-[#E5D9C4] transition-colors cursor-pointer"
          >
            −
          </button>
          <span className="text-2xl font-bold text-[#4A3728] w-8 text-center">{personas}</span>
          <button
            onClick={() => onCambioPersonas(Math.min(capacidadMaxima, personas + 1))}
            className="w-10 h-10 rounded-full bg-[#F0E8D8] text-[#7A5C3A] font-bold text-lg hover:bg-[#E5D9C4] transition-colors cursor-pointer"
          >
            +
          </button>
          <span className="text-sm text-[#C4B09A] ml-2">personas</span>
        </div>
      </div>
    </div>
  );
}