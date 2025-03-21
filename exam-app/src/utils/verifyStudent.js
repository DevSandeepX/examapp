import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyStudentComponent = () => {
    const navigate = useNavigate();

    const verifyStudent = async (adhar, dob) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await axios.post(backendUrl + '/api/user/verify-student', { adhar, dob });
            if (response.data.success) {
                navigate(`/exam-pannel/${response.data.data._id}`);
            } else {
                console.log('Verification failed');
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };


    return (
        <div>
            <button onClick={() => verifyStudent('1234567890', '01-01-2000')}>
                Verify Student
            </button>
        </div>
    );
};

export default VerifyStudentComponent;
