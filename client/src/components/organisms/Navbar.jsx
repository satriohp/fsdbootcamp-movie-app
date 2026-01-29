import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { ChevronDown, Film } from "lucide-react"; 

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); 

  const activeClass = (path) => 
    location.pathname === path ? "text-white font-bold" : "text-gray-300 hover:text-white";

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#181A1C] p-4 px-4 md:px-12 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-opacity-80">
      
      <div className="flex items-center gap-4 md:gap-12">
        <Link to="/home">
          <img src="/assets/LogoIcon.png" alt="Logo" className="h-5 md:hidden" /> 
          <img src="/assets/Logo.png" alt="Chill Logo" className="h-7 hidden md:block" /> 
        </Link>
        
        <nav className="flex space-x-4 md:space-x-8 text-[11px] md:text-sm font-medium pt-1">
          <Link to="/home" className={`transition ${activeClass("/home")}`}>Beranda</Link>
          <Link to="/series" className={`transition ${activeClass("/series")}`}>Series</Link>
          <Link to="/film" className={`transition ${activeClass("/film")}`}>Film</Link>
          <Link to="/daftar-saya" className={`transition ${activeClass("/daftar-saya")}`}>Daftar Saya</Link>
        </nav>
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-1 md:gap-2 group cursor-pointer focus:outline-none"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-white/40 transition-all">
            <img src="/assets/Avatar.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <ChevronDown 
            size={14} 
            className={`text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isDropdownOpen && (
          <>
            <div className="absolute right-0 mt-3 bg-[#181A1C] rounded-xl py-2 w-48 shadow-2xl border border-white/10 overflow-hidden z-[110]">
              
              <Link 
                to="/profile" 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition group"
                onClick={() => setDropdownOpen(false)} 
              >
                <img src="/assets/account.png" alt="Profile" className="w-4 h-4" />
                <span className="text-sm">Profil Saya</span>
              </Link>
              
              <Link 
                to="/home" 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition group"
                onClick={() => setDropdownOpen(false)} 
              >
                <Film size={16} className="text-gray-400 group-hover:text-white" />
                <span className="text-sm">Kelola Film</span>
              </Link>

              <Link 
                to="/premium" 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition group"
                onClick={() => setDropdownOpen(false)}
              >
                <img src="/assets/Vector1.png" alt="Premium" className="w-4 h-4" />
                <span className="text-sm">Ubah Premium</span>
              </Link>
              
              <div className="my-1 border-t border-white/10 mx-2"></div>
              
              <Link 
                to="/login" 
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 transition font-medium group"
                onClick={() => setDropdownOpen(false)}
              >
                <img src="/assets/Vector.png" alt="Logout" className="w-4 h-4" />
                <span className="text-sm">Keluar</span>
              </Link>
            </div>

            <div className="fixed inset-0 z-[105]" onClick={() => setDropdownOpen(false)}></div>
          </>
        )}
      </div>
    </header>
  );
}