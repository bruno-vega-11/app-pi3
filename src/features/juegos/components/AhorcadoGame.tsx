import { useState } from "react";
import { AHORCADO_CONFIG } from "../data/juegos.data";

interface AhorcadoGameProps {
  alreadyDone: boolean;
  onComplete: () => void;
  onBack: () => void;
}

const { answer: ANSWER, maxAttempts: MAX, hints: HINTS } = AHORCADO_CONFIG;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function normalizeChar(char: string): string {
  const upper = char.toUpperCase();
  if (upper === "Ñ") return "Ñ";
  return upper.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

const ANSWER_LETTERS = new Set(
  ANSWER.replace(/ /g, "")
    .split("")
    .map(normalizeChar)
);

function BlankSquares({
  phrase,
  guessedLetters,
  reveal,
}: {
  phrase: string;
  guessedLetters: Set<string>;
  reveal?: boolean;
}) {
  const words = phrase.split(" ");

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-3 justify-center">
      {words.map((word, wi) => (
        <div key={wi} className="flex gap-1.5">
          {word.split("").map((char, li) => {
            const normalized = normalizeChar(char);
            const isRevealed = reveal || guessedLetters.has(normalized);
            return (
              <div
                key={li}
                className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-[#C8A882] rounded-lg bg-white flex items-center justify-center text-sm sm:text-base font-bold text-[#4A3728]"
              >
                {isRevealed ? char : ""}
              </div>
            );
          })}
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
      <p className="text-xs text-[#9B7B55]">Fallos: {stage}/{MAX}</p>
    </div>
  );
}

function Keyboard({
  guessedLetters,
  onGuess,
  disabled,
}: {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {KEYBOARD_ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = isGuessed && ANSWER_LETTERS.has(letter);
            const isWrong = isGuessed && !ANSWER_LETTERS.has(letter);

            let bg = "#FAF5ED";
            let borderColor = "#D5C5B0";
            let textColor = "#4A3728";
            let opacity: number | string = 1;

            if (isCorrect) {
              bg = "#D8ECD4";
              borderColor = "#7BAF8E";
              textColor = "#3D6B35";
            } else if (isWrong) {
              bg = "#E8E0D4";
              borderColor = "#C4B09A";
              textColor = "#B0A090";
              opacity = 0.5;
            }

            return (
              <button
                key={letter}
                onClick={() => !isGuessed && !disabled && onGuess(letter)}
                disabled={isGuessed || disabled}
                className="w-8 h-9 sm:w-9 sm:h-10 rounded-lg text-xs sm:text-sm font-bold border transition-all"
                style={{
                  background: bg,
                  borderColor,
                  color: textColor,
                  opacity,
                  cursor: isGuessed || disabled ? "default" : "pointer",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
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
            <span className="font-bold">¡Eres un experto del MAC! 🎨</span>
            {" "}Ya conoces <span className="font-semibold">"{ANSWER}"</span>. Búscala en el MAC UTEC y comprueba en persona todo lo que aprendiste hoy.
          </>
        ) : (
          <>
            <span className="font-bold">¡Buen intento! 💪</span>
            {" "}La obra era <span className="font-semibold">"{ANSWER}"</span>
            {AHORCADO_CONFIG.artist ? ` de ${AHORCADO_CONFIG.artist}` : ""}. Ya aprendiste algo nuevo hoy — la próxima vez la reconocerás de inmediato. ¡Visítala en el MAC UTEC!
          </>
        )}
      </div>

      {AHORCADO_CONFIG.artworkSrc && (
        <div className="bg-white rounded-2xl p-4 border border-[#E5D9C4] overflow-hidden">
          <img
            src={AHORCADO_CONFIG.artworkSrc}
            alt={`${ANSWER}${AHORCADO_CONFIG.artist ? ` — ${AHORCADO_CONFIG.artist}` : ""}`}
            className="w-full rounded-xl object-contain max-h-72"
          />
          {AHORCADO_CONFIG.artist && (
            <p className="text-xs text-[#9B7B55] text-center mt-2 font-medium">
              {ANSWER} · {AHORCADO_CONFIG.artist}
            </p>
          )}
        </div>
      )}

      {AHORCADO_CONFIG.funFact && (
        <div className="rounded-2xl p-4 border border-[#E5D9C4]" style={{ background: "#FBF5EC" }}>
          <p className="text-xs font-bold text-[#8A6030] uppercase tracking-wide mb-2">💡 Dato curioso</p>
          <p className="text-sm text-[#4A3728] leading-relaxed">{AHORCADO_CONFIG.funFact}</p>
        </div>
      )}
    </div>
  );
}

export function AhorcadoGame({ alreadyDone, onComplete, onBack }: AhorcadoGameProps) {
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [failures, setFailures] = useState(0);
  const [won, setWon] = useState(alreadyDone);
  const [lost, setLost] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(
    alreadyDone ? { text: "🎨 ¡Ya completaste este reto hoy!", ok: true } : null
  );

  const gameOver = won || lost || alreadyDone;

  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    const isInAnswer = ANSWER_LETTERS.has(letter);

    if (!isInAnswer) {
      const nextFailures = failures + 1;
      setFailures(nextFailures);

      if (nextFailures >= MAX) {
        setLost(true);
        setMsg(null);
      } else {
        setMsg({ text: `La letra "${letter}" no está en la obra.`, ok: false });
        setTimeout(() => setMsg(null), 2000);
      }
    } else {
      const allGuessed = [...ANSWER_LETTERS].every((l) => newGuessed.has(l));
      if (allGuessed) {
        setWon(true);
        setMsg(null);
      } else {
        setMsg({ text: `¡Bien! La letra "${letter}" está en la obra.`, ok: true });
        setTimeout(() => setMsg(null), 1500);
      }
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
          <BlankSquares phrase={ANSWER} guessedLetters={guessedLetters} reveal={won || lost} />
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
          <Keyboard
            guessedLetters={guessedLetters}
            onGuess={handleGuess}
            disabled={gameOver}
          />
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
