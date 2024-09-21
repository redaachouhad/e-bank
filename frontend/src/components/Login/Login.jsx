import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgDanger } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    localStorage.removeItem("token");
    try {
      const response = await axiosInstance.post("/auth/loginUser", user);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwtToken);
        setError("");
        setSuccess("you are successfully logged");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Error, please try again");
      }
      setSuccess("");
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
          <p>Login Form</p>
        </div>
        <div className="w-full  h-7 sm:h-12  relative">
          <div
            style={{
              clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 0%)",
            }}
            className="bg-[#443a91] w-full h-full left-0 top-0"
          />
        </div>
        <div className="p-4 sm:py-6 sm:px-8 flex flex-col gap-4 text-sm">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email*:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border rounded-md p-1 border-black outline-none"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Password*:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded-md p-1 border-black outline-none"
                {...register("password", { required: "Password is required" })}
              />
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 w-full p-1 rounded-md"
              >
                Login
              </button>
            </div>
          </form>

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

          <div className="flex flex-row items-center gap-2">
            <p>Are a new User ? </p>
            <a href="/register" className="text-blue-600 underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
