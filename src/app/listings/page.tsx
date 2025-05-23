'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { iListing } from '@/types/listings';


export default function ListingsPage() {
  const [listings, setListings] = useState<iListing[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try{
        const response = await fetch('http://127.0.0.1:8000/api/listings/');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();
        setListings(data);

      }catch (err) {
        console.error(err);
      }finally{
        setloading(false);
      }
    };

    fetchListings();

  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Available Listings</h1>
        {loading ? (
          <p>Loading Listings...</p>
        ): listings.length === 0 ? (
          <p>No Listings Found...</p>
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
                <p className="text-sm text-gray-600">{listing.location}</p>
                <p className="text-sm text-gray-600">{listing.full_address}</p>
                <p className="text-blue-600 font-bold">{listing.price} / month</p>

                {/* 👤 Owner Info */}
                {listing.owner_profile && (
                  <div className="flex items-center gap-3 mt-3">
                    <img
                      src={`http://127.0.0.1:8000${
                        listing.owner_profile?.avatar?.startsWith('/') ? listing.owner_profile.avatar
                        : `/media/${listing.owner_profile?.avatar ?? ''}`
                      }`}
                      alt="Owner avatar"
                      className="w-10 h-10 rounded-full object-cover border"
                    />

                    <div>
                      <p className="text-sm font-semibold">{listing.owner_email}</p>
                      {listing.owner_profile.bio && (
                        <p className="text-xs text-gray-500">{listing.owner_profile.bio}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 🔗 Link to full listing */}
                <a
                  href={`/listings/${listing.id}`}
                  className="text-sm text-blue-500 hover:underline mt-4 inline-block"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>


        )}
      
      </div>
    </ProtectedRoute>
  );
}
