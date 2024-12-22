import React, { useState } from "react";
import EventModal from "./EventModel.jsx";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }
    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const openModal = (day) => {
    const selected = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setSelectedDate(selected);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const saveEvent = (eventData) => {
    const dateEvents = events[selectedDate] || [];
    setEvents({ ...events, [selectedDate]: [...dateEvents, eventData] });
  };

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-4 border rounded-md text-center bg-gray-100 hover:bg-blue-100 cursor-pointer ${
              day &&
              currentDate.getFullYear() === new Date().getFullYear() &&
              currentDate.getMonth() === new Date().getMonth() &&
              day === new Date().getDate()
                ? "bg-yellow-200 font-bold border-yellow-400"
                : ""
            }`}
            onClick={() => day && openModal(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Events for Selected Day */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Events on {selectedDate}:</h3>
          {events[selectedDate] && events[selectedDate].length > 0 ? (
            <ul className="space-y-2">
              {events[selectedDate].map((event, idx) => (
                <li key={idx} className="p-2 bg-gray-100 rounded shadow">
                  <div className="font-bold">{event.name}</div>
                  <div>
                    {event.start} - {event.end}
                  </div>
                  <div>{event.description}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this day.</p>
          )}
        </div>
      )}

      {/* Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveEvent}
        initialData={editingEvent}
      />
    </div>
  );
};

export default Calendar;

import React, { useState } from "react";

const EventModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [eventData, setEventData] = useState(
    initialData || { name: "", start: "", end: "", description: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSave = () => {
    if (!eventData.name || !eventData.start || !eventData.end) {
      alert("Event Name, Start Time, and End Time are required.");
      return;
    }
    onSave(eventData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{initialData ? "Edit Event" : "Add Event"}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            name="start"
            value={eventData.start}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            name="end"
            value={eventData.end}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;