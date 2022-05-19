import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import About from './Components/About/About';
import Appointment from './Components/Appointment/Appointment';
import Login from './Components/Auth/Login';
import { Toaster } from 'react-hot-toast';
import Signup from './Components/Auth/Signup';
import RequireAuth from './Components/Auth/RequireAuth';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Components/Dashboard/Dashboard';
import MyAppointment from './Components/Dashboard/MyAppointment';
import MyReview from './Components/Dashboard/MyReview';
import MyHistory from './Components/Dashboard/MyHistory';
import Users from './Components/Dashboard/Users';
import RequireAdmin from './Components/Auth/RequireAdmin';


function App() {
  return (
    <div className='max-w-full mx-auto px-12'>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>
        } />

        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>
          <Route index element={<MyAppointment />} />
          <Route path='review' element={<MyReview />} />
          <Route path='history' element={<MyHistory />} />
          <Route path='users' element={
            <RequireAdmin>
              <Users />
            </RequireAdmin>
          } />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
