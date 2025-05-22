'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AddListingPage() {
  const [formData, setFormData] = useState({
  title: '',
  description: '',
  location: '',
  fullAddress: '', // ✅ new field
  price: '',
  image: null as File | null,
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit Listing:', formData);
    alert('Listing submitted (not yet connected to backend)');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Add New Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="Address"
            placeholder="Full Address"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (€)"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
