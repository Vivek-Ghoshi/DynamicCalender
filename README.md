Dynamic Event Calendar Application

Project Overview

The Dynamic Event Calendar Application is a React-based project designed to showcase advanced React.js logic, clean UI design, and deployment skills. This application allows users to create, manage, and reschedule events seamlessly within a modern, interactive calendar interface. It also demonstrates advanced features like drag-and-drop event rescheduling, data persistence using localStorage, and export functionality, ensuring a robust user experience.

---

Features

1. Calendar View

Displays a custom-built calendar grid for the current month.

Allows users to navigate between months using "Previous" and "Next" buttons.

Visually highlights the current day and the selected day.

2. Event Management

Add events by clicking on a specific day.

Edit or delete events from a modal.

Each event includes:

Event name

Start and end time

Optional description

Event type with color coding (e.g., Work, Personal, Other)

3. Event List

Displays all events for a selected day in a modal for easy management.

4. Drag-and-Drop Rescheduling

Users can drag events from one day and drop them onto another day to reschedule.

The event’s date is automatically updated after the drop.

5. Data Persistence

All event data is stored in the browser’s localStorage.

Ensures events persist between page refreshes.

6. Color Coding

Events are categorized by type, with distinct colors to differentiate Work, Personal, and Other events.

7. Export Events

Users can export all events for a specific month in JSON or CSV format.

8. Clean UI

Designed using Tailwind CSS for a responsive, modern, and clean user interface.

---

Folder Structure

src/
│
├── components/
│ ├── Calendar.jsx # Main calendar component
│ ├── EventModal.jsx # Modal for adding/editing events
│ ├── Export.jsx # Buttons for exporting events
│ ├── Search.jsx # Search bar for searching events
│ ├── Header.jsx # Header of the calender
│ 
│
├── App.jsx # Root application component
├── index.css # Custom Tailwind CSS styles
└── index.js # Entry point of the application

---

How It Works

Calendar Logic

A grid-based calendar is dynamically generated based on the current month and year.

The grid adjusts for the number of days in a month and the starting day of the week.

The "Previous" and "Next" buttons allow navigation between months.

Event Management

1. Adding Events:

Clicking on a day opens a modal where users can fill out the event details.

The event is saved to the events state and stored in localStorage.

2. Editing/Deleting Events:

Clicking on an existing event in the event list opens a modal for editing or deleting it.

Drag-and-Drop Rescheduling

Each event is draggable and can be dropped onto another day.

The onDragStart and onDrop functions handle the drag-and-drop logic, updating the event's date in the events state.

Data Persistence

All event data is stored in localStorage whenever changes are made.

On page load, the app retrieves events from localStorage to ensure persistence.

Color Coding

Events are categorized into types (e.g., Work, Personal, Other).

Each category is assigned a specific color, which is dynamically applied using Tailwind CSS classes.

Export Functionality

Users can export all events for the selected month in JSON or CSV format.

Export logic formats event data into the required file structure and triggers download.

---

How to Run the Project

1. Clone the repository:

git clone <repository_url>

2. Navigate to the project directory:

cd dynamic-event-calendar

3. Install dependencies:

npm install

4. Start the development server:

npm run dev

5. Open the application in your browser:

https://dynamic-calender-blush.vercel.app/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
