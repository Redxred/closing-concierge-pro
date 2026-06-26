import { ChevronDown } from "lucide-react";

export function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink/50">
      <span>Scroll</span>
      <ChevronDown className="h-4 w-4 animate-bounce-cue" />
    </div>
  );
}