import React, { useState } from 'react';
import { Copy, Shield, Check } from 'lucide-react';

export function ApiKeyCard({ apiKey, onUpdateApiKey }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">API Key</h2>
      </div>
      
      <div className="group relative">
        <div className="bg-gray-50/80 p-4 rounded-xl text-gray-800 font-mono text-sm break-all border border-gray-200/50 hover:border-blue-200 transition-colors">
          {apiKey}
          <button 
            onClick={handleCopy}
            className="absolute right-3 top-3 p-2 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-50"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={onUpdateApiKey}
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium 
                 shadow-lg hover:shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] 
                 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update API Key
      </button>
    </div>
  );
}