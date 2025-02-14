import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function LoginPanel({ onLogin }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        onLogin(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="font-extrabold mb-6 text-4xl sm:text-5xl lg:text-6xl text-center text-gray-800">
        <span>
          Manage Telegram <span className="text-blue-500">Weather</span>
        </span>
        <span className="block">Bot API Keys</span>
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-slate-500 mb-8 max-w-2xl text-center">
        Built with 💙 by <span className="font-semibold">Rishabh</span>
      </p>
      <button
        onClick={login}
        className="flex items-center bg-gray-800 text-white text-sm sm:text-lg font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:bg-gray-700 transition-all"
      >
        <FcGoogle className="w-5 sm:w-6 h-5 sm:h-6 mr-2 bg-white rounded-full p-1" />
        Login with Google
      </button>
    </div>
  );
}
