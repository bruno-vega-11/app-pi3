interface Step {
  id: string;
  label: string;
  icon: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentIndex: number;
}

export function StepIndicator({ steps, currentIndex }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#C8A882] text-white shadow-sm"
                    : isCurrent
                    ? "bg-[#F5EEE4] border-2 border-[#C8A882] text-[#C8A882] shadow-sm"
                    : "bg-[#F0E8D8] text-[#C4B09A]"
                }`}
              >
                {isCompleted ? "✓" : step.icon}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isCurrent ? "text-[#7A5C3A]" : isCompleted ? "text-[#9B7B55]" : "text-[#C4B09A]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mb-5 mx-1 transition-all duration-500 ${
                  index < currentIndex ? "bg-[#C8A882]" : "bg-[#E5D9C4]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}