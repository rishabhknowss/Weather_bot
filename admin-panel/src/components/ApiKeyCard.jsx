"use client";

import { useState } from "react";
import { Copy, Shield, Check, Edit3, Save, AlertCircle } from "lucide-react";

export function ApiKeyCard({ apiKey, onUpdateApiKey }) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedApiKey, setEditedApiKey] = useState(apiKey);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setError(true);
    }
  };

  const handleSave = () => {
    setEditing(false);
    if (editedApiKey !== apiKey) {
      onUpdateApiKey(editedApiKey);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-white/80 p-4 sm:p-6 rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
          <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">API Key</h2>
      </div>

      <div className="relative group">
        {editing ? (
          <input
            type="text"
            value={editedApiKey}
            onChange={(e) => setEditedApiKey(e.target.value)}
            className="w-full bg-gray-50 p-3 sm:p-4 rounded-xl text-gray-800 font-mono text-xs sm:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div className="bg-gray-50 p-3 sm:p-4 rounded-xl text-gray-800 font-mono text-xs sm:text-sm break-all border border-gray-200 hover:border-blue-300 transition-colors">
            {apiKey}
          </div>
        )}

        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          className="absolute right-2 sm:right-3 top-2 sm:top-3 p-1 sm:p-2 bg-white rounded-lg transition-all duration-300 hover:bg-blue-50"
          title={editing ? "Save" : "Edit"}
        >
          {editing ? (
            <Save className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
          ) : (
            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          )}
        </button>

        <button
          onClick={handleCopy}
          className="absolute right-8 sm:right-12 top-2 sm:top-3 p-1 sm:p-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-50"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
          ) : (
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-center text-red-500 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Failed to copy API key. Please try again.
        </div>
      )}
    </div>
  );
}
