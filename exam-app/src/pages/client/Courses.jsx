import React from 'react';
import CourseCard from '../../components/client/CourseCard'; // Adjust the path if necessary
import course1 from "../../assets/course1.jpg"
import course2 from "../../assets/course2.jpg"
import course3 from "../../assets/course3.jpg"
import course4 from "../../assets/course4.jpg"
const courses = [
  {
    id: 1,
    name: 'It tools and network basics',
    code: 'm1-r5',
    image: course1, // Replace with the actual image path
  },
  {
    id: 2,
    name: 'Web Designing & Publishing',
    code: 'm2-r5',
    image: course2, // Replace with the actual image path
  },
  {
    id: 3,
    name: 'Problam solving through python',
    code: 'm3-r5',
    image: course3, // Replace with the actual image path
  },
  {
    id: 4,
    name: 'Internate of thing & it applications',
    code: 'm4-r5',
    image: course4, // Replace with the actual image path
  },
  // Add more courses as needed
];

const Courses = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
