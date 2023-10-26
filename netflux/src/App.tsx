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
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
