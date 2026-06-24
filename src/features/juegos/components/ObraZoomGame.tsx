import { useState } from "react";
import { OBRA_ZOOM_CONFIG } from "../data/juegos.data";
import { checkAnswer } from "../utils/answer.utils";

interface ObraZoomGameProps {
  alreadyDone: boolean;
  onComplete: () => void;
  onBack: () => void;
}

const { imageSrc, answer, acceptedAnswers, maxAttempts, focus, zoomLevels, hints } = OBRA_ZOOM_CONFIG;

function ZoomedObra({ visiblePercent }: { visiblePercent: number }) {
  const originX = focus.x * 100;
  const originY = focus.y * 100;
  const backgroundSize =
    visiblePercent >= 100 ? "contain" : `${(100 / visiblePercent) * 100}% auto`;

  return (
    <div
      role="img"
      aria-label="Fragmento de obra del MAC"
      className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border-2 border-[#E5D9C4] bg-[#FAF5ED] bg-no-repeat bg-center transition-[background-size,background-position] duration-700 ease-out"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize,
        backgroundPosition: `${originX}% ${originY}%`,
      }}
    >
      {visiblePercent < 100 && (
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded-lg">
          Vista {visiblePercent}%
        </div>
      )}
    </div>
  );
}

function ArtworkInfoCard({ won }: { won: boolean }) {
  return (
    <div className="space-y-3">
      <div
        className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={{
          background: won ? "#F0F9EE" : "#FBF5EC",
          border: `1.5px solid ${won ? "#7BAF8E" : "#D5C5B0"}`,
          color: won ? "#3D6B35" : "#5A4030",
        }}
      >
        {won ? (
          <>
            <span className="font-bold">¡Increíble ojo! 🎨</span>
            {" "}Reconociste <span className="font-semibold">"{answer}"</span>
            {OBRA_ZOOM_CONFIG.artist ? ` de ${OBRA_ZOOM_CONFIG.artist}` : ""}. Ahora que ya la conoces, encuéntrala en el MAC UTEC y obsérvala de cerca.
          </>
        ) : (
          <>
            <span className="font-bold">¡Buen intento! 💪</span>
            {" "}La obra era <span className="font-semibold">"{answer}"</span>
            {OBRA_ZOOM_CONFIG.artist ? ` de ${OBRA_ZOOM_CONFIG.artist}` : ""}. Ya la tienes grabada en la memoria — la próxima vez la identificarás enseguida. ¡Visítala en el MAC UTEC!
          </>
        )}
      </div>

      {OBRA_ZOOM_CONFIG.funFact && (
        <div className="rounded-2xl p-4 border border-[#E5D9C4]" style={{ background: "#FBF5EC" }}>
          <p className="text-xs font-bold text-[#8A6030] uppercase tracking-wide mb-2">💡 Dato curioso</p>
          <p className="text-sm text-[#4A3728] leading-relaxed">{OBRA_ZOOM_CONFIG.funFact}</p>
        </div>
      )}
    </div>
  );
}

export function ObraZoomGame({ alreadyDone, onComplete, onBack }: ObraZoomGameProps) {
  const [guess, setGuess] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [won, setWon] = useState(alreadyDone);
  const [lost, setLost] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(
    alreadyDone ? { text: "🎨 ¡Ya completaste este reto hoy!", ok: true } : null
  );

  const gameOver = won || lost || alreadyDone;
  // Reveal full image on win or lose
  const visiblePercent = (won || lost) ? 100 : zoomLevels[Math.min(wrongCount, zoomLevels.length - 1)];
  const remaining = maxAttempts - wrongCount;

  const submit = () => {
    if (gameOver || !guess.trim()) return;

    if (checkAnswer(guess, answer, acceptedAnswers)) {
      setWon(true);
      setMsg(null);
      return;
    }

    const nextWrong = wrongCount + 1;
    setWrongCount(nextWrong);
    setGuess("");

    if (nextWrong >= maxAttempts) {
      setLost(true);
      setMsg(null);
    } else {
      const nextZoom = zoomLevels[nextWrong];
      setMsg({
        text: `Incorrecto. Ahora ves más de la obra (${nextZoom}%).`,
        ok: false,
      });
      setTimeout(() => setMsg(null), 2800);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🖼️</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-base leading-tight">¿Qué obra es?</h1>
              <p className="text-xs text-[#C4B09A]">Identifica la pieza del MAC</p>
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
        <div>
          <h2 className="text-base font-bold text-[#4A3728]">¿Qué obra del MAC es esta?</h2>
          <p className="text-xs text-[#9B7B55] mt-0.5">
            Cada error aleja la cámara un poco más. Tienes {maxAttempts} intentos.
          </p>
        </div>

        {hints.length > 0 && (
          <div className="bg-[#FBF5EC] rounded-2xl p-3 border border-[#EDE5D8]">
            {hints.map((h, i) => (
              <div key={i} className="flex gap-2 text-xs text-[#7A6A58] leading-relaxed">
                <span>{h.emoji}</span>
                <span>{h.text}</span>
              </div>
            ))}
          </div>
        )}

        <ZoomedObra visiblePercent={visiblePercent} />

        {(won || lost) && OBRA_ZOOM_CONFIG.artist && (
          <p className="text-xs text-[#9B7B55] text-center font-medium -mt-2">
            {answer} · {OBRA_ZOOM_CONFIG.artist}
          </p>
        )}

        {msg && (
          <div
            className="rounded-2xl px-4 py-2.5 text-sm font-medium text-center"
            style={{ background: msg.ok ? "#D8ECD4" : "#F5D8D4", color: msg.ok ? "#3D6B35" : "#8B3A34" }}
          >
            {msg.text}
          </div>
        )}

        {!gameOver && (
          <div className="space-y-3">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Nombre de la obra…"
              className="w-full px-4 py-3 bg-[#FAF5ED] border border-[#E5D9C4] rounded-2xl text-[#4A3728] placeholder-[#C4B09A] focus:outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            <button
              onClick={submit}
              disabled={!guess.trim()}
              className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer disabled:opacity-50"
              style={{ background: "#C8A882", fontFamily: "'Poppins', sans-serif" }}
            >
              Comprobar ({remaining} intento{remaining !== 1 ? "s" : ""})
            </button>
          </div>
        )}

        {(won || lost) && <ArtworkInfoCard won={won} />}

        {won && (
          <button
            onClick={onComplete}
            className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer"
            style={{ background: "#7BAF8E", fontFamily: "'Poppins', sans-serif" }}
          >
            Continuar →
          </button>
        )}

        {lost && (
          <button
            onClick={onBack}
            className="w-full font-semibold py-3.5 rounded-2xl transition-all text-sm cursor-pointer"
            style={{ background: "white", border: "1.5px solid #D5C5B0", color: "#7A5C3A", fontFamily: "'Poppins', sans-serif" }}
          >
            Volver a juegos
          </button>
        )}
      </main>
    </div>
  );
}
