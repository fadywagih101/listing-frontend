import Link from 'next/link';
import { Apartment } from '@/types/apartment';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{apartment.name}</h2>
      <p className="text-sm text-gray-600">Unit: {apartment.unitNumber}</p>
      <p className="text-sm text-gray-600">Project: {apartment.project}</p>
      <Link
        href={`/apartment/${apartment.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
}
