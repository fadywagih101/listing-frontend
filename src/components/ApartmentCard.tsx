import Link from 'next/link';
import { Apartment } from '@/types/apartment';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition">
      {apartment.imageUrl && (
        <img
          src={apartment.imageUrl}
          alt={apartment.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-xl font-semibold">{apartment.name}</h2>
      <p className="text-sm text-gray-600">Unit Number: {apartment.unitNumber}</p>
      <p className="text-sm text-gray-600">Project: {apartment.project}</p>
      <p className="text-sm text-gray-600">Price: {apartment.price}</p>
      <Link
        href={`/apartment/${apartment.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
}
