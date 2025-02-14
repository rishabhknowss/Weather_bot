import React from 'react';

function UsersTable({ users, onDeleteUser }) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-bold mb-4">Current Users</h2>
      {users.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Chat ID</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.chatId} className="text-center">
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.chatId}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => onDeleteUser(user.chatId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </div>
  );
}

export default UsersTable;
