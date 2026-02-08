"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, QrCode, Smartphone, Globe } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dots">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-paylinka-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-paylinka-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-paylinka-700/50 bg-paylinka-950/50 text-paylinka-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            On-chain payments, simplified
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Turn links into{" "}
          <span className="gradient-text">on-chain payments</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto mb-10 text-balance"
        >
          Create programmable crypto payment links that work across wallets, QR
          codes, NFC, and apps — no checkout UI required.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/create"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-paylinka-600 to-paylinka-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-paylinka-500/25 hover:scale-[1.02]"
          >
            Create Payment Link
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-dark-600 text-dark-300 hover:text-white hover:border-dark-500 font-medium text-lg transition-all"
          >
            How it works
          </a>
        </motion.div>

        {/* Demo link preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="gradient-border">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-dark-800 rounded-lg px-4 py-1.5">
                  <code className="text-sm text-dark-400 font-mono">
                    paylinka.app/pay/0x1a2b...
                  </code>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-dark-800/50">
                  <p className="text-xs text-dark-500 mb-1">Token</p>
                  <p className="text-sm font-semibold text-white">USDC</p>
                </div>
                <div className="p-3 rounded-xl bg-dark-800/50">
                  <p className="text-xs text-dark-500 mb-1">Amount</p>
                  <p className="text-sm font-semibold text-white">5.00</p>
                </div>
                <div className="p-3 rounded-xl bg-dark-800/50">
                  <p className="text-xs text-dark-500 mb-1">Chain</p>
                  <p className="text-sm font-semibold text-white">Base</p>
                </div>
                <div className="p-3 rounded-xl bg-dark-800/50">
                  <p className="text-xs text-dark-500 mb-1">Status</p>
                  <p className="text-sm font-semibold text-green-400">Active ✓</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
