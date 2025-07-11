import React, { useRef, useState} from 'react'
import classes from './Login.module.css'
import Button from '../Shared/Button'
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../Shared/ErrorMsg';
import useHttp from '../../hooks/useHttp';

const Login = () => {
    const navigate = useNavigate();
    const { login, error, loading } = useHttp();
    const [loginError, setLoginError] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mealRef = useRef(null);
    const workoutRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(false);
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const meal = mealRef.current.value;
        const workout = workoutRef.current.value;
        
        try {
            const data = await login({ email, password, meal, workout });
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));
            window.dispatchEvent(new Event('adminStatusChanged'));
            navigate('/admin-dashboard');
        } catch (error) {
            setLoginError(true);
        }
    }
  return (
    <div className={classes.loginContainer}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        {(loginError || error) && <div className={classes.errorMsgContainer}><ErrorMsg message='Invalid credentials. Please try again.' /></div>}
        <div className={classes.inputContainer}>
            <input type="text" placeholder='Email' ref={emailRef} />
            <input type="password" placeholder='Password' ref={passwordRef} />
            <input type="text" placeholder='Your Favorite Meal' ref={mealRef} />
            <input type="text" placeholder='Your Favorite Workout' ref={workoutRef} />
            <Button type='submit' className={classes.loginButton} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
            
      </form>
    </div>
  )
}

export default Login
