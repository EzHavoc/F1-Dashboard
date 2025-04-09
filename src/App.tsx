import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Drivers from './components/Drivers';
import Sessions from './components/Sessions';
import TeamRadio from './components/TeamRadio';
import Weather from './components/Weather';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-neo-black text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/team-radio" element={<TeamRadio />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App