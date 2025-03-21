import React from 'react';
import { useNavigate } from 'react-router-dom';
const CourseCard = ({ course }) => {
    const navigate = useNavigate()
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col ">
      <img src={course.image} alt={course.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-bold mb-2">{course.name.slice(0,17)}...more</h3>
      <p className="text-gray-600 mb-2">Code: {course.code}</p>
      <button onClick={()=>navigate(`/online-test?code=${course.code}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Start Test
      </button>
    </div>
  );
};

export default CourseCard;
