import { useState } from "react";
import { AHORCADO_CONFIG } from "../data/juegos.data";
import { checkAnswer } from "../utils/answer.utils";

interface AhorcadoGameProps {
  alreadyDone: boolean;
  onComplete: () => void;
  onBack: () => void;
}

const { answer: ANSWER, maxAttempts: MAX, hints: HINTS, acceptedAnswers } = AHORCADO_CONFIG;

function BlankSquares({ phrase, reveal }: { phrase: string; reveal?: boolean }) {
  const words = phrase.split(" ");

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-3 justify-center">
      {words.map((word, wi) => (
        <div key={wi} className="flex gap-1.5">
          {word.split("").map((char, li) => (
            <div
              key={li}
              className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-[#C8A882] rounded-lg bg-white flex items-center justify-center text-sm sm:text-base font-bold text-[#4A3728]"
            >
              {reveal ? char : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function HangmanFigure({ stage }: { stage: number }) {
  const parts = [
    stage >= 1 && <circle key="head" cx="50" cy="28" r="10" stroke="#7A5C3A" strokeWidth="2.5" fill="none" />,
    stage >= 2 && <line key="body" x1="50" y1="38" x2="50" y2="62" stroke="#7A5C3A" strokeWidth="2.5" />,
    stage >= 3 && <line key="arm-l" x1="50" y1="46" x2="36" y2="56" stroke="#7A5C3A" strokeWidth="2.5" />,
    stage >= 3 && <line key="arm-r" x1="50" y1="46" x2="64" y2="56" stroke="#7A5C3A" strokeWidth="2.5" />,
    stage >= 4 && <line key="leg-l" x1="50" y1="62" x2="38" y2="78" stroke="#7A5C3A" strokeWidth="2.5" />,
    stage >= 4 && <line key="leg-r" x1="50" y1="62" x2="62" y2="78" stroke="#7A5C3A" strokeWidth="2.5" />,
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="100" height="90" viewBox="0 0 100 90" aria-hidden>
        <line x1="10" y1="85" x2="90" y2="85" stroke="#D5C5B0" strokeWidth="2.5" />
        <line x1="30" y1="85" x2="30" y2="10" stroke="#D5C5B0" strokeWidth="2.5" />
        <line x1="30" y1="10" x2="50" y2="10" stroke="#D5C5B0" strokeWidth="2.5" />
        <line x1="50" y1="10" x2="50" y2="18" stroke="#D5C5B0" strokeWidth="2.5" />
        {parts}
      </svg>
      <p className="text-xs text-[#9B7B55]">
        Fallos: {stage}/{MAX}
      </p>
    </div>
  );
}

export function AhorcadoGame({ alreadyDone, onComplete, onBack }: AhorcadoGameProps) {
  const [guess, setGuess] = useState("");
  const [failures, setFailures] = useState(0);
  const [won, setWon] = useState(alreadyDone);
  const [lost, setLost] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(
    alreadyDone ? { text: "🎨 ¡Ya completaste este reto hoy!", ok: true } : null
  );

  const gameOver = won || lost || alreadyDone;
  const remaining = MAX - failures;

  const submit = () => {
    if (gameOver || !guess.trim()) return;

    if (checkAnswer(guess, ANSWER, acceptedAnswers)) {
      setWon(true);
      setMsg({ text: "🎉 ¡Correcto! Encontraste la obra.", ok: true });
      return;
    }

    const nextFailures = failures + 1;
    setFailures(nextFailures);
    setGuess("");

    if (nextFailures >= MAX) {
      setLost(true);
      setMsg({ text: `La obra era "${ANSWER}". ¡Visítala en el MAC!`, ok: false });
    } else {
      setMsg({
        text: `Incorrecto. Te quedan ${MAX - nextFailures} intento${MAX - nextFailures !== 1 ? "s" : ""}.`,
        ok: false,
      });
      setTimeout(() => setMsg(null), 2500);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-base leading-tight">Ahorcado del MAC</h1>
              <p className="text-xs text-[#C4B09A]">
                {ANSWER.split(" ").length} palabras · {ANSWER.replace(/ /g, "").length} letras
              </p>
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

      <main className="flex-1 px-4 md:px-8 py-5 md:py-8 space-y-5 overflow-y-auto w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-4 border border-[#E5D9C4]">
          <p className="text-[10px] font-bold text-[#C4B09A] uppercase tracking-wide mb-2">Pistas — ve al MAC</p>
          {HINTS.map((h, i) => (
            <div key={i} className="flex gap-2 mb-1.5 text-sm text-[#5A4030] leading-relaxed">
              <span>{h.emoji}</span>
              <span>{h.text}</span>
            </div>
          ))}
        </div>

        <HangmanFigure stage={failures} />

        <div className="space-y-2">
          <p className="text-center text-xs text-[#9B7B55]">Nombre de la obra</p>
          <BlankSquares phrase={ANSWER} reveal={won || lost} />
        </div>

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
              placeholder="Escribe el nombre completo de la obra…"
              className="w-full px-4 py-3 bg-[#FAF5ED] border border-[#E5D9C4] rounded-2xl text-[#4A3728] placeholder-[#C4B09A] focus:outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            <button
              onClick={submit}
              disabled={!guess.trim()}
              className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer disabled:opacity-50"
              style={{ background: "#C8A882", fontFamily: "'Poppins', sans-serif" }}
            >
              Comprobar respuesta ({remaining} intento{remaining !== 1 ? "s" : ""})
            </button>
          </div>
        )}

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
