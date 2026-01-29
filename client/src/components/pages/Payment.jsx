import { useState } from "react";
import { Check } from "lucide-react";
import MainLayout from "../templates/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.plan;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [voucherCode, setVoucherCode] = useState("");

  if (!selectedPlan) {
    navigate("/premium");
    return null;
  }

  const adminFee = 3000;
  const totalPayment = selectedPlan.numericPrice + adminFee;

  const handlePayment = () => {
    const paymentData = {
      plan: selectedPlan,
      paymentMethod: paymentMethod,
      voucher: voucherCode,
      adminFee: adminFee,
      totalPayment: totalPayment
    };

    navigate("/payment-detail", { state: { paymentData } });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#181A1C] text-white">
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12">
              Ringkasan Pembayaran
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-b from-[#3b5cd8] to-[#2d47a8] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 sticky top-24">
                  <div className="inline-block bg-black/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold">
                      {selectedPlan.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm mb-1">
                    {selectedPlan.price}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 mb-6 sm:mb-8">
                    {selectedPlan.duration}
                  </p>

                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {selectedPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 sm:gap-3">
                        <Check size={16} className="flex-shrink-0 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                        <span className="text-xs sm:text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-white text-[#2d47a8] py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-gray-100 transition-all active:scale-95 shadow-lg mb-2 sm:mb-3">
                    Langganan
                  </button>

                  <p className="text-center text-[9px] sm:text-[10px] text-white/70">
                    Syarat dan Ketentuan Berlaku
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <div>

                  <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
                    Metode Pembayaran
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="bg-[#22252A] border-2 border-transparent peer-checked:border-blue-600 rounded-xl p-4 sm:p-5 cursor-pointer transition-all hover:border-gray-600">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
                            {paymentMethod === "card" && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/assets/visa-logo.png" alt="Visa" className="h-4" />
                            <img src="/assets/mastercard-logo.png" alt="Mastercard" className="h-4" />
                            <img src="/assets/jcb-logo.png" alt="JCB" className="h-4" />
                            <img src="/assets/amex-logo.png" alt="Amex" className="h-4" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-300">
                          Kartu Debit/Kredit
                        </p>
                      </div>
                    </label>

                    <label className="relative">
                      <input
                        type="radio"
                        name="payment"
                        value="bca"
                        checked={paymentMethod === "bca"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="bg-[#22252A] border-2 border-transparent peer-checked:border-blue-600 rounded-xl p-4 sm:p-5 cursor-pointer transition-all hover:border-gray-600">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
                            {paymentMethod === "bca" && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <img src="/assets/bca-logo.png" alt="BCA" className="h-5" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-300">
                          BCA Virtual Account
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
                    Kode Voucher (Jika ada)
                  </h2>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Masukkan kode voucher"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="flex-1 bg-[#22252A] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                    />
                    <button className="bg-[#22252A] hover:bg-[#2a2d33] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95">
                      Gunakan
                    </button>
                  </div>
                </div>

                <div className="bg-[#22252A] rounded-xl p-5 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 sm:mb-6">
                    Ringkasan Transaksi
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-400">Paket Premium {selectedPlan.name}</span>
                      <span className="font-semibold">Rp{selectedPlan.numericPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-400">Biaya Admin</span>
                      <span className="font-semibold">Rp{adminFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 sm:pt-4"></div>
                    <div className="flex justify-between items-center text-base sm:text-lg md:text-xl">
                      <span className="font-bold">Total Pembayaran</span>
                      <span className="font-bold text-white">Rp{totalPayment.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 shadow-lg"
                  >
                    Bayar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}