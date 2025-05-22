'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

const dummyListings = [
  {
    id: '1',
    title: 'Cozy 2-Bedroom Apartment in Berlin',
    location: 'Berlin, Germany',
    price: '€900/month',
    imageUrl: '/placeholder.jpg',
  },
  {
    id: '2',
    title: 'Modern Studio near TU Munich',
    location: 'Munich, Germany',
    price: '€700/month',
    imageUrl: '/placeholder.jpg',
  },
];

export default function ListingsPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Available Listings</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {dummyListings.map((listing) => (
            <div key={listing.id} className="border rounded shadow p-4">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{listing.title}</h2>
              <p className="text-sm text-gray-600">{listing.location}</p>
              <p className="text-blue-600 font-bold">{listing.price}</p>
              <a
                href={`/listings/${listing.id}`}
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
