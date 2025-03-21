import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyStudent = () => {
    const [user, setUser] = useState({
        rollno: '',
        password: ''
    });

    const navigate = useNavigate();

    const verifyStudent = async (e) => {
        e.preventDefault();
        const { rollno, password } = user;
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        
        try {
            const response = await axios.post(backendUrl + '/api/user/verify-student', { rollno, password });
            if (response.data.success) {
                navigate(`/exam-pannel/${response.data.data._id}`);
            } else {
                console.log(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='px-4 md:px-8 lg:px-32 mt-8'>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Exam Rules for Students</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li>Ensure that you arrive at the exam center at least 30 minutes before the exam starts. Always be aware of the exam schedule and timings to avoid last-minute stress or confusion.</li>
                <li>Always carry your student ID, exam entry ticket, and any required stationery (e.g., pens, pencils, erasers, calculators, etc.). Check the exam guidelines for allowed materials before the exam.</li>
                <li>Before answering the questions, take time to read all instructions on the exam paper. Pay close attention to word limits, specific requirements for each section, and any other details that could impact your answers.</li>
                <li>Allocate time for each section of the exam based on its marks. Monitor your progress throughout the exam to ensure that you can complete all questions within the given time frame.</li>
                <li>Keep a positive mindset throughout the exam. If you encounter a difficult question, move on and come back to it later. Avoid panicking and maintain focus to improve the quality of your answers.</li>
            </ul>
            <div className='max-w-[500px] w-full mx-auto mt-12 border rounded p-8 bg-gray-200'>
                <form onSubmit={verifyStudent}>
                    <div className='flex gap-4 my-4 flex-col'>
                        <label>Roll No.</label>
                        <input
                            type="text"
                            name="rollno"
                            value={user.rollno}
                            onChange={handleChange}
                            placeholder='Roll number'
                            className='w-full py-2 px-4 border outline-none border-black rounded'
                        />
                    </div>
                    <div className='flex gap-4 my-4 flex-col'>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='Date of Birth'
                            className='w-full py-2 px-4 border outline-none border-black rounded'
                        />
                    </div>
                    <button className='bg-blue-500 text-white rounded py-2 px-4 w-full' type='submit'>Start the exam</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyStudent;
