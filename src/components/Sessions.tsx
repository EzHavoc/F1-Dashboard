import React from 'react';
import { useQuery } from 'react-query';

interface Session {
  session_key: number;
  session_name: string;
  session_type: string;
  status: string;
  circuit_short_name: string;
  date_start: string;
}

function Sessions() {
  const { data, isLoading, isError } = useQuery('sessions', async () => {
    const response = await fetch('http://localhost:8000/sessions');
    if (!response.ok) {
      throw new Error('Failed to fetch sessions');
    }
    return response.json();
  });

  const sessions: Session[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div
        className="text-center text-neo-purple text-xl font-bold"
        aria-busy="true"
      >
        Loading sessions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 text-xl font-bold">
        Failed to load sessions. Please try again later.
      </div>
    );
  }

  const sortedSessions = sessions.sort((a, b) =>
    new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
  );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neo-green border-b-4 border-neo-green pb-2">
        Race Sessions
      </h1>
      <div className="grid gap-8">
        {sortedSessions.map((session) => (
          <div
            key={session.session_key}
            className="bg-neo-green border-4 border-white p-6 rounded-lg shadow-neo shadow-neo-blue transform hover:translate-y-[-4px] transition-transform"
          >
            <h2 className="text-2xl font-bold text-neo-black">
              {session.session_name}
            </h2>
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
