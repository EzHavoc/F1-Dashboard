import React from 'react';
import { Link } from 'react-router-dom';
import { Flag, Users, Calendar, Radio, Cloud } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-neo-purple shadow-neo shadow-neo-pink border-4 border-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:translate-y-[-2px] transition-transform">
            <Flag className="w-8 h-8" />
            <span className="text-xl font-bold text-neo-black">F1 Dashboard</span>
          </Link>
          <div className="flex space-x-6">
            {[
              { to: '/drivers', Icon: Users, label: 'Drivers' },
              { to: '/sessions', Icon: Calendar, label: 'Sessions' },
              { to: '/team-radio', Icon: Radio, label: 'Team Radio' },
              { to: '/weather', Icon: Cloud, label: 'Weather' },
            ].map(({ to, Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-1 text-neo-black hover:translate-y-[-2px] transition-transform bg-white px-4 py-2 rounded border-2 border-neo-black shadow-neo shadow-neo-black"
              >
                <Icon className="w-5 h-5" />
                <span className="font-bold">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;