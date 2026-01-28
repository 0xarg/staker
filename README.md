# StakeX

StakeX is an **upgradeable Ethereum staking protocol** with **time-based rewards**, an **ERC20 incentive token**, and a **production-ready Web3 frontend**.

The project demonstrates real-world Web3 patterns:

- Upgradeable smart contracts (UUPS / ERC1967)
- Lazy reward accounting
- Secure staking + claiming flows
- Wallet-agnostic frontend (MetaMask, WalletConnect, Phantom, Backpack)
- Clean repository hygiene (no build artifacts committed)

This is **not a demo contract** — it is structured the way production Web3 apps are built.

---

## ✨ Features

### Smart Contracts

- 🔐 **Upgradeable architecture** using OpenZeppelin UUPS (ERC1967)
- ⏱ **Time-based staking rewards** (accrue continuously over time)
- 🪙 **ERC20 reward token** minted on claim
- ♻️ **Safe upgrade flow** with storage gap protection
- 🧪 **Tested with Foundry**
- 🚫 No hard-coded economics (reward rate configurable via logic)

### Frontend

- ⚛️ **Next.js (App Router)**
- 🔗 **wagmi + viem** for contract interaction
- 👛 Wallet support: MetaMask, WalletConnect, Phantom, Backpack
- ⛽ Explicit gas handling for cross-wallet reliability
- 🎞 Framer Motion animations
- 📊 Live reward tracking & claim UX

---

## 🏗 Architecture Overview

```bash
contracts/
├─ src/ # Solidity contracts
│ ├─ Staking.sol # UUPS upgradeable staking logic
│ ├─ StakingV2.sol # Upgraded implementation
│ └─ StakeX.sol # ERC20 reward token
├─ script/ # Deploy & upgrade scripts (Foundry)
├─ test/ # Contract tests
└─ foundry.toml
```

Frontend lives at the repo root using Next.js.

---

## 🔐 Upgradeability Model

- **Proxy:** ERC1967Proxy
- **Pattern:** UUPS
- **Authorization:** `onlyOwner` via `_authorizeUpgrade`
- **Storage safety:** Explicit storage gaps

Upgrades are performed without migrating user funds or state.

---

## 🧮 Reward Model (High Level)

- Rewards accrue continuously based on:
  - Staked ETH
  - Time elapsed
- Accounting is **lazy** (updated on user interaction)
- A view function computes **pending rewards** for accurate UI display
- Rewards are minted only on claim

This avoids unnecessary storage writes and reduces gas costs.

---

## 🚀 Deployment

Contracts are deployed using **Foundry scripts**.

Example:

```bash
forge script script/Deploy.s.sol \
  --rpc-url $RPC_URL \
  --broadcast \
  --private-key $PRIVATE_KEY

```

Upgrades:

```bash
forge script script/Upgrade.s.sol \
  --rpc-url $RPC_URL \
  --broadcast \
  --private-key $PRIVATE_KEY
```

🧪 Testing

```bash
forge test
```

Tests cover:

Staking

Unstaking

Reward accrual

Claim logic

Upgrade safety

🧹 Repo Hygiene

The following are intentionally not committed:

contracts/out

contracts/cache

contracts/broadcast

All builds are reproducible locally.

🛠 Tech Stack

Solidity (0.8.x)

OpenZeppelin Contracts & Upgradeable

Foundry (Forge, Cast, Anvil)

Next.js

TypeScript / TSX

wagmi + viem

Framer Motion

📌 Notes

This project is built as a portfolio-grade Web3 system, not a tutorial.
It focuses on correctness, upgrade safety, wallet compatibility, and real UX edge cases.
