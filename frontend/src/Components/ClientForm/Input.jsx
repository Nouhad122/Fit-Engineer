import React from 'react'
import classes from './ClientForm.module.css'

const Input = ({ label, type, name, value, onChange, isTextArea, options, error, ...props }) => {
  return (
    <div className={classes.formGroup}>
        <label>{label}</label>

        {
          options ? (
            
            <select name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} {...props}>
              {
                options.map((option) =>{
                  return (
                    <option key={option.value} value={option.value}>{option.value === '' ? 'Select' : option.value}</option>
                  )
                })
              }
            </select>
          ) :
          (
            isTextArea ? (
              <textarea name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} {...props} />
            ) : (
              <input type={type} name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} {...props} />
            )
          )
        }
        {error && <span className={classes.errorText}>{error}</span>}
    </div>
  )
}

export default Input

