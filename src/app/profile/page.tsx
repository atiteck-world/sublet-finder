'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ProfileData {
  bio: string;
  phone: string;
  avatar?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({ bio: '', phone: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<File | null>(null);


  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch('http://127.0.0.1:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append('bio', profile.bio);
      formData.append('phone', profile.phone);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const res = await fetch('http://127.0.0.1:8000/api/users/profile/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update profile');

      alert('Profile updated with avatar!');
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Error saving profile');
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border p-2 rounded ${!editing ? 'bg-gray-100' : ''}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={3}
            disabled={!editing}
            className={`w-full border p-2 rounded ${!editing ? 'bg-gray-100' : ''}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setAvatar(e.target.files[0]);
            }}
            className="w-full"
          />
        </div>

        {profile.avatar ? (
          <img
            src={
              profile.avatar.startsWith('http')
                ? profile.avatar
                : `http://127.0.0.1:8000/${
                    profile.avatar.startsWith('media') ? profile.avatar : `media/${profile.avatar}`
                  }`
            }
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Avatar
          </div>
        )}

        {!editing ? (
          <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
