import { Button } from "../../components/ui/Button";
import type { Espacio, ReservaFormData } from "../types/reserva.types";

interface ConfirmacionReservaProps {
  espacio: Espacio;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  formData: Partial<ReservaFormData>;
  precioTotal: number;
  completada: boolean;
  onConfirmar: () => void;
  onVolver: () => void;
  onNuevaReserva: () => void;
}

export function ConfirmacionReserva({
<<<<<<< HEAD
  espacio, fecha, horaInicio, horaFin, personas, formData,
  completada, onConfirmar, onVolver, onNuevaReserva,
=======
  espacio, fecha, horaInicio, horaFin, formData,
  precioTotal, completada, onConfirmar, onVolver, onNuevaReserva,
>>>>>>> e7b36a1ffd56bed4a44afb59817fddf065c5b14b
}: ConfirmacionReservaProps) {
  const formatearFecha = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-ES", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  };

  // ── Pantalla de éxito ──────────────────────────────────────────────────────
  if (completada) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[#4A3728]">¡Reserva confirmada!</h2>
        <p className="text-[#7A6A58] max-w-sm mx-auto">
          Te hemos enviado un correo de confirmación a{" "}
          <strong>{formData.email}</strong>. ¡Nos vemos pronto!
        </p>

        <div className="bg-[#F5EEE4] rounded-2xl p-5 text-left max-w-sm mx-auto mt-4">
          <p className="text-sm text-[#9B7B55] font-medium mb-2">Resumen de tu reserva</p>
          <p className="text-[#4A3728] font-semibold">{espacio.nombre}</p>
          <p className="text-sm text-[#7A6A58] capitalize">{formatearFecha(fecha)}</p>
          <p className="text-sm text-[#7A6A58]">
            {horaInicio} – {horaFin} personas
          </p>
          <p className="text-sm font-semibold text-[#C8A882] mt-1">
            ¡Reserva gratuita gracias a UTEC! 🎓
          </p>
        </div>

        <Button variant="secondary" onClick={onNuevaReserva} className="mt-4">
          Hacer otra reserva
        </Button>
      </div>
    );
  }

  // ── Resumen antes de confirmar ─────────────────────────────────────────────
  const fila = (label: string, valor: string) => (
    <div className="flex justify-between items-start gap-3 py-2.5 border-b border-[#EDE5D8] last:border-0">
      <span className="text-sm text-[#9B7B55] shrink-0">{label}</span>
      <span className="text-sm font-medium text-[#4A3728] text-right break-words min-w-0">{valor}</span>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="bg-[#FAF5ED] rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{espacio.imagen}</span>
          <div>
            <p className="font-semibold text-[#4A3728]">{espacio.nombre}</p>
            <p className="text-xs text-[#9B7B55]">Espacio seleccionado</p>
          </div>
        </div>
        {fila("Fecha", formatearFecha(fecha))}
        {fila("Horario", `${horaInicio} – ${horaFin}`)}
        {fila("Nombre", formData.nombre ?? "")}
        {fila("Contacto", formData.email ?? "")}
        {formData.nota && fila("Nota", formData.nota)}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-3 bg-[#C8A882]/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4">
        <span className="font-semibold text-[#7A5C3A] text-sm sm:text-base">Total a pagar</span>
        <span className="text-xl sm:text-2xl font-bold text-[#7BAF8E]">¡Gratis! 🎓</span>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onVolver}>← Volver</Button>
        <Button variant="primary" fullWidth onClick={onConfirmar}>
          ✓ Confirmar reserva
        </Button>
      </div>
    </div>
  );
}