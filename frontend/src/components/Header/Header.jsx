import React, { useState } from "react";
import { FaSackDollar, FaUserLock, FaUserPlus } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
// import "./Header.css";

function Header() {
  const [showMenu, setShowMenu] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();
  const onClickShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const onClickNavigateToRegister = () => {
    onClickShowMenu();
    navigate("/register");
  };

  const onClickNavigateToLogin = () => {
    onClickShowMenu();
    navigate("/login");
  };

  const onClickLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full h-[4rem] flex justify-center items-center bg-[rgb(75,51,198)] text-white relative">
      <div className="w-[90%] flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2 text-2xl sm:text-3xl font-semibold">
          <FaSackDollar />
          <p>E-Bank</p>
        </div>
        {location.pathname === "/" && (
          <div
            onClick={onClickShowMenu}
            className="text-3xl cursor-pointer visible sm:hidden"
          >
            <IoMenu />
          </div>
        )}
        {location.pathname === "/" && (
          <div
            className={
              "sm:flex flex-col sm:flex-row items-center gap-10 py-6 sm:py-0 sm:gap-10 md:gap-20 lg:gap-24 absolute right-0 top-full sm:static sm:right-auto sm:top-auto w-full sm:w-fit bg-[rgb(20,19,62)] sm:bg-transparent z-10 " +
              (showMenu ? "hidden" : "flex")
            }
          >
            <button
              onClick={onClickNavigateToRegister}
              className="flex flex-row gap-1 items-center text-[1rem] border-white border-2 p-1 rounded-md"
            >
              <FaUserPlus />
              <p>Register</p>
            </button>
            <button
              onClick={onClickNavigateToLogin}
              className="flex flex-row gap-1 items-center text-[1rem] border-white border-2 p-1 rounded-md"
            >
              <FaUserLock />
              <p>Login</p>
            </button>
          </div>
        )}
        {location.pathname === "/home" && (
          <div
            onClick={onClickLogout}
            className="hover:underline-white hover:underline flex flex-row justify-center items-center gap-2 text-lg cursor-pointer"
          >
            <p>Logout</p>
            <GrLogout />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
