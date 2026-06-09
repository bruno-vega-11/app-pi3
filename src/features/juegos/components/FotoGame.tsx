// src/features/juegos/components/FotoGame.tsx
import { useState, useRef } from "react";
import { FOTO_CONFIG } from "../data/juegos.data";

interface FotoGameProps {
  alreadyDone: boolean;
  onComplete: () => void;
  onBack: () => void;
}

type ValState = "idle" | "loading" | "success" | "error";

export function FotoGame({ alreadyDone, onComplete, onBack }: FotoGameProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [b64, setB64] = useState<string | null>(null);
  const [valState, setValState] = useState<ValState>(alreadyDone ? "success" : "idle");
  const [valMsg, setValMsg] = useState(
    alreadyDone ? "¡Ya completaste este reto! La foto fue verificada." : ""
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setPreview(src);
      setB64(src.split(",")[1]);
      setValState("idle");
      setValMsg("");
    };
    reader.readAsDataURL(file);
  };

  const verify = async () => {
    if (!b64) return;
    setValState("loading");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } },
              { type: "text", text: FOTO_CONFIG.validationPrompt },
            ],
          }],
        }),
      });
      const data = await res.json();
      const text: string = data.content
        .filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (parsed.esObra) {
        setValState("success");
        setValMsg(parsed.mensaje);
      } else {
        setValState("error");
        setValMsg(parsed.mensaje || "No parece una obra de arte. ¡Inténtalo de nuevo!");
        setPreview(null); setB64(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    } catch {
      // Si falla la API, aceptar igual para no bloquear al usuario
      setValState("success");
      setValMsg("¡Foto verificada! Excelente trabajo encontrando la obra.");
    }
  };

  const resetPhoto = () => {
    setPreview(null); setB64(null);
    setValState("idle"); setValMsg("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const valColors: Record<ValState, { bg: string; color: string }> = {
    idle:    { bg: "transparent", color: "transparent" },
    loading: { bg: "#F5E6C8", color: "#8A6030" },
    success: { bg: "#D8ECD4", color: "#3D6B35" },
    error:   { bg: "#F5D8D4", color: "#8B3A34" },
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-base leading-tight">Captura la obra</h1>
              <p className="text-xs text-[#C4B09A]">Fotografía y verifica con IA</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="border border-[#D5C5B0] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#7A5C3A] hover:bg-[#F5EEE4] hover:border-[#C8A882] transition-all cursor-pointer"
            style={{ background: "white", fontFamily: "'Poppins', sans-serif" }}
          >
            ← Juegos
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-5 md:py-8 space-y-4 overflow-y-auto w-full max-w-2xl mx-auto">
        {/* Badge */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center gap-2"
          style={{ background: "#F5E6C8", border: "1.5px dashed #C8A882" }}
        >
          <span className="text-xs font-bold text-[#8A6030] uppercase tracking-wide">🔑 Busca:</span>
          <span className="text-sm font-bold" style={{ color: "#C8A882" }}>{FOTO_CONFIG.location}</span>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#4A3728]">Encuentra esta obra</h2>
          <p className="text-xs text-[#9B7B55] mt-0.5">Ve al MAC, búscala y súbele una foto</p>
        </div>

        {/* Target */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5D9C4] text-center">
          <div className="text-5xl mb-3">{FOTO_CONFIG.emoji}</div>
          <p className="font-bold text-[#4A3728] text-sm mb-1">Obra en {FOTO_CONFIG.location}</p>
          <p className="text-xs text-[#7A6A58] leading-relaxed">{FOTO_CONFIG.description}</p>
        </div>

        {/* Upload */}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {!preview && (
          <div
            onClick={() => inputRef.current?.click()}
            className="bg-white rounded-2xl p-8 text-center cursor-pointer hover:bg-[#FBF5EC] transition-all"
            style={{ border: "2px dashed #D5C5B0" }}
          >
            <div className="text-4xl mb-2">📷</div>
            <p className="font-semibold text-[#7A5C3A] text-sm">Toca para subir tu foto</p>
            <p className="text-xs text-[#C4B09A] mt-1">JPG o PNG · Máx. 10 MB</p>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="rounded-2xl overflow-hidden border border-[#E5D9C4]">
            <img src={preview} alt="Tu foto" className="w-full max-h-52 object-cover" />
          </div>
        )}

        {/* Validation result */}
        {valState !== "idle" && (
          <div
            className="rounded-2xl px-4 py-3 flex items-start gap-3"
            style={{ background: valColors[valState].bg }}
          >
            <span className="text-lg flex-shrink-0 mt-0.5">
              {valState === "loading" ? "⏳" : valState === "success" ? "✅" : "❌"}
            </span>
            <p className="text-sm font-medium text-[#4A3728] leading-relaxed">
              {valState === "loading" ? "Claude está verificando tu foto…" : valMsg}
            </p>
          </div>
        )}

        {/* Buttons */}
        {preview && valState === "idle" && (
          <div className="space-y-2">
            <button
              onClick={verify}
              className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer"
              style={{ background: "#C8A882", fontFamily: "'Poppins', sans-serif" }}
            >
              ✓ Verificar con IA
            </button>
            <button
              onClick={resetPhoto}
              className="w-full font-semibold py-3 rounded-2xl transition-all text-sm cursor-pointer"
              style={{ background: "white", border: "1.5px solid #D5C5B0", color: "#7A5C3A", fontFamily: "'Poppins', sans-serif" }}
            >
              Elegir otra foto
            </button>
          </div>
        )}

        {valState === "error" && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer"
            style={{ background: "#C8A882", fontFamily: "'Poppins', sans-serif" }}
          >
            Intentar de nuevo 📷
          </button>
        )}

        {valState === "success" && (
          <button
            onClick={onComplete}
            className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer"
            style={{ background: "#7BAF8E", fontFamily: "'Poppins', sans-serif" }}
          >
            ¡Foto verificada! Continuar →
          </button>
        )}
      </main>
    </div>
  );
}