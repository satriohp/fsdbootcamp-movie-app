import { useState } from "react";
import TextField from "../atoms/TextField";
import Button from "../atoms/Button";

export default function AuthForm({ buttonText, onSubmit, isRegister = false }) {
  const [formData, setFormData] = useState({
    fullname: "", 
    username: "", 
    email: "", 
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (isRegister && formData.password !== formData.confirmPassword) {
      alert("Kata sandi nggak cocok!");
      return; 
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleLocalSubmit} className="space-y-4">
      {isRegister && (
        <>
          <TextField 
            label="Nama Lengkap" id="fullname" 
            placeholder="Masukkan nama lengkap" 
            value={formData.fullname} onChange={handleChange}
          />
          <TextField 
            label="Username" id="username" 
            placeholder="Masukkan username unik" 
            value={formData.username} onChange={handleChange}
          />
        </>
      )}
      <TextField 
        label="Email" id="email" type="email"
        placeholder="Masukkan email" 
        value={formData.email} onChange={handleChange}
      />
      <TextField 
        label="Password" id="password" type="password" 
        placeholder="Masukkan kata sandi" 
        value={formData.password} onChange={handleChange}
      />
      {isRegister && (
        <TextField 
          label="Konfirmasi Kata Sandi" id="confirmPassword" type="password" 
          placeholder="Masukkan ulang kata sandi" 
          value={formData.confirmPassword} onChange={handleChange}
        />
      )}
      <Button type="submit">{buttonText}</Button>
    </form>
  );
}