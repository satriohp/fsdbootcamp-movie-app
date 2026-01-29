import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../templates/MainLayout";
import Footer from "../organisms/Footer";

export default function Premium() {
  const navigate = useNavigate();

  const benefits = [
    {
      iconSrc: "/assets/VectorD.png", 
      label: "Download Konten\nPilihan"
    },
    {
      iconSrc: "/assets/VectorA.png", 
      label: "Tidak Ada Iklan"
    },
    {
      iconSrc: "/assets/VectorF.png", 
      label: "Tonton Semua Konten"
    },
    {
      iconSrc: "/assets/VectorE.png",
      label: "Kualitas Maksimal\nSampai Dengan 4K"
    },
    {
      iconSrc: "/assets/VectorC.png",
      label: "Tonton di Tv, Tablet,\nMobile, dan Laptop"
    },
    {
      iconSrc: "/assets/VectorB.png",
      label: "Subtitle Untuk Konten\nPilihan"
    }
  ];

  const plans = [
    {
      name: "Individual",
      price: "Mulai dari Rp49.990/bulan",
      numericPrice: 49000,
      duration: "1 Akun",
      features: [
        "Tidak ada iklan",
        "Kualitas 720p",
        "Download konten pilihan"
      ]
    },
    {
      name: "Berdua",
      price: "Mulai dari Rp79.990/bulan",
      numericPrice: 79000,
      duration: "2 Akun",
      features: [
        "Tidak ada iklan",
        "Kualitas 1080p",
        "Download konten pilihan"
      ]
    },
    {
      name: "Keluarga",
      price: "Mulai dari Rp159.990/bulan",
      numericPrice: 159000,
      duration: "5-7 Akun",
      features: [
        "Tidak ada iklan",
        "Kualitas 4K",
        "Download konten pilihan"
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#181A1C] text-white">
        
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-normal mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              Kenapa Harus Berlangganan?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 md:gap-x-12 md:gap-y-12 lg:gap-x-16 lg:gap-y-14 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center gap-2.5 sm:gap-3 md:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#22252A] rounded-full text-white">
                    <img 
                      src={benefit.iconSrc} 
                      alt={benefit.label.replace('\n', ' ')}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
                    />
                  </div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-center whitespace-pre-line leading-tight sm:leading-snug text-gray-300">
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1.5 sm:mb-2 md:mb-3">
                Pilih Paketmu
              </h2>
              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-400">
                Temukan paket sesuai kebutuhanmu!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 max-w-xs sm:max-w-none mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-b from-[#3b5cd8] to-[#2d47a8] shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="inline-block bg-black/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 md:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm lg:text-base mb-0.5 sm:mb-1">
                    {plan.price}
                  </p>
                  <p className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                    {plan.duration}
                  </p>

                  <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                        <Check size={16} className="flex-shrink-0 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" strokeWidth={2.5} />
                        <span className="text-[11px] sm:text-xs md:text-sm lg:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full bg-white text-[#2d47a8] py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full font-bold text-xs sm:text-sm md:text-base hover:bg-gray-100 transition-all active:scale-95 shadow-lg mb-2 sm:mb-3"
                  >
                    Langganan
                  </button>

                  <p className="text-center text-[9px] sm:text-[10px] md:text-xs text-white/70">
                    Syarat dan Ketentuan Berlaku
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}