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

      const { access_token, username } = response.data;

      if (access_token) {
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify({ username }));
        
        window.location.href = "/home";
      }
    } catch (error) {
      const errorData = error.response?.data;
      let errorMessage = "Login gagal.";

      if (errorData?.errors) {
        errorMessage = errorData.errors.join(", ");
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }

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
          className="font-semibold hover:underline text-blue-400"
        >
          Daftar di sini
        </button>
      </p>
    </AuthLayout>
  );
}