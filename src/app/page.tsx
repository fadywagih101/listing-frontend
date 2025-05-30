'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Apartment } from '@/types/apartment';
import ApartmentCard from '@/components/ApartmentCard';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({ name: '', unitNumber: '', project: '' });

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.unitNumber) params.append('unitNumber', filters.unitNumber);
    if (filters.project) params.append('project', filters.project);

    try {
      const res = await api.get(`/apartments/search?${params.toString()}`);
      setApartments(res.data);
    } catch (err) {
      console.error('Search error', err);
    }
  };

  useEffect(() => {
    api.get('/apartments')
      .then(res => setApartments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Available Apartments</h1>
        <button onClick={() => setFiltersVisible(!filtersVisible)}>
          <Search className="w-6 h-6" />
        </button>
      </div>

      {filtersVisible && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Search by unit number"
            value={filters.unitNumber}
            onChange={(e) => setFilters({ ...filters, unitNumber: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Search by project"
            value={filters.project}
            onChange={(e) => setFilters({ ...filters, project: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {apartments.map((apt) => (
          <ApartmentCard key={apt.id} apartment={apt} />
        ))}
      </div>
    </div>
  );
}
