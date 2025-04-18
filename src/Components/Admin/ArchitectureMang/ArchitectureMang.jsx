import React from "react";
import ArchitectureMangForm from "./ArchitectureMangForm";
import ArchitecturePageData from "./ArchitecturePageData";

const ArchitectureMang = () => {
  return (
    <div>
      <ArchitectureMangForm data={{}} id="" flag={true}>
        Add New Architecture Project
      </ArchitectureMangForm>
      <ArchitecturePageData />
    </div>
  );
};

export default ArchitectureMang;
