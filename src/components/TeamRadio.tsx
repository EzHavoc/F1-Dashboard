import React from 'react';
import { useQuery } from 'react-query';

function TeamRadio() {
  const { data: radioMessages, isLoading } = useQuery('teamRadio', async () => {
    const response = await fetch('http://localhost:8000/team-radio');
    return response.json();
  });

  if (isLoading) {
    return <div className="text-center text-neo-purple text-xl font-bold">Loading team radio...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neo-orange border-b-4 border-neo-orange pb-2">Team Radio</h1>
      <div className="space-y-6">
        {radioMessages?.map((message: any) => (
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
        ))}
      </div>
    </div>
  );
}

export default TeamRadio;