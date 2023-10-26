import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAndlogin from "./pages/login/registerAndLogin";
import HomeScreen from "./pages/home/home";
import UserProfile from "./pages/profile/profile";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<RegisterAndlogin />} />
          <Route path="/home" element={<HomeScreen />} />
<<<<<<< HEAD
          <Route path="/profile" element={<UserProfile />} />
=======
          <Route path="/reset" element={<ForgotPassword />} />
>>>>>>> dbe75a6c27b746270914142a6274f43bb144e81b
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
