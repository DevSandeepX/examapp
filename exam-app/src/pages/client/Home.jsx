import React from 'react';
import hero from '../../assets/hero.png'; // Replace with the path to your image

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Column */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <h1 className="text-4xl font-bold mb-2">Welcome to Our Online Test Services</h1>
          <h2 className="text-2xl font-semibold mb-4">Your Gateway to Success</h2>
          <p className="text-lg">
            We provide comprehensive online test services designed to help you prepare for your exams effectively. Our platform offers a variety of practice tests, detailed analytics, and personalized study plans to ensure you achieve your academic goals.
          </p>
        </div>
        {/* Right Column */}
        <div className="md:w-1/2">
          <img src={hero} alt="Online Test Services" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
