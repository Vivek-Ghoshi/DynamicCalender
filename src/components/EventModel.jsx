import React, { useState, useEffect } from "react";

const EventModal = ({ isOpen, onClose,selectedDate, onSave,editMode,setEditMode,events, setEvents, initialData,setEditingEvent }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Work");

  useEffect(() => {
    if (initialData) {
      setEventName(initialData.name);
      setStartTime(initialData.start);
      setEndTime(initialData.end);
      setDescription(initialData.description);
      setEventType(initialData.type);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }
    const newEvent = {
      name: eventName,
      start: startTime,
      end: endTime,
      description,
      type: eventType,
    };
    
    if(editMode === true){
       const updatedEvents = {...events};
       updatedEvents[selectedDate] = updatedEvents[selectedDate].map(event => 
        event.id === initialData.id ? {...events, ...newEvent } : event
      );
       setEvents(updatedEvents);
       localStorage.setItem("calendarEvents",JSON.stringify(updatedEvents));
       setEditMode(false);
       setEditingEvent(null)
    }
    else{
      const updatedEvents = { ...events };
      const eventId = new Date().getTime();
      updatedEvents[selectedDate] = [
        ...(updatedEvents[selectedDate] || []),
        { id: eventId, ...newEvent },
      ];
  
      setEvents(updatedEvents);
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      onClose();
      onSave(newEvent);
      setEditMode(false)
    }

    onClose();
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setEventType('');
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-200 p-6 h-6/7 rounded-lg w-96">
          <h2 className="text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text font-bold mb-4">
            Event Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-blue-600 font-semibold">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-blue-600 font-semibold ">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-red-600 font-semibold ">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-blue-600 font-semibold ">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
                rows="2"
              />
            </div>
            <div className="mb-2">
              <label className="block text-blue-600 font-semibold">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EventModal;
