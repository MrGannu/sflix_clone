import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../firebase/config';
import "../styles/login.css"

const auth = getAuth(app);

const Login = ({ setLogin, login }) => {
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, confirm_password } = data;

    if (password !== confirm_password) {
      console.error('Password and Confirm Password do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      console.log('User registered successfully:', userCredential.user);
      setData({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      });
      // Close the registration modal
      setRegister(false);
      // Open the login modal after successful registration
      setLogin(true);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulating login, replace with actual login logic
      // For example, using signInWithEmailAndPassword as in the registration
      // This should be handled securely on the server in a real-world application
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('userData', JSON.stringify(userCredential));
      console.log('User logged in successfully:', userCredential.user);
      setData({
        name: '',
        email: '',
      });

      // Close the login modal after successful login
      setLogin(false);

      // Optionally, you can perform additional actions after login
      // For example, redirecting the user to another page
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
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
      <div className="wrapper" onClick={() => setLogin(false)}></div>
      {register ? (
        <div className="login_card">
          <img className='close_img' src="/images/close.png" alt="" onClick={() => setLogin(false)} />
          <form onSubmit={handleRegister}>
            <div className="form_heading">
              <h3>Welcome back!</h3>
            </div>
            <div className="form_group">
              <label htmlFor="name">Your name</label>
              <input type="text" placeholder='Name' name='name' onChange={handleChange} />
            </div>
            <div className="form_group">
              <label htmlFor="email">Email address</label>
              <input type="email" placeholder='name@email.com' name='email' onChange={handleChange} />
            </div>
            <div className="form_group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Password' name='password' onChange={handleChange} />
            </div>
            <div className="form_group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input type="password" placeholder='Confirm Password' name='confirm_password' onChange={handleChange} />
            </div>
            <button type='submit' className='form_btn'>
              {loading ? <img src="/images/loading.gif" alt="" /> : "Register"}
            </button>
            <div className="form_group_navlink">
              <p className="register_p" to="/register" onClick={() => setRegister(!register)}>Login</p>
            </div>
          </form>
        </div>
      ) : (
        <div className="login_card">
          <img className='close_img' src="/images/close.png" alt="" onClick={() => setLogin(false)} />
          <form onSubmit={handleLogin}>
            <div className="form_heading">
              <h3>Welcome back!</h3>
            </div>
            <div className="form_group">
              <label htmlFor="email">Email address</label>
              <input type="email" placeholder='name@email.com' name='email' onChange={handleChange} />
            </div>
            <div className="form_group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Password' name='password' onChange={handleChange} />
            </div>
            <div className="form_row">
              <div className="form_check">
                <input type="checkbox" />Remember me
              </div>
              <NavLink className="forgot_password">Forgot password?</NavLink>
            </div>
            <button type='submit' className='form_btn'>
              {loading ? <img src="/images/loading.gif" alt="" /> : "Login"}
            </button>
            <div className="form_group_navlink">
              <p className="register_p" to="/register" onClick={() => setRegister(!register)}>Register</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
