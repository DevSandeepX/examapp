import React, { useState , useEffect} from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { useNavigate } from 'react-router-dom';
const Courses = () => {
  const [addCourse, setAddCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(false);
  const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          // If token doesn't exist, redirect to login
          navigate('/admin/login');
        }
      }, [navigate]);

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-full md:w-1/5 bg-white shadow-md'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='w-full md:w-4/5 p-4'>
        {/* Add Course Button */}
        <div className='flex justify-end my-4'>
          <button
            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
            onClick={() => setAddCourse(prev => !prev)}
          >
            {addCourse ? 'Close' : 'Add Course'}
          </button>
        </div>

        {/* Add Course Form */}
        {addCourse && (
          <div className='bg-white p-6 rounded shadow-lg max-w-xl mx-auto my-6'>
            <h2 className='text-center text-2xl font-semibold mb-4'>Add New Course</h2>
            <form className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Course Name</label>
                <input
                  className="w-full py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  type="text"
                  name="name"
                  placeholder='Course Name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Course Code</label>
                <input
                  className="w-full py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  type="text"
                  name="code"
                  placeholder='Course Code'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Course Image</label>
                <input
                  className="w-full py-2 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  type="file"
                  name="image"
                />
              </div>

              <button
                type="submit"
                className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
              >
                Add Course
              </button>
            </form>
          </div>
        )}

        {/* Courses Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded">
          <table className='w-full text-sm md:text-base border-collapse'>
            {/* Table Header */}
            <thead>
              <tr className='bg-green-500 text-white'>
                <th className='py-3 px-4 text-left'>Name</th>
                <th className='py-3 px-4 text-left'>Code</th>
                <th className='py-3 px-4 text-left'>Image</th>
                <th className='py-3 px-4 text-center'>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className='text-gray-700'>
              <tr className='border-b hover:bg-gray-50 transition duration-200'>
                {/* Name */}
                <td className='py-3 px-4'>
                  {editCourse ? (
                    <input
                      type='text'
                      defaultValue='M1-R5'
                      className='w-full py-1 px-2 rounded border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                    />
                  ) : (
                    'M1-R5'
                  )}
                </td>

                {/* Code */}
                <td className='py-3 px-4'>
                  {editCourse ? (
                    <input
                      type='text'
                      defaultValue='Sandeep'
                      className='w-full py-1 px-2 rounded border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                    />
                  ) : (
                    'Sandeep'
                  )}
                </td>

                {/* Image */}
                <td className='py-3 px-4'>
                  {editCourse ? (
                    <input
                      type='file'
                      className='w-full py-1 px-2 rounded border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                    />
                  ) : (
                    <img
                      src='https://via.placeholder.com/50'
                      alt='Course'
                      className='w-12 h-12 object-cover rounded'
                    />
                  )}
                </td>

                {/* Actions */}
                <td className='py-3 px-4 flex flex-wrap justify-center gap-3'>
                  {editCourse ? (
                    <button
                      onClick={() => setEditCourse(false)}
                      className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditCourse(true)}
                      className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
