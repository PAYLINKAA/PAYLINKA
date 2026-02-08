<p align="center">
  <img src="frontend/public/paylinka-logo.svg" alt="Paylinka Logo" width="80" />
</p>

<h1 align="center">Paylinka</h1>
<h3 align="center">Turn links into on-chain payments</h3>

<p align="center">
  <strong>Paylinka lets anyone create programmable crypto payment links that work across wallets, QR codes, NFC, and apps — no checkout UI required.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#smart-contracts">Smart Contracts</a> •
  <a href="#demo">Demo</a> •
  <a href="#architecture">Architecture</a>
</p>

---

## 💡 The Problem

Crypto payments are fragmented. Every wallet, every chain, every token — different UX, different flow. There's no universal "pay now" button for Web3.

## 💎 The Solution

**Paylinka** generates shareable, programmable payment links that encode everything needed for an on-chain transaction:

```
paylinka://pay?to=0xABC&amount=5&token=USDC&chain=base
```

One link. Any wallet. Any surface — QR code, NFC tag, embedded in a website, or shared in a DM.

> "Most payment systems build UIs. Paylinka builds links. And links work everywhere."

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **Instant Payment Links** | Create a payment link in seconds — specify recipient, amount, token, and chain |
| 📱 **QR Code Generation** | Every link auto-generates a scannable QR code |
| 🏷️ **NFC Ready** | Links work with NFC tags for tap-to-pay at physical locations |
| 🔐 **Wallet Agnostic** | Works with MetaMask, WalletConnect, Coinbase Wallet, and more |
| ⛓️ **Multi-Chain** | Supports Ethereum, Base, Polygon, Arbitrum, Optimism, Monad |
| 🪙 **Multi-Token** | ETH, USDC, USDT, DAI, and any ERC-20 |
| 📊 **On-Chain Tracking** | Every payment is verifiable on-chain with event logs |
| ⏱️ **Expiry & Conditions** | Set payment deadlines and minimum/maximum amounts |
| 🧾 **Payment Memos** | Attach messages or reference IDs to payments |
| 🎨 **No Checkout UI** | Recipients just connect wallet and confirm — zero friction |

---

## 🏗️ How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Creator     │────▶│   Paylinka    │────▶│   Receiver   │
│  (Merchant)   │     │   Protocol    │     │   (Payer)    │
└──────────────┘     └──────────────┘     └──────────────┘
       │                     │                     │
  Creates link         Encodes params         Opens link
  with params          on-chain/off-chain     Connects wallet
       │                     │                Confirms tx
       │                     │                     │
       └─────────────────────┴─────────────────────┘
                    On-chain settlement
```

1. **Creator** fills in payment details (recipient, amount, token, chain)
2. **Paylinka** generates a unique payment link + QR code
3. **Payer** opens the link, connects their wallet, and confirms the transaction
4. **Smart contract** processes the payment and emits events for tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **Wallet** | wagmi v2, viem, WalletConnect |
| **Smart Contracts** | Solidity 0.8.24, Hardhat |
| **QR Codes** | qrcode.react |
| **Chain Support** | Ethereum, Base, Polygon, Arbitrum, Optimism, Monad |
| **Deployment** | Vercel (frontend), Hardhat (contracts) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or any WalletConnect-compatible wallet

### 1. Clone & Install

```bash
git clone https://github.com/your-username/paylinka.git
cd paylinka

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend && npm install
```

### 2. Configure Environment

```bash
# Root — for smart contract deployment
cp .env.example .env

# Frontend
cp frontend/.env.example frontend/.env.local
```

### 3. Compile & Deploy Contracts

```bash
# Compile
npx hardhat compile

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost

# Deploy to Base Sepolia testnet
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### 4. Run Frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live 🚀

---

## 📜 Smart Contracts

### PaylinkaRouter.sol

The core contract that processes payments:

```solidity
// Create a payment request
function createPaymentLink(
    address recipient,
    address token,
    uint256 amount,
    uint256 expiry,
    string calldata memo
) external returns (bytes32 linkId);

// Execute a payment via link
function pay(bytes32 linkId) external payable;
```

### Key Events

```solidity
event LinkCreated(bytes32 indexed linkId, address indexed recipient, uint256 amount);
event PaymentCompleted(bytes32 indexed linkId, address indexed payer, uint256 amount);
event LinkExpired(bytes32 indexed linkId);
```

### Deployed Addresses

| Network | Address |
|---------|---------|
| Base Sepolia | `TBD` |
| Polygon Mumbai | `TBD` |
| Arbitrum Sepolia | `TBD` |

---

## 🎥 Demo

### Creating a Payment Link
1. Visit the app → Click **"Create Payment Link"**
2. Enter recipient address, amount, token, and chain
3. Get a shareable link + QR code instantly

### Making a Payment
1. Open the payment link (or scan the QR code)
2. Connect your wallet
3. Review the payment details
4. Click **"Pay Now"** → Confirm in wallet → Done ✅

### Deep Link Format
```
https://paylinka.app/pay/0x1234...?amount=5&token=USDC&chain=base&memo=Coffee
```

---

## 🏛️ Architecture

```
paylinka/
├── contracts/                 # Solidity smart contracts
│   ├── PaylinkaRouter.sol     # Core payment router
│   └── interfaces/            # Contract interfaces
├── frontend/                  # Next.js frontend app
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── create/        # Create payment link
│   │   │   └── pay/[id]/      # Payment page
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities & constants
│   │   └── hooks/             # Custom React hooks
│   └── public/                # Static assets
├── scripts/                   # Deployment scripts
├── test/                      # Contract tests
└── hardhat.config.ts          # Hardhat configuration
```

---

## 🧪 Testing

```bash
# Run smart contract tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Frontend tests
cd frontend && npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>Paylinka</strong> — Turn links into on-chain payments 
</p>
