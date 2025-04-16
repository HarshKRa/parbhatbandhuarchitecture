import React from "react";
import InteriorMangForm from "./InteriorMangForm";
import InteriorPageData from "./InteriorPageData";

const InteriorMang = () => {
  return (
    <div>
      <InteriorMangForm data={{}} id="" flag={true}>
        Add New Interior Projects
      </InteriorMangForm>
      <InteriorPageData />
    </div>
  );
};

export default InteriorMang;
