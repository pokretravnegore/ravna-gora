"use client";

import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

export function DevTokenPanel() {
  const { session } = useAuth();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  if (process.env.NODE_ENV === "production") return null;
  if (!session) return null;

  const token = session.access_token;

  function copy() {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="border border-yellow-400 bg-yellow-50 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <p className="type-label text-gray-2 uppercase tracking-widest">
          Dev — JWT access token
        </p>
        <button
          onClick={() => setVisible((v) => !v)}
          className="type-caption text-blue-2 hover:underline shrink-0"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {visible && (
        <div className="flex flex-col gap-2">
          <textarea
            readOnly
            value={token}
            className="font-mono text-xs bg-white border border-black/20 p-2 w-full h-24 resize-none outline-none"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={copy}
              className="type-caption text-blue-2 hover:underline"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
            <span className="type-caption text-gray-3">
              Use as: <code>Authorization: Bearer &lt;token&gt;</code>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
