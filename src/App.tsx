import { useState } from "react";
import { HomePage } from "./features/home/HomePage";
import { ReservasPage } from "./features/reservas/ReservasPage";
import { JuegosHub } from "./features/juegos/JuegosHub";
import { WordleGame } from "./features/juegos/components/WordleGame";
import { FotoGame } from "./features/juegos/components/FotoGame";
import { AudioGame } from "./features/juegos/components/AudioGame";
import { PremioScreen } from "./features/juegos/components/PremioScreen";
import { BottomNav } from "./features/components/ui/BottomNav";
import { useJuegos } from "./features/juegos/hooks/useJuegos";

export type Screen = "home" | "reservas" | "juegos" | "wordle" | "foto" | "audio" | "premio";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const juegos = useJuegos();

  const goTo = (s: Screen) => setScreen(s);

  const activeTab: "home" | "reservas" | "juegos" =
    screen === "reservas" ? "reservas" : screen === "home" ? "home" : "juegos";

  const isGameScreen = ["wordle", "foto", "audio", "premio"].includes(screen);

  return (
    <div
      className="min-h-screen bg-[#FBF7F0] flex flex-col"
      style={{ fontFamily: "'Poppins', sans-serif", maxWidth: 480, margin: "0 auto" }}
    >
      <div className="flex-1 flex flex-col">

        {screen === "home" && (
          <HomePage
            completedCount={juegos.completedCount}
            allDone={juegos.allDone}
            onGoReservas={() => goTo("reservas")}
            onGoJuegos={() => goTo("juegos")}
          />
        )}

        {screen === "reservas" && <ReservasPage />}

        {screen === "juegos" && (
          <JuegosHub
            done={juegos.done}
            allDone={juegos.allDone}
            onGoWordle={() => goTo("wordle")}
            onGoFoto={() => goTo("foto")}
            onGoAudio={() => goTo("audio")}
            onGoPremio={() => goTo("premio")}
            onBack={() => goTo("home")}
          />
        )}

        {screen === "wordle" && (
          <WordleGame
            alreadyDone={juegos.done.wordle}
            onComplete={() => { juegos.complete("wordle"); goTo("juegos"); }}
            onBack={() => goTo("juegos")}
          />
        )}

        {screen === "foto" && (
          <FotoGame
            alreadyDone={juegos.done.foto}
            onComplete={() => { juegos.complete("foto"); goTo("juegos"); }}
            onBack={() => goTo("juegos")}
          />
        )}

        {screen === "audio" && (
          <AudioGame
            alreadyDone={juegos.done.audio}
            onComplete={() => { juegos.complete("audio"); goTo("juegos"); }}
            onBack={() => goTo("juegos")}
          />
        )}

        {screen === "premio" && (
          <PremioScreen onBack={() => goTo("home")} />
        )}

      </div>

      {/* Bottom nav solo en pantallas principales */}
      {!isGameScreen && (
        <BottomNav active={activeTab} onSelect={(tab) => goTo(tab)} />
      )}
    </div>
  );
}

export default App;