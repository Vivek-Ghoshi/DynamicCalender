import React, { useState, useEffect } from "react";
import EventModal from "./EventModel";
import Export from "./Export";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [data , setData ] = useState('');
 

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    }
  }, [events]);

  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);

    return days;
  };

 

  const openModal = (day) => {
    const selected = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${day}`;
    setSelectedDate(selected);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const saveEvent = (eventData) => {
    const dateEvents = events[selectedDate] || [];
   const updatedEvents =  setEvents({ ...events, [selectedDate]: [...dateEvents, eventData] });

   localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));



  };

  const handleDragStart = (event, draggedEvent) => {
     event.dataTransfer.setData("event", JSON.stringify(draggedEvent));
    
  };

  const handleDrop = (event,day) => {
    const droppedEvent = JSON.parse(event.dataTransfer.getData("event"));
    const prevDate = droppedEvent.oldDate;
    const newDate = day;
    // Remove event from old date
    const updatedOldDateEvents = events[prevDate].filter(
      (e) => e !== droppedEvent
    );
    const updatedNewDateEvents = [
      ...(events[newDate] || []),
      { ...droppedEvent, date: newDate },
    ];


    const updatedEvents = setEvents({
      ...events,
      [prevDate]: updatedOldDateEvents,
      [newDate]: updatedNewDateEvents,
    });
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };

   

  // Get Color Of Events
  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case "Work":
        return "bg-blue-200";
      case "Personal":
        return "bg-green-200";
      case "Others":
        return "bg-yellow-200";
      default:
        return "bg-gray-200";
    }
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <div>
      {/* Header */}
       
       <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />

       {/* SearchBar & Filtered Events */}
      
       <SearchBar events={events}/>
      
    
      {/*  days  */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-center font-bold mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}

      <div className="grid max-w-7xl mx-auto grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            onDragOver={(e)=> e.preventDefault()}
            onDrop={(e)=> handleDrop(e,`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        )}
            className={`p-5 border rounded-md text-center cursor-pointer transition-all 
        ${
          day &&
          currentDate.getFullYear() === new Date().getFullYear() &&
          currentDate.getMonth() === new Date().getMonth() &&
          day === new Date().getDate()
            ? "bg-blue-500 text-white font-bold border-blue-600"
            : "bg-gray-400 text-white font-semibold hover:bg-blue-400"
        }`}
            onClick={() => day && openModal(day)}
          >
            <span className="text-base">{day || ""}</span>
          </div>
        ))}
      </div>
      <div>
        {/* Render days with events */}
        {selectedDate && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Events on <span className="text-gray-800">{selectedDate}</span>:
            </h3>
            {events[selectedDate] && events[selectedDate].length > 0 ? (
              <ul className="space-y-4">
                {events[selectedDate]?.map((event, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e)=> handleDragStart(e,{
                      date:`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${parseInt(selectedDate, 10).toString().padStart(2, '0')}`,
                      name:event.name,
                      oldDate: selectedDate,
                      start:event.start,
                      end: event.end,
                      description: event.description
                     } )}
                    className={`p-4 rounded-lg border-l-4 ${getEventTypeColor(
                      event.type
                    )} shadow-sm hover:shadow-md transition-all`}
                  >
                    <div className="font-semibold text-lg">{event.name}</div>
                    <div className="text-sm text-gray-600">
                      {event.start} - {event.end}
                    </div>
                    <div className="mt-2 text-gray-700">
                      {event.description}
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No events for this day.</p>
            )}
          </div>
        )}
      </div>

      {/* Export Buttons */}
     <Export currentDate={currentDate} events={events} />

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

export default Calendar;
