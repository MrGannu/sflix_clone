import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {app} from '../firebase/config';
import "../styles/login.css"
import Loader from '../components/Loader';
import Wrapper from '../wrapper/Wrapper';
import Alert from '../alerts/Alert';

const auth = getAuth(app);

const Login = ({ login, setLogin, setAlert, setAlertMessage }) => {

  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    const { name, email, password, confirm_password } = data;
  
    if (!name || !email || !password || !confirm_password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
  
    if (password !== confirm_password) {
      setError('Password and Confirm Password do not match.');
      setLoading(false);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Reset form data
      setData({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      });
  
      // Clear any previous error message
      setError('');
  
      // Update state values as needed
      setRegister(false);
      setLogin(true);

      // Trigger alert
      setAlert(true);
      setAlertMessage({
        type: "success",
        message: 'Registration Successful'
      });
    } catch (error) {
      setError(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('userData', JSON.stringify(userCredential));
      // Reset form data
      setData({
        name: '',
        email: '',
      });
  
      // Clear any previous error message
      setError('');
  
      // Update state values as needed
      setLogin(false);
  
      // Trigger alert
      setAlert(true);
      setAlertMessage({
        type: "success",
        message: 'Login Successful'
      });
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
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
      {/* {alert && <Alert/>} */}
      <Wrapper state={login} setState={setLogin}>
        {register ? (
          <div className="login_card">
            <img className='close_img' src="/images/close.png" alt="" onClick={() => setLogin(false)} />
            <form className='login_form' onSubmit={handleRegister}>
              <div className="form_heading">
                <h3>Welcome back!</h3>
              </div>
              {error && <div className="error-message" hidden>{error}</div>}
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
                {loading ? <Loader/> : "Register"}
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
              {error && <div className="error-message" hidden>{error}</div>}
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
                {loading ? <Loader/> : "Login"}
              </button>
              <div className="form_group_navlink">
                <p className="register_p" to="/register" onClick={() => setRegister(!register)}>Register</p>
              </div>
            </form>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Login;