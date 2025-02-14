import React, { useState } from 'react';
import { Users, MoreVertical, Trash2 } from 'lucide-react';

export function UserTableCard({ users, onDeleteUser }) {
  const [hoveredUser, setHoveredUser] = useState(null);

  return (
    <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-gray-200/50 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Current Users</h2>
      </div>
      
      {users.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200/50">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Username</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Chat ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {users.map((user) => (
                <tr 
                  key={user.chatId} 
                  className={`group transition-all duration-200 ${
                    hoveredUser === user.chatId 
                      ? 'bg-blue-50/50 shadow-sm' 
                      : 'bg-white/50 hover:bg-gray-50/30'
                  }`}
                  onMouseEnter={() => setHoveredUser(user.chatId)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium transition-colors ${
                        hoveredUser === user.chatId ? 'text-blue-600' : 'text-gray-800'
                      }`}>
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono text-sm transition-colors ${
                      hoveredUser === user.chatId ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {user.chatId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDeleteUser(user.chatId)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                          transition-all duration-300 
                             bg-red-500/10 text-red-600 hover:bg-red-500/20
                        `}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50/50 rounded-xl border border-gray-200/50">
          <p className="text-gray-500">No users found.</p>
        </div>
      )}
    </div>
  );
}