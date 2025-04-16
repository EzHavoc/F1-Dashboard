
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const { data: carData } = useQuery('carData', async () => {
    const response = await fetch('http://localhost:8000/car-data');
    return response.json();
  });

  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-black text-neo-purple tracking-superwide uppercase font-display mb-2">Live Race Dashboard</h1>
      <p className="text-neo-white/70 text-lg font-mono tracking-tight">Real-time telemetry and race control updates</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-neo-gray border-4 border-neo-purple p-6 rounded-xl shadow-neo-lg shadow-neo-purple">
          <h2 className="text-3xl font-black text-neo-white tracking-tighter uppercase font-display mb-2">Car Telemetry</h2>
          <p className="text-neo-purple/80 text-sm font-mono mb-6">Live performance metrics</p>
          <div className="h-[300px] w-full">
            {carData && (
              <ResponsiveContainer>
                <LineChart data={carData.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#C4B5FD" className="font-mono text-xs" />
                  <YAxis stroke="#C4B5FD" className="font-mono text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F1F1F',
                      border: '2px solid #C4B5FD',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'JetBrains Mono' }} />
                  <Line type="monotone" dataKey="speed" stroke="#FDA4AF" strokeWidth={3} />
                  <Line type="monotone" dataKey="rpm" stroke="#86EFAC" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-neo-gray border-4 border-neo-pink p-6 rounded-xl shadow-neo-lg shadow-neo-pink">
          <h2 className="text-3xl font-black text-neo-white tracking-tighter uppercase font-display mb-2">Race Control</h2>
          <p className="text-neo-pink/80 text-sm font-mono mb-6">Track status and flags</p>
          <div className="space-y-4">
            <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-yellow">
              <p className="text-neo-yellow font-black uppercase tracking-wider">⚠️ Yellow Flag: Sector 2</p>
              <p className="text-neo-white/70 font-mono text-sm mt-1">Debris on track at Turn 7</p>
            </div>
            <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-blue">
              <p className="text-neo-blue font-black uppercase tracking-wider">🔵 Blue Flag: Car 44</p>
              <p className="text-neo-white/70 font-mono text-sm mt-1">Faster car approaching</p>
            </div>
            <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-green">
              <p className="text-neo-green font-black uppercase tracking-wider">✅ Track Clear</p>
              <p className="text-neo-white/70 font-mono text-sm mt-1">Racing conditions in all sectors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;