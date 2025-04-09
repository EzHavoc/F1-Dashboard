import React from 'react';
import { useQuery } from 'react-query';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

function Weather() {
  const { data: weather, isLoading } = useQuery('weather', async () => {
    const response = await fetch('http://localhost:8000/weather');
    return response.json();
  });

  if (isLoading) {
    return <div className="text-center text-neo-purple text-xl font-bold">Loading weather data...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neo-blue border-b-4 border-neo-blue pb-2">Track Weather</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {weather?.map((data: any) => (
          <div 
            key={data.weather_key} 
            className="bg-neo-blue border-4 border-white p-6 rounded-lg shadow-neo shadow-neo-green transform hover:translate-y-[-4px] transition-transform"
          >
            <div className="space-y-4">
              <div className="bg-white px-3 py-2 rounded border-2 border-neo-black flex items-center space-x-2">
                <Thermometer className="w-6 h-6 text-neo-pink" />
                <span className="text-neo-black font-medium">Air: {data.air_temperature}°C</span>
              </div>
              <div className="bg-neo-orange px-3 py-2 rounded border-2 border-neo-black flex items-center space-x-2">
                <Thermometer className="w-6 h-6 text-neo-black" />
                <span className="text-neo-black font-medium">Track: {data.track_temperature}°C</span>
              </div>
              <div className="bg-neo-purple px-3 py-2 rounded border-2 border-neo-black flex items-center space-x-2">
                <Wind className="w-6 h-6 text-neo-black" />
                <span className="text-neo-black font-medium">Wind: {data.wind_speed} km/h</span>
              </div>
              <div className="bg-neo-green px-3 py-2 rounded border-2 border-neo-black flex items-center space-x-2">
                <Droplets className="w-6 h-6 text-neo-black" />
                <span className="text-neo-black font-medium">Humidity: {data.humidity}%</span>
              </div>
              <div className="bg-neo-yellow px-3 py-2 rounded border-2 border-neo-black flex items-center space-x-2">
                <Cloud className="w-6 h-6 text-neo-black" />
                <span className="text-neo-black font-medium">Pressure: {data.pressure} hPa</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;