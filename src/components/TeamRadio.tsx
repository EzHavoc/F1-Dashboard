import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';

function TeamRadio() {
  const [selectedSessionKey, setSelectedSessionKey] = useState<number | null>(null);
  const [filterDriver, setFilterDriver] = useState<string>('');
  const [filterMessage, setFilterMessage] = useState<string>('');

  // Fetch available sessions
  const { data: sessions, isLoading: loadingSessions } = useQuery('sessions', async () => {
    const response = await fetch('http://localhost:8000/sessions');
    return response.json();
  });

  // Fetch team radio messages for the selected session using the correct API endpoint
  const { data: radioMessages, isLoading: loadingRadio } = useQuery(
    ['teamRadio', selectedSessionKey],
    async () => {
      const response = await fetch(`https://api.openf1.org/v1/team_radio?session_key=${selectedSessionKey}`);
      return response.json();
    },
    {
      enabled: !!selectedSessionKey,
    }
  );

  const sortedRadioMessages = useMemo(() => {
    return Array.isArray(radioMessages)
      ? [...radioMessages]
          .filter((message: any) => {
            return (
              (!filterDriver || message.driver_number.toString().includes(filterDriver)) &&
              (!filterMessage || message.message.toLowerCase().includes(filterMessage.toLowerCase()))
            );
          })
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      : [];
  }, [radioMessages, filterDriver, filterMessage]);

  return (
    <div className="space-y-8 bg-neutral-900 min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold text-neo-yellow border-b-4 border-neo-yellow pb-2">
        Team Radio
      </h1>

      {/* Session Selector */}
      {loadingSessions ? (
        <p className="text-center text-neo-yellow font-semibold">Loading sessions...</p>
      ) : (
        <div className="mb-6">
          <label className="block text-lg font-medium text-neo-yellow mb-2">
            Select a Session:
          </label>
          <select
            className="border-2 border-neo-yellow bg-neutral-800 text-white rounded p-2 w-full"
            onChange={(e) => setSelectedSessionKey(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              -- Choose a session --
            </option>
            {sessions?.map((session: any) => (
              <option key={session.session_key} value={session.session_key}>
                {session.session_name} - {new Date(session.date_start).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filter Bar */}
      {selectedSessionKey && (
        <div className="space-y-4 mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={filterDriver}
              onChange={(e) => setFilterDriver(e.target.value)}
              placeholder="Filter by Driver Number"
              className="bg-neutral-800 text-white border-2 border-neo-yellow rounded p-2 w-1/2"
            />
            <input
              type="text"
              value={filterMessage}
              onChange={(e) => setFilterMessage(e.target.value)}
              placeholder="Filter by Message"
              className="bg-neutral-800 text-white border-2 border-neo-yellow rounded p-2 w-1/2"
            />
          </div>
        </div>
      )}

      {/* Team Radio Messages */}
      {loadingRadio && selectedSessionKey ? (
        <p className="text-center text-neo-yellow font-semibold">Loading team radio messages...</p>
      ) : (
        <div className="space-y-6">
          {sortedRadioMessages.length === 0 ? (
            <p className="text-white text-lg font-semibold">No team radio available for this session.</p>
          ) : (
            sortedRadioMessages.map((message: any) => (
              <div
                key={message.radio_key}
                className="bg-neutral-800 border-4 border-neo-yellow p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-extrabold text-neo-yellow">
                      Driver #{message.driver_number}
                    </h2>
                  </div>
                  {message.recording_url && (
                    <audio controls className="ml-4 bg-neo-yellow border-2 border-neo-yellow rounded">
                      <source src={message.recording_url} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>

                {message.message && (
                  <p className="mt-4 bg-neo-yellow px-4 py-2 rounded border-2 border-neo-yellow text-white font-medium">
                    {message.message}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TeamRadio;
