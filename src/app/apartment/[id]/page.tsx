'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Apartment } from '@/types/apartment';
import { api } from '@/lib/api';

export default function ApartmentDetailsPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    api.get(`/apartments/${id}`)
      .then(res => setApartment(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!apartment) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{apartment.name}</h1>
      <p className="mt-2 text-gray-600">Unit: {apartment.unitNumber}</p>
      <p className="text-gray-600">Project: {apartment.project}</p>
      <p className="text-gray-600">price: {apartment.price}</p>
      <p className="text-gray-600">address: {apartment.address}</p>
      <p className="text-gray-600">space: {apartment.space}</p>
      <img src={apartment.imageUrl} alt={apartment.name} width={200} height={150} />
      {apartment.description && (
        <p className="mt-4">{apartment.description}</p>
      )}
    </div>
  );
}
