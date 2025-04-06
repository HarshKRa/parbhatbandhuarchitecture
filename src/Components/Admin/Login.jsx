import React, { useState } from "react";
import { auth } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("login successfull ", response);
      //   toast.success("login successfull");
      navigate("/admin-console");
    } catch (error) {
      console.error(error.message);
      //   toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex flex-col text-center mt-10">
      <h1 className="text-3xl text-center font-semibold">Login As Admin</h1>
      <form
        className="flex flex-col min-w-[40vw] mx-auto gap-10 mt-10 border px-12 py-10 "
        action=""
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="text-center border px-8 py-1 font-semibold rounded-md"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="text-center border px-8 py-1 font-semibold rounded-md"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-950 text-white font-semibold rounded-lg text-sm px-5 py-2 hover:bg-blue-900 transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
