import React, { useState } from 'react';
import { useQuery } from 'react-query';

function TeamRadio() {
  const [selectedSessionKey, setSelectedSessionKey] = useState<number | null>(null);

  // Fetch available sessions
  const { data: sessions, isLoading: loadingSessions } = useQuery('sessions', async () => {
    const response = await fetch('http://localhost:8000/sessions');
    return response.json();
  });

  // Fetch team radio messages for the selected session
  const { data: radioMessages, isLoading: loadingRadio } = useQuery(
    ['teamRadio', selectedSessionKey],
    async () => {
      const response = await fetch(`http://localhost:8000/team-radio?session_key=${selectedSessionKey}`);
      return response.json();
    },
    {
      enabled: !!selectedSessionKey, // Only fetch if session is selected
    }
  );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neo-orange border-b-4 border-neo-orange pb-2">Team Radio</h1>

      {/* Session Selector */}
      {loadingSessions ? (
        <p className="text-center text-neo-purple font-semibold">Loading sessions...</p>
      ) : (
        <div className="mb-6">
          <label className="block text-lg font-medium text-neo-black mb-2">Select a Session:</label>
          <select
            className="border-2 border-neo-black rounded p-2 w-full"
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

      {/* Team Radio Messages */}
      {loadingRadio && selectedSessionKey ? (
        <p className="text-center text-neo-purple font-semibold">Loading team radio messages...</p>
      ) : (
        <div className="space-y-6">
          {radioMessages?.length === 0 ? (
            <p className="text-neo-black text-lg font-semibold">No team radio available for this session.</p>
          ) : (
            radioMessages?.map((message: any) => (
              <div
                key={message.radio_key}
                className="bg-neo-orange border-4 border-white p-6 rounded-lg shadow-neo shadow-neo-yellow transform hover:translate-y-[-4px] transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-neo-black">Driver #{message.driver_number}</h2>
                    <p className="text-neo-black mt-1 bg-white px-3 py-1 rounded border-2 border-neo-black inline-block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {message.audio_url && (
                    <audio
                      controls
                      className="ml-4 bg-neo-yellow border-2 border-neo-black rounded"
                    >
                      <source src={message.audio_url} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
                <p className="mt-4 bg-neo-pink px-4 py-2 rounded border-2 border-neo-black text-neo-black font-medium">
                  {message.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TeamRadio;
