"use client";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Link2,
  Loader2,
} from "lucide-react";
import { SUPPORTED_TOKENS, CHAIN_INFO } from "@/lib/constants";
import { isValidAddress, generatePaymentUrl } from "@/lib/utils";

interface LinkFormData {
  recipient: string;
  amount: string;
  token: string;
  memo: string;
  expiry: string;
}

export function CreateLinkForm() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const tokens = SUPPORTED_TOKENS[chainId] || SUPPORTED_TOKENS[84532];
  const chainInfo = CHAIN_INFO[chainId] || CHAIN_INFO[84532];

  const [form, setForm] = useState<LinkFormData>({
    recipient: "",
    amount: "",
    token: tokens[0]?.address || "",
    memo: "",
    expiry: "",
  });

  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const selectedToken = tokens.find((t) => t.address === form.token) || tokens[0];

  const handleCreate = async () => {
    if (!isValidAddress(form.recipient) || !form.amount || parseFloat(form.amount) <= 0) return;

    setIsCreating(true);

    // Generate a client-side payment link (in production, this would interact with the smart contract)
    await new Promise((r) => setTimeout(r, 800)); // Simulate tx

    const linkId = `0x${Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;

    const url = generatePaymentUrl({
      linkId,
      to: form.recipient,
      amount: form.amount,
      token: selectedToken.symbol,
      chain: chainInfo.name,
      memo: form.memo,
    });

    setGeneratedLink(url);
    setIsCreating(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid =
    isValidAddress(form.recipient) &&
    form.amount &&
    parseFloat(form.amount) > 0;

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!generatedLink ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-paylinka-500 to-paylinka-700 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Create Payment Link
                </h2>
                <p className="text-xs text-dark-400">
                  {chainInfo.logo} {chainInfo.name}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={form.recipient}
                  onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder:text-dark-500 focus:outline-none focus:border-paylinka-500 transition-colors font-mono text-sm"
                />
                {form.recipient && !isValidAddress(form.recipient) && (
                  <p className="text-red-400 text-xs mt-1">Invalid address</p>
                )}
              </div>

              {/* Amount + Token */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="any"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder:text-dark-500 focus:outline-none focus:border-paylinka-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Token
                  </label>
                  <select
                    value={form.token}
                    onChange={(e) => setForm({ ...form, token: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-paylinka-500 transition-colors text-sm appearance-none cursor-pointer"
                  >
                    {tokens.map((t) => (
                      <option key={t.symbol} value={t.address}>
                        {t.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Memo */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Memo{" "}
                  <span className="text-dark-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Coffee payment, Invoice #123, etc."
                  value={form.memo}
                  onChange={(e) => setForm({ ...form, memo: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder:text-dark-500 focus:outline-none focus:border-paylinka-500 transition-colors text-sm"
                />
              </div>

              {/* Expiry */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Expiry{" "}
                  <span className="text-dark-500 font-normal">(optional)</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-paylinka-500 transition-colors text-sm"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleCreate}
                disabled={!isFormValid || isCreating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-paylinka-600 to-paylinka-500 text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-paylinka-500/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Link...
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    Generate Payment Link
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-7 h-7 text-green-400" />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Payment Link Created!
            </h2>
            <p className="text-dark-400 text-sm mb-8">
              Share this link to receive{" "}
              <span className="text-white font-medium">
                {form.amount} {selectedToken.symbol}
              </span>{" "}
              on {chainInfo.name}
            </p>

            {/* QR Code */}
            <div className="bg-white p-6 rounded-2xl inline-block mb-6">
              <QRCodeSVG
                value={generatedLink}
                size={200}
                level="H"
                bgColor="#ffffff"
                fgColor="#020617"
              />
            </div>

            {/* Link display */}
            <div className="bg-dark-800 rounded-xl p-4 mb-6 flex items-center gap-3">
              <code className="flex-1 text-sm text-dark-300 font-mono truncate text-left">
                {generatedLink}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-lg hover:bg-dark-700 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-dark-400" />
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGeneratedLink(null);
                  setForm({
                    recipient: "",
                    amount: "",
                    token: tokens[0]?.address || "",
                    memo: "",
                    expiry: "",
                  });
                }}
                className="flex-1 py-3 rounded-xl border border-dark-600 text-dark-300 hover:text-white hover:border-dark-500 font-medium transition-all"
              >
                Create Another
              </button>
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-paylinka-600 hover:bg-paylinka-500 text-white font-medium transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Link
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
