import React from 'react'
import styles from './Loading.module.css'

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingMessage}>{message}</p>
      </div>
    </div>
  )
}

export default Loading 