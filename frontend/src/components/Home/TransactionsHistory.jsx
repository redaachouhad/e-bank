import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setShowTableTransaction } from "../../utils/redux/slices/showTableTransactionSlice";

function TransactionsHistory() {
  const showTableTransaction = useSelector(
    (state) => state.showTableTransaction.value
  );
  const resDataRedux = useSelector((state) => state.resData.value);
  const dispatch = useDispatch();
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, "0"); // Pad with leading zeros if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so +1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0"); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const onClickShowTableTransaction = () => {
    dispatch(setShowTableTransaction(!showTableTransaction));
  };

  return (
    <div
      className={
        "absolute bg-[rgba(0,0,0,0.8)] backdrop-blur-md z-10 w-full h-full flex flex-col justify-start items-center transition-opacity duration-500 ease-in-out " +
        (showTableTransaction ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      <div
        onClick={onClickShowTableTransaction}
        className="text-white w-full p-3 text-2xl sm:text-3xl flex justify-end"
      >
        <FaRegWindowClose className="cursor-pointer" />
      </div>

      <div className="w-[95vmin] h-[80%] flex flex-col justify-start items-center bg-[rgba(255,255,255,1)] rounded-md">
        <p className="text-xl sm:text-3xl">Transactions history</p>

        <div className="w-full h-full p-2 rounded-md overflow-x-scroll">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Transaction Type</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Account Number</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(resDataRedux.transactionList).map((item, index) => {
                return (
                  <tr key={index} className="bg-white">
                    <td className="border px-4 py-2">
                      {formatDate(item.transactionDate)}
                    </td>
                    <td className="border px-4 py-2">{item.typeTransaction}</td>
                    <td className="border px-4 py-2">
                      {item.transactionAmount} MAD
                    </td>
                    <td className="border px-4 py-2">
                      {item.senderAccountNumber}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
}

export default TransactionsHistory;
