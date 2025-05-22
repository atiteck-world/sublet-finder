'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

const dummyDetails = {
  id: '101',
  title: 'Sunny Room in Hamburg',
  description: 'A bright room available in a shared flat. Close to U-Bahn and shops.',
  location: 'Hamburg, Germany',
  fullAddress: 'Musterstraße 5, 22303 Hamburg',
  price: '€450/month',
  imageUrl: '/placeholder.jpg',
  amenities: ['Wi-Fi', 'Washing Machine', 'Balcony'],
};

export default function ListingDetailsPage() {
  const { id } = useParams();

  // In the real app, you’ll fetch listing data using the `id` param

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-3xl mx-auto">
        <img
          src={dummyDetails.imageUrl}
          alt={dummyDetails.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{dummyDetails.title}</h1>
        <p className="text-gray-600 mb-1">{dummyDetails.location}</p>
        <p className="text-sm text-gray-500 mb-4">{dummyDetails.fullAddress}</p>
        <p className="text-blue-600 font-bold text-xl mb-4">{dummyDetails.price}</p>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="mb-4">{dummyDetails.description}</p>
        <h2 className="text-lg font-semibold mb-2">Amenities</h2>
        <ul className="list-disc ml-5">
          {dummyDetails.amenities.map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
