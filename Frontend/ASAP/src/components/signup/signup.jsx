// Module 15

import React, { useState } from "react";
import axios from "axios";

export function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      console.log(response.data); // Log the response for debugging
      setSubmitMessage("Signup successful!"); // Show success message
      setFormData({ username: "", email: "", password: "" }); // Clear form
      setTimeout(() => {
        setSubmitMessage(""); // Clear message after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Signup failed:", error);
      setSubmitMessage("Signup failed. Please try again."); // Show error message
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}