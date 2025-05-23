'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Props {
  receiverId: number;
  onClose: () => void;
}

export default function MessageThread({ receiverId, onClose }: Props) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<iMessage[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const token = await user?.getIdToken();
      const res = await fetch(`http://127.0.0.1:8000/api/users/messages/${receiverId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, [receiverId, user]);

  const handleSend = async () => {
    const token = await user?.getIdToken();
    const res = await fetch(`http://127.0.0.1:8000/api/users/messages/${receiverId}/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiver: receiverId, content }),
    });
    const newMessage = await res.json();
    setMessages((prev) => [...prev, newMessage]);
    setContent('');
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
        <h2 className="text-xl font-semibold mb-4">Conversation</h2>
        <div className="h-64 overflow-y-auto border p-3 rounded mb-4 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded ${
                msg.sender_email === user?.email ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-100'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={3}
          placeholder="Write a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
