import React from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Dashboard() {
  const { data: carData } = useQuery('carData', async () => {
    const response = await fetch('http://localhost:8000/car-data');
    return response.json();
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Live Race Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Car Telemetry</h2>
          {carData && (
            <LineChart width={500} height={300} data={carData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="speed" stroke="#8884d8" />
              <Line type="monotone" dataKey="rpm" stroke="#82ca9d" />
            </LineChart>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Race Control Messages</h2>
          <div className="space-y-2">
            {/* Race control messages will go here */}
            <p className="text-yellow-400">Yellow flag in sector 2</p>
            <p className="text-blue-400">Blue flag: Car 44 approaching</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;