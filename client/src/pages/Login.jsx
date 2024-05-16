import React, { useState, useContext } from 'react';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../../context/userContext'

export default function Login() {
  const [data,setData] = useState({
    username: '',
    password: '',
  })

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();//

//login handler 
const loginUser = async (e) => {
  e.preventDefault();
  const { username, password } = data;
  try {
      const response = await axios.post('/login', { username, password });
      const userData = response.data;
      if (userData.err) {
          toast.error(userData.err);
      } else {
          setUser(userData.user);  // Store user data in context
          navigate('/dashboard');  // Navigate to dashboard after login
      }
  } catch (error) {
      console.error("Login error:", error.response?.data || "An unexpected error occurred");
      toast.error("Login failed!");
  }
};

  // const loginUser = async(e) =>{
  //   e.preventDefault();
  //   const{username,password} = data
  //   try {
  //     //take the destaructure 'data' and post 
  //     const {data} = await axios.post('/login',{
  //       username,password
  //     })
  //     if(data.err){
  //       toast.error(data.err)
  //     }else{
  //       setData({});
  //       setUser(data.user);  // Assuming the response has user data
  //       navigate('/dashboard'); // Navigate to dashboard
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>   
    <div className="register-container">
      <form onSubmit={loginUser}>
      <h2>Login</h2>
      <label>Username:</label>
        <input type='text' placeholder='enter Username..' value={data.username} onChange={(e)=> setData({...data,username: e.target.value})} />

        <label>Password:</label>
        <input type='password' placeholder='enter Password..' value={data.password} onChange={(e)=> setData({...data,password: e.target.value})} />
        <button type='submit'>Submit</button>

      </form>
    </div>
    </>
  )
}
