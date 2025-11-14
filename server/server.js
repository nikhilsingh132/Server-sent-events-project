const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5051;

// Use CORS middleware
const corsOptions = {
  origin: "https://74jmltgd-3031.inc1.devtunnels.ms",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// The SSE endpoint
app.get("/events", (req, res) => {
  // 1. Set mandatory headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // Flush headers to send them immediately

  console.log("Client connected for SSE");

  // 2. Send an event every 3 seconds
  const intervalId = setInterval(() => {
    const data = { time: new Date().toLocaleTimeString() };

    // 3. Format the event (must be "data: ...\n\n")
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 3000);

  // 4. Handle client disconnect
  req.on("close", () => {
    console.log("Client disconnected");
    clearInterval(intervalId); // Stop sending events
    res.end(); // End the response
  });
});

app.listen(PORT, () => {
  console.log(`SSE server listening on port ${PORT}`);
});
