'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function AddListingPage() {
  const {user} = useAuth();

  const [formData, setFormData] = useState({
  title: '',
  description: '',
  location: '',
  fullAddress: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!user) return alert("Not Authencicated...");

    try{
      const token = await user.getIdToken();

      const body = new FormData();
      body.append('title', formData.title);
      body.append('description', formData.description);
      body.append('location', formData.location);
      body.append('full_address', formData.fullAddress);
      body.append('price', formData.price);

      if(formData.image){
        body.append('image', formData.image);
      }

      const response = await fetch('http://127.0.0.1:8000/api/listings/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body,
      });

      if(!response.ok) throw new Error('Failed to submit listing');
      alert('Listing submitted successfully.');

    }catch (err: any) {
      console.error(err);
      alert(err.message);
    }
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
            name="fullAddress"
            placeholder="Full Address"
            required
            rows={4}
            value={formData.fullAddress}
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
