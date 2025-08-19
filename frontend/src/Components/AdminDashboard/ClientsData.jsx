import React, { useContext } from 'react'
import classes from './Clients.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import ModalContext from '../../store/ModalContext.jsx';
import useHttp from '../../hooks/useHttp';
import Loading from '../Shared/Loading';

const ClientsData = ({clients, loading, error, onClientDeleted}) => {
  const { openModal, openedModal } = useContext(ModalContext);
  const { deleteClient } = useHttp();

  const handleDeleteClient = async (id) =>{
    try {
      await deleteClient(id);
      onClientDeleted();
    } catch (err) {
      // Error is handled by useHttp hook
    }
  }

  const handleDeleteClick = (id) =>{
    openModal({
      title: "Are you sure?",
      message: "Deleting this client will remove all their data from the system. This action cannot be undone.",
      onConfirm: () => handleDeleteClient(id)
    });
  }

  return (
    <>
      <section className={classes.adminSection}>
        <h2>Clients</h2>
        {loading ? (
          <Loading message="Loading clients..." />
        ) : error ? (
          <p className={classes.error}>{error}</p>
        ) : clients.length > 0 ? (
          <ul className={classes.clientsList}>
            {clients.map((client) => (
              <li key={client.id}>
                <p>
                  {client.fullName} ({client.email})
                </p>
                <div className={classes.listActions}>
                  <Button 
                   path={`/client-details/${client.id}`} 
                   className={classes.viewButton} 
                   isLink
                   >
                    View
                  </Button>
                  <Button 
                   className={classes.deleteButton} 
                   onClick={() => handleDeleteClick(client.id)} 
                   redBtn
                   >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No clients found</p>
        )}
      </section>
      {openedModal && <Modal />}
    </>
  );
}

export default ClientsData
