import React from "react";
import SideBar from "./AdminNavBar";
import { Route, Routes } from "react-router-dom";
import HomeMang from "./HomeMang/HomeMang";
import ArchitectureMang from "./ArchitectureMang/ArchitectureMang";
import InteriorMang from "./InteriorMang/InteriorMang";

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
