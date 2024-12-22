import React from "react";
import Calendar from "./components/Calender";

function App() {
  return (
    <div className="min-h-screen  flex flex-col  items-center bg-gray-800 p-4">
     <h1 className="text-4xl font-extrabold text-center mb-8">
  <span className="block bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
    Dynamic Event Calendar
  </span>
</h1>
      <Calendar/>
    </div>
  );
}

export default App;