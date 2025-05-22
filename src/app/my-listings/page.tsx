'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

const dummyUserListings = [
  {
    id: '101',
    title: 'Sunny Room in Hamburg',
    location: 'Hamburg, Germany',
    fullAddress: 'Musterstraße 5, 22303 Hamburg',
    price: '€450/month',
    imageUrl: '/placeholder.jpg',
  },
  {
    id: '102',
    title: 'Shared Flat near Stuttgart Uni',
    location: 'Stuttgart, Germany',
    fullAddress: 'Unistraße 10, 70569 Stuttgart',
    price: '€550/month',
    imageUrl: '/placeholder.jpg',
  },
];

export default function MyListingsPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Listings</h1>
        <p className="mb-4 text-sm text-gray-600">Logged in as: {user?.email}</p>

        <div className="grid md:grid-cols-2 gap-4">
          {dummyUserListings.map((listing) => (
            <div key={listing.id} className="border rounded shadow p-4">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{listing.title}</h2>
              <p className="text-sm">{listing.location}</p>
              <p className="text-xs text-gray-500">{listing.fullAddress}</p>
              <p className="text-blue-600 font-bold">{listing.price}</p>
              <div className="mt-2 flex gap-3">
                <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
