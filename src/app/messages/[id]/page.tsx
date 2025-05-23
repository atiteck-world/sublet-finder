'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: number;
  content: string;
  sender_email: string;
  receiver_email: string;
  timestamp: string;
}

export default function MessageThreadPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<iMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const userId = parseInt(id as string);

  const fetchMessages = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`http://127.0.0.1:8000/api/users/messages/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, [userId, user]);

  const handleSend = async () => {
    const token = await user?.getIdToken();
    const res = await fetch(`http://127.0.0.1:8000/api/users/messages/${userId}/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newMessage }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, data]);
    setNewMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Conversation</h1>

      <div className="border rounded p-4 h-96 overflow-y-auto mb-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[80%] ${
              msg.sender_email === user?.email
                ? 'ml-auto bg-blue-100 text-right'
                : 'mr-auto bg-white'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={3}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
