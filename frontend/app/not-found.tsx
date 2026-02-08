"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold bg-gradient-to-r from-paylinka-400 to-paylinka-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-dark-400 mb-8">
          The payment link you're looking for doesn't exist or has expired.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-paylinka-600 hover:bg-paylinka-500 text-white font-medium transition-all btn-glow"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
