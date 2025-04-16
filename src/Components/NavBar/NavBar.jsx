import React, { useEffect, useState } from "react";
import youtube from "../../assets/youtubeImg.png";
import instagram from "../../assets/instagramImg.png";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { id: 0, name: "Home", link: "/home" },
  { id: 1, name: "About Us", link: "/about-us" },
  { id: 2, name: "Architecture", link: "/architecture" },
  { id: 3, name: "Interior", link: "/interior" },
  { id: 4, name: "Contact", link: "/contact" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [selcted, setSelected] = useState(0);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path == "/") setSelected(0);
    else {
      const id = navLinks.findIndex((link) => link.link === path);
      setSelected(id);
    }
  });

  const handleNavigate = (link, index) => {
    navigate(link);
    setSelected(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="text-[var(--secondaryColour)]">
      <header className="flex justify-between items-center xl:px-10 lg:px-8 md:px-6 px-4 h-[12vh]">
        {/* Brand */}
        <p
          onClick={() => handleNavigate("/home", 0)}
          className="lg:text-2xl text-xl hover:scale-110 transition-colors duration-200"
        >
          Parbhat Bandhu
        </p>

        {/* Navigation Links */}
        <nav className="hidden lg:flex">
          <ul className="flex xl:gap-10 lg:gap-8 gap-6 text-lg font-bold ">
            {navLinks.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleNavigate(item.link, index);
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
        <div className="hidden lg:flex items-center gap-5">
          <img className="h-5 cursor-pointer" src={youtube} alt="YouTube" />
          <img className="h-4 cursor-pointer" src={instagram} alt="Instagram" />
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-950 text-white font-semibold rounded-lg text-sm px-5 py-2 hover:bg-blue-900 transition-colors duration-200"
          >
            Admin Login
          </button>
        </div>
        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <CloseIcon size={28} />
            ) : (
              <MenuIcon size={28} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 pb-6">
          {navLinks.map((item, index) => (
            <p
              key={index}
              onClick={() => handleNavigate(item.link, index)}
              className={`cursor-pointer text-lg font-semibold ${
                selcted === index ? "underline text-[var(--primaryText)]" : ""
              }`}
            >
              {item.name}
            </p>
          ))}

          <div className="flex items-center gap-4 mt-2">
            <img className="h-5 cursor-pointer" src={youtube} alt="YouTube" />
            <img
              className="h-4 cursor-pointer"
              src={instagram}
              alt="Instagram"
            />
          </div>

          <button
            onClick={() => {
              navigate("/login");
              setIsMobileMenuOpen(false);
            }}
            className="mt-3 bg-blue-950 text-white font-semibold rounded-lg text-sm px-5 py-2 hover:bg-blue-900 transition-colors duration-200"
          >
            Admin Login
          </button>
        </div>
      )}

      <div className="bg-white h-[1px]"></div>
    </div>
  );
};

export default NavBar;
