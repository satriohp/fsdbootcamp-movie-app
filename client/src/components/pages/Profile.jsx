import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../templates/MainLayout";
import { Edit2 } from "lucide-react"; 
import api from "../../services/api"; 
import { fetchMoviesAction } from "../../store/redux/movieSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { items: allMovies, status } = useSelector((state) => state.movies);

  const [userData, setUserData] = useState({
    name: "Memuat...",
    email: "email@example.com",
    pass: "************"
  });

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/me');
      
      const profileData = res.data.data; 

      setUserData({
        name: profileData.fullname || profileData.username,
        email: profileData.email,
        pass: "************"
      });
    } catch (err) {
      console.error("Gagal sinkron data dengan DB:", err);
    }
  };

  fetchProfile();
}, []);

  const myWatchlist = allMovies.slice(0, 6);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#181A1C] pt-24 md:pt-32 pb-20 px-4 sm:px-10 lg:px-20 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-10">Profil Saya</h1>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-12">
            <div className="flex-1 flex flex-row items-center gap-4 md:gap-6 bg-[#2F3334]/30 p-4 rounded-2xl lg:bg-transparent lg:p-0">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img src="/assets/Avatar.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-1 bg-[#0F1E93] p-1.5 md:p-2 rounded-full border-2 border-[#181A1C] hover:scale-110 transition-transform shadow-lg">
                   <Edit2 size={12} className="md:w-4 md:h-4" />
                </button>
              </div>
              <div>
                <button className="border border-[#0F1E93] text-[#0F1E93] px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-[#0F1E93] hover:text-white transition-all">
                  Ubah Foto
                </button>
                <p className="text-[9px] md:text-[10px] text-gray-500 mt-2 italic">Maximal 2MB</p>
              </div>
            </div>

            <div className="w-full lg:w-[450px] bg-[#2F3334] p-5 md:p-6 rounded-2xl border border-white/5 flex gap-4 items-start shadow-xl">
              <div className="flex-1">
                <h3 className="font-bold text-sm md:text-lg mb-1 leading-tight text-white/90">Saat ini anda belum berlangganan</h3>
                <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed mb-4">
                  Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                </p>
                <div className="flex justify-end">
                  <button className="bg-[#181A1C]/80 text-white px-5 py-2 rounded-full text-[10px] md:text-xs font-bold hover:bg-black transition-all border border-white/5">
                    Mulai Berlangganan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-md space-y-5 md:space-y-6 mb-16">
            <div className="space-y-2">
              <label className="text-xs md:text-sm text-gray-400">Nama Pengguna</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full bg-[#2F3334] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
                <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm text-gray-400">Email</label>
              <input 
                type="email" 
                value={userData.email}
                disabled
                className="w-full bg-[#2F3334]/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm text-gray-400">Kata Sandi</label>
              <div className="relative">
                <input 
                  type="password" 
                  defaultValue={userData.pass}
                  className="w-full bg-[#2F3334] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
                <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <button className="w-full sm:w-auto bg-[#0F1E93] text-white px-10 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg active:scale-95">
              Simpan
            </button>
          </div>

          <div className="mt-12">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-lg md:text-xl font-bold">Daftar Saya</h2>
              <button className="text-[10px] md:text-sm text-gray-400 hover:text-white transition font-medium">Lihat Semua</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
              {myWatchlist.map((movie) => (
                <div key={movie.id} className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
                  <img src={movie.src} alt={movie.title} className="w-full aspect-[2/3] object-cover rounded-lg shadow-md border border-white/5" />
                  {movie.isPremium && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#0F1E93] text-[7px] md:text-[9px] text-white font-semibold px-2 md:px-3 py-1 rounded-full shadow-lg">Premium</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}