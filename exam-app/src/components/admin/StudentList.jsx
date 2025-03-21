import React, { useEffect, useState } from 'react'
import axios from "axios"
const StudentList = () => {
  const [data, setData] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // const data = [
    //     { name: 'John Doe', aadhar: '1234-5678-9012', dob:'02-02-2005', course: 'Computer Science' },
    //     { name: 'Jane Smith', aadhar: '9876-5432-1098', dob:'02-02-2005', course: 'Mathematics' },
    //     { name: 'Alice Johnson', aadhar: '4567-8901-2345', dob:'02-02-2005', course: 'Physics' },
    //   ];

useEffect(()=>{
  const fetchStudent = async()=>{
    try {
      const response = await axios.get(backendUrl + '/api/user/get-students');
      if(response.data.success){
        setData(response.data.data)
        console.log(response.data.data)
      }else{
        console.log(response.data.message)
        alert(response.data.message)
      }
  
    } catch (error) {
      console.log(error.message)
    }
  }
  fetchStudent()
},[])




  return (
    <div className="container mx-auto p-4 text-black">
        <h2 className='text-xl md:text-3xl my-4 text-center'>Available Students</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border-b">Roll Number</th>
            <th className="py-2 px-4 border-b">Course</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{item.rollno}</td>
              
              <td className="py-2 px-4 border-b">{item.course.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList