import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home";
import AboutUs from "./Components/Pages/AboutUs";
import Architecture from "./Components/Pages/Architecture/Architecture";
import Interior from "./Components/Pages/Interior/Interior";
import Contact from "./Components/Pages/Contact";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Admin/Login";
import AdminConsole from "./Components/Admin/AdminConsole";
import "./App.css";
import ProjectDetails from "./Components/Pages/ProjectDetailsPage/ProjectDetails";

const App = () => {
  const location = useLocation();
  const isAdminConsole = location.pathname.startsWith("/admin-console");

  return (
    <div className="mx-20">
      {!isAdminConsole && <NavBar />}
      {/* {!isAdminConsole && <div className="bg-gray-400 h-0.5"></div>} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/interior" element={<Interior />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="//interior-details/:id" element={<ProjectDetails />} />
        <Route path="//architecture-details/:id" element={<ProjectDetails />} />
        <Route path="/admin-console/*" element={<AdminConsole />} />
      </Routes>
    </div>
  );
};

export default App;
