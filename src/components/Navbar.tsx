import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">CerebroSync</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition">Home</Link>
            <Link to="/assessment" className="text-gray-600 hover:text-purple-600 transition">Assessment</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition">Dashboard</Link>
            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition">About</Link>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
              Start Test
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;