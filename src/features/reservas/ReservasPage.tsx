import { StepIndicator } from "../components/ui/StepIndicator";
import { Button } from "../components/ui/Button";
import { EspacioCard } from "./components/EspacioCard";
import { CalendarioSelector } from "./components/CalendarioSelector";
import { HorarioSelector } from "./components/HorarioSelector";
import { FormularioReserva } from "./components/FormularioReserva";
import { ConfirmacionReserva } from "./components/ConfirmacionReserva";
import { useReserva } from "./hooks/useReserva";
import { ESPACIOS } from "./data/espacios.data";

const PASOS_CONFIG = [
  { id: "espacios", label: "Espacio", icon: "🪑" },
  { id: "fecha-hora", label: "Fecha", icon: "📅" },
  { id: "datos", label: "Datos", icon: "✏️" },
  { id: "confirmacion", label: "Confirmar", icon: "✓" },
];

export function ReservasPage() {
  const reserva = useReserva();

  return (
    <div className="flex flex-col flex-1" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Header ── */}
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫖</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-lg leading-tight">Escape Utec</h1>
              <p className="text-xs text-[#C4B09A]">Reserva tu rincón favorito</p>
            </div>
          </div>
          {reserva.paso !== "espacios" && !reserva.reservaCompletada && (
            <Button variant="ghost" size="sm" onClick={reserva.reiniciar}>
              Empezar de nuevo
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 w-full">

        {/* Step indicator */}
        {!reserva.reservaCompletada && (
          <div className="mb-8">
            <StepIndicator steps={PASOS_CONFIG} currentIndex={reserva.pasoIndex} />
          </div>
        )}

        {/* ── Paso 1: Espacios ── */}
        {reserva.paso === "espacios" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#4A3728]">Elige tu espacio</h2>
              <p className="text-[#9B7B55] mt-1">Encuentra la manta perfecta para tu escape de hoy</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {ESPACIOS.map((espacio) => (
                <EspacioCard
                  key={espacio.id}
                  espacio={espacio}
                  onSeleccionar={reserva.seleccionarEspacio}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Paso 2: Fecha y hora ── */}
        {reserva.paso === "fecha-hora" && reserva.espacioSeleccionado && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#4A3728]">Elige fecha y hora</h2>
              <p className="text-[#9B7B55] mt-1">
                Reservando:{" "}
                <span className="font-medium text-[#C8A882]">
                  {reserva.espacioSeleccionado.nombre}
                </span>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[#7A5C3A] mb-3">Selecciona un día</p>
                <CalendarioSelector
                  fechaSeleccionada={reserva.fecha}
                  onSeleccionar={reserva.setFechaDirecto}
                />
              </div>

              {reserva.fecha && (
                <div>
                  <p className="text-sm font-medium text-[#7A5C3A] mb-3">Selecciona el horario</p>
                  <HorarioSelector
                    horaInicio={reserva.horaInicio}
                    horaFin={reserva.horaFin}
                    personas={reserva.personas}
                    capacidadMaxima={reserva.espacioSeleccionado.capacidad}
                    onCambioInicio={reserva.setHoraInicioDirecto}
                    onCambioFin={reserva.setHoraFinDirecto}
                    onCambioPersonas={reserva.setPersonasDirecto}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={reserva.anterior}>← Volver</Button>
                <Button
                  variant="primary"
                  fullWidth
                  disabled={!reserva.fecha || !reserva.horaInicio || !reserva.horaFin}
                  onClick={reserva.siguiente}
                >
                  Continuar →
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Paso 3: Datos personales ── */}
        {reserva.paso === "datos" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#4A3728]">Tus datos</h2>
              <p className="text-[#9B7B55] mt-1">Para confirmar la reserva necesitamos un poco de info</p>
            </div>
            <FormularioReserva
              datosIniciales={reserva.formData}
              onConfirmar={reserva.confirmarDatos}
              onVolver={reserva.anterior}
            />
          </div>
        )}

        {/* ── Paso 4: Confirmación ── */}
        {reserva.paso === "confirmacion" && reserva.espacioSeleccionado && (
          <div>
            {!reserva.reservaCompletada && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#4A3728]">Confirma tu reserva</h2>
                <p className="text-[#9B7B55] mt-1">Revisa los detalles antes de confirmar</p>
              </div>
            )}
            <ConfirmacionReserva
              espacio={reserva.espacioSeleccionado}
              fecha={reserva.fecha}
              horaInicio={reserva.horaInicio}
              horaFin={reserva.horaFin}
              personas={reserva.personas}
              formData={reserva.formData}
              precioTotal={reserva.calcularPrecio()}
              completada={reserva.reservaCompletada}
              onConfirmar={reserva.finalizarReserva}
              onVolver={reserva.anterior}
              onNuevaReserva={reserva.reiniciar}
            />
          </div>
        )}

      </main>
    </div>
  );
}