'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: number;
  sender_email: string;
  content: string;
  timestamp: string;
}

export default function InboxPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchInbox = async () => {
      const token = await user?.getIdToken();
      const res = await fetch('http://127.0.0.1:8000/api/users/inbox/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data);
    };

    fetchInbox();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      {messages.length === 0 ? (
        <p className="text-gray-600">You have no messages.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg.id} className="border rounded p-4 shadow">
              <p className="font-semibold text-sm">{msg.sender_email}</p>
              <p className="text-gray-700">{msg.content}</p>
              <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
              <a
                href={`/messages/${msg.sender_email}`}
                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
              >
                View Conversation →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
