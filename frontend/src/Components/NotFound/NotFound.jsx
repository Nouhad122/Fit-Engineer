import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'
import Button from '../Shared/Button'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button path='/' className={styles.homeButton} isLink>
          Go Back Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound 