import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { Cloud, Droplets, Wind, Thermometer, Umbrella, Calendar } from 'lucide-react';

function Weather() {
  const { data: weather, isLoading, isError } = useQuery(
    'weather',
    async () => {
      const response = await fetch('https://api.openf1.org/v1/weather');
      return response.json();
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  useEffect(() => {
    if (weather) console.log(weather);
  }, [weather]);

  if (isLoading) {
    return <div className="text-center text-neo-blue text-xl font-bold">Loading weather data...</div>;
  }

  if (isError || !Array.isArray(weather)) {
    return (
      <div className="text-center text-red-500 text-xl font-bold">
        Failed to load or parse weather data.
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-black min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold text-neo-blue border-b-4 border-neo-blue pb-2">Track Weather</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {weather.map((data: any, index: number) => (
          <div
            key={index}
            className="bg-black border-4 border-neo-blue p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-transform"
          >
            <div className="space-y-4 text-white">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-6 h-6 text-neo-yellow" />
                <span>Air Temp: {data.air_temperature ?? 'N/A'}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Thermometer className="w-6 h-6 text-neo-orange" />
                <span>Track Temp: {data.track_temperature ?? 'N/A'}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-6 h-6 text-neo-green" />
                <span>Wind: {data.wind_speed ?? 'N/A'} km/h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-6 h-6 text-neo-purple" />
                <span>Humidity: {data.humidity ?? 'N/A'}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="w-6 h-6 text-neo-pink" />
                <span>Pressure: {data.pressure ?? 'N/A'} hPa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Umbrella className="w-6 h-6 text-neo-yellow" />
                <span>Rainfall: {data.rainfall ?? '0'} mm</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-neo-green" />
                <span>Date: {data.date ? new Date(data.date).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
