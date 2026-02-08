"use client";

import { useSearchParams } from "next/navigation";
import { PaymentView } from "@/components/PaymentView";
import { use } from "react";

export default function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();

  const to = searchParams.get("to") || "0x0000000000000000000000000000000000000000";
  const amount = searchParams.get("amount") || "0";
  const token = searchParams.get("token") || "ETH";
  const chain = searchParams.get("chain") || "Base Sepolia";
  const memo = searchParams.get("memo") || "";

  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-dots relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-paylinka-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-6">
        <PaymentView
          linkId={id}
          to={to}
          amount={amount}
          token={token}
          chain={chain}
          memo={memo}
        />
      </div>
    </section>
  );
}
