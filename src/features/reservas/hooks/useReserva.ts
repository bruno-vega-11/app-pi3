import { useState } from "react";
import type { Espacio, PasoReserva, ReservaFormData } from "../types/reserva.types";



const PASOS: PasoReserva[] = ["espacios", "fecha-hora", "datos", "confirmacion"];

export function useReserva() {
  const [paso, setPaso]                               = useState<PasoReserva>("espacios");
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<Espacio | null>(null);
  const [fecha, setFecha]                             = useState<string>("");
  const [horaInicio, setHoraInicio]                   = useState<string>("");
  const [horaFin, setHoraFin]                         = useState<string>("");
  const [personas, setPersonas]                       = useState<number>(2);
  const [formData, setFormData]                       = useState<Partial<ReservaFormData>>({});
  const [reservaCompletada, setReservaCompletada]     = useState(false);

  const pasoIndex = PASOS.indexOf(paso);

  const siguiente = () => {
    const idx = PASOS.indexOf(paso);
    if (idx < PASOS.length - 1) setPaso(PASOS[idx + 1]);
  };

  const anterior = () => {
    const idx = PASOS.indexOf(paso);
    if (idx > 0) setPaso(PASOS[idx - 1]);
  };

  const seleccionarEspacio = (espacio: Espacio) => {
    setEspacioSeleccionado(espacio);
    siguiente();
  };

  const confirmarFechaHora = (f: string, hInicio: string, hFin: string, p: number) => {
    setFecha(f);
    setHoraInicio(hInicio);
    setHoraFin(hFin);
    setPersonas(p);
  };

  const confirmarDatos = (datos: Partial<ReservaFormData>) => {
    setFormData(datos);
    siguiente();
  };

  const finalizarReserva = () => setReservaCompletada(true);

  const reiniciar = () => {
    setPaso("espacios");
    setEspacioSeleccionado(null);
    setFecha("");
    setHoraInicio("");
    setHoraFin("");
    setPersonas(2);
    setFormData({});
    setReservaCompletada(false);
  };

  const calcularDuracion = () => {
    if (!horaInicio || !horaFin) return 0;
    const [h1, m1] = horaInicio.split(":").map(Number);
    const [h2, m2] = horaFin.split(":").map(Number);
    return (h2 * 60 + m2 - (h1 * 60 + m1)) / 60;
  };

  const setFechaDirecto = (f: string) => setFecha(f);
  const setHoraInicioDirecto = (h: string) => { setHoraInicio(h); setHoraFin(""); };
  const setHoraFinDirecto = (h: string) => setHoraFin(h);
  const setPersonasDirecto = (p: number) => setPersonas(p);

  const calcularPrecio = () =>
    espacioSeleccionado ? espacioSeleccionado.precio * calcularDuracion() : 0;

  return {
    paso, pasoIndex,
    espacioSeleccionado,
    fecha, horaInicio, horaFin, personas,
    formData, reservaCompletada,
    siguiente, anterior,
    seleccionarEspacio, confirmarFechaHora, confirmarDatos,
    finalizarReserva, reiniciar,
    calcularDuracion, calcularPrecio,
    setFechaDirecto,
    setHoraInicioDirecto,
    setHoraFinDirecto,
    setPersonasDirecto,
  };
}