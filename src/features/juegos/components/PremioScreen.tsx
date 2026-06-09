import { useEffect, useRef, useState } from "react";
import { PREMIOS } from "../data/juegos.data";

interface PremioScreenProps {
  onBack: () => void;
}

export function PremioScreen({ onBack }: PremioScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);
  const [spun, setSpun] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<(typeof PREMIOS)[0] | null>(null);
  const [code] = useState("MAC" + Math.random().toString(36).substring(2, 6).toUpperCase());

  const drawRuleta = (rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const n = PREMIOS.length;
    const seg = (2 * Math.PI) / n;
    ctx.clearRect(0, 0, 240, 240);

    ctx.save();
    ctx.translate(120, 120);
    ctx.rotate(rotation);
    PREMIOS.forEach((p, i) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 116, i * seg - Math.PI / 2, (i + 1) * seg - Math.PI / 2);
      ctx.fillStyle = p.color + "CC";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * seg + seg / 2 - Math.PI / 2);
      ctx.font = "22px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.icon, 72, 0);
      ctx.restore();
    });
    ctx.restore();

    // Center dot
    ctx.beginPath();
    ctx.arc(120, 120, 16, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#C8A882";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  useEffect(() => { drawRuleta(0); }, []);

  const spin = () => {
    if (spun || spinning) return;
    setSpinning(true);
    const winIdx = Math.floor(Math.random() * PREMIOS.length);
    const n = PREMIOS.length;
    const seg = (2 * Math.PI) / n;
    const target = 5 * 2 * Math.PI + (2 * Math.PI - (winIdx * seg + seg / 2));
    const duration = 3800;
    const start = performance.now();
    const startRot = rotRef.current;

    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      const cur = startRot + target * ease;
      rotRef.current = cur;
      drawRuleta(cur);
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpun(true);
        setSpinning(false);
        setWinner(PREMIOS[winIdx]);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE5D8] px-4 md:px-8 py-3 md:py-4 flex items-center gap-2 sticky top-0 z-10">
        <span className="text-xl">🏆</span>
        <div>
          <h1 className="font-bold text-[#4A3728] text-base leading-tight">¡Premio!</h1>
          <p className="text-xs text-[#C4B09A]">Te lo ganaste</p>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 overflow-y-auto w-full max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          {/* Confetti */}
          <div className="text-5xl" style={{ animation: "bob 0.7s ease-in-out infinite alternate" }}>🎉</div>
          <style>{`@keyframes bob { to { transform: translateY(-8px); } }`}</style>

          <div>
            <h2 className="text-2xl font-bold text-[#4A3728]">¡Completaste el reto!</h2>
            <p className="text-sm text-[#9B7B55] mt-1">
              {spun ? "¡Aquí está tu premio!" : "Gira la ruleta para descubrir tu premio"}
            </p>
          </div>

          {/* Ruleta */}
          <div className="relative w-60 h-60 mx-auto">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl z-10 drop-shadow">▼</div>
            <canvas
              ref={canvasRef}
              width={240}
              height={240}
              onClick={spin}
              className="rounded-full border-4 border-[#C8A882] cursor-pointer block"
              style={{ boxShadow: "0 4px 20px rgba(200,168,130,0.25)" }}
            />
          </div>

          <button
            onClick={spin}
            disabled={spun || spinning}
            className="w-full bg-[#C8A882] hover:bg-[#B8956E] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all text-base"
          >
            {spinning ? "Girando…" : spun ? "¡Premio girado!" : "🎰 ¡Girar la ruleta!"}
          </button>

          {/* Winner card */}
          {winner && (
            <div
              className="bg-white rounded-2xl p-5 border-2 border-[#C8A882] text-center space-y-2"
              style={{ animation: "fadeUp 0.4s ease" }}
            >
              <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }`}</style>
              <div className="text-5xl">{winner.icon}</div>
              <p className="text-xl font-bold text-[#4A3728]">{winner.name}</p>
              <p className="text-sm text-[#9B7B55]">{winner.desc}</p>
              <div className="inline-block bg-[#FBF5EC] border border-dashed border-[#D5C5B0] rounded-xl px-5 py-2 text-xl font-bold text-[#C8A882] tracking-widest">
                {code}
              </div>
              <p className="text-xs text-[#C4B09A]">Muestra este código en la recepción del MAC</p>
              <button
                onClick={onBack}
                className="w-full bg-[#7BAF8E] hover:bg-[#5A9A78] text-white font-bold py-3.5 rounded-2xl transition-all text-sm mt-2"
              >
                🏠 Volver al inicio
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}