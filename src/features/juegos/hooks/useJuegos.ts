// src/features/juegos/hooks/useJuegos.ts
import { useState } from "react";

export type GameKey = "wordle" | "foto" | "audio";

const INITIAL: Record<GameKey, boolean> = {
  wordle: false,
  foto: false,
  audio: false,
};

export function useJuegos() {
  const [done, setDone] = useState<Record<GameKey, boolean>>(INITIAL);

  const complete = (game: GameKey) =>
    setDone((prev) => ({ ...prev, [game]: true }));

  const reset = () => setDone(INITIAL);

  const completedCount = Object.values(done).filter(Boolean).length;
  const allDone = completedCount === 3;

  return { done, completedCount, allDone, complete, reset };
}