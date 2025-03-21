import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios"
const Quize = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState()
  const [lock, setLock] = useState(false)
  const [finishExam, setFinishExam] = useState(false)
  const [result, setResult] = useState({rightAns:0, wrongAns:0, attempt:0})

  const option1 = useRef()
  const option2 = useRef()
  const option3 = useRef()
  const option4 = useRef()

  const optionArray = [option1, option2, option3, option4]

  useEffect(() => {
    // console.log(code)
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/api/admin/get-question`, { course:code });

        if (response.data.success) {
          setQuestions(response.data.data);
          setLoading(false) // assuming `data` is where your questions are
          // console.log('Fetched Questions:', response.data.data);
        } else {
          alert(response.data.message || 'Failed to fetch questions');
          setLoading(false)
        }
      } catch (error) {
        // console.error('Error fetching questions:', error);
        setLoading(false)
        console.log(error.message)
        alert('Something went wrong while fetching questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);



  useEffect(()=>{
    if(questions.length == 0) return
    setCurrentQuestion(questions[currentIndex])
    // console.log(currentQuestion)
    },[questions,currentIndex,setCurrentIndex])


 const handleNext = ()=>{
  setLock(false)
  optionArray.forEach((item)=>{
    item.current.classList.remove('bg-red-100')
    item.current.classList.remove('bg-green-100')
  })
  if(currentIndex < questions.length-1){
    setCurrentIndex(prev=>prev+1)
  }else{
    setFinishExam(true)
  }
 }

 const handlePrev = ()=>{
  if(currentIndex > 0){
    setCurrentIndex(prev=>prev-1)
  }
 }

 const handleCheckAns = (e,opt)=>{
  let userSelected = e.target;
  if(opt === currentQuestion.answer){
    setResult((prevResult) => ({
      ...prevResult,
      rightAns: prevResult.rightAns + 1
    }));
    userSelected.classList.add('bg-green-100')
  }else{
    userSelected.classList.add('bg-red-100')
    optionArray[currentQuestion.answer-1].current.classList.add('bg-green-100')
    setResult((prevResult) => ({
      ...prevResult,
      wrongAns: prevResult.wrongAns + 1
    }));
  }

  setResult((prevResult) => ({
    ...prevResult,
    attempt: prevResult.attempt + 1
  }));

  setLock(true)
 }


  if (loading) {
    return <div>
      <h2 className='text-3xl text-center'>Loading questions ....</h2>
    </div>
  }

  if(!loading && questions.length === 0){
    return <div>
    <h2 className='text-3xl text-center'>No Question Aviable</h2>
  </div>
  }


    

  return (
    <div className="max-w-[600px] w-[95%] px-4 rounded bg-white mx-auto p-4 mt-12">
      {
        finishExam?(<>
        <h2 className='text-2xl my-2'>Your exam has been submitted</h2>
        <p className='my-2'>Correct : {result.rightAns}</p>
        <p className='my-2'>Incorrect : {result.wrongAns}</p>
        <p className='my-2'>Attempt : {result.attempt}</p>
        <p className='my-2'>Result : {result.rightAns >= parseInt((questions.length /2)+1)?"Pass":"Fail"}</p>
        </>):(<div> {loading ? (<h1>Loading</h1>) : (<> <h2 className="text-2xl  mb-4">{currentQuestion && currentQuestion.question}</h2>
          <div className="grid grid-cols-1 gap-4">
            <button className='w-full px-4 py-2 border border-black rounded text-left my-2' ref={option1} disabled={lock} onClick={(e)=>handleCheckAns(e, 1)}>{currentQuestion && currentQuestion.option1}</button>
            <button className='w-full px-4 py-2 border border-black rounded text-left my-2' ref={option2} disabled={lock} onClick={(e)=>handleCheckAns(e, 2)}>{currentQuestion && currentQuestion.option2}</button>
            <button className='w-full px-4 py-2 border border-black rounded text-left my-2' ref={option3} disabled={lock} onClick={(e)=>handleCheckAns(e, 3)}>{currentQuestion && currentQuestion.option3}</button>
            <button className='w-full px-4 py-2 border border-black rounded text-left my-2' ref={option4} disabled={lock} onClick={(e)=>handleCheckAns(e, 4)}>{currentQuestion && currentQuestion.option4}</button>
          </div>
          <div className='flex justify-between my-2'>
            <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={handlePrev}>Prev</button>
            <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={handleNext}>Next</button>
          </div>
          <p>{1} of {questions.length
          }</p> </>)} </div>)
      }
      
    </div>
  );
};

export default Quize;
