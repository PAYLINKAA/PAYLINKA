"use client";

import { motion } from "framer-motion";
import {
  Link2,
  QrCode,
  Smartphone,
  Shield,
  Layers,
  Clock,
  Globe,
  Coins,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Instant Payment Links",
    description:
      "Create a payment link in seconds. Specify recipient, amount, token, and chain — share it anywhere.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description:
      "Every payment link auto-generates a scannable QR code. Perfect for in-person and print.",
  },
  {
    icon: Smartphone,
    title: "NFC Ready",
    description:
      "Encode payment links into NFC tags for tap-to-pay at physical locations and events.",
  },
  {
    icon: Shield,
    title: "Wallet Agnostic",
    description:
      "Works with MetaMask, WalletConnect, Coinbase Wallet, Rainbow, and any EVM wallet.",
  },
  {
    icon: Layers,
    title: "Multi-Chain",
    description:
      "Deploy on Ethereum, Base, Polygon, Arbitrum, and Optimism. One link, any chain.",
  },
  {
    icon: Coins,
    title: "Multi-Token",
    description:
      "Pay with ETH, USDC, USDT, DAI, or any ERC-20 token. Full flexibility for both sides.",
  },
  {
    icon: Clock,
    title: "Expiry & Conditions",
    description:
      "Set deadlines, minimum amounts, and programmable conditions on every payment link.",
  },
  {
    icon: Globe,
    title: "No Checkout UI",
    description:
      "Recipients just open the link, connect wallet, and confirm. Zero friction, zero UI overhead.",
  },
  {
    icon: FileText,
    title: "Payment Memos",
    description:
      "Attach messages, invoices, or reference IDs on-chain. Full traceability, immutable records.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paylinka-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need.{" "}
            <span className="gradient-text">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            Paylinka strips away complexity. Every feature exists to make
            on-chain payments effortless.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group p-6 rounded-2xl border border-dark-700/50 bg-dark-900/50 hover:border-paylinka-700/50 hover:bg-dark-800/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-paylinka-600/10 border border-paylinka-600/20 flex items-center justify-center mb-4 group-hover:bg-paylinka-600/20 transition-colors">
                <feature.icon className="w-5 h-5 text-paylinka-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
