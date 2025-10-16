"use client";

import sendOtp from "@/services/send-otp.service";
import { useStatusStore } from "@/stores/useStatusStore";
import { useState } from "react";

export default function SendOtpPage() {
  const [email, setEmail] = useState("");

  const { setStatus, loading, success } = useStatusStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await sendOtp(email);
    if (res) {
      setStatus("success");
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    } else {
      setStatus("error");
    }
    console.log(res);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Send OTP</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
