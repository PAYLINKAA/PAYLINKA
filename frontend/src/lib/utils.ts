import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatAmount(amount: string, decimals: number): string {
  const num = parseFloat(amount) / Math.pow(10, decimals);
  return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export function parseAmount(amount: string, decimals: number): bigint {
  const parts = amount.split(".");
  const whole = parts[0] || "0";
  const fraction = (parts[1] || "").padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole + fraction);
}

export function generatePaymentUrl(params: {
  linkId?: string;
  to?: string;
  amount?: string;
  token?: string;
  chain?: string;
  memo?: string;
}): string {
  const base = typeof window !== "undefined" ? window.location.origin : "https://paylinka.app";
  const url = new URL(`${base}/pay/${params.linkId || "custom"}`);

  if (params.to) url.searchParams.set("to", params.to);
  if (params.amount) url.searchParams.set("amount", params.amount);
  if (params.token) url.searchParams.set("token", params.token);
  if (params.chain) url.searchParams.set("chain", params.chain);
  if (params.memo) url.searchParams.set("memo", params.memo);

  return url.toString();
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function getTimeRemaining(expiry: number): string {
  if (expiry === 0) return "No expiry";
  const now = Math.floor(Date.now() / 1000);
  const diff = expiry - now;
  if (diff <= 0) return "Expired";
  if (diff < 3600) return `${Math.floor(diff / 60)}m remaining`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h remaining`;
  return `${Math.floor(diff / 86400)}d remaining`;
}
