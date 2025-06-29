import React from 'react'
import classes from './ClientDetails.module.css'
const ClientHeader = ({ client }) => {
  return (
    <div className={classes.header}>
        <div className={classes.profileSection}>
          <div className={classes.avatar}>
            <span>{client.fullName ? client.fullName.charAt(0).toUpperCase() : 'C'}</span>
          </div>
          <div className={classes.profileInfo}>
            <h1 className={classes.clientName}>{client.fullName}</h1>
            <p className={classes.clientEmail}>{client.email}</p>
            <p className={classes.clientWhatsapp}>📱 {client.whatsapp}</p>
          </div>
        </div>
        <div className={classes.statusBadge}>
          <span className={classes.statusDot}></span>
          Active Client
        </div>
    </div>
  )
}

export default ClientHeader
