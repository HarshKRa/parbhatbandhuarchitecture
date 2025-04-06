import React from "react";
import SideBar from "./SideBar";
import ArchitectureMang from "./ArchitectureMang";
import InteriorMang from "./InteriorMang";
import { Route, Routes } from "react-router-dom";
import HomeMang from "./HomeMang";

const AdminConsole = () => {
  return (
    <div>
      <SideBar />

      <Routes>
        <Route path="/*" element={<HomeMang />} />
        <Route path="/home-mang" element={<HomeMang />} />
        <Route path="/architecture-mang" element={<ArchitectureMang />} />
        <Route path="/interior-mang" element={<InteriorMang />} />
      </Routes>
    </div>
  );
};

export default AdminConsole;
