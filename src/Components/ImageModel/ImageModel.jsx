import React from "react";
import { Dialog } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";

const ImageModel = ({ open, images, currentIndex, onClose, onPrev, onNext }) => {
  if (!images || images.length === 0) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="relative bg-black">
        <img
          src={images[currentIndex]}
          alt="Project"
          className="w-full h-[70vh] object-contain"
        />

        {/* Prev Button */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl z-10"
          onClick={onPrev}
        >
          <ArrowBackIosNew fontSize="inherit" />
        </button>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl z-10"
          onClick={onNext}
        >
          <ArrowForwardIos fontSize="inherit" />
        </button>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl z-10"
          onClick={onClose}
        >
          <Close fontSize="inherit" />
        </button>
      </div>
    </Dialog>
  );
};

export default ImageModel;
