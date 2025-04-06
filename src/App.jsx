import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home";
import AboutUs from "./Components/Pages/AboutUs";
import Architecture from "./Components/Pages/Architecture/Architecture";
import Interior from "./Components/Pages/Interior/Interior";
import Contact from "./Components/Pages/Contact";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Admin/Login";
import AdminConsole from "./Components/Admin/AdminConsole";

const App = () => {
  return (
    <div class="mx-40 mt-10">
      <NavBar />
      <div class="bg-gray-400 h-0.5"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/interior" element={<Interior />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-console/*" element={<AdminConsole />} />
      </Routes>
      {/* <Home /> */}
    </div>
  );
};

export default App;
