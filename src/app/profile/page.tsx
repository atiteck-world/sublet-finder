'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    // Placeholder for updating profile in Firebase or Django
    alert('Profile updated (not yet connected to backend)');
    setEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto p-6 mt-10 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={!editing}
              className={`w-full border p-2 rounded ${!editing ? 'bg-gray-100' : ''}`}
            />
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
