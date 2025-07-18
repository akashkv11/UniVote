"use client";

import { useState } from "react";

export default function SendOtpPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "OTP sent successfully!");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong.");
    }
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
          disabled={status === "loading"}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white font-semibold ${
            status === "loading"
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading" ? "Sending..." : "Send OTP"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
