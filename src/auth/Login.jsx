import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../styles/login.css"

const Login = ({setLogin}) => {

  const[register, setRegister]= useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("http://localhost:8000/api/register", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
  
      if (result.ok) {
        const response = await result.json();
        localStorage.setItem('userData', JSON.stringify(response));
        navigate("/");
        setLogin(false)
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }

  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
  
      if (result.ok) {
        const response = await result.json();
        localStorage.setItem('userData', JSON.stringify(response));
        navigate("/");
        setLogin(false)
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }

  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='login_div'>
      <div className="wrapper" onClick={()=>setLogin(false)}></div>
      {register ? 
      (
        <div className="login_card">
        <img className='close_img' src="/images/close.png" alt="" onClick={()=>setLogin(false)}/>
        <form onSubmit={handleRegister}>
          <div className="form_heading">
            <h3>Welcome back!</h3>
          </div>
          <div className="form_group">
            <label htmlFor="name">Your name</label>
            <input  type="text" placeholder='Name' name='name' onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label htmlFor="email">Email address</label>
            <input  type="email" placeholder='name@email.com' name='email' onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input  type="password" placeholder='Password' name='password' onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input  type="password" placeholder='Confirm Password' name='confirm_password' onChange={handleChange}/>
          </div>
          <button type='submit' className='form_btn'>Register</button>
          <div className="form_group_navlink">
            <p className="register_p" to="/register" onClick={()=>setRegister(!register)}>Login</p>
          </div>
        </form>
      </div>
      )
      : 
      (
        <div className="login_card">
        <img className='close_img' src="/images/close.png" alt=""onClick={()=>setLogin(false)}/>
        <form onSubmit={handleLogin}>
          <div className="form_heading">
            <h3>Welcome back!</h3>
          </div>
          <div className="form_group">
            <label htmlFor="email">Email address</label>
            <input  type="email" placeholder='name@email.com' name='email' onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input  type="password" placeholder='Password' name='password' onChange={handleChange}/>
          </div>
          <div className="form_row">
            <div className="form_check">
              <input  type="checkbox" />Remember me
            </div>
            <NavLink className="forgot_password">Forgot password?</NavLink>
          </div>
          <button type='submit' className='form_btn'>Login</button>
          <div className="form_group_navlink">
          <p className="register_p" to="/register" onClick={()=>setRegister(!register)}>Register</p>
          </div>
        </form>
      </div>
      )}
    </div>
  )
}

export default Login