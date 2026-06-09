// src/features/juegos/components/AudioGame.tsx
import { useState, useEffect, useRef } from "react";
import { AUDIO_CONFIG } from "../data/juegos.data";

interface AudioGameProps {
  alreadyDone: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export function AudioGame({ alreadyDone, onComplete, onBack }: AudioGameProps) {
  const [playing, setPlaying] = useState(false);
  const [clueIdx, setClueIdx] = useState(0);
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 24 }, () => Math.random() * 18 + 7));
  const [selected, setSelected] = useState<string | null>(alreadyDone ? AUDIO_CONFIG.correctId : null);
  const [answered, setAnswered] = useState(alreadyDone);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const clueRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const vinylRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Animate vinyl via requestAnimationFrame to avoid CSS animation class issues
  useEffect(() => {
    if (playing) {
      const spin = () => {
        rotationRef.current = (rotationRef.current + 1.2) % 360;
        if (vinylRef.current) {
          vinylRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        }
        rafRef.current = requestAnimationFrame(spin);
      };
      rafRef.current = requestAnimationFrame(spin);

      tickRef.current = setInterval(() => {
        setBars(Array.from({ length: 24 }, () => Math.random() * 22 + 6));
      }, 110);

      clueRef.current = setInterval(() => {
        setClueIdx((i) => Math.min(i + 1, AUDIO_CONFIG.clues.length - 1));
      }, 2500);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      if (clueRef.current) clearInterval(clueRef.current);
      setBars(Array.from({ length: 24 }, () => Math.random() * 18 + 7));
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      if (clueRef.current) clearInterval(clueRef.current);
    };
  }, [playing]);

  const pick = (id: string) => {
    if (answered) return;
    setSelected(id);
    setAnswered(true);
    if (id !== AUDIO_CONFIG.correctId) {
      setTimeout(onComplete, 2200);
    }
  };

  const isCorrect = selected === AUDIO_CONFIG.correctId;
  const correctOption = AUDIO_CONFIG.options.find((o) => o.id === AUDIO_CONFIG.correctId);

  const optBorder = (id: string): string => {
    if (!answered) return "#E5D9C4";
    if (id === AUDIO_CONFIG.correctId) return "#7BAF8E";
    if (id === selected) return "#D4756E";
    return "#E5D9C4";
  };
  const optBg = (id: string): string => {
    if (!answered) return "white";
    if (id === AUDIO_CONFIG.correctId) return "#D8ECD4";
    if (id === selected) return "#F5D8D4";
    return "white";
  };
  const optColor = (id: string): string => {
    if (!answered) return "#4A3728";
    if (id === AUDIO_CONFIG.correctId) return "#3D6B35";
    if (id === selected) return "#8B3A34";
    return "#9B9185";
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#FBF7F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎵</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-base leading-tight">Escucha y adivina</h1>
              <p className="text-xs text-[#C4B09A]">Identifica la obra</p>
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

      <main className="flex-1 px-4 py-5 space-y-4 overflow-y-auto">
        {/* Badge */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center gap-2 flex-wrap"
          style={{ background: "#F5E6C8", border: "1.5px dashed #C8A882" }}
        >
          <span className="text-xs font-bold text-[#8A6030] uppercase tracking-wide">🔑 Respuesta demo:</span>
          <span className="text-sm font-bold" style={{ color: "#C8A882" }}>
            {correctOption?.label} · {correctOption?.sublabel}
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#4A3728]">¿De qué obra hablan?</h2>
          <p className="text-xs text-[#9B7B55] mt-0.5">Escucha la descripción del curador y adivina</p>
        </div>

        {/* Player */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5D9C4] text-center">
          {/* Vinyl */}
          <div
            ref={vinylRef}
            onClick={() => setPlaying((p) => !p)}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer"
            style={{ background: "#4A3728", boxShadow: playing ? "0 0 0 8px #F5E6C8" : "none", transition: "box-shadow 0.3s" }}
          >
            <div className="w-7 h-7 rounded-full" style={{ background: "#C8A882" }} />
          </div>

          {/* Waveform */}
          <div className="flex items-center gap-0.5 justify-center mb-3" style={{ height: 36 }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="rounded-sm transition-all"
                style={{ width: 4, height: h, background: playing ? "#C8A882" : "#D5C5B0", transitionDuration: "0.1s" }}
              />
            ))}
          </div>

          <p className="text-xs text-[#9B7B55] mb-1">
            {playing ? "▐▐ Reproduciendo…" : "Toca el disco para escuchar"}
          </p>
          <p className="text-sm font-semibold text-[#4A3728]" style={{ fontStyle: "italic" }}>
            {AUDIO_CONFIG.clues[clueIdx]}
          </p>
        </div>

        {/* Message */}
        {answered && (
          <div
            className="rounded-2xl px-4 py-2.5 text-sm font-medium text-center"
            style={{ background: isCorrect ? "#D8ECD4" : "#F5D8D4", color: isCorrect ? "#3D6B35" : "#8B3A34" }}
          >
            {isCorrect
              ? `🎉 ¡Correcto! Es "${correctOption?.label}"`
              : `❌ Era "${correctOption?.label}" · ¡La próxima la tienes!`}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-2.5">
          {AUDIO_CONFIG.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => pick(opt.id)}
              disabled={answered}
              className="rounded-2xl p-3.5 text-center font-semibold text-xs leading-snug transition-all cursor-pointer border-2"
              style={{
                background: optBg(opt.id),
                borderColor: optBorder(opt.id),
                color: optColor(opt.id),
                fontFamily: "'Poppins', sans-serif",
                opacity: answered && opt.id !== AUDIO_CONFIG.correctId && opt.id !== selected ? 0.5 : 1,
              }}
            >
              <span className="block">{opt.label}</span>
              <span className="block text-[10px] font-normal mt-0.5 opacity-70">{opt.sublabel}</span>
            </button>
          ))}
        </div>

        {answered && isCorrect && (
          <button
            onClick={onComplete}
            className="w-full text-white font-bold py-3.5 rounded-2xl transition-all text-sm border-none cursor-pointer"
            style={{ background: "#7BAF8E", fontFamily: "'Poppins', sans-serif" }}
          >
            ¡Correcto! Continuar →
          </button>
        )}
      </main>
    </div>
  );
}