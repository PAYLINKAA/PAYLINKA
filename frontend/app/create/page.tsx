"use client";

import { CreateLinkForm } from "@/components/CreateLinkForm";
import { motion } from "framer-motion";

export default function CreatePage() {
  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-dots relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-paylinka-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Create a{" "}
            <span className="gradient-text">Payment Link</span>
          </h1>
          <p className="text-dark-400 max-w-md mx-auto">
            Fill in the details below. You&apos;ll get a shareable link and QR code
            instantly.
          </p>
        </motion.div>

        <CreateLinkForm />
      </div>
    </section>
  );
}
