import { jwtDecode } from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { setResData } from "../../utils/redux/slices/resDataSlice";
import { setShowTransfert } from "../../utils/redux/slices/showTransfertSlice";

function Transferts() {
  const showTransfert = useSelector((state) => state.showTransfert.value);
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

  const onClickCloseTransfert = () => {
    dispatch(setShowTransfert(!showTransfert));
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/user/transfer", {
        senderAccountNumber: parseInt(resDataRedux.account.accountNumber),
        receiverAccountNumber: parseInt(data.accountNumber),
        sentAmount: parseFloat(data.transferAmount),
      });
      if (response.status === 200) {
        gettingUser();
        reset();
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <div
      className={
        "absolute bg-[rgba(0,0,0,0.8)] backdrop-blur-md z-10 w-full h-full flex flex-col justify-start items-center transition-opacity duration-500 ease-in-out " +
        (showTransfert ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      <div
        onClick={onClickCloseTransfert}
        className="text-white w-full p-3 text-2xl sm:text-3xl flex justify-end"
      >
        <FaRegWindowClose className="cursor-pointer" />
      </div>
      <br />
      <br />
      <br />
      <div className="w-full h-full flex flex-col justify-start items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[90vmin] sm:w-[80vmin] lg:w-[60vmin] bg-white p-4 sm:p-8 rounded-md"
        >
          <p className="text-2xl sm:text-4xl">Transfers</p>
          <br />
          <div>
            <p>Account Number Receiver:</p>
            <input
              type="number"
              name="accountNumber"
              id="accountNumber"
              className="border border-gray-400 w-full rounded-md p-1"
              {...register("accountNumber", {
                required: "Account Number Receiver is required",
              })}
              required
            />
          </div>
          <br />
          <div>
            <p>Transfer Amount (MAD):</p>
            <input
              type="number"
              name="transferAmount"
              id="transferAmount"
              className="border border-gray-400 w-full rounded-md p-1"
              {...register("transferAmount", {
                required: "Transfer Amount is required",
              })}
              required
            />
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

export default Transferts;
