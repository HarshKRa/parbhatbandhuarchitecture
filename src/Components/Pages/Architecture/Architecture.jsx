import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../utils/firebaseConfig";

const Architecture = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDocs(collection(db, "ArchitectureProject"));
      const datas = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(datas);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mt-8 p-10 flex flex-wrap gap-10 text-center">
      {data?.map((item) => {
        return (
          <div>
            <img className="h-[20vh] w-[20vw]" src={item.images[1]} alt="" />
            <p>{item.ProjectName}</p>
            <p>{item.Location}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Architecture;
