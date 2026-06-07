import { useState } from "react";
import { Button } from "../../components/ui/Button";
import type { ReservaFormData } from "../types/reserva.types";

interface FormularioReservaProps {
  datosIniciales: Partial<ReservaFormData>;
  onConfirmar: (datos: Partial<ReservaFormData>) => void;
  onVolver: () => void;
}

export function FormularioReserva({ datosIniciales, onConfirmar, onVolver }: FormularioReservaProps) {
  const [datos, setDatos] = useState({
    nombre:   datosIniciales.nombre   ?? "",
    email:    datosIniciales.email    ?? "",
    telefono: datosIniciales.telefono ?? "",
    nota:     datosIniciales.nota     ?? "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const actualizar = (campo: string, valor: string) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const validar = () => {
    const e: Record<string, string> = {};
    if (!datos.nombre.trim())   e.nombre   = "El nombre es obligatorio";
    if (!datos.email.trim())    e.email    = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(datos.email)) e.email = "Email no válido";
    if (!datos.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validar()) onConfirmar(datos);
  };

  const Campo = (
    id: keyof typeof datos,
    label: string,
    tipo: string,
    placeholder: string,
    isTextarea = false,
  ) => (
    <div key={id}>
      <label htmlFor={id} className="block text-sm font-medium text-[#7A5C3A] mb-1.5">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          rows={3}
          placeholder={placeholder}
          value={datos[id]}
          onChange={(e) => actualizar(id, e.target.value)}
          className="w-full px-4 py-3 bg-[#FAF5ED] border border-[#E5D9C4] rounded-2xl text-[#4A3728] placeholder-[#C4B09A] focus:outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 resize-none transition-colors text-sm"
        />
      ) : (
        <input
          id={id}
          type={tipo}
          placeholder={placeholder}
          value={datos[id]}
          onChange={(e) => actualizar(id, e.target.value)}
          className={`w-full px-4 py-3 bg-[#FAF5ED] border rounded-2xl text-[#4A3728] placeholder-[#C4B09A] focus:outline-none focus:ring-2 focus:ring-[#C8A882]/20 transition-colors text-sm ${
            errores[id]
              ? "border-[#E8A5A0]"
              : "border-[#E5D9C4] focus:border-[#C8A882]"
          }`}
        />
      )}
      {errores[id] && <p className="text-xs text-[#D4756E] mt-1">{errores[id]}</p>}
    </div>
  );

  return (
    <div className="space-y-5">
      {Campo("nombre",   "Nombre completo",        "text",  "Tu nombre")}
      {Campo("email",    "Correo electrónico",      "email", "tu@correo.com")}
      {Campo("telefono", "Teléfono",               "tel",   "+34 600 000 000")}
      {Campo("nota",     "Nota especial (opcional)", "text",  "Alguna petición especial...", true)}

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onVolver}>← Volver</Button>
        <Button variant="primary" fullWidth onClick={handleSubmit}>
          Revisar reserva →
        </Button>
      </div>
    </div>
  );
}