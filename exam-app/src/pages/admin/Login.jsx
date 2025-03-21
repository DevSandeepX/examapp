import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [data, setData] = useState({
    userId: '',
    password: ''
  })


  const navigate = useNavigate()

  // Get the backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  // Handle login
  const onLogin = async (e) => {
    e.preventDefault(); // Prevent form default submit behavior

    try {
      const response = await axios.post(backendUrl + '/api/admin/auth', {
        userId: data.userId,
        password: data.password
      });

      if (response.data.success) {
        alert('Login successfully');
        localStorage.setItem('token',response.data.token);
        navigate('/admin');
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-300">
      <div className="max-w-[400px] w-[95%] p-4 rounded bg-white">
        <h2 className="text-center font-bold text-2xl">Admin Login</h2>
        <form onSubmit={onLogin}>
          <div className="flex flex-col gap-2 my-3">
            <label htmlFor="userId">Login ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={data.userId}
              onChange={handleChange}
              placeholder="Login Id"
              className="w-full py-2 px-4 rounded border border-black"
            />
          </div>
          <div className="flex flex-col gap-2 my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full py-2 px-4 rounded border border-black"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
