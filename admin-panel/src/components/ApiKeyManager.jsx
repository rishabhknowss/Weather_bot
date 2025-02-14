import React from 'react';

function ApiKeyManager({ apiKey, onUpdateApiKey }) {
  return (
    <div className="bg-gray-100 p-4 rounded mb-6">
      <h2 className="text-lg font-bold">Manage API Key</h2>
      <p>Current API Key: {apiKey}</p>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={onUpdateApiKey}
      >
        Update API Key
      </button>
    </div>
  );
}

export default ApiKeyManager;
