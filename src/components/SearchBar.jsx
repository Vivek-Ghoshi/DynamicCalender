import React, { useEffect, useState } from 'react'

const SearchBar = ({events}) => {

     const [searchKeyword, setSearchKeyword] = useState("");
     const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        if (!searchKeyword.trim()) {
          setFilteredEvents([]);
          return;
        }
    
        const allEvents = Object.keys(events).flatMap((date) =>
          events[date].map((event) => ({ ...event, date }))
        );
    
        const matched = allEvents.filter((event) =>
          event.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    
        setFilteredEvents(matched);
      }, [searchKeyword, events]);
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search events..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700"
        />
      </div>

      {/* filtered events */}
      {filteredEvents.length > 0 && (
        <div className="filtered-events bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-3">Filtered Events:</h3>
          <div className="space-y-4">
            {filteredEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-800 p-3 rounded-md shadow-sm hover:shadow-md transition-all"
              >
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBar
