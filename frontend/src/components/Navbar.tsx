"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
import { Link2, Wallet, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { shortenAddress } from "@/lib/utils";
import { CHAIN_INFO } from "@/lib/constants";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  const chainInfo = CHAIN_INFO[chainId];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-paylinka-500 to-paylinka-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Link2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            Pay<span className="text-paylinka-400">linka</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/create" className="text-sm text-dark-300 hover:text-white transition-colors">
            Create Link
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-dark-300 hover:text-white transition-colors">
            Docs
          </a>
        </div>

        {/* Wallet */}
        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-paylinka-600 hover:bg-paylinka-500 text-white text-sm font-medium transition-all btn-glow"
          >
            <Link2 className="w-4 h-4" />
            Create Link
          </Link>

          {!isConnected ? (
            <div className="relative">
              <button
                onClick={() => setShowConnectors(!showConnectors)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dark-600 hover:border-paylinka-500 text-sm font-medium text-white transition-all hover:bg-dark-800"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
              {showConnectors && (
                <div className="absolute right-0 top-12 w-56 glass rounded-xl p-2 shadow-2xl">
                  {connectors.map((connector) => (
                    <button
                      key={connector.uid}
                      onClick={() => {
                        connect({ connector });
                        setShowConnectors(false);
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-all"
                    >
                      {connector.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative flex items-center gap-2">
              {chainInfo && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dark-600 text-sm text-dark-300">
                  {chainInfo.logo} {chainInfo.name}
                </span>
              )}
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dark-600 hover:border-paylinka-500 text-sm font-medium text-white transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-green-400" />
                {shortenAddress(address!)}
                <ChevronDown className="w-3 h-3 text-dark-400" />
              </button>
              {showWalletMenu && (
                <div className="absolute right-0 top-12 w-48 glass rounded-xl p-2 shadow-2xl">
                  <button
                    onClick={() => {
                      disconnect();
                      setShowWalletMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-dark-700 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
