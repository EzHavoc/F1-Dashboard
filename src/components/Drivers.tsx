import React from 'react';
import { useQuery } from 'react-query';
import {
  Globe,
  User,
  Hash,
  BadgeInfo,
  CalendarDays
} from 'lucide-react';

function Drivers() {
  const { data: drivers, isLoading } = useQuery('drivers', async () => {
    const response = await fetch('http://localhost:8000/drivers');
    return response.json();
  });

  const { data: sessions } = useQuery('sessions', async () => {
    const response = await fetch('http://localhost:8000/sessions');
    return response.json();
  });

  const enrichedDrivers = React.useMemo(() => {
    if (!drivers || !sessions) return [];

    const sessionMap = new Map();
    sessions.forEach((session: any) => {
      sessionMap.set(session.session_key, {
        session_name: session.session_name,
        country_code: session.country_code,
        date: session.date_start,
      });
    });

    return drivers
      .map((driver: any) => {
        const session = sessionMap.get(driver.session_key);
        return {
          ...driver,
          session_name: session?.session_name || 'Unknown Session',
          session_country: session?.country_code || 'ZZ',
          session_date: session?.date || '',
        };
      })
      .sort((a: any, b: any) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime());
  }, [drivers, sessions]);

  if (isLoading || !drivers || !sessions) {
    return (
      <div className="text-center text-white text-xl font-bold">Loading drivers...</div>
    );
  }

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white border-b-4 border-purple-600 pb-2">
        F1 Drivers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrichedDrivers.map((driver: any) => (
          <div
            key={driver.driver_number}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg transform hover:-translate-y-1 hover:border-purple-500 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(192,132,252,0.5)]"
          >
            <div className="flex items-center gap-4">
              <img
                src={driver.headshot_url}
                alt={driver.full_name}
                className="w-16 h-16 rounded-full border border-zinc-700 object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {driver.broadcast_name}
                </h2>
                <p className="text-sm text-zinc-400">{driver.name_acronym}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p className="bg-zinc-800 px-3 py-1 rounded border border-zinc-600 text-white flex items-center gap-2">
                <User size={16} /> Full Name: {driver.full_name}
              </p>
              <p className="bg-zinc-800 px-3 py-1 rounded border border-zinc-600 text-white flex items-center gap-2">
                <Hash size={16} /> Driver Number: {driver.driver_number}
              </p>
              <p className="bg-zinc-800 px-3 py-1 rounded border border-zinc-600 flex items-center gap-2">
                <BadgeInfo size={16} />
                <span style={{ color: `#${driver.team_colour}` }}>
                  Team: {driver.team_name}
                </span>
              </p>
              <p className="bg-zinc-800 px-3 py-1 rounded border border-zinc-600 text-white flex items-center gap-2">
                <Globe size={16} /> Race Country:{' '}
                <span className="uppercase">{driver.session_country}</span>
              </p>
              <p className="bg-zinc-800 px-3 py-1 rounded border border-zinc-600 text-white flex items-center gap-2">
                <CalendarDays size={16} /> Session: {driver.session_name}
              </p>
              <p className="bg-zinc-800 px-3 py-1 rounded border border-zinc-600 text-white flex items-center gap-2">
                <CalendarDays size={16} />
                {new Date(driver.session_date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;
