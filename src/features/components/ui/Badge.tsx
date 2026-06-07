interface BadgeProps {
  children: React.ReactNode;
  variant?: "warm" | "sage" | "blush" | "muted";
}

export function Badge({ children, variant = "warm" }: BadgeProps) {
  const variants = {
    warm: "bg-[#F5E6C8] text-[#8A6030]",
    sage: "bg-[#D8ECD4] text-[#3D6B35]",
    blush: "bg-[#F5D8D4] text-[#8B3A34]",
    muted: "bg-[#E8E0D4] text-[#6B5C4A]",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}