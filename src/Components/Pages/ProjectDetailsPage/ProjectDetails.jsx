import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageModel from "../../ImageModel/ImageModel";

const ProjectDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!state) {
    return (
      <p>
        No data found <button onClick={() => navigate(-1)}>Go Back</button>
      </p>
    );
  }

  const openModel = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? state.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === state.images.length - 1 ? 0 : prev + 1));
  };

  console.log(state);
  return (
    <div className="mt-8 px-10">
      <h1 className="text-center">{state.ProjectName}</h1>
      <div className="flex flex-wrap gap-10 mt-6">
        {state?.images.map((item, index) => {
          return (
            <img
              className="h-[20vh] w-[20vw] object-cover object-center"
              key={index}
              src={item}
              alt="image"
              onClick={() => openModel(index)}
            />
          );
        })}
      </div>
      <div className="flex mt-8">
        <div className="w-[60vw]">
          <p>
            <span>Description :</span>
            {state.Description}
          </p>
          <p>
            <span>Location :</span>
            {state.Location}
          </p>
          <p>
            <span>TypeOfBuilding :</span>
            {state.TypeOfBuilding}
          </p>
        </div>
        <div>
          <p>
            <span>Area :</span>
            {state.Area}
          </p>
          <p>
            <span>DateofCompletion :</span>
            {state.DateofCompletion}
          </p>
          <p>
            <span>Status :</span>
            {state.Status}
          </p>
        </div>
      </div>
      {/* Image Modal */}
      <ImageModel
        open={isOpen}
        images={state.images}
        currentIndex={activeIndex}
        onClose={closeModal}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default ProjectDetails;
