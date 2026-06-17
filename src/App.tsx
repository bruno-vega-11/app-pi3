import { useState } from "react";
import { HomePage } from "./features/home/HomePage";
import { ReservasPage } from "./features/reservas/ReservasPage";
import { JuegosHub } from "./features/juegos/JuegosHub";
import { AhorcadoGame } from "./features/juegos/components/AhorcadoGame";
import { ObraZoomGame } from "./features/juegos/components/ObraZoomGame";
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
      className="min-h-screen bg-[#F0E8DC]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex min-h-screen">
        {!isGameScreen && (
          <BottomNav variant="sidebar" active={activeTab} onSelect={(tab) => goTo(tab)} />
        )}

        <div className="flex-1 flex flex-col min-h-screen bg-[#FBF7F0] min-w-0">
          <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto">
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
              <AhorcadoGame
                alreadyDone={juegos.done.wordle}
                onComplete={() => {
                  juegos.complete("wordle");
                  goTo("juegos");
                }}
                onBack={() => goTo("juegos")}
              />
            )}

            {screen === "foto" && (
              <ObraZoomGame
                alreadyDone={juegos.done.foto}
                onComplete={() => {
                  juegos.complete("foto");
                  goTo("juegos");
                }}
                onBack={() => goTo("juegos")}
              />
            )}

            {screen === "audio" && (
              <AudioGame
                alreadyDone={juegos.done.audio}
                onComplete={() => {
                  juegos.complete("audio");
                  goTo("juegos");
                }}
                onBack={() => goTo("juegos")}
              />
            )}

            {screen === "premio" && <PremioScreen onBack={() => goTo("home")} />}
          </div>

          {!isGameScreen && (
            <BottomNav variant="bottom" active={activeTab} onSelect={(tab) => goTo(tab)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
