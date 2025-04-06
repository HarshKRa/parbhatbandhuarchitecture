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
    <div className="flex gap-10 justify-center mt-10 text-xl font-bold">
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
  );
};

export default SideBar;
