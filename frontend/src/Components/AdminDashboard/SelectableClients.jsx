import React from 'react'
const SelectableClients = ({clients, selectedClient, setSelectedClient}) => {
  return (
      <select
        value={selectedClient ? selectedClient.id : ''}
        onChange={e => {
          const client = clients.find(client => client.id === e.target.value);
          setSelectedClient(client);
        }}
        required
      >
        <option value="">Select a client</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>
            {client.fullName}
          </option>
        ))}
      </select>
  )
}

export default SelectableClients
