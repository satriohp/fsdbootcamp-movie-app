import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  Maximize, 
  List, 
  MessageSquare,
  Gauge,
  SkipForward
} from "lucide-react";

export default function VideoPlayer({ movie, onBack }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col font-sans select-none overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-30">
        <button 
          onClick={onBack}
          className="text-white hover:opacity-80 transition-all active:scale-90"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <img 
          src={movie.src} 
          className="w-full h-full object-cover" 
          alt="video-content" 
        />
        
        <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10">
          <button className="text-white hover:opacity-80 transition-opacity">
            <RotateCcw size={32} />
          </button>
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/40 rounded-full cursor-pointer hover:bg-white/20 transition-all">
            <Pause size={32} sm:size={40} fill="white" className="text-white" />
          </div>

          <button className="text-white hover:opacity-80 transition-opacity">
            <RotateCw size={32} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-6 md:right-8 z-50">
        <button className="bg-white text-gray-600 text-xs sm:text-sm font-medium px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full hover:bg-gray-50 transition-all shadow-lg active:scale-95">
          Lewati Intro
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-5 pt-5 z-30 bg-black/60 text-white flex flex-col justify-center">
        
        <div className="flex items-center justify-between relative leading-none">
          
          <div className="flex items-center gap-4 sm:gap-5 h-full">
            <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <Play size={20} fill="white" />
            </button>
            <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <RotateCcw size={20} />
            </button>
            <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <RotateCw size={20} />
            </button>
            <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <Volume2 size={20} />
            </button>
            
            <div className="text-[11px] sm:text-sm font-medium ml-1 flex items-center leading-none tracking-tight self-center">
              <span className="translate-y-[0.5px]">00:00</span>
              <span className="mx-1.5 opacity-40">/</span>
              <span className="opacity-60">45:00</span>
            </div>
          </div>

          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-xs sm:text-sm font-medium tracking-wide uppercase truncate max-w-[300px] leading-none">
              {movie.title} Episode 1
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 h-full">
            <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <SkipForward size={20} fill="white" />
            </button>
            <button className="hidden sm:block hover:opacity-80 transition-opacity flex items-center justify-center">
              <List size={20} />
            </button>
            <button className="hidden sm:block hover:opacity-80 transition-opacity flex items-center justify-center">
              <MessageSquare size={18} />
            </button>
            <button className="hidden md:block hover:opacity-80 transition-opacity flex items-center justify-center">
              <Gauge size={22} />
            </button>
            <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <Maximize size={18} />
            </button>
          </div>
        </div>

        <div className="sm:hidden text-center mt-3 leading-none">
          <h2 className="text-[10px] font-medium tracking-widest uppercase opacity-60">
            {movie.title} Episode 1
          </h2>
        </div>
      </div>
    </div>
  );
}