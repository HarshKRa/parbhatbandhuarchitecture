import React, { useState } from "react";
import youtube from "../../assets/youtubeImg.png";
import instagram from "../../assets/instagramImg.png";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", link: "/home" },
  { name: "About Us", link: "/about-us" },
  { name: "Architecture", link: "/architecture" },
  { name: "Interior", link: "/interior" },
  { name: "Contact", link: "/contact" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [selcted, setSelected] = useState(0);

  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <div className="text-[var(--secondaryColour)] h-[12vh]">
      <header className="flex justify-between align-middle items-center px-10 text-xl md:text-lg font-bold h-full">
        {/* Brand */}
        <p
          onClick={() => handleNavigate("/home")}
          className="text-2xl hover:scale-110 transition-colors duration-200"
        >
          Parbhat Bandhu
        </p>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-10 md">
            {navLinks.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleNavigate(item.link);
                  setSelected(index);
                }}
                className={`${
                  selcted == index
                    ? "scale-110 underline text-[var(--primaryText)]"
                    : ""
                } hover:scale-110 hover:underline transition-all duration-200`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons + Admin Login */}
        <div className="flex items-center gap-5">
          <img className="h-5 cursor-pointer" src={youtube} alt="YouTube" />
          <img className="h-4 cursor-pointer" src={instagram} alt="Instagram" />
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-950 text-white font-semibold rounded-lg text-sm px-5 py-2 hover:bg-blue-900 transition-colors duration-200"
          >
            Admin Login
          </button>
        </div>
      </header>
      <div className="bg-white h-0.5"></div>
    </div>
  );
};

export default NavBar;
