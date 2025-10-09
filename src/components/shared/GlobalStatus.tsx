// components/GlobalStatus.tsx
"use client";

import { useStatusStore } from "@/stores/useStatusStore";

export default function GlobalStatus() {
  const { loading, error, success } = useStatusStore();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {loading && (
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded">
          Loading...
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          {success}
        </div>
      )}
    </div>
  );
}
