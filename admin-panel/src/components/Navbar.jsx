import React from 'react';

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Weather Admin Dashboard</h1>
        {user && (
          <button
            onClick={onLogout}
            className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
