import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Exam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isFinishExam, setIsFinishExam] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [result, setResult] = useState({
    rightAns: 0,
    wrongAns: 0,
    attempt: 0
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${backendUrl}/api/admin/get-question`, { course: 'adca' });

        if (response.data.success) {
          setQuestions(response.data.data);
        } else {
          alert(response.data.message || 'Failed to fetch questions');
        }
      } catch (error) {
        console.error(error.message);
        alert('Something went wrong while fetching questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Set current question on index change
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[currentIndex]);
    }
  }, [questions, currentIndex]);

  // Timer: 1 hour 30 minutes = 5400 seconds
  const [timeLeft, setTimeLeft] = useState(5400);

  useEffect(() => {
    if (timeLeft === 0) {
      autoFinishExam();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Convert time to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }

    if (currentIndex === questions.length - 2) {
      setIsFinishExam(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userSelected !== null) {
      setResult((prev) => {
        const newResult = { ...prev };

        if (userSelected === currentQuestion.answer) {
          newResult.rightAns += 1;
        } else {
          newResult.wrongAns += 1;
        }

        newResult.attempt += 1;

        return newResult;
      });

      handleNext(e);
      setUserSelected(null);
    } else {
      alert('Select an answer');
    }
  };

  const finishExam = async (e) => {
    e.preventDefault();

    if (result.attempt < questions.length - 1) {
      alert('Please complete all questions before finishing the exam.');
      return;
    }

    if (isFinishExam) return;

    setIsFinishExam(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/finish-exam`, {
        id: id,
        result: result,
      });

      if (response.data.success) {
        alert(response.data.message);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Error sending request. Please try again later.');
    }
  };

  const autoFinishExam = async () => {
    if (isFinishExam) return;

    setIsFinishExam(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/finish-exam`, {
        id: id,
        result: result,
      });

      if (response.data.success) {
        alert('Time is over! ' + response.data.message);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Error sending request. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className='text-3xl text-center'>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='flex items-start justify-center bg-gray-200 min-h-screen'>
      <div className='max-w-[600px] w-[95%] rounded bg-white p-4 md:p-8 mt-8'>
        <div className='w-full flex justify-between items-center'>
          <h2>MCQ: {questions.length} Questions</h2>
          <h2
            className={`font-bold ${
              timeLeft < 300 ? 'text-red-500' : 'text-black'
            }`}
          >
            Remaining: {formatTime(timeLeft)}
          </h2>
        </div>

        <h2 className='text-lg md:text-xl font-bold mt-4'>
          {currentIndex + 1}. {currentQuestion.question}
        </h2>

        <form onSubmit={handleSubmit}>
          {[1, 2, 3, 4].map((optionNum) => (
            <div
              key={optionNum}
              className='flex items-center gap-4 my-2 md:my-4'
            >
              <input
                type='radio'
                name={`question-${currentIndex}`}
                checked={userSelected === optionNum}
                onChange={() => setUserSelected(optionNum)}
              />
              <label>
                {currentQuestion[`option${optionNum}`]}
              </label>
            </div>
          ))}

          <div className='flex justify-between my-4'>
            <button
              className='bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50'
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Prev
            </button>

            {isFinishExam ? (
              <button
                type='button'
                onClick={finishExam}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Finish Exam
              </button>
            ) : (
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Submit Answer
              </button>
            )}
          </div>

          <p className='text-center'>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Exam;
