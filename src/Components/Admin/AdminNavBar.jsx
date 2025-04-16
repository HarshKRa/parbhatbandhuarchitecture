import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  // alert(ind);
  return (
    <div className="h-[12vh] text-[var(--secondaryColour)] mb-8">
      <div className="flex justify-between align-middle items-center px-10 text-xl md:text-lg font-bold h-full">
        <p
          onClick={() => navigate("/home")}
          className="text-2xl hover:text-black transition-colors duration-200 cursor-pointer"
        >
          Parbhat Bandhu
        </p>
        <div className="flex gap-10 cursor-pointer">
          {data.map((item, index) => {
            return (
              <p
                key={index}
                className={`${
                  ind == index
                    ? "scale-110 underline text-[var(--primaryText)]"
                    : ""
                } hover:scale-110 hover:underline transition-all duration-200`}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Logout
        </Button>
      </div>
      <div className="bg-gray-400 h-0.5 mb-2"></div>
    </div>
  );
};

export default SideBar;
