// src/features/juegos/JuegosHub.tsx
import type { GameKey } from "./hooks/useJuegos";

interface JuegosHubProps {
  done: Record<GameKey, boolean>;
  allDone: boolean;
  onGoWordle: () => void;
  onGoFoto: () => void;
  onGoAudio: () => void;
  onGoPremio: () => void;
  onBack: () => void;
}

interface CardProps {
  iconEmoji: string;
  iconBg: string;
  name: string;
  hint: string;
  done: boolean;
  onClick: () => void;
}

function GameCard({ iconEmoji, iconBg, name, hint, done, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-[20px] px-4 py-3.5 border border-[#E5D9C4] hover:border-[#C8A882] transition-all duration-200 flex items-center gap-3 cursor-pointer"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="w-[50px] h-[50px] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: iconBg }}
      >
        {iconEmoji}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="font-semibold text-[#4A3728] text-sm">{name}</p>
        <p className="text-xs text-[#9B7B55] mt-0.5">{hint}</p>
      </div>
      <span
        className="text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
        style={{
          background: done ? "#D8ECD4" : "#F5E6C8",
          color: done ? "#3D6B35" : "#8A6030",
        }}
      >
        {done ? "✓ Listo" : "Pendiente"}
      </span>
    </button>
  );
}

export function JuegosHub({ done, allDone, onGoWordle, onGoFoto, onGoAudio, onGoPremio, onBack }: JuegosHubProps) {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-base leading-tight">Reto del Día</h1>
              <p className="text-xs text-[#C4B09A]">Obras del MAC</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="bg-white border border-[#D5C5B0] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#7A5C3A] hover:bg-[#F5EEE4] hover:border-[#C8A882] transition-all cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ← Inicio
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 space-y-4 md:space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#4A3728]">Acertijos de hoy</h2>
          <p className="text-xs md:text-sm text-[#9B7B55] mt-0.5">Completa los 3 para ganar tu premio 🏆</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <GameCard
            iconEmoji="🔤" iconBg="#F5E6C8"
            name="Wordle del MAC" hint="Adivina el nombre de la obra"
            done={done.wordle} onClick={onGoWordle}
          />
          <GameCard
            iconEmoji="📸" iconBg="#D8ECD4"
            name="Captura la obra" hint="Fotografía y verifica con IA"
            done={done.foto} onClick={onGoFoto}
          />
          <GameCard
            iconEmoji="🎵" iconBg="#E6EEF8"
            name="Escucha y adivina" hint="Identifica la obra por su descripción"
            done={done.audio} onClick={onGoAudio}
          />
        </div>

        {allDone && (
          <button
            onClick={onGoPremio}
            className="w-full md:max-w-md md:mx-auto block text-white font-bold py-3.5 rounded-2xl transition-all duration-200 text-sm cursor-pointer border-none"
            style={{ background: "#7BAF8E", fontFamily: "'Poppins', sans-serif" }}
          >
            🎁 ¡Reclamar mi premio!
          </button>
        )}
      </main>
    </div>
  );
}