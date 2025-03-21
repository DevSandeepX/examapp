import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Gyansthaly</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          <Link to="/courses" className="text-white hover:text-gray-200">Courses</Link>
          <Link to="/auth-student" className="text-white hover:text-gray-200">Exam Panel</Link>
          <Link to="/admin" className="block bg-white text-blue-500 px-4 rounded p-2">Admin Login</Link>
        </div>
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block text-white hover:text-gray-200 p-2">Home</Link>
          <Link to="/about" className="block text-white hover:text-gray-200 p-2">About</Link>
          <Link to="/courses" className="block text-white hover:text-gray-200 p-2">Courses</Link>
          <Link to="/auth-student" className="block text-white hover:text-gray-200 p-2">Exam Panel</Link>
          <Link to="/exam-panel" className="block bg-white text-blue-500 px-4 rounded p-2">Admin Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
