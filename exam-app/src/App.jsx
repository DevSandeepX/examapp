import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/client/Navbar';
import Home from './pages/client/Home';
import About from './pages/client/About';
import Courses from './pages/client/Courses';
import Exam from './pages/client/Exam';
import OnlineTest from './pages/client/OnlineTest';
import Dashbord from './pages/admin/Dashbord';
import Students from './pages/admin/Students';
import AdminCourses from './pages/admin/Courses';
import ExamPannel from './pages/admin/ExamPannel';
import Questions from './pages/admin/Questions';
import Login from './pages/admin/Login';
import VerifyStudent from './pages/client/VerifyStudent';
import Footer from './components/client/Footer';




const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/online-test" element={<OnlineTest />} />
        <Route path="/exam-pannel/:id" element={<Exam />} />
        <Route path="/auth-student" element={<VerifyStudent />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashbord />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/questions" element={<Questions />} />
        <Route path="/admin/exam-panel" element={<ExamPannel />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
