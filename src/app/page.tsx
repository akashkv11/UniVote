// app/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const [pollCode, setPollCode] = useState("");
  const router = useRouter();

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pollCode.trim()) {
      router.push(`/poll/${pollCode.trim()}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">🎉 Univote</h1>
      <p className="text-lg mb-8 text-center text-gray-600">
        Universal Link-Based Polling
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Create Poll Section */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Create a New Poll</h2>
          <p className="text-sm text-gray-500 mb-4">
            Set your question and options. Share the link with voters.
          </p>
          <Link href="/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
              Create Poll
            </button>
          </Link>
        </div>

        {/* Vote by Code Section */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Vote in a Poll</h2>
          <form onSubmit={handleVoteSubmit}>
            <input
              type="text"
              value={pollCode}
              onChange={(e) => setPollCode(e.target.value)}
              placeholder="Enter Poll Code"
              className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
            >
              Vote Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
