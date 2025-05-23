'use client';

import { useState } from 'react';
import { iListing } from '@/types/listings';
import { useAuth } from '@/context/AuthContext';

interface Props {
  listing: iListing;
  onClose: () => void;
  onUpdate: (updated: iListing) => void;
}

export default function EditListingModal({ listing, onClose, onUpdate }: Props) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description,
    location: listing.location,
    full_address: listing.full_address,
    price: listing.price.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const token = await user.getIdToken();

      const res = await fetch(`http://127.0.0.1:8000/api/listings/${listing.id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!res.ok) throw new Error('Failed to update listing');

      const updated = await res.json();
      onUpdate(updated);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow relative z-[1001]">
        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Description"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Location"
          />
          <input
            type="text"
            name="full_address"
            value={formData.full_address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Full Address"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Price (€)"
          />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="text-gray-600 hover:underline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
