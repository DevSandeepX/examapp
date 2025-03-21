import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';

const Questions = () => {
  const [question, setQuestion] = useState({
    course: '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-question`, {
        course:question.course,
        question:question.question,
        option1:question.option1,
        option2:question.option2,
        option3:question.option3,
        option4:question.option4,
        answer:question.answer,
      });

      if (response.data.success) {
        alert(response.data.message);
        setQuestion({
          course: '',
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: ''
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className='grid grid-cols-[20%_78%] gap-4'>
      <Sidebar />
      <div className='bg-white p-4 rounded shadow-lg max-w-[500px] w-[95%] mx-auto mt-4'>
        <h2 className='text-center text-3xl'>Add New Question</h2>

        <form onSubmit={handleOnSubmit}>
          {/* Course */}
          <div className='flex flex-col my-2'>
            <label>Course</label>
            <select
              className='py-2 px-4 rounded outline-none border border-black'
              name='course'
              value={question.course}
              onChange={handleOnChange}
            >
              <option value=''>Select A Course</option>
              <option value='dcm'>DCM</option>
              <option value='adca'>ADCA</option>
              <option value='dca'>DCA</option>
              <option value='doa'>DOA</option>
            </select>
          </div>

          {/* Question */}
          <div className='flex flex-col my-2'>
            <label>Question</label>
            <input
              className='py-2 px-4 rounded outline-none border border-black'
              type='text'
              name='question'
              placeholder='Question'
              value={question.question}
              onChange={handleOnChange}
            />
          </div>

          {/* Option 1 */}
          <div className='flex flex-col my-2'>
            <label>Option 1</label>
            <input
              className='py-2 px-4 rounded outline-none border border-black'
              type='text'
              name='option1'
              placeholder='Option 1'
              value={question.option1}
              onChange={handleOnChange}
            />
          </div>

          {/* Option 2 */}
          <div className='flex flex-col my-2'>
            <label>Option 2</label>
            <input
              className='py-2 px-4 rounded outline-none border border-black'
              type='text'
              name='option2'
              placeholder='Option 2'
              value={question.option2}
              onChange={handleOnChange}
            />
          </div>

          {/* Option 3 */}
          <div className='flex flex-col my-2'>
            <label>Option 3</label>
            <input
              className='py-2 px-4 rounded outline-none border border-black'
              type='text'
              name='option3'
              placeholder='Option 3'
              value={question.option3}
              onChange={handleOnChange}
            />
          </div>

          {/* Option 4 */}
          <div className='flex flex-col my-2'>
            <label>Option 4</label>
            <input
              className='py-2 px-4 rounded outline-none border border-black'
              type='text'
              name='option4'
              placeholder='Option 4'
              value={question.option4}
              onChange={handleOnChange}
            />
          </div>

          {/* Correct Answer */}
          <div className='flex flex-col my-2'>
            <label>Correct Answer (Option Number: 1/2/3/4)</label>
            <input
              className='py-2 px-4 rounded outline-none border border-black'
              type='number'
              name='answer'
              placeholder='Answer (1, 2, 3, or 4)'
              value={question.answer}
              onChange={handleOnChange}
              min='1'
              max='4'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-green-400 text-white px-4 py-2 rounded mt-4'
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default Questions;
