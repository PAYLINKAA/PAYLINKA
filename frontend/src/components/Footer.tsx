"use client";

import Link from "next/link";
import { Link2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-dark-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-paylinka-500 to-paylinka-700 flex items-center justify-center">
              <Link2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-dark-300">
              Pay<span className="text-paylinka-400">linka</span>
            </span>
          </div>
          <p className="text-xs text-dark-500">
            Turn links into on-chain payments. Built for the future of Web3.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
              GitHub
            </a>
            <Link href="/create" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
              Create Link
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
