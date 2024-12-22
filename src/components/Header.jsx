import React, { useState } from 'react'

const Header = ({currentDate, setCurrentDate}) => {

    const changeMonth = (offset) => {
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + offset,
          1
        );
        setCurrentDate(newDate);
      };

  return (
    <div className="flex justify-between items-center mb-4 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
    <button
      onClick={() => changeMonth(-1)}
      className="btn flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 rounded-md shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Previous</span>
    </button>

    <h2 className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
      {currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}
    </h2>

    <button
      onClick={() => changeMonth(1)}
      className="btn flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 rounded-md shadow-md"
    >
      <span>Next</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
  )
}

export default Header
