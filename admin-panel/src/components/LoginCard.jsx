import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function LoginPanel({ onLogin }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        
        // Fetch user profile using the access token
        const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        const user = response.data;
        onLogin(user); // Pass the full user data to the parent component
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <div className="flex flex-col justify-center items-center h-full mt-30">
      <div className="font-extrabold mb-6 text-6xl grid items-center justify-center text-gray-800">
        <span>
          Manage Telegram <span className="text-blue-500">Weather</span>
        </span>
        <span className="flex justify-center">Bot API Keys</span>
      </div>
      <p className="text-lg text-slate-500 mb-8 max-w-2xl text-center">
        Built with 💙 by <span className="font-semibold">Rishabh</span>
      </p>
      <button
        onClick={login}
        className="cursor-pointer flex items-center bg-gray-800 text-white text-lg font-medium px-8 py-4 rounded-full shadow-2xl hover:bg-gray-700 transition-all"
      >
        <FcGoogle className="w-6 h-6 mr-3 bg-white rounded-full p-1" />
        Login with Google
      </button>
    </div>
  );
}
