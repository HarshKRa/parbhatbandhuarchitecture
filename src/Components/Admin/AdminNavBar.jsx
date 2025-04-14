import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Home",
    link: "/admin-console/home-mang",
  },
  {
    name: "Architecture",
    link: "/admin-console/architecture-mang",
  },
  {
    name: "Interior",
    link: "/admin-console/interior-mang",
  },
];

const SideBar = () => {
  const [ind, setIndex] = useState(0);
  const navigate = useNavigate();
  // alert(ind);
  return (
    <>
      <div className="flex justify-between items-center px-10 py-2 mb-4 text-xl md:text-lg font-bold">
        <button
          onClick={() => navigate("/home")}
          className="text-2xl hover:text-black transition-colors duration-200 cursor-pointer"
        >
          Parbhat Bandhu
        </button>
        <div className="flex gap-10 text-xl font-bold cursor-pointer">
          {data.map((item, index) => {
            return (
              <p
                className={`${ind == index ? "underline" : ""}`}
                onClick={() => {
                  navigate(`${item.link}`);
                  setIndex(index);
                }}
              >
                {item.name}
              </p>
            );
          })}
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-950 text-white font-semibold rounded-lg text-sm px-5 py-2 hover:bg-blue-900 transition-colors duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="bg-gray-400 h-0.5 mb-2"></div>
    </>
  );
};

export default SideBar;
