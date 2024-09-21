import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgDanger } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../../utils/axiosInstance.js";

function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm(); // useForm hook
  // This function is called after successful form validation
  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError("passwords do not match");
      return;
    }
    const user = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      type: data.type,
    };

    try {
      const response = await axiosInstance.post("/auth/registerUser", user);

      if (response.status === 200) {
        setError("");
        setSuccess(response.data);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError("Error, please try again");
      }
    }
  };
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-cyan-50">
      <div className="flex flex-row justify-center items-start text-3xl sm:text-5xl font-semibold text-blue-600 gap-4">
        <FaSackDollar />
        <p>E-Bank</p>
      </div>
      <br />
      <div className="w-[90vmin] sm:w-[75vmin] md:w-[60vmin] flex flex-col shadow-sm shadow-black rounded-md">
        <div className="w-full flex justify-center items-center text-xl lg:text-3xl font-medium px-3 sm:px-6 py-3 bg-[#443a91] text-white rounded-t-lg">
          <p>Register Form</p>
        </div>
        <div className="w-full h-7 sm:h-12 relative">
          <div
            style={{
              clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 0%)",
            }}
            className="bg-[#443a91] w-full h-full left-0 top-0"
          />
        </div>
        <div className="p-4 sm:py-6 sm:px-8 flex flex-col gap-4 text-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col text-sm">
              <label htmlFor="firstName">First Name*:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="lastName">Last Name*:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="email">Email*:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="phoneNumber">Phone number*:</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="type">identity*:</label>
              <select
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("type", {
                  required: "type is required",
                })}
                id="type"
                name="type"
                required
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="password">Password*:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("password", { required: "Password is required" })}
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="passwordConfirm">Password Confirm*:</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                className="border rounded-md p-1 border-blue-300 outline-none"
                {...register("passwordConfirm", {
                  required: "passwordConfirm is required",
                })}
              />
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 w-full p-1 rounded-md"
              >
                Create account
              </button>
            </div>
            {error && (
              <div className="border-2 border-red-700 p-1 rounded-md flex flex-row justify-start items-center text-red-500 gap-2">
                <CgDanger className="text-lg" />
                <p className="font-bold">{error}</p>
              </div>
            )}
            {success && (
              <div className="border-2 border-green-700 p-1 rounded-md flex flex-row justify-start items-center text-green-500 gap-2">
                <FaRegCheckCircle className="text-lg" />
                <p className="font-bold">{success}</p>
              </div>
            )}
          </form>

          <div className="flex flex-row items-center gap-2 text-sm">
            <p>Already have an account ? </p>
            <a href="/login" className="text-blue-600 underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
