import React from 'react';
import { Link } from 'react-router-dom';
import { Flag, Users, Calendar, Radio, Cloud } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-neo-gray border-b-4 border-neo-purple">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 hover:translate-y-[-2px] transition-transform">
            <Flag className="w-10 h-10 text-neo-purple" />
            <span className="text-2xl font-black text-neo-white tracking-superwide uppercase font-display">F1 Dash</span>
          </Link>
          <div className="flex space-x-4">
            {[
              { to: '/drivers', Icon: Users, label: 'Drivers', color: 'neo-pink' },
              { to: '/sessions', Icon: Calendar, label: 'Sessions', color: 'neo-green' },
              { to: '/team-radio', Icon: Radio, label: 'Radio', color: 'neo-yellow' },
              { to: '/weather', Icon: Cloud, label: 'Weather', color: 'neo-blue' },
            ].map(({ to, Icon, label, color }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 text-neo-black hover:translate-y-[-2px] transition-transform bg-${color} px-5 py-2 rounded-lg border-4 border-neo-black shadow-neo shadow-neo-black font-black uppercase tracking-wider font-display`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;