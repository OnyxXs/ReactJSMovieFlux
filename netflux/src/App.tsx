import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAndlogin from "./pages/login/registerAndLogin";
import HomeScreen from "./home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<RegisterAndlogin />} />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
