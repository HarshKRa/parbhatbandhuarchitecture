import React from "react";
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

  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <header className="flex justify-between items-center px-10 py-2 mb-8 text-xl font-bold text-blue-800">
      {/* Brand */}
      <button
        onClick={() => handleNavigate("/home")}
        className="text-2xl hover:text-black transition-colors duration-200"
      >
        Parbhat Bandhu
      </button>

      {/* Navigation Links */}
      <nav>
        <ul className="flex gap-10">
          {navLinks.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleNavigate(item.link)}
                className="hover:text-black hover:underline transition-all duration-200"
              >
                {item.name}
              </button>
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
  );
};

export default NavBar;
