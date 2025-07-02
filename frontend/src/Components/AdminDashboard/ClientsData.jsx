import React from 'react'
import classes from './ClientsData.module.css';
import Button from '../Shared/Button';

const ClientsData = ({clients, loading, error}) => {
  const handleDeleteClient = async (id) =>{
    const res = await fetch(`http://localhost:3000/api/clients-forms/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(res.ok){
      alert('Client deleted successfully');
    }
    else{
      alert('Failed to delete client');
    }
  }
  return (
    <section className={classes.clientsSection}>
        <h2>Clients</h2>
        {loading && <p>Loading clients...</p>}
        {error && <p className={classes.error}>{error}</p>}
        <ul className={classes.clientsList}>
          {
            clients.length > 0 ?
            clients.map((client) => (
              <li key={client.id}>
                <p>
                  {client.fullName} ({client.email})
                </p>
                <div className={classes.listActions}>
                  <Button path={`/client-details/${client.id}`} className={classes.viewButton} isLink>View</Button>
                  <Button className={classes.deleteButton} onClick={() => handleDeleteClient(client.id)}>Delete</Button>
                </div>
               
              </li>
            ))
          :
          <p>No clients found</p>
          }
          
        </ul>
    </section>

  )
}

export default ClientsData

