import React from 'react';
import { useQuery } from 'react-query';

function Drivers() {
  const { data: drivers, isLoading } = useQuery('drivers', async () => {
    const response = await fetch('http://localhost:8000/drivers');
    return response.json();
  });

  if (isLoading) {
    return <div className="text-center text-neo-purple text-xl font-bold">Loading drivers...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neo-purple border-b-4 border-neo-purple pb-2">F1 Drivers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drivers?.map((driver: any) => (
          <div 
            key={driver.driver_number} 
            className="bg-neo-blue border-4 border-white p-6 rounded-lg shadow-neo shadow-neo-purple transform hover:translate-y-[-4px] transition-transform"
          >
            <h2 className="text-2xl font-bold text-neo-black">{driver.full_name}</h2>
            <div className="mt-4 space-y-2 text-neo-black font-medium">
              <p className="bg-white px-3 py-1 rounded border-2 border-neo-black">Number: {driver.driver_number}</p>
              <p className="bg-neo-green px-3 py-1 rounded border-2 border-neo-black">Team: {driver.team_name}</p>
              <p className="bg-neo-yellow px-3 py-1 rounded border-2 border-neo-black">Status: {driver.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;