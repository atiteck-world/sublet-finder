'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { iListing } from '@/types/listings';
import { useEffect, useState } from 'react';
import EditListingModal from '@/components/EditListingModal';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<iListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingListing, setEditingListing] = useState<iListing | null>(null);


  useEffect(() => {
    if(!user) return;

    const fetchMylistings = async () => {
      try{
        const token = await user.getIdToken();

        const response = await fetch('http://127.0.0.1:8000/api/listings/mine/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch your listings.');
        const data = await response.json();
        setListings(data);
      }catch (err){
        console.error(err);
      }finally{
        setLoading(false);
      }
    };

    fetchMylistings();
  }, [user]);

  const handleDelete = async (id: number) => {
    if(!user) return;

    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if(!confirm) return;

    try{
      const token = await user.getIdToken();
      const response = await fetch(`http://127.0.0.1:8000/api/listings/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response) throw new Error('Failed to delete listing.');

      setListings((prev) => prev.filter((l) => l.id !== id));
    }catch (err){
      console.error(err);
      alert('Error deleting listing');
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Listings</h1>
        <p className="mb-4 text-sm text-gray-600">Logged in as: {user?.email}</p>
  
        {loading ? (
          <p>Loading your listings...</p>
        ): listings.length === 0 ? (
          <p>You have no listings yet.</p>
        ): (
        <div className="grid md:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded shadow p-4">
              <img
                src={listing.image || ''}
                alt={listing.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{listing.title}</h2>
              <p className="text-sm">{listing.location}</p>
              <p className="text-xs text-gray-500">{listing.full_address}</p>
              <p className="text-blue-600 font-bold">{listing.price}</p>
              <div className="mt-2 flex gap-3">
                <button
                onClick={() => setEditingListing(listing)}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">
                  Edit
                </button>
                <button
                onClick={() => handleDelete(listing.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {editingListing && (
          <EditListingModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onUpdate={(updated) => {
            setListings((prev) =>
              prev.map((l) => (l.id === updated.id ? updated : l))
            );
          }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
