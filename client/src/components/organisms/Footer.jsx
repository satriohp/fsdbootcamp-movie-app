import { ChevronRight } from "lucide-react";

export default function Footer() {
  const genreList = [
    "Aksi", "Anak-anak", "Anime", "Britania", 
    "Drama", "Fantasi Ilmiah & Fantasi", "Kejahatan", "KDrama",
    "Komedi", "Petualangan", "Perang", "Romantis", "Sains & Alam", "Thriller"
  ];

  const bantuanList = ["FAQ", "Kontak Kami", "Privasi", "Syarat & Ketentuan"];

  return (
    <footer className="bg-[#0F0F0F] px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto">
        
        <div className="hidden md:grid md:grid-cols-4 gap-8 lg:gap-10 mb-10 lg:mb-12">
          <div>
            <h4 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-white">Genre</h4>
            <ul className="space-y-2 text-xs lg:text-sm text-gray-400">
              {genreList.slice(0, 4).map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 opacity-0 select-none">-</h4>
            <ul className="space-y-2 text-xs lg:text-sm text-gray-400">
              {genreList.slice(4, 8).map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 opacity-0 select-none">-</h4>
            <ul className="space-y-2 text-xs lg:text-sm text-gray-400">
              {genreList.slice(8).map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-white">Bantuan</h4>
            <ul className="space-y-2 text-xs lg:text-sm text-gray-400">
              {bantuanList.map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:hidden space-y-3 mb-8">
          <details className="bg-[#1A1A1A] rounded-lg overflow-hidden group">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-white list-none">
              Genre
              <ChevronRight size={16} className="transform transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
              {genreList.map((item) => (
                <p key={item} className="hover:text-white cursor-pointer transition">{item}</p>
              ))}
            </div>
          </details>

          <details className="bg-[#1A1A1A] rounded-lg overflow-hidden group">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-white list-none">
              Bantuan
              <ChevronRight size={16} className="transform transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 space-y-2 text-xs text-gray-400">
              {bantuanList.map((item) => (
                <p key={item} className="hover:text-white cursor-pointer transition">{item}</p>
              ))}
            </div>
          </details>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4 pt-6 sm:pt-8 border-t border-white/10">
          <img src="/assets/Logo.png" alt="Chill Logo" className="h-5 sm:h-6 md:h-7" />
          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 text-center sm:text-right">
            ©2025 Chill All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}