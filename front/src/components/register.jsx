import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: new Date(),
    gender: "",
    phone: "",
    email: "",
    institution: "",
    degree: "",
    graduation_year: "",
    reg_no: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("🎯 Registration Successful!");
    } catch (error) {
      alert("❌ Something went wrong!", error);
    }
  };
  

  return (
    <div className="max-w-3xl text-black mx-auto p-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl mt-10">
      <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
        Bangalore Job Fair Registration
      </h1>
      <p className="text-center  mb-8">(01/03/2025)</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date of Birth</label>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholderText="Select your birth date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contact Number</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Institution</label>
          <input
            type="text"
            name="institution"
            onChange={handleChange}
            placeholder="Your Institution Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Degree</label>
          <input
            type="text"
            name="degree"
            onChange={handleChange}
            placeholder="Ex: B.Tech, M.Tech"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Graduation Year</label>
          <select
            name="graduation_year"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>Select</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Register Number</label>
          <input
            type="text"
            name="reg_no"
            onChange={handleChange}
            placeholder="Registration Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Resume (PDF only)</label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            required
            accept=".pdf"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-600 to-purple-800  rounded-lg hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
