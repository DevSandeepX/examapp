import { useState, useEffect } from "react";
import axios from "axios";

const useFetchStudent = (adhar) => {
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const response = await axios.post(backendUrl + '/api/user/get-student', { adhar });
                if (response.data.success) {
                    setStudentData(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (adhar) {
            fetchStudentData();
        }
    }, [adhar]);

    return { studentData, error, loading };
};

export default useFetchStudent;
