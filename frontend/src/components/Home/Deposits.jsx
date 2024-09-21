import { jwtDecode } from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import { setResData } from "../../utils/redux/slices/resDataSlice.js";
import { setShowDeposit } from "../../utils/redux/slices/showDepositSlice.js";

function Deposits() {
  const showDeposit = useSelector((state) => state.showDeposit.value);
  const resDataRedux = useSelector((state) => state.resData.value);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const gettingUser = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const emailOfUser = jwtDecode(localStorage.getItem("token")).sub;

        const response = await axiosInstance.post("/user/getUserByEmail", {
          email: emailOfUser,
        });
        const resDataApi = await response.data;
        dispatch(setResData(resDataApi));
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const onClickCloseDeposit = () => {
    dispatch(setShowDeposit(!showDeposit));
  };

  const depositsFunctionSubmit = async (data) => {
    try {
      const response = axiosInstance.post("/user/addDeposits", {
        accountNumber: resDataRedux.account.accountNumber,
        deposit: data.depositAccount,
      });

      if ((await response).status === 200) {
        onClickCloseDeposit();
        gettingUser();
        reset();
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div
      className={
        "absolute bg-[rgba(0,0,0,0.8)] backdrop-blur-md z-10 w-full h-full flex flex-col justify-start items-center transition-opacity duration-500 ease-in-out " +
        (showDeposit ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      <div
        onClick={onClickCloseDeposit}
        className="text-white w-full p-3 text-2xl sm:text-3xl flex justify-end"
      >
        <FaRegWindowClose className="cursor-pointer" />
      </div>
      <br />
      <br />
      <br />
      <div className="w-full h-full flex flex-col justify-start items-center">
        <form
          onSubmit={handleSubmit(depositsFunctionSubmit)}
          className="w-[90vmin] sm:w-[80vmin] lg:w-[60vmin] bg-white p-4 sm:p-8 rounded-md"
        >
          <p className="text-2xl sm:text-4xl">Deposits</p>
          <br />
          <div>
            <p>Deposit Amount (MAD):</p>
            <input
              type="number"
              name="depositAccount"
              id="depositAccount"
              className="border border-gray-400 w-full rounded-md p-1"
              step="any" // Enables float numbers
              {...register("depositAccount", {
                required: "Deposit Account is required",
              })}
            />
            {errors.depositAccount && (
              <span className="text-xs font-semibold text-red-700">
                Ce champ est requis *
              </span>
            )}
          </div>
          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-sm p-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow-black shadow-sm"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Deposits;
