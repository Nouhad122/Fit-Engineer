import React from 'react'
import classes from './ErrorMsg.module.css'
const ErrorMsg = ({ message }) => {
  return (
    <div className={classes.errorMsg}>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMsg
