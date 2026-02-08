"use client";

import { useState } from "react";
import { useAccount, useChainId, useConnect } from "wagmi";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import {
  Check,
  Shield,
  Clock,
  Loader2,
  ExternalLink,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { CHAIN_INFO } from "@/lib/constants";
import { shortenAddress, getTimeRemaining } from "@/lib/utils";

interface PaymentViewProps {
  linkId: string;
  to: string;
  amount: string;
  token: string;
  chain: string;
  memo: string;
}

export function PaymentView({
  linkId,
  to,
  amount,
  token,
  chain,
  memo,
}: PaymentViewProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const chainInfo = Object.values(CHAIN_INFO).find(
    (c) => c.name.toLowerCase().includes(chain?.toLowerCase() || "base")
  ) || CHAIN_INFO[84532];

  const handlePay = async () => {
    if (!isConnected) return;
    setIsPaying(true);

    // Simulate payment (in production, this calls the smart contract)
    await new Promise((r) => setTimeout(r, 1500));

    const fakeTxHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;

    setTxHash(fakeTxHash);
    setIsPaid(true);
    setIsPaying(false);
  };

  if (isPaid) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 max-w-md mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Sent!</h2>
        <p className="text-dark-400 mb-6">
          You paid{" "}
          <span className="text-white font-semibold">
            {amount} {token}
          </span>{" "}
          to {shortenAddress(to)}
        </p>

        {txHash && (
          <a
            href={`${chainInfo.explorer}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800 border border-dark-600 text-paylinka-400 text-sm hover:border-paylinka-500 transition-all"
          >
            View on Explorer
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-paylinka-500 to-paylinka-700 flex items-center justify-center mx-auto mb-4 animate-float">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Payment Request</h2>
        <p className="text-dark-400 text-sm">via Paylinka</p>
      </div>

      {/* Payment details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50">
          <span className="text-sm text-dark-400">Amount</span>
          <span className="text-lg font-bold text-white">
            {amount} {token}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50">
          <span className="text-sm text-dark-400">Recipient</span>
          <span className="text-sm font-mono text-white">
            {shortenAddress(to)}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50">
          <span className="text-sm text-dark-400">Network</span>
          <span className="text-sm text-white">
            {chainInfo.logo} {chain || "Base Sepolia"}
          </span>
        </div>

        {memo && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50">
            <span className="text-sm text-dark-400">Memo</span>
            <span className="text-sm text-white">{memo}</span>
          </div>
        )}
      </div>

      {/* Action */}
      {!isConnected ? (
        <div className="text-center space-y-3">
          <p className="text-dark-400 text-sm mb-4">
            Connect your wallet to pay
          </p>
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full py-3 rounded-xl border border-dark-600 hover:border-paylinka-500 text-white font-medium transition-all flex items-center justify-center gap-2 hover:bg-dark-800"
            >
              <Wallet className="w-4 h-4" />
              Connect {connector.name}
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={handlePay}
          disabled={isPaying}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-paylinka-600 to-paylinka-500 text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-paylinka-500/25 disabled:opacity-60 flex items-center justify-center gap-2 btn-glow"
        >
          {isPaying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              Pay {amount} {token}
            </>
          )}
        </button>
      )}

      <p className="text-center text-xs text-dark-500 mt-4 flex items-center justify-center gap-1">
        <Shield className="w-3 h-3" />
        Secured by Paylinka smart contracts
      </p>
    </motion.div>
  );
}
