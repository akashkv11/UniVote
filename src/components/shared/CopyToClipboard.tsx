// components/CopyToClipboard.tsx
"use client";

import tryCatch from "@/utils/try-catch";
import React, { useState } from "react";
import { FaClipboard, FaCheck } from "react-icons/fa";

type Props = {
  text: string;
  label?: string;
};

const CopyToClipboard: React.FC<Props> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const code = text?.split(": ")[1]?.trim() || text; // Extract code if formatted as "Your poll code: <code>"
  const handleCopy = async () => {
    const { error: err } = await tryCatch(navigator.clipboard.writeText(code));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    if (err) {
      console.error("Clipboard copy failed:", err);
      return;
    }
  };

  return (
    <div className="inline-flex items-center gap-3">
      <span className="select-text">{text}</span>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
      >
        {copied ? (
          <>
            <FaCheck className="text-sm" />
            Copied
          </>
        ) : (
          <>
            <FaClipboard className="text-sm" />
          </>
        )}
      </button>
    </div>
  );
};

export default CopyToClipboard;
