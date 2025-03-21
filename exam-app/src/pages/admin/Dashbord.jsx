import React, { useEffect} from 'react'
import Sidebar from '../../components/admin/Sidebar'
import StudentList from '../../components/admin/StudentList';
import { useNavigate } from 'react-router-dom';
const Dashbord = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          // If token doesn't exist, redirect to login
          navigate('/admin/login');
        }
      }, [navigate]);


  return (
    <div className='grid grid-cols-[20%_78%] gap-4'>
        <Sidebar/>
        <div className='w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            <div className='h-[150px] md:h-[200px] rounded p-4 bg-blue-600 text-white flex items-center justify-center flex-col gap-4'>
                <h2>Total Student</h2>
                <p>50</p>
            </div>
            <div className='h-[150px] md:h-[200px] rounded p-4 bg-yellow-600 text-white flex items-center justify-center flex-col gap-4'>
                <h2>Total Student</h2>
                <p>50</p>
            </div>
            <div className='h-[150px] md:h-[200px] rounded p-4 bg-pink-600 text-white flex items-center justify-center flex-col gap-4'>
                <h2>Total Student</h2>
                <p>50</p>
            </div>
            <div className='h-[150px] md:h-[200px] rounded p-4 bg-green-600 text-white flex items-center justify-center flex-col gap-4'>
                <h2>Total Student</h2>
                <p>50</p>
            </div>
            </div>
            <StudentList/>
        </div>
    </div>
  )
}

export default Dashbord