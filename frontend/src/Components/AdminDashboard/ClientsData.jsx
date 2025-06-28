import React from 'react'
import classes from './ClientsData.module.css';
import Button from '../Shared/Button';

const ClientsData = ({clients, loading, error}) => {
  return (
    <section className={classes.clientsSection}>
        <h2>Clients</h2>
        {loading && <p>Loading clients...</p>}
        {error && <p className={classes.error}>{error}</p>}
        <ul className={classes.clientsList}>
          {clients.map((client) => (
            <li key={client.id}>
              <p>
                {client.fullName} ({client.email})
              </p>
              <div className={classes.listActions}>
                <Button className={classes.viewButton}>View</Button>
                <Button className={classes.deleteButton}>Delete</Button>
              </div>
             
            </li>
          ))}
        </ul>
    </section>

  )
}

export default ClientsData

