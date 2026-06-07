import { useState } from "react";
import { Button } from "../../components/ui/Button";

interface CalendarioSelectorProps {
  fechaSeleccionada: string;
  onSeleccionar: (fecha: string) => void;
}

export function CalendarioSelector({ fechaSeleccionada, onSeleccionar }: CalendarioSelectorProps) {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));

  const diasEnMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0).getDate();
  const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1).getDay();
  const primerDiaLunes = primerDia === 0 ? 6 : primerDia - 1;

  const nombresMes = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];
  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

  const esPasado = (dia: number) => {
    const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
    const hoyInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    return fecha < hoyInicio;
  };

  const toISOLocal = (dia: number) => {
    const y = mesActual.getFullYear();
    const m = String(mesActual.getMonth() + 1).padStart(2, "0");
    const d = String(dia).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const irAnterior = () =>
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1));
  const irSiguiente = () =>
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1));

  const esMesActualOAnterior =
    mesActual <= new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  return (
    <div className="bg-white rounded-3xl border border-[#E5D9C4] p-5">
      {/* Navegación mes */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={irAnterior} disabled={esMesActualOAnterior}>
          ‹
        </Button>
        <span className="font-semibold text-[#4A3728]">
          {nombresMes[mesActual.getMonth()]} {mesActual.getFullYear()}
        </span>
        <Button variant="ghost" size="sm" onClick={irSiguiente}>
          ›
        </Button>
      </div>

      {/* Cabecera días */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {diasSemana.map((d) => (
          <div key={d} className="text-center text-xs text-[#C4B09A] font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Grid días */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: primerDiaLunes }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: diasEnMes }).map((_, i) => {
          const dia = i + 1;
          const iso = toISOLocal(dia);
          const pasado = esPasado(dia);
          const seleccionado = iso === fechaSeleccionada;

          return (
            <button
              key={dia}
              onClick={() => !pasado && onSeleccionar(iso)}
              disabled={pasado}
              className={`aspect-square rounded-xl text-sm font-medium transition-all duration-200 ${
                seleccionado
                  ? "bg-[#C8A882] text-white shadow-sm"
                  : pasado
                  ? "text-[#DDD0C0] cursor-not-allowed"
                  : "text-[#4A3728] hover:bg-[#FBF5EC] cursor-pointer"
              }`}
            >
              {dia}
            </button>
          );
        })}
      </div>
    </div>
  );
}