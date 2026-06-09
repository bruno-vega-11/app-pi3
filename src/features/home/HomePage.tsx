// src/features/home/HomePage.tsx

interface HomePageProps {
  completedCount: number;
  allDone: boolean;
  onGoReservas: () => void;
  onGoJuegos: () => void;
}

export function HomePage({ completedCount, allDone, onGoReservas, onGoJuegos }: HomePageProps) {
  const today = new Date().toLocaleDateString("es-PE", { day: "numeric", month: "long" });
  const pending = 3 - completedCount;

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE5D8] sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <div>
            <h1 className="font-bold text-[#4A3728] text-lg leading-tight">MAC UTEC</h1>
            <p className="text-xs text-[#C4B09A]">Museo de Arte Contemporáneo</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4">
        {/* Saludo */}
        <div>
          <h2 className="text-2xl font-bold text-[#4A3728]">Hola, visitante 👋</h2>
          <p className="text-sm text-[#9B7B55] mt-1">¿Qué quieres hacer hoy en el MAC?</p>
        </div>

        {/* Estado del reto diario */}
        <div className="bg-[#FBF5EC] rounded-2xl p-4 border border-[#EDE5D8]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#7A5C3A]">🎯 Reto del día</span>
            <span className="text-xs text-[#C4B09A]">{today}</span>
          </div>
          <span className="inline-block bg-[#C8A882] text-white text-xs font-bold px-3 py-1 rounded-full">
            Wordle + Foto + Audio
          </span>
          <p className="text-xs text-[#9B7B55] mt-2 leading-relaxed">
            {allDone
              ? "¡Completaste todos los retos! Reclama tu premio 🎁"
              : "Completa los 3 juegos y reclama tu premio 🎁"}
          </p>
        </div>

        {/* Tarjeta Reservas */}
        <button
          onClick={onGoReservas}
          className="w-full text-left bg-white rounded-3xl p-5 border border-[#E5D9C4] hover:border-[#C8A882] hover:shadow-lg transition-all duration-200 cursor-pointer"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div className="text-4xl mb-2">🪑</div>
          <h3 className="text-lg font-bold text-[#4A3728]">Reservar un espacio</h3>
          <p className="text-sm text-[#9B7B55] mt-1 leading-relaxed">
            Elige tu rincón favorito en el MAC para relajarte y disfrutar.
          </p>
          <span className="inline-block mt-3 bg-[#D8ECD4] text-[#3D6B35] text-xs font-semibold px-3 py-1 rounded-full">
            Disponible ahora
          </span>
        </button>

        {/* Tarjeta Juegos */}
        <button
          onClick={onGoJuegos}
          className="w-full text-left bg-white rounded-3xl p-5 border border-[#E5D9C4] hover:border-[#C8A882] hover:shadow-lg transition-all duration-200 cursor-pointer"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div className="text-4xl mb-2">🧩</div>
          <h3 className="text-lg font-bold text-[#4A3728]">Juego del día</h3>
          <p className="text-sm text-[#9B7B55] mt-1 leading-relaxed">
            Descubre las obras del MAC resolviendo acertijos y gana premios.
          </p>
          <span
            className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full ${
              allDone ? "bg-[#D8ECD4] text-[#3D6B35]" : "bg-[#F5E6C8] text-[#8A6030]"
            }`}
          >
            {allDone
              ? "¡Completo! 🎉"
              : `${pending} reto${pending !== 1 ? "s" : ""} pendiente${pending !== 1 ? "s" : ""}`}
          </span>
        </button>
      </main>
    </div>
  );
}