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
            <Link
              to="/drivers"
              className="flex items-center space-x-2 text-neo-black hover:translate-y-[-2px] transition-transform bg-neo-pink px-5 py-2 rounded-lg border-4 border-neo-black shadow-neo shadow-neo-black font-black uppercase tracking-wider font-display"
            >
              <Users className="w-5 h-5" />
              <span>Drivers</span>
            </Link>
            <Link
              to="/sessions"
              className="flex items-center space-x-2 text-neo-black hover:translate-y-[-2px] transition-transform bg-neo-green px-5 py-2 rounded-lg border-4 border-neo-black shadow-neo shadow-neo-black font-black uppercase tracking-wider font-display"
            >
              <Calendar className="w-5 h-5" />
              <span>Sessions</span>
            </Link>
            <Link
              to="/team-radio"
              className="flex items-center space-x-2 text-neo-black hover:translate-y-[-2px] transition-transform bg-neo-yellow px-5 py-2 rounded-lg border-4 border-neo-black shadow-neo shadow-neo-black font-black uppercase tracking-wider font-display"
            >
              <Radio className="w-5 h-5" />
              <span>Radio</span>
            </Link>
            <Link
              to="/weather"
              className="flex items-center space-x-2 text-neo-black hover:translate-y-[-2px] transition-transform bg-neo-blue px-5 py-2 rounded-lg border-4 border-neo-black shadow-neo shadow-neo-black font-black uppercase tracking-wider font-display"
            >
              <Cloud className="w-5 h-5" />
              <span>Weather</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
