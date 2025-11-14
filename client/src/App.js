import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State to hold the list of events
  const [events, setEvents] = useState([]);
  // State to track connection status
  const [isConnected, setIsConnected] = useState(false);
  // State to hold the EventSource instance
  const [eventSource, setEventSource] = useState(null);

  // Function to start catching events
  const startCatchingEvents = () => {
    if (!isConnected) {
      // 1. Create a new EventSource instance
      // This connects to our server's /events endpoint
      const newEventSource = new EventSource(
        "https://74jmltgd-5051.inc1.devtunnels.ms/events"
      );

      // 2. Listen for messages from the server
      newEventSource.onmessage = (event) => {
        // Parse the incoming data (which is a JSON string)
        const newEvent = JSON.parse(event.data);

        // Update state, adding the new event to the top of the list
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      };

      // 3. Handle connection open
      newEventSource.onopen = () => {
        console.log("Connected to SSE server");
        setIsConnected(true);
      };

      // 4. Handle errors
      newEventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        if (newEventSource.readyState === EventSource.CLOSED) {
          setIsConnected(false);
        }
      };

      // Store the EventSource instance
      setEventSource(newEventSource);
    }
  };

  // Function to stop catching events
  const stopCatchingEvents = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsConnected(false);
      console.log("Disconnected from SSE server");
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Server-Sent Events (SSE) in React</h1>

        {/* Control button */}
        <button
          onClick={isConnected ? stopCatchingEvents : startCatchingEvents}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "20px 0",
            cursor: "pointer",
            backgroundColor: isConnected ? "#dc3545" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            transition: "background-color 0.3s",
          }}
        >
          {isConnected ? "Stop Catching Events" : "Start Catching Events"}
        </button>

        {/* Connection status */}
        <p style={{ color: isConnected ? "#28a745" : "#dc3545" }}>
          Status: {isConnected ? "Connected" : "Disconnected"}
        </p>

        <h3>New events will appear at the top:</h3>

        {/* We'll use <pre> to make the list easy to read */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event, index) => (
            <li key={index}>
              <p>Time: {event.time}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
