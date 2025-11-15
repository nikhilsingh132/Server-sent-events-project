# Server-Sent Events (SSE) Real-Time Demo

A full-stack application demonstrating real-time server-to-client communication using Server-Sent Events (SSE) with Node.js/Express backend and React frontend.

## 🚀 Live Demo

Access the working demo at: [https://74jmltgd-3031.inc1.devtunnels.ms/](https://74jmltgd-3031.inc1.devtunnels.ms/)

## 🎥 Video Demo
<video width="100%" controls>
  <source src="https://github.com/user-attachments/assets/ecf76e4c-0fc8-45c1-a3f9-6c4a84c8e48d" type="video/mp4">
</video>

## 📋 Overview

Server-Sent Events (SSE) is a technology enabling servers to push real-time updates to web clients over a single HTTP connection. This project showcases a practical implementation where the server sends time updates to connected clients every 3 seconds.

### Why SSE?

- **Simple Protocol**: Uses standard HTTP, no special protocols needed
- **Automatic Reconnection**: Built-in browser support for connection recovery
- **Unidirectional**: Perfect for server-to-client notifications
- **Firewall Friendly**: Works over standard HTTP/HTTPS ports
- **Lightweight**: Less overhead compared to WebSockets for one-way communication

## ⚡ Key Features

- Real-time time updates pushed from server every 3 seconds
- Visual connection status indicator
- Start/Stop event streaming on demand
- Clean, modern React UI
- Automatic connection management
- CORS-enabled for cross-origin requests
- Graceful disconnect handling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express 5.1.0, CORS middleware
- **Frontend**: React 19.2.0, Create React App
- **Communication**: Server-Sent Events (SSE)

## 📦 Installation

### Prerequisites
- Node.js 14+ and npm installed

### Quick Start

1. **Clone and navigate to project**
```bash
git clone <repository-url>
cd Server-sent-events-project
```

2. **Setup Backend**
```bash
cd server
npm install
npm start
```
Server runs on `http://localhost:5051`

3. **Setup Frontend** (new terminal)
```bash
cd client
npm install
npm start
```
Client runs on `http://localhost:3031`

## 🎮 Usage

1. Open browser at `http://localhost:3031`
2. Click **"Start Catching Events"** to connect
3. Watch real-time updates stream in
4. Click **"Stop Catching Events"** to disconnect

## 🔧 Configuration

### Update Server CORS (server/server.js)
```javascript
const corsOptions = {
  origin: "http://localhost:3031", // Change for production
  optionsSuccessStatus: 200,
};
```

### Update Client SSE Endpoint (client/src/App.js)
```javascript
const newEventSource = new EventSource(
  "http://localhost:5051/events" // Update for production
);
```

## 💡 How SSE Works

### Server Implementation
```javascript
// Set SSE headers
res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");

// Send data
res.write(`data: ${JSON.stringify(data)}\n\n`);
```

### Client Implementation
```javascript
// Create connection
const eventSource = new EventSource("http://localhost:5051/events");

// Handle incoming events
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Process data
};
```

## 📊 SSE vs Other Technologies

| Feature | SSE | WebSockets | Long Polling |
|---------|-----|------------|--------------|
| **Direction** | Server→Client | Bidirectional | Server→Client |
| **Protocol** | HTTP | WS/WSS | HTTP |
| **Auto-Reconnect** | ✅ Yes | ❌ Manual | ❌ Manual |
| **Real-time** | ✅ Yes | ✅ Yes | ⚠️ Near real-time |
| **Complexity** | Simple | Complex | Medium |
| **Best For** | Notifications, Updates | Chat, Gaming | Fallback option |

## 🚢 Deployment Tips

1. **Environment Variables**: Store URLs and ports in `.env` files
2. **HTTPS**: Use SSL certificates in production
3. **Proxy**: Consider nginx for production deployment
4. **Connection Limits**: Implement rate limiting
5. **Error Recovery**: Add robust error handling
6. **Authentication**: Implement token-based auth if needed

## 🐛 Common Issues & Solutions

**CORS Errors**
- Ensure server CORS origin matches client URL

**Connection Refused**
- Verify both server and client are running
- Check firewall settings

**No Events Received**
- Confirm EventSource URL is correct
- Check browser console for errors

## 📚 Learn More

- [Youtube: Server-sent events implementation](https://www.youtube.com/watch?v=U8Q_ymz4KcU)
- [Medium: Polling techniques](https://medium.com/codex/long-polling-vs-sse-vs-websockets-vs-grpc-which-ones-right-for-your-app-d0b0e47cbb2f)
- [MDN: Using SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [Medium: Risk of SSE](https://medium.com/@2957607810/the-hidden-risks-of-sse-server-sent-events-what-developers-often-overlook-14221a4b3bfe )
