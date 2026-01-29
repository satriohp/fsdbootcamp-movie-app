import { X, Play, Plus, Volume2 } from "lucide-react"; 

export default function MovieDetailModal({ movie, onStartWatch, onClose }) {
  if (!movie) return null;

  const isSeries = movie.type === "series";

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-[#181A1C] w-full max-w-3xl min-h-screen sm:min-h-0 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border-none sm:border sm:border-white/10 z-10 my-0 sm:my-8">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full text-white hover:bg-white hover:text-black transition-all"
        >
          <X size={24} className="sm:w-5 sm:h-5" />
        </button>

        <div className="relative h-72 sm:h-[400px]">
          <img 
            src={movie.src} 
            alt={movie.title} 
            className="w-full h-full object-cover object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181A1C] via-[#181A1C]/20 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 drop-shadow-lg">{movie.title}</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onStartWatch(movie)} 
                className="flex items-center gap-2 bg-[#0F1E93] hover:bg-blue-800 text-white px-8 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95"
              >
                <Play size={20} fill="currentColor" /> Mulai
              </button>
              <button className="flex items-center justify-center w-10 h-10 border border-white/50 rounded-full text-white hover:bg-white/10 transition-all">
                <Plus size={22} />
              </button>
              <button className="flex items-center justify-center w-10 h-10 border border-white/50 rounded-full text-white ml-auto hover:bg-white/10 transition-all">
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 text-xs sm:text-sm mb-6 text-gray-400">
            <span className="text-[#34D399] font-bold italic">2024</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white">{isSeries ? "10 Episode" : "2j 29m"}</span>
            <span className="border border-gray-600 px-1.5 rounded text-[10px] text-white">13+</span>
            <span className="bg-[#0F1E93]/20 text-[#0F1E93] px-2 py-0.5 rounded font-bold">HD</span>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 text-sm mb-10">
            <div className="md:col-span-2 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>{movie.description || "Belum ada deskripsi untuk film ini."}</p>
            </div>
            <div className="flex flex-col gap-3 text-xs sm:text-sm border-t border-white/5 pt-4 md:border-none md:pt-0">
              <p><span className="text-gray-500 font-medium">Cast:</span> <span className="text-gray-300">{movie.cast || "Willian, John Doe, Jane Smith"}</span></p>
              <p><span className="text-gray-500 font-medium">Genre:</span> <span className="text-gray-300">{Array.isArray(movie.genres) ? movie.genres.join(', ') : "Action, Sci-Fi"}</span></p>
            </div>
          </div>

          {isSeries ? (
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-white font-bold text-lg mb-6">Episode</h3>
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((ep) => (
                  <div 
                    key={ep} 
                    className="flex flex-row items-center gap-4 p-3 sm:p-4 bg-[#2A2C2E]/40 rounded-xl border border-white/5 hover:bg-[#2A2C2E]/80 transition-all cursor-pointer group"
                  >
                    <span className="text-gray-500 font-bold text-lg">{ep}</span>
                    <div className="w-28 h-16 sm:w-32 sm:h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={movie.src} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Play size={20} className="text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-white text-xs sm:text-sm font-bold mb-1">
                        <span className="truncate">Episode {ep}</span>
                        <span className="text-gray-400 font-normal ml-2 flex-shrink-0">30 min</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 leading-snug">
                        Terjadi konflik besar saat karakter utama mulai menyadari bahwa ada pengkhianat di antara mereka.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-white font-bold text-lg mb-6">Rekomendasi Serupa</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden border border-white/10 group cursor-pointer"
                  >
                    <img 
                      src={movie.src} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}