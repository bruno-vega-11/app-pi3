// src/features/components/ui/BottomNav.tsx

type Tab = "home" | "reservas" | "juegos";

interface BottomNavProps {
  active: Tab;
  onSelect: (tab: Tab) => void;
}

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "home",     icon: "🏠", label: "Inicio"   },
  { id: "reservas", icon: "🪑", label: "Reservas"  },
  { id: "juegos",   icon: "🧩", label: "Juegos"    },
];

export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav className="bg-white border-t border-[#EDE5D8] flex justify-around items-center px-4 pt-2 pb-4 sticky bottom-0 z-10">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer border-none ${
              isActive ? "bg-[#FBF5EC]" : "bg-transparent"
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="text-xl">{tab.icon}</span>
            <span
              className={`text-[10px] font-semibold ${
                isActive ? "text-[#C8A882]" : "text-[#C4B09A]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}