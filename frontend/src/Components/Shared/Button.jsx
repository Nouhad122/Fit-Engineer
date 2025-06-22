import React from 'react'
import classes from './Button.module.css'
import { Link } from 'react-router';

const Button = ({ inversed, isLink, path, className, children, ...props }) => {
    const mainClasses = inversed ? `${classes.inversedBtn} ${classes.mainBtn} ${className || ''}`.trim() 
    :`${classes.mainBtn} ${className || ''}`.trim() ;
  return (
    <>
        {
            isLink ?
            <Link className={mainClasses} to={path} {...props}>
                {children}
            </Link>
            :
            <button className={mainClasses} {...props}>{children}</button>
        }
    </>
    
  )
}

export default Button