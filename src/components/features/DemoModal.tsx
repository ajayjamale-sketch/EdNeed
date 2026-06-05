import { X, Play, Volume2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string;
}

export default function DemoModal({
  isOpen,
  onClose,
  title = "EdNeed Platform Walkthrough Demo",
  videoUrl = "https://www.youtube.com/embed/9X5S53kF4nE" // A high-quality educational demo overview
}: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <h3 className="font-semibold text-sm md:text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Wrapper */}
        <div className="aspect-video w-full bg-slate-950 relative">
          <iframe
            src={`${videoUrl}?autoplay=1&mute=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer info bar */}
        <div className="p-4 border-t border-border bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <span>Ensure your audio is turned on to hear the walkthrough.</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-yellow-600" />
            <span>Interactive sandbox is available post-registration.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
