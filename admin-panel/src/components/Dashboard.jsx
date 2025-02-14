import React from 'react';
import ApiKeyManager from './ApiKeyManager';
import UsersTable from './UsersTable';

function Dashboard({ apiKey, users, onUpdateApiKey, onDeleteUser }) {
  return (
    <>
      <ApiKeyManager apiKey={apiKey} onUpdateApiKey={onUpdateApiKey} />
      <UsersTable users={users} onDeleteUser={onDeleteUser} />
    </>
  );
}

export default Dashboard;
