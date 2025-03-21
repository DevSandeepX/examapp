import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import { useNavigate } from 'react-router-dom';
const ExamPannel = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()
     useEffect(() => {
         const token = localStorage.getItem('token'); // Get the token from localStorage
         if (!token) {
           // If token doesn't exist, redirect to login
           navigate('/admin/login');
         }
       }, [navigate]);

       
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/api/admin/get-student`);

        if (response.data.success) {
          setStudents(response.data.data);
          console.log(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        alert(error.message);
      }
    };

    fetchStudents();
  }, []);

  const completedStudents = students.filter((student) => student.isComplateExam === 'true');

  return (
    <div className="grid grid-cols-[20%_78%] gap-4">
      <Sidebar />

      <div className="container mx-auto p-4 text-black">
        <h2 className="text-xl md:text-3xl my-4 text-center">Exam Completed Students</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border-b">Roll No.</th>
                <th className="py-2 px-4 border-b">Course</th>
                <th className="py-2 px-4 border-b">Right Answer</th>
                <th className="py-2 px-4 border-b">Wrong Answer</th>
                <th className="py-2 px-4 border-b">Exam Result</th>
              </tr>
            </thead>

            <tbody>
              {completedStudents.length > 0 ? (
                completedStudents.map((student, index) => (
                  <tr key={student._id || index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{student.rollno}</td>
                    <td className="py-2 px-4 border-b">{student.course.toUpperCase()}</td>
                    <td className="py-2 px-4 border-b">{student.result?.rightAns ?? 0}</td>
                    <td className="py-2 px-4 border-b">{student.result?.wrongAns ?? 0}</td>
                    <td className="py-2 px-4 border-b">
                      {student.result?.rightAns >= 50 ? 'Pass' : 'Fail'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No completed students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamPannel;
