//filename: client/App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
//import TicketManagement from './pages/TicketManagement';
import TicketList from './pages/TicketList';  // Assuming TicketList is the new TicketManagement
import TicketDetails from './pages/TicketDetails';  // The component for viewing ticket details

axios.defaults.baseURL = 'http://128.214.252.141:5001';
//axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;

function App() {

  return (
    
    <BrowserRouter>
    <UserContextProvider>
    <Navbar />
    <Toaster position='bottom-right' toastOptions={{duration:2000}} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/employee-management' element={<EmployeeManagement />} />
      <Route path="/ticket-management" element={<TicketList />} />
      <Route path="/ticket-management/:ticketId" element={<TicketDetails />} />
      {/* <Route path="/ticket-management" element={<TicketManagement />} /> */}
    </Routes> 
    </UserContextProvider>
    </BrowserRouter>
    
  )
}

export default App;
