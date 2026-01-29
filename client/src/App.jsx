import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Series from "./components/pages/Series.jsx";
import Film from "./components/pages/Film.jsx";
import Profile from "./components/pages/Profile.jsx";
import Premium from "./components/pages/Premium.jsx"; 
import Payment from "./components/pages/Payment.jsx"; 
import PaymentDetail from "./components/pages/PaymentDetail.jsx"; 
import Login from "./components/pages/Login.jsx"; 
import Register from "./components/pages/Register.jsx"; 

export default function App() {

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
      />
      <Route path="/home" element={<Home />} /> 
      <Route path="/series" element={<Series />} />
      <Route path="/film" element={<Film />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/daftar-saya" element={<Profile />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-detail" element={<PaymentDetail />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}