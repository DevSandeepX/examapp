import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from '../../components/admin/Sidebar';
import { useNavigate } from 'react-router-dom';
const Students = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState({});
  const [editId, setEditId] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {

      navigate('/admin/login');
    }
  }, [navigate]);


  const [student, setStudent] = useState({
    rollno: '',
    password: '',
    course: '',
  });

  const fetchStudents = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/admin/get-student`);
      setStudents(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student._id === id);
    setSelectedStudent(studentToEdit);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${backendUrl}/api/admin/delete-student`, { id });

      if (response.data.success) {
        alert(response.data.message);
        fetchStudents();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const updatedStudent = {
        id,
        rollno: selectedStudent.rollno,
        course: selectedStudent.course,
      };

      const response = await axios.post(`${backendUrl}/api/admin/update-student`, updatedStudent);

      if (response.data.success) {
        alert(response.data.message);
        setEditId(null);
        fetchStudents();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async () => {
    console.log(student);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(backendUrl + '/api/admin/add-student', {
        rollno: student.rollno,
        password: student.password,
        course: student.course,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log(response.data.message);
        alert(response.data.message);

        setStudent({
          rollno: '',
          password: '',
          course: '',
        });
        fetchStudents();
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="grid grid-cols-[20%_78%] gap-4">
      <Sidebar />
      <div>
        {/* Header Section */}
        <div className="flex justify-between items-center gap-12 p-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 border border-black rounded px-4 py-2 outline-none"
          />
          <button
            className="py-2 px-4 bg-green-400 text-white rounded"
            onClick={() => setAddStudent((prev) => !prev)}
          >
            {addStudent ? 'Close Form' : 'Add Student'}
          </button>
        </div>

        {/* Add Student Form */}
        {addStudent && (
          <div className="bg-white p-4 rounded shadow-lg max-w-[500px] mx-auto mt-12">
            <h2 className="text-center text-3xl">Add New Student</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleOnSubmit(); }}>
              <div className="flex flex-col gap-4">
                <label>Roll No.</label>
                <input
                  onChange={handleOnChange}
                  value={student.rollno}
                  className="py-2 px-4 rounded outline-none border border-black"
                  type="text"
                  name="rollno"
                  placeholder="Roll no."
                />
              </div>
              <div className="flex flex-col gap-4">
                <label>Password</label>
                <input
                  onChange={handleOnChange}
                  value={student.password}
                  className="py-2 px-4 rounded outline-none border border-black"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label>Course</label>
                <select
                  onChange={handleOnChange}
                  value={student.course}
                  className="py-2 px-4 rounded outline-none border border-black"
                  name="course"
                >
                  <option value="">Select A Course</option>
                  <option value="dcm">DCM</option>
                  <option value="adca">ADCA</option>
                  <option value="dca">DCA</option>
                  <option value="doa">DOA</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-400 text-white px-4 py-2 rounded mt-4"
              >
                Add Student
              </button>
            </form>
          </div>
        )}

        {/* Students Table */}
        <div className="px-4 py-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-500 text-white text-sm md:text-base">
                  <th className="py-3 px-2 text-left">Roll No.</th>
                  <th className="py-3 px-2 text-left">Course</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 text-sm md:text-base">
                {students.length > 0 ? (
                  students
                    .filter((student) =>
                      student.rollno.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((student) => (
                      <tr key={student._id} className="border-b border-blue-400 hover:bg-gray-50 transition duration-200">
                        <td className="py-3 px-2">
                          {editId === student._id ? (
                            <input
                              name="rollno"
                              value={selectedStudent.rollno}
                              onChange={handleEditChange}
                              className="outline-none py-1 px-2 border border-black rounded"
                            />
                          ) : (
                            student.rollno
                          )}
                        </td>
                        <td className="py-3 px-2">
                          {editId === student._id ? (
                            <select
                              name="course"
                              value={selectedStudent.course}
                              onChange={handleEditChange}
                              className="outline-none py-1 px-2 border border-black rounded"
                            >
                              <option value="">Select A Course</option>
                              <option value="dcm">DCM</option>
                              <option value="adca">ADCA</option>
                              <option value="dca">DCA</option>
                              <option value="doa">DOA</option>
                            </select>
                          ) : (
                            student.course.toUpperCase()
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex flex-wrap justify-center gap-2">
                            {editId === student._id ? (
                              <>
                                <button
                                  onClick={() => handleUpdate(student._id)}
                                  className="py-2 px-4 rounded bg-blue-400 text-white hover:bg-blue-500 transition duration-200 text-sm md:text-base"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditId(null)}
                                  className="py-2 px-4 rounded bg-gray-400 text-white hover:bg-gray-500 transition duration-200 text-sm md:text-base"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEdit(student._id)}
                                className="py-2 px-4 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition duration-200 text-sm md:text-base"
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="py-2 px-4 rounded bg-red-400 text-white hover:bg-red-500 transition duration-200 text-sm md:text-base"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No students available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
