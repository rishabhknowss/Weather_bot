import React from 'react';

function LoginPanel({ onLogin }) {
  return (
    <div className="text-center">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={onLogin}
      >
        Login with Google
      </button>
    </div>
  );
}

export default LoginPanel;
