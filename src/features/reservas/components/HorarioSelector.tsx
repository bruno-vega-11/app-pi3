import { HORARIOS_DISPONIBLES } from "../data/espacios.data";

interface HorarioSelectorProps {
  horaInicio: string;
  horaFin: string;
  onCambioInicio: (h: string) => void;
  onCambioFin: (h: string) => void;
}

export function HorarioSelector({
  horaInicio, horaFin,
  onCambioInicio, onCambioFin,
}: HorarioSelectorProps) {
  const deStringAMinutos = (horaStr: string): number => {
    const [horas, minutos] = horaStr.split(':').map(Number);
    return horas * 60 + minutos;
  };

  const horasFinDisponibles: string[] = horaInicio
    ? HORARIOS_DISPONIBLES.filter((h: string) => {
      const inicioEnMinutos = deStringAMinutos(horaInicio);
      const finEnMinutos = deStringAMinutos(h);

      return finEnMinutos > inicioEnMinutos && finEnMinutos <= inicioEnMinutos + 120;
    })
    : [];

  return (
    <div className="space-y-6">
      {/* Hora de llegada */}
      <div>
        <label className="block text-sm font-medium text-[#7A5C3A] mb-3">
          Hora de llegada
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {HORARIOS_DISPONIBLES.filter((h) => deStringAMinutos(h) <= deStringAMinutos("15:30")).map((h) => (
            <button
              type="button"
              key={h}
              onClick={() => { console.log("click hora:", h), onCambioInicio(h); onCambioFin(""); }}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${horaInicio === h
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
                className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${horaFin === h
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
    </div>
  );
}