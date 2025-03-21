import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Gyansthaly</h2>
          <p className="text-gray-400">
            Your trusted platform for learning and career development. We offer a wide range of courses to boost your skills.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to={'/'} className="hover:text-white">Home</Link></li>
            <li><Link to={'/courses'} className="hover:text-white">Courses</Link></li>
            <li><Link to={'/about'} className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">Email: info@gyansthaly.com</p>
          <p className="text-gray-300 mb-2">Phone: +91 12345 67890</p>
          <p className="text-gray-300">Address: 123 Learning St, Knowledge City, India</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Gyansthaly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
