'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { iListing } from '@/types/listings';
import { useAuth } from '@/context/AuthContext';
import MessageThread from '@/components/MessageThread';

export default function ListingDetailPage() {
  const {user} = useAuth();
  const { id } = useParams();
  const [listing, setListing] = useState<iListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacting, setContacting] = useState(false);
  const [messaging, setMessaging] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/listings/${id}/detail/`);
        if (!res.ok) throw new Error('Failed to fetch listing');
        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="p-6">Loading listing...</div>;
  if (!listing) return <div className="p-6">Listing not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={listing.image || '/placeholder.jpg'}
        alt={listing.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
      <p className="text-gray-600 mb-1">{listing.location}</p>
      <p className="text-sm text-gray-500 mb-4">{listing.full_address}</p>
      <p className="text-blue-600 font-bold text-xl mb-4">{listing.price} / month</p>
      <h2 className="text-lg font-semibold mb-2">Description</h2>
      <p className="mb-4">{listing.description}</p>
      {/* Add amenities or booking section here later */}

      {listing.owner_profile && (
      <div className="border-t pt-4 mt-6">
        <h3 className="text-lg font-semibold mb-2">Listed by</h3>
        <div className="flex items-center gap-4">
          <img
            src={
              listing.owner_profile.avatar
                ? `http://127.0.0.1:8000${
                    listing.owner_profile.avatar.startsWith('/')
                      ? listing.owner_profile.avatar
                      : `/media/${listing.owner_profile.avatar}`
                  }`
                : '/placeholder.jpg'
            }
            alt="Owner avatar"
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm font-semibold">{listing.owner_email}</p>
            {listing.owner_profile.bio && (
              <p className="text-xs text-gray-500">{listing.owner_profile.bio}</p>
            )}
            {listing.owner_profile.phone && (
              <p className="text-xs text-gray-400">📞 {listing.owner_profile.phone}</p>
            )}
          </div>
        </div>
      </div>
    )}

    

    {user?.uid !== listing.owner_id && (
      <button
        onClick={() => setMessaging(true)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Message Owner
      </button>
    )}

    {messaging && listing.owner_id !== undefined && (
      <MessageThread
        receiverId={listing.owner_id}
        onClose={() => setMessaging(false)}
      />
    )}
    </div>
  );
}
