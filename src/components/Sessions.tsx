import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';

interface Session {
  session_name: string;
  session_type: string;
  circuit_short_name: string;
  country_name: string;
  date_end: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  year: number;
}

function Sessions() {
  const { data, isLoading, isError } = useQuery('sessions', async () => {
    const response = await fetch('https://api.openf1.org/v1/sessions');
    if (!response.ok) {
      throw new Error('Failed to fetch sessions');
    }
    return response.json();
  });

  const sessions: Session[] = Array.isArray(data) ? data : [];

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const filteredSessions = useMemo(() => {
    return [...sessions]
      .filter((session) => {
        return (
          (!selectedCountry || session.country_name === selectedCountry) &&
          (!selectedType || session.session_type === selectedType) &&
          (!selectedYear || session.year.toString() === selectedYear)
        );
      })
      .sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime())
      .slice(0, 20);
  }, [sessions, selectedCountry, selectedType, selectedYear]);

  const countryOptions = [...new Set(sessions.map((s) => s.country_name))].sort();
  const typeOptions = [...new Set(sessions.map((s) => s.session_type))].sort();
  const yearOptions = [...new Set(sessions.map((s) => s.year.toString()))].sort((a, b) => +b - +a);

  if (isLoading) {
    return (
      <div className="text-center text-neo-green text-xl font-bold" aria-busy="true">
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

  return (
    <div className="bg-neutral-900 min-h-screen text-white p-8 space-y-10">
      <h1 className="text-4xl font-extrabold text-neo-green border-b-4 border-neo-green pb-2">
        Race Sessions
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-neutral-800 text-neo-green border-2 border-neo-green p-2 rounded font-bold"
        >
          <option value="">All Countries</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-neutral-800 text-neo-green border-2 border-neo-green p-2 rounded font-bold"
        >
          <option value="">All Session Types</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-neutral-800 text-neo-green border-2 border-neo-green p-2 rounded font-bold"
        >
          <option value="">All Years</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid gap-8">
        {filteredSessions.map((session, index) => (
          <div
            key={index}
            className="bg-neutral-800 border-4 border-neo-green p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform"
          >
            <h2 className="text-2xl font-extrabold text-neo-green mb-4">
              {session.session_name} ({session.session_type})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                Circuit: {session.circuit_short_name}
              </div>
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                Country: {session.country_name}
              </div>
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                Location: {session.location}
              </div>
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                Start: {new Date(session.date_start).toLocaleString()}
              </div>
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                End: {new Date(session.date_end).toLocaleString()}
              </div>
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                GMT Offset: {session.gmt_offset}
              </div>
              <div className="bg-neutral-800 p-3 rounded-md border-2 border-neo-green font-semibold">
                Year: {session.year}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sessions;
