import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClearStorage = () => {
    localStorage.removeItem('token'); // Remove only the 'token' item from localStorage
    navigate('/admin/login'); // Navigate to the login page
  };
  return (
    <div className='min-h-screen px-2 md:px-4 bg-[#2D336B]'>
      <h2 className='py-8 text-xl md:text-2xl text-white'>Dashboard</h2>
      <div className='flex flex-col gap-4'>
      <button onClick={handleClearStorage} className='border rounded px-4 py-2 text-white hover:bg-[#3E4A8A]'>Logout</button>
        <Link to="/admin/students" className='border rounded px-4 py-2 text-white hover:bg-[#3E4A8A]'>Add Student</Link>
        <Link to="/admin/questions" className='border rounded px-4 py-2 text-white hover:bg-[#3E4A8A]'>Add Question</Link>
        <Link to="/admin/courses" className='border rounded px-4 py-2 text-white hover:bg-[#3E4A8A]'>Add Course</Link>
        <Link to="/admin/exam-panel" className='border rounded px-4 py-2 text-white hover:bg-[#3E4A8A]'>Exam Panel</Link>
      </div>
    </div>
  );
}

export default Sidebar;
