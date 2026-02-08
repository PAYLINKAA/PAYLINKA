// Paylinka – Contract ABI & addresses
// Update addresses after deployment

export const PAYLINKA_ROUTER_ABI = [
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "expiry", type: "uint256" },
      { name: "memo", type: "string" },
    ],
    name: "createPaymentLink",
    outputs: [{ name: "linkId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "linkId", type: "bytes32" }],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "linkId", type: "bytes32" }],
    name: "cancelLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "linkId", type: "bytes32" }],
    name: "getLink",
    outputs: [
      {
        components: [
          { name: "creator", type: "address" },
          { name: "recipient", type: "address" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "expiry", type: "uint256" },
          { name: "memo", type: "string" },
          { name: "paid", type: "bool" },
          { name: "cancelled", type: "bool" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "linkId", type: "bytes32" }],
    name: "isLinkActive",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "creator", type: "address" }],
    name: "getLinksByCreator",
    outputs: [{ name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "linkId", type: "bytes32" },
      { indexed: true, name: "creator", type: "address" },
      { indexed: true, name: "recipient", type: "address" },
      { indexed: false, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "expiry", type: "uint256" },
      { indexed: false, name: "memo", type: "string" },
    ],
    name: "LinkCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "linkId", type: "bytes32" },
      { indexed: true, name: "payer", type: "address" },
      { indexed: true, name: "recipient", type: "address" },
      { indexed: false, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
    name: "PaymentCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "linkId", type: "bytes32" }],
    name: "LinkCancelled",
    type: "event",
  },
] as const;

// Contract addresses by chain ID
export const PAYLINKA_ADDRESSES: Record<number, `0x${string}`> = {
  // Base Sepolia
  84532: (process.env.NEXT_PUBLIC_PAYLINKA_ROUTER_BASE_SEPOLIA || "0x0000000000000000000000000000000000000000") as `0x${string}`,
  // Polygon Mumbai
  80001: (process.env.NEXT_PUBLIC_PAYLINKA_ROUTER_POLYGON_MUMBAI || "0x0000000000000000000000000000000000000000") as `0x${string}`,
  // Arbitrum Sepolia
  421614: (process.env.NEXT_PUBLIC_PAYLINKA_ROUTER_ARBITRUM_SEPOLIA || "0x0000000000000000000000000000000000000000") as `0x${string}`,
  // Monad Testnet
  10143: (process.env.NEXT_PUBLIC_PAYLINKA_ROUTER_MONAD_TESTNET || "0x0000000000000000000000000000000000000000") as `0x${string}`,
};

// Supported tokens per chain
export const SUPPORTED_TOKENS: Record<
  number,
  { symbol: string; name: string; address: `0x${string}`; decimals: number }[]
> = {
  84532: [
    { symbol: "ETH", name: "Ethereum", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
    { symbol: "USDC", name: "USD Coin", address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", decimals: 6 },
  ],
  80001: [
    { symbol: "MATIC", name: "Polygon", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
    { symbol: "USDC", name: "USD Coin", address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23", decimals: 6 },
  ],
  421614: [
    { symbol: "ETH", name: "Ethereum", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
  ],
  10143: [
    { symbol: "MON", name: "Monad", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
  ],
};

// Chain display info
export const CHAIN_INFO: Record<number, { name: string; logo: string; explorer: string }> = {
  84532: { name: "Base Sepolia", logo: "🔵", explorer: "https://sepolia.basescan.org" },
  80001: { name: "Polygon Mumbai", logo: "🟣", explorer: "https://mumbai.polygonscan.com" },
  421614: { name: "Arbitrum Sepolia", logo: "🔷", explorer: "https://sepolia.arbiscan.io" },
  10143: { name: "Monad Testnet", logo: "⚡", explorer: "https://testnet.monadexplorer.com" },
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
