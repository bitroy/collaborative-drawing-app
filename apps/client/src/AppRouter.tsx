// src/AppRouter.tsx
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import App from './App';
import socket from './lib/socket';

function RoomRedirect() {
  const roomId = uuidv4().slice(0, 8); // Short and unique
  return <Navigate to={`/room/${roomId}`} replace />;
}

function RoomWrapper() {
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) return;
    socket.emit('join-room', roomId);
  }, [roomId]);

  if (!roomId) return <div>Invalid room</div>;
  return <App roomId={roomId} />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomRedirect />} />
        <Route path="/room/:roomId" element={<RoomWrapper />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
