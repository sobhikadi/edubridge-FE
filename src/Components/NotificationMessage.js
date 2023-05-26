import React, { useState, useEffect } from "react";

const NotificationMessage = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [message]);

  return (
    <div
      className={`fixed right-4 top-20 z-50 flex items-center 
    ${visible ? " -translate-x-0" : "translate-x-full"} 
    transition-all duration-700 ease-in-out transform`}
    >
      {message && (
        <div className="relative">
          <div
            className={`bg-gray-200 rounded-md p-2 pr-8 border-l-8 w-[16rem] sm:w-auto  md:max-w-sm ${
              type === "success" ? "border-green-600" : "border-red-600"
            }`}
          >
            <p className="text-black lg:text-lg sm:whitespace-normal break-words ">
              {message}
            </p>
          </div>
          <button
            className="absolute top-[.65rem] right-1 p-1 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationMessage;
