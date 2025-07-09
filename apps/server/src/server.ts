import '@dotenvx/dotenvx/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import pino from 'pino';
import { Server as SocketIOServer } from 'socket.io';

import { DrawingEvent } from '@drawing-app/types';

const app = express();
const server = http.createServer(app);

// Use CORS middleware
// The origin should match your client's development URL
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: corsOrigin,
    methods: ['GET', 'POST'],
  })
);

const io = new SocketIOServer(server, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const logger = pino({
  level: LOG_LEVEL,
});

// Basic Express route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info('A user connected:', socket.id);

  // Example: Listen for 'draw' events from the client
  socket.on('draw', (drawingEvent: DrawingEvent) => {
    logger.info('Received drawing event:', drawingEvent);
    // Broadcast the drawing event to all other connected clients
    socket.broadcast.emit('draw', drawingEvent);
  });

  socket.on('disconnect', () => {
    logger.info('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  logger.info(`CORS origin set to: ${corsOrigin}`);
});
