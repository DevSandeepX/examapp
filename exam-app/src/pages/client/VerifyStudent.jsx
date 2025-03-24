import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Spinner = () => (
    <div className="flex justify-center items-center">
        <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
                stroke="#e5e7eb"
                fill="none"
            />
            <path
                fill="none"
                stroke="#2563eb"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M4 12a8 8 0 0116 0"
            />
        </svg>
    </div>
);

const VerifyStudent = () => {
    const [user, setUser] = useState({
        rollno: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const verifyStudent = async (e) => {
        e.preventDefault();
        const { rollno, password } = user;

        // Input validation
        if (!rollno || !password) {
            setErrorMessage('Please fill in both Roll No. and Password.');
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/user/verify-student', { rollno, password });
            if (response.data.success) {
                navigate(`/exam-pannel/${response.data.data._id}`);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred, please try again later.');
            console.log('Error:', error.message);
        } finally {
            setIsLoading(false);
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
        <div className="px-4 md:px-8 lg:px-32 mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Exam Rules for Students</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li>Ensure that you arrive at the exam center at least 30 minutes before the exam starts. Always be aware of the exam schedule and timings to avoid last-minute stress or confusion.</li>
                <li>Always carry your student ID, exam entry ticket, and any required stationery (e.g., pens, pencils, erasers, calculators, etc.). Check the exam guidelines for allowed materials before the exam.</li>
                <li>Before answering the questions, take time to read all instructions on the exam paper. Pay close attention to word limits, specific requirements for each section, and any other details that could impact your answers.</li>
                <li>Allocate time for each section of the exam based on its marks. Monitor your progress throughout the exam to ensure that you can complete all questions within the given time frame.</li>
                <li>Keep a positive mindset throughout the exam. If you encounter a difficult question, move on and come back to it later. Avoid panicking and maintain focus to improve the quality of your answers.</li>
            </ul>
            <div className="max-w-[500px] w-full mx-auto mt-12 border rounded p-8 bg-white shadow-md">
                <form onSubmit={verifyStudent}>
                    <div className="flex gap-4 my-4 flex-col">
                        <label className="font-medium">Roll No.</label>
                        <input
                            type="text"
                            name="rollno"
                            value={user.rollno}
                            onChange={handleChange}
                            placeholder="Roll number"
                            className="w-full py-2 px-4 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex gap-4 my-4 flex-col">
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full py-2 px-4 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm my-2">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : 'Start the exam'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyStudent;
