import React from "react";
import { Navigate, useLocation, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home";
import AboutUs from "./Components/Pages/AboutUs";
import Architecture from "./Components/Pages/Architecture/Architecture";
import Interior from "./Components/Pages/Interior/Interior";
import Contact from "./Components/Pages/Contact";
import Login from "./Components/Admin/Login";
import AdminConsole from "./Components/Admin/AdminConsole";
import ProjectDetails from "./Components/Pages/ProjectDetailsPage/ProjectDetails";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to="/login" />;
};

const App = () => {
  const location = useLocation();
  const isAdminConsole = location.pathname.startsWith("/admin-console");

  return (
    <div className="xl:mx-20">
      {!isAdminConsole && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/interior" element={<Interior />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interior-details/:id" element={<ProjectDetails />} />
        <Route path="/architecture-details/:id" element={<ProjectDetails />} />
        <Route
          path="/admin-console/*"
          element={<PrivateRoute element={<AdminConsole />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
