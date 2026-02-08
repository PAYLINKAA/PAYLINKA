"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Create a Link",
    description:
      "Fill in recipient address, amount, token, and chain. One form, one click.",
    visual: "🔗",
  },
  {
    num: "02",
    title: "Share Anywhere",
    description:
      "Get a shareable URL, QR code, or deep link. Embed it in websites, DMs, or NFC tags.",
    visual: "📤",
  },
  {
    num: "03",
    title: "Payer Opens Link",
    description:
      "The payer opens the link, connects their wallet, reviews amount and token.",
    visual: "👛",
  },
  {
    num: "04",
    title: "On-Chain Settlement",
    description:
      "One click to confirm. Payment settles on-chain with full traceability.",
    visual: "⛓️",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How <span className="gradient-text">Paylinka</span> works
          </h2>
          <p className="text-dark-400 text-lg">
            Four steps. Zero complexity. Full on-chain settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl border border-dark-700/50 bg-dark-900/30"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{step.visual}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-paylinka-400 bg-paylinka-600/10 px-2 py-0.5 rounded-md">
                      {step.num}
                    </span>
                    <h3 className="text-white font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-dark-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -bottom-4 right-8">
                  <ArrowRight className="w-4 h-4 text-dark-600 rotate-90 md:rotate-0" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
