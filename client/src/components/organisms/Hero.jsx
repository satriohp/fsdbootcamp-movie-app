import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero({ type = "home" }) {
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const genres = [
    ["Aksi", "Anak-anak", "Anime", "Britania", "Drama", "Fantasi Ilmiah & Fantasi", "Kejahatan"],
    ["KDrama", "Komedi", "Petualangan", "Perang", "Romantis", "Sains & Alam", "Thriller"]
  ];

  return (
    <section
      className="relative min-h-screen bg-cover bg-center hero-bg flex items-end"
      style={{
        backgroundImage: 'url("/assets/movie-posters/herogambar.jpg")', 
      }}
    >
      <div className="absolute inset-0 gradient-overlay"></div>
      
      <div className="relative z-10 p-6 sm:p-8 md:p-12 w-full">
        
        {(type === "series" || type === "film") && (
          <div className="absolute top-[-300px] sm:top-[-400px] left-6 sm:left-12">
            <div className="relative">
              <button 
                type="button"
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className="flex items-center gap-2 bg-[#181A1C]/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md text-white text-sm hover:bg-[#2F3334] transition-all"
              >
                Genre <ChevronDown size={16} className={`transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isGenreOpen && (
                <div className="absolute top-full mt-2 left-0 bg-[#181A1C]/95 backdrop-blur-lg border border-white/10 p-4 rounded-lg shadow-2xl z-[110] flex gap-8 min-w-[320px]">
                  {genres.map((column, idx) => (
                    <ul key={idx} className="flex flex-col gap-2">
                      {column.map((genre) => (
                        <li key={genre} className="text-gray-400 hover:text-white cursor-pointer text-sm transition-colors">
                          {genre}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white">Avatar</h1>
        
        <p className="text-xs sm:text-sm w-full sm:w-10/12 md:w-2/3 opacity-80 mb-4 sm:mb-6 text-white">
          A paraplegic Marine dispatched to the moon Pandora on a unique
          mission becomes torn between following his orders and protecting the
          world he feels is his home.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
          <button className="bg-[#0F1E93] text-white font-semibold 
                             py-2 px-6 sm:py-2.5 sm:px-8 
                             rounded-full hover:bg-[#192DB7] transition-all active:scale-95 w-fit">
            Mulai
          </button>
          
          <button className="bg-[#2F3334]/80 text-white font-semibold 
                             py-2 px-6 sm:py-2.5 sm:px-8 
                             rounded-full border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-2 w-fit">
            <span className="text-lg">ⓘ</span> Selengkapnya
          </button>

          <span className="text-sm border border-white/40 text-white rounded-full px-4 py-1">
            18+
          </span>
        </div>
      </div>

      <button className="absolute 
                         bottom-4 right-4 sm:bottom-8 sm:right-8 
                         z-20 w-10 h-10 sm:w-12 sm:h-12 
                         rounded-full flex items-center justify-center border border-white/30 bg-[#2F3334]/80 backdrop-blur-sm transition transform hover:bg-[#5A5A5A]/90 hover:scale-105">
        <img src="/assets/Frame 65.png" alt="Mute Speaker" className="w-10 h-10 sm:w-12 sm:h-12 invert" />
      </button>
    </section>
  );
}