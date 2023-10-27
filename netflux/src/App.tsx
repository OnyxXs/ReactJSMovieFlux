import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAndlogin from "./pages/login/registerAndLogin";
import Login from "./pages/login/registerAndLogin"; // Assurez-vous d'importer le bon composant pour la page de connexion
import HomeScreen from "./pages/home/home";
import UserProfile from "./pages/profile/profile";
import ForgotPassword from "./pages/login/forgotPassword";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<RegisterAndlogin />} />
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reset" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
