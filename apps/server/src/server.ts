import '@dotenvx/dotenvx/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { pino } from 'pino';
import { Server as SocketIOServer } from 'socket.io';

import { DrawingEvent } from '@drawing-app/types';

const app = express();
const server = http.createServer(app);

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

const canvasStore: Record<string, DrawingEvent[]> = {};

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join room
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    logger.info(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Receive and broadcast drawing to room
  socket.on('draw', ({ roomId, stroke }: { roomId: string; stroke: DrawingEvent }) => {
    if (!roomId || !stroke) return;

    if (!canvasStore[roomId]) {
      canvasStore[roomId] = [];
    }
    canvasStore[roomId].push(stroke);

    logger.info(`Room ${roomId} - Draw`);
    socket.to(roomId).emit('draw', stroke);
  });

  // Handle full canvas request
  socket.on('request-canvas-data', ({ roomId }) => {
    const canvasData = canvasStore[roomId] || [];
    logger.info(`Room ${roomId} - Canvas-Data`);
    socket.emit('canvas-data', canvasData);
  });

  // Receive action controls
  socket.on('canvas-action', ({ type, roomId }) => {
    logger.info(`Room ${roomId} - Canvas-Action ${type}`);
    socket.to(roomId).emit('canvas-action', { type });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  logger.info(`CORS origin set to: ${corsOrigin}`);
});
