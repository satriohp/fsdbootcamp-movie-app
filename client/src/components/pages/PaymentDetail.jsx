import { Check, Copy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../templates/MainLayout";

export default function PaymentInstruction() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state?.paymentData;

  const [timeLeft, setTimeLeft] = useState(898);

  useEffect(() => {
    if (!paymentData) {
      navigate("/premium");
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentData, navigate]);

  if (!paymentData) return null;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return {
      min: String(m).padStart(2, "0"),
      sec: String(s).padStart(2, "0"),
    };
  };

  const { min, sec } = formatTime(timeLeft);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#181A1C] text-white pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-8 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-[#22252A] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-center border border-gray-800">
            <p className="text-gray-400 text-[11px] sm:text-sm mb-3 sm:mb-4">Lakukan Pembayaran Sebelum</p>
            <div className="flex justify-center items-center gap-2 sm:gap-4">
              <div className="bg-[#2F3339] rounded-lg px-3 py-2 sm:px-4 sm:py-2 min-w-[50px] sm:min-w-[64px]">
                <span className="text-lg sm:text-2xl font-bold">00</span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase">Jam</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold">:</span>
              <div className="bg-[#2F3339] rounded-lg px-3 py-2 sm:px-4 sm:py-2 min-w-[50px] sm:min-w-[64px]">
                <span className="text-lg sm:text-2xl font-bold">{min}</span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase">Menit</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold">:</span>
              <div className="bg-[#2F3339] rounded-lg px-3 py-2 sm:px-4 sm:py-2 min-w-[50px] sm:min-w-[64px]">
                <span className="text-lg sm:text-2xl font-bold">{sec}</span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase">Detik</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-gradient-to-br from-[#1E3AB1] to-[#0D1C80] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center sm:text-left">
                <div className="inline-block bg-[#333333] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                  {paymentData?.plan?.name || "Individual"}
                </div>
                <div className="mb-6">
                  <p className="text-xs sm:text-sm text-blue-100 mb-1">Mulai dari</p>
                  <p className="text-xl sm:text-2xl font-bold">Rp{paymentData?.plan?.numericPrice?.toLocaleString('id-ID')}/bulan</p>
                  <p className="text-[10px] sm:text-xs text-blue-200 mt-1">1 Akun</p>
                </div>
                
                <div className="border-t border-white/10 my-6 sm:hidden"></div>

                <ul className="space-y-4 mb-8">
                  {paymentData?.plan?.features?.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs sm:text-sm justify-center sm:justify-start">
                      <Check size={16} className="text-white shrink-0" strokeWidth={3} />
                      <span className="text-blue-50">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-3 bg-white text-[#0D1C80] font-bold rounded-full text-sm hover:bg-gray-100 transition-all active:scale-95">
                  Langganan
                </button>
                <p className="text-[9px] text-center mt-3 text-blue-200 opacity-80">Syarat dan Ketentuan Berlaku</p>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="hidden lg:block text-2xl font-bold mb-8">Ringkasan Pembayaran</h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="border border-gray-700 rounded-xl p-4 flex justify-between items-center bg-transparent">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                      <img src="/assets/bca-logo.png" alt="BCA" className="h-3 sm:h-4" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight">BCA Virtual Account</span>
                  </div>
                  <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">Tanggal Pembelian</span>
                    <span className="font-medium text-gray-400">08 Juni 2023</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm items-center">
                    <span className="text-gray-400">Kode Pembayaran</span>
                    <div className="flex items-center gap-2 text-blue-500">
                      <span className="font-bold tracking-wider">3KDJ5XFOV</span>
                      <Copy size={16} className="cursor-pointer active:scale-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-300">Ringkasan Transaksi</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-400 font-medium">Paket Premium Individual</span>
                      <span className="text-gray-400">Rp{paymentData?.plan?.numericPrice?.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-400 font-medium">Biaya Admin</span>
                      <span className="text-gray-200">Rp{paymentData?.adminFee?.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-bold pt-2">
                      <span className="text-gray-300">Total Pembayaran</span>
                      <span className="text-white">Rp{paymentData?.totalPayment?.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-300">Tata Cara Pembayaran</h3>
                  <ol className="list-decimal list-outside ml-4 text-[12px] sm:text-[13px] text-gray-400 space-y-3 leading-relaxed">
                    <li className="pl-1">Buka aplikasi BCA Mobile Banking atau akses BCA Internet Banking.</li>
                    <li className="pl-1">Login ke akun Anda.</li>
                    <li className="pl-1">Pilih menu "Transfer" atau "Pembayaran".</li>
                    <li className="pl-1">Pilih opsi "Virtual Account" atau "Virtual Account Number".</li>
                    <li className="pl-1">Masukkan nomor virtual account dan jumlah pembayaran, lalu konfirmasikan pembayaran.</li>
                  </ol>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => navigate('/success')} 
                    className="w-full sm:w-auto bg-[#0D1C80] hover:bg-[#0a1666] px-12 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-xl"
                  >
                    Bayar
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}