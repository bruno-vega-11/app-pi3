type Tab = "home" | "reservas" | "juegos";

interface BottomNavProps {
  active: Tab;
  onSelect: (tab: Tab) => void;
  variant?: "bottom" | "sidebar";
}

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "🏠", label: "Inicio" },
  { id: "reservas", icon: "🪑", label: "Reservas" },
  { id: "juegos", icon: "🧩", label: "Juegos" },
];

function TabButton({
  tab,
  isActive,
  onSelect,
  layout,
}: {
  tab: (typeof TABS)[number];
  isActive: boolean;
  onSelect: (tab: Tab) => void;
  layout: "bottom" | "sidebar";
}) {
  const base =
    "transition-all duration-200 cursor-pointer border-none font-[family-name:var(--font-poppins,'Poppins',sans-serif)]";

  if (layout === "sidebar") {
    return (
      <button
        key={tab.id}
        onClick={() => onSelect(tab.id)}
        className={`${base} w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left ${
          isActive ? "bg-[#FBF5EC] text-[#C8A882]" : "bg-transparent text-[#7A5C3A] hover:bg-[#FBF5EC]/60"
        }`}
      >
        <span className="text-xl">{tab.icon}</span>
        <span className={`text-sm font-semibold ${isActive ? "text-[#C8A882]" : "text-[#7A5C3A]"}`}>
          {tab.label}
        </span>
      </button>
    );
  }

  return (
    <button
      key={tab.id}
      onClick={() => onSelect(tab.id)}
      className={`${base} flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl ${
        isActive ? "bg-[#FBF5EC]" : "bg-transparent"
      }`}
    >
      <span className="text-xl">{tab.icon}</span>
      <span className={`text-[10px] font-semibold ${isActive ? "text-[#C8A882]" : "text-[#C4B09A]"}`}>
        {tab.label}
      </span>
    </button>
  );
}

export function BottomNav({ active, onSelect, variant = "bottom" }: BottomNavProps) {
  if (variant === "sidebar") {
    return (
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-white border-r border-[#EDE5D8] sticky top-0 h-screen">
        <div className="px-6 py-5 border-b border-[#EDE5D8]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <h1 className="font-bold text-[#4A3728] text-lg leading-tight">MAC UTEC</h1>
              <p className="text-xs text-[#C4B09A]">Museo de Arte Contemporáneo</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4">
          {TABS.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={active === tab.id}
              onSelect={onSelect}
              layout="sidebar"
            />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="lg:hidden bg-white border-t border-[#EDE5D8] flex justify-around items-center px-4 pt-2 pb-4 sticky bottom-0 z-10">
      {TABS.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={active === tab.id}
          onSelect={onSelect}
          layout="bottom"
        />
      ))}
    </nav>
  );
}
