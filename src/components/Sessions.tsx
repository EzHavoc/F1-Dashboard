import React from 'react';
import { useQuery } from 'react-query';

function Sessions() {
  const { data: sessions, isLoading } = useQuery('sessions', async () => {
    const response = await fetch('http://localhost:8000/sessions');
    return response.json();
  });

  if (isLoading) {
    return <div className="text-center text-neo-purple text-xl font-bold">Loading sessions...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neo-green border-b-4 border-neo-green pb-2">Race Sessions</h1>
      <div className="grid gap-8">
        {sessions?.map((session: any) => (
          <div 
            key={session.session_key} 
            className="bg-neo-green border-4 border-white p-6 rounded-lg shadow-neo shadow-neo-blue transform hover:translate-y-[-4px] transition-transform"
          >
            <h2 className="text-2xl font-bold text-neo-black">{session.session_name}</h2>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="bg-white px-3 py-1 rounded border-2 border-neo-black text-neo-black font-medium">
                  Type: {session.session_type}
                </p>
                <p className="bg-neo-yellow px-3 py-1 rounded border-2 border-neo-black text-neo-black font-medium">
                  Status: {session.status}
                </p>
              </div>
              <div className="space-y-3">
                <p className="bg-neo-purple px-3 py-1 rounded border-2 border-neo-black text-neo-black font-medium">
                  Track: {session.circuit_short_name}
                </p>
                <p className="bg-neo-pink px-3 py-1 rounded border-2 border-neo-black text-neo-black font-medium">
                  Date: {new Date(session.date_start).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sessions;