import { useNavigate } from "react-router-dom";
import AuthLayout from "../templates/AuthLayout";
import AuthForm from "../molecules/AuthForm";
import GoogleButton from "../organisms/GoogleButton";
import api from "../../services/api"; 

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password
      };

      const response = await api.post("/auth/login", payload);

      const { success, data } = response.data;

      if (success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        navigate("/home", { replace: true });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login gagal, silakan cek kredensial lo.";
      console.error("Login Error:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <AuthLayout title="Masuk" subtitle="Selamat datang kembali!">
      <AuthForm onSubmit={handleSubmit} buttonText="Masuk" />
      <GoogleButton />
      <p className="text-xs text-center mt-4 opacity-80">
        Belum punya akun?{" "}
        <button 
          onClick={() => navigate("/register")} 
          className="font-semibold hover:underline"
        >
          Daftar
        </button>
      </p>
    </AuthLayout>
  );
}