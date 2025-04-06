import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    User_name: "",
    User_email: "",
    subject: "",
    message: "",
  });

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_i9ecyfv", "template_bzlu88m", formRef.current, {
        publicKey: "2FgPGu-CKLxRByXNy",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED....", error);
        }
      );

    // Clear form after submission
    setFormData({
      User_name: "",
      User_email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl text-center font-semibold">Contact Us</h1>
      <div className="flex mt-8">
        <div className="flex flex-col border-r-2 w-[50vw] p-8 gap-2 text-center">
          <img
            className="h-40 w-40 mx-auto"
            src="https://picsum.photos/200/300"
            alt="Company Logo"
          />
          <h1 className="text-xl font-semibold">Parbhat Bandhu Architects</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>
            <span className="font-semibold">Mobile:</span> +917261810781
          </p>
          <p>
            <span className="font-semibold">Email:</span> abc@gmail.com
          </p>
        </div>

        <div className="px-10 flex w-[50vw] py-10 justify-center">
          <form
            ref={formRef}
            className="flex flex-col gap-5 w-[30vw]"
            onSubmit={handleSubmit}
          >
            <input
              className="px-4 py-2 border text-center rounded-lg font-semibold"
              type="text"
              name="User_name"
              placeholder="Enter your Name"
              value={formData.User_name}
              onChange={handleChange}
              required
            />
            <input
              className="px-4 py-2 border text-center rounded-lg font-semibold"
              type="email"
              name="User_email"
              placeholder="Enter Your Email"
              value={formData.User_email}
              onChange={handleChange}
              required
            />
            <input
              className="px-4 py-2 border text-center rounded-lg font-semibold"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              className="px-4 py-2 border text-center rounded-lg font-semibold"
              name="message"
              rows="3"
              placeholder="Your message (optional)"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="border bg-blue-950 text-white py-2 font-bold rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
