import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'


export default function Register() {

const [data,setData] = useState({
  name: '',
  username: '',
  password: '',
  role: 'user' // Default role

})
const navigate = useNavigate();

//Post inserted form userdata to backend '/register' endpoint
const registerUser = async (e)=>{
  e.preventDefault();
  const {name,username,password,role} = data
  try {
    const {data} = await axios.post('/register',{
      name,username,password,role
    })
    if(data.err){
      toast.error(data.err)
    }else{
      setData({})
      toast.success('User Successfully Created')
      //navigate('/login')
    }

  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className="register-container">
      <form onSubmit={registerUser}>
      <h2>Register</h2>
       <label>Name:</label>
        <input type='text' placeholder='enter your name..' value={data.name} onChange={(e)=> setData({...data,name: e.target.value})} />

        <label>Username:</label>
        <input type='text' placeholder='enter Username..' value={data.username} onChange={(e)=> setData({...data,username: e.target.value})}/>
        
        <label>Password:</label>
        <input type='password' placeholder='enter Password..' value={data.password} onChange={(e)=> setData({...data,password: e.target.value})} />
        
        <label>Role:</label> {/* Optional field for role */}
                <select value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
        
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
