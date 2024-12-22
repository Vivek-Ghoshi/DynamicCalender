import React from 'react'

const Export = ({currentDate,events}) => {
    const exportEvents = (format) => {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const eventsForMonth = Object.keys(events)
          .filter((date) => {
            const [eventYear, eventMonth] = date.split("-");
            return parseInt(eventYear) === year && parseInt(eventMonth) === month;
          })
          .flatMap((date) => events[date].map((event) => ({ ...event, date })));
    
        if (format === "json") {
          const jsonBlob = new Blob([JSON.stringify(eventsForMonth, null, 2)], {
            type: "application/json",
          });
          const jsonUrl = URL.createObjectURL(jsonBlob);
          const link = document.createElement("a");
          link.href = jsonUrl;
          link.download = `events_${year}_${month}.json`;
          link.click();
        } else if (format === "csv") {
          const csvRows = [
            ["Date", "Name", "Start", "End", "Type", "Description"],
            ...eventsForMonth.map((event) => [
              event.date,
              event.name,
              event.start,
              event.end,
              event.type,
              event.description,
            ]),
          ]
            .map((row) => row.join(","))
            .join("\n");
    
          const csvBlob = new Blob([csvRows], { type: "text/csv" });
          const csvUrl = URL.createObjectURL(csvBlob);
          const link = document.createElement("a");
          link.href = csvUrl;
          link.download = `events_${year}_${month}.csv`;
          link.click();
        }
      };
    
  return (
    <div className="space-x-4 mt-4">
        <button
          onClick={() => exportEvents("json")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none"
        >
          Export JSON
        </button>

        <button
          onClick={() => exportEvents("csv")}
          className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none"
        >
          Export CSV
        </button>
      </div>
  )
}

export default Export
