import { useNavigate } from "react-router-dom";
import AuthLayout from "../templates/AuthLayout";
import AuthForm from "../molecules/AuthForm";
import api from "../../services/api"; 

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const { confirmPassword, ...dataToSubmit } = formData;
      const response = await api.post("/auth/register", dataToSubmit);

      if (response.data.success) {
        alert(`Pendaftaran Berhasil! Halo ${formData.username}, silakan login.`);
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Register Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Gagal daftar.");
    }
  };

  return (
    <AuthLayout title="Daftar" subtitle="Selamat bergabung!">
      <AuthForm onSubmit={handleRegister} buttonText="Daftar" isRegister={true} />
      <p className="text-xs text-center mt-4 opacity-80 text-white">
        Sudah punya akun?{" "}
        <button 
          type="button"
          onClick={() => navigate("/login")} 
          className="font-semibold hover:underline text-blue-400"
        >
          Masuk
        </button>
      </p>
    </AuthLayout>
  );
}