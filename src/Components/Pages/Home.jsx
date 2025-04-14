import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebaseConfig";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDocs(collection(db, "HomeImage"));
      const userList = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const allImages = userList.map((item) => item.images).flat();
      setImageUrl(allImages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        imageUrl.length > 0 ? (prevIndex + 1) % imageUrl.length : 0
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [index, imageUrl]);

  return (
    <div className="mt-10 justify-center items-center">
      <div className="flex justify-between items-center h-[60vh] px-4">
        {/* Left Arrow */}
        <button
          className="transform -translate-y-1/2 text-black text-2xl z-10"
          onClick={() => setIndex((index + 1) % imageUrl.length)}
        >
          <ArrowBackIosNew fontSize="inherit" />
        </button>

        {/* Image */}
        {imageUrl.length > 0 ? (
          <img
            style={{ height: "60vh", width: "50vw" }}
            className="mx-auto object-cover rounded shadow-md"
            src={imageUrl[index]}
            alt={`carousel-${index}`}
          />
        ) : (
          <p className="text-xl text-center">Loading images...</p>
        )}

        {/* Right Arrow */}
        <button
          className="transform -translate-y-1/2 text-black text-2xl z-10"
          onClick={() => setIndex((index + 1) % imageUrl.length)}
        >
          <ArrowForwardIos fontSize="inherit" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex gap-4 mt-8 justify-center">
        {imageUrl.map((_, ind) => (
          <span
            key={ind}
            className={`h-2 w-2 rounded-full border transition-all duration-300 ${
              index === ind ? "bg-black scale-125" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Home;
