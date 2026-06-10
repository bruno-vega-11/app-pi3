// src/features/juegos/components/WordleGame.tsx
import { useState, useEffect, useCallback } from "react";
import { WORDLE_CONFIG } from "../data/juegos.data";

interface WordleGameProps {
  alreadyDone: boolean;
  onComplete: () => void;
  onBack: () => void;
}

type CellState = "empty" | "correct" | "present" | "absent";

interface Cell {
  letter: string;
  state: CellState;
}

const KB_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["↵","Z","X","C","V","B","N","M","⌫"],
];

const { word: WORD, maxAttempts: MAX, hints: HINTS } = WORDLE_CONFIG;

const emptyGrid = (): Cell[][] =>
  Array.from({ length: MAX }, () =>
    Array.from({ length: WORD.length }, () => ({ letter: "", state: "empty" as CellState }))
  );

const cellStyle = (state: CellState, hasLetter: boolean): React.CSSProperties => {
  if (state === "correct") return { background: "#7BAF8E", borderColor: "#7BAF8E", color: "white" };
  if (state === "present") return { background: "#C8A882", borderColor: "#C8A882", color: "white" };
  if (state === "absent")  return { background: "#BEB0A0", borderColor: "#BEB0A0", color: "white" };
  if (hasLetter) return { borderColor: "#C8A882" };
  return {};
};

const keyStyle = (state?: CellState): React.CSSProperties => {
  if (state === "correct") return { background: "#7BAF8E", color: "white" };
  if (state === "present") return { background: "#C8A882", color: "white" };
  if (state === "absent")  return { background: "#BEB0A0", color: "white" };
  return { background: "#F0E8D8", color: "#4A3728" };
};

export function WordleGame({ alreadyDone, onComplete, onBack }: WordleGameProps) {
  const [grid, setGrid] = useState<Cell[][]>(emptyGrid());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [gameOver, setGameOver] = useState(alreadyDone);
  const [won, setWon] = useState(alreadyDone);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(
    alreadyDone ? { text: "🎨 ¡Ya completaste este reto hoy!", ok: true } : null
  );
  const [keyColors, setKeyColors] = useState<Record<string, CellState>>({});

  const showMsg = (text: string, ok: boolean) => {
    setMsg({ text, ok });
    if (!ok) setTimeout(() => setMsg(null), 2500);
  };

  const submitGuess = useCallback(() => {
    const guess = currentWord;
    const result: CellState[] = Array(WORD.length).fill("absent");
    const usedTarget = Array(WORD.length).fill(false);

    // Correct pass
    for (let i = 0; i < WORD.length; i++) {
      if (guess[i] === WORD[i]) { result[i] = "correct"; usedTarget[i] = true; }
    }
    // Present pass
    for (let i = 0; i < WORD.length; i++) {
      if (result[i] === "correct") continue;
      const j = WORD.split("").findIndex((t, ti) => t === guess[i] && !usedTarget[ti]);
      if (j !== -1) { result[i] = "present"; usedTarget[j] = true; }
    }

    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      result.forEach((state, i) => { next[currentRow][i] = { letter: guess[i], state }; });
      return next;
    });

    setKeyColors((prev) => {
      const next = { ...prev };
      guess.split("").forEach((l, i) => {
        const cur = next[l];
        if (cur === "correct") return;
        if (result[i] === "correct") next[l] = "correct";
        else if (result[i] === "present") next[l] = "present";
        else if (!cur) next[l] = "absent";
      });
      return next;
    });

    if (guess === WORD) {
      setWon(true);
      setGameOver(true);
      showMsg("🎨 ¡Genial! Encontraste la obra", true);
      setTimeout(onComplete, 1600);
    } else {
      const nextRow = currentRow + 1;
      if (nextRow >= MAX) {
        setGameOver(true);
        showMsg(`Era: ${WORD} · ¡Mejor suerte mañana!`, false);
      } else {
        setCurrentRow(nextRow);
        setCurrentWord("");
      }
    }
  }, [currentWord, currentRow, onComplete]);

  const handleKey = useCallback((k: string) => {
    if (gameOver) return;
    setMsg(null);
    if (k === "⌫") {
      if (currentWord.length > 0) {
        const next = currentWord.slice(0, -1);
        setCurrentWord(next);
        setGrid((prev) => {
          const g = prev.map((r) => [...r]);
          g[currentRow][currentWord.length - 1] = { letter: "", state: "empty" };
          return g;
        });
      }
    } else if (k === "↵") {
      if (currentWord.length < WORD.length) { showMsg("Faltan letras ✍️", false); return; }
      submitGuess();
    } else if (currentWord.length < WORD.length) {
      const next = currentWord + k;
      setCurrentWord(next);
      setGrid((prev) => {
        const g = prev.map((r) => [...r]);
        g[currentRow][currentWord.length] = { letter: k, state: "empty" };
        return g;
      });
    }
  }, [gameOver, currentWord, currentRow, submitGuess]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === "ENTER") handleKey("↵");
      else if (k === "BACKSPACE") handleKey("⌫");
      else if (/^[A-Z]$/.test(k)) handleKey(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleKey]);

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔤</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-base leading-tight">Wordle del MAC</h1>
              <p className="text-xs text-[#C4B09A]">Adivina la obra · {WORD.length} letras</p>
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
        {/* Badge respuesta (demo) */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center gap-2"
          style={{ background: "#F5E6C8", border: "1.5px dashed #C8A882" }}
        >
          <span className="text-xs font-bold text-[#8A6030] uppercase tracking-wide">🔑 Respuesta demo:</span>
          <span className="text-base font-bold tracking-widest" style={{ color: "#C8A882" }}>{WORD}</span>
        </div>

        {/* Pistas */}
        <div className="bg-white rounded-2xl p-4 border border-[#E5D9C4]">
          <p className="text-[10px] font-bold text-[#C4B09A] uppercase tracking-wide mb-2">Pistas de hoy</p>
          {HINTS.map((h, i) => (
            <div key={i} className="flex gap-2 mb-1.5 text-sm text-[#5A4030] leading-relaxed">
              <span>{h.emoji}</span><span>{h.text}</span>
            </div>
          ))}
        </div>

        {/* Mensaje */}
        {msg && (
          <div
            className="rounded-2xl px-4 py-2.5 text-sm font-medium text-center"
            style={{ background: msg.ok ? "#D8ECD4" : "#F5D8D4", color: msg.ok ? "#3D6B35" : "#8B3A34" }}
          >
            {msg.text}
          </div>
        )}

        {/* Grid */}
        <div className="flex flex-col items-center gap-1.5">
          {grid.map((row, r) => (
            <div key={r} className="flex gap-1.5">
              {row.map((cell, c) => (
                <div
                  key={c}
                  className="flex items-center justify-center text-base font-bold uppercase rounded-xl border-2"
                  style={{
                    width: 44, height: 44,
                    background: "white",
                    borderColor: "#E5D9C4",
                    color: "#4A3728",
                    transition: "all 0.15s",
                    ...cellStyle(cell.state, !!cell.letter),
                  }}
                >
                  {cell.letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Teclado */}
        {!won && !gameOver && (
          <div className="space-y-1.5">
            {KB_ROWS.map((row, i) => (
              <div key={i} className="flex justify-center gap-1">
                {row.map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKey(k)}
                    className="h-10 rounded-lg font-semibold text-xs cursor-pointer border-none transition-all"
                    style={{
                      minWidth: k.length > 1 ? 46 : 28,
                      fontFamily: "'Poppins', sans-serif",
                      ...keyStyle(keyColors[k]),
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}
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
      </main>
    </div>
  );
}