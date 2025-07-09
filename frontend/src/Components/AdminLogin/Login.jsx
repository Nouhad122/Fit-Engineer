import React, { useRef, useState} from 'react'
import classes from './Login.module.css'
import Button from '../Shared/Button'
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../Shared/ErrorMsg';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mealRef = useRef(null);
    const workoutRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const meal = mealRef.current.value;
        const workout = workoutRef.current.value;
        
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, meal, workout })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                window.dispatchEvent(new Event('adminStatusChanged'));
                navigate('/admin-dashboard');
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(true);
        }
    }
  return (
    <div className={classes.loginContainer}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        {error && <div className={classes.errorMsgContainer}><ErrorMsg message='Invalid credentials. Please try again.' /></div>}
        <div className={classes.inputContainer}>
            <input type="text" placeholder='Email' ref={emailRef} />
            <input type="password" placeholder='Password' ref={passwordRef} />
            <input type="text" placeholder='Your Favorite Meal' ref={mealRef} />
            <input type="text" placeholder='Your Favorite Workout' ref={workoutRef} />
            <Button type='submit' className={classes.loginButton}>Login</Button>
        </div>
            
      </form>
    </div>
  )
}

export default Login
