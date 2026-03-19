# 🛡️ AegisAgent: Autonomous Celo Forensic Sentinel

AegisAgent is a fully autonomous intelligence layer for the **Celo L2 ecosystem**. It operates as a 24/7 on-chain sentinel, processing high-fidelity forensic data, generating AI-driven risk assessments, and monetizing its own intelligence via a decentralized subscription model.

> Built for the **Build Agents for the Real World - Celo Hackathon V2**.

---

## 💎 Core Innovation
AegisAgent is not just a dashboard; it is an **Autonomous Economic Unit (AEU)**. It performs the full lifecycle of investment intelligence without human oversight:
- **High-Fidelity Processing**: Computes **100+ unique forensic data points** per token every 60 minutes.
- **AI Synthesis**: Uses **Groq-accelerated LLaMA 3.3** to detect risk clusters, whale distribution, and breakout probabilities.
- **On-Chain Monetization**: Gates premium forensics behind the **AegisAgent Subscription Contract** on Celo L2 Sepolia.

---

## ⚖️ Technical Architecture
AegisAgent runs a unified backend pipeline that synchronizes market data with on-chain verification.

### 1. Forensic Intelligence Engine
The engine monitors real Celo mainnet tokens ($UBE, $MOO, $ETHIX, etc.) and calculates:
- **Net Buy Pressure (NBP)**: Real-time volume flow analysis.
- **Impact Crash Risk (ICR)**: Liquidity-to-Volume depth stress testing.
- **Whale Concentration Index**: Top-tier holder distribution tracking.
- **Statistical Momentum**: RSI, MACD, and Bollinger Band signal processing.

### 2. Autonomous Orchestrator (`agent.py`)
- Executes the data collection, forensic analysis, and AI synthesis in a **1-hour cycle**.
- Publishes intelligence states to a public-facing forensic dashboard.
- Operates independently on a headless environment (GCP/VPS).

### 3. Autonomous Alert System
AegisAgent doesn't just wait for you to visit; it **pushes intelligence**. 
- **Real-World Impact**: Autonomously broadcasts high-priority alerts to Telegram/Social channels when "Rupture" or "Critical Risk" signals are detected in the Celo ecosystem.

### 4. Decentralized Pay-to-Unlock (x402 Pattern)
Intelligence is protected by a bespoke, high-fidelity implementation of the **x402 Autonomous Micropayment Pattern**:
- **Bespoke SDK**: A custom sovereign contract `AegisAgent.sol` manages decentralized access control.
- **Network**: Celo L2 Sepolia (Chain ID `11142220`)
- **⛓️ Contract**: `0x74B24d2cd92046772674bFf9B85c11cFd2b9C3d2` (Celo L2 Sepolia)
- **💠 AgentID**: `65` (ERC-8004)
- **🌐 Live App**: [frontend-beta-three-51.vercel.app](https://frontend-beta-three-51.vercel.app)
- **Model**: Users pay a micro-subscription (0.1 CELO-S) directly to the agent's contract to gain 24-hour access.

---

## 🛠️ System Deployment

### Frontend (Intelligence Dashboard)
Built with React + Vite + Tailwind CSS for a high-fidelity "terminal" aesthetic.
```bash
cd frontend
npm install
npm run dev
```

### Backend (Sentinel Orchestrator)
Requires Python 3.10+ and a Moralis/Groq API key.
```bash
pip install -r requirements.txt
python3 backend/agent.py
```

---

## ⛓️ On-Chain Infrastructure
- **Chain**: Celo L2 Sepolia
- **Explorer**: [View Contract](https://explorer.celo.org/sepolia/address/0x74B24d2cd92046772674bFf9B85c11cFd2b9C3d2)
- **Deployment**: Verified via Hardhat for trustless transparency.

---

## 💠 Brand Vision: AegisAgent Cyan
The project is built around the **AegisAgent Cyan (#00E5FF)** design system — representing a crisp, surgical, and tech-sharp approach to crypto forensics. By removing the "human-in-the-loop," AegisAgent provides unbiased, data-driven security for the Celo ecosystem.

---
*Fully autonomous forensic intelligence. Built for the Celo L2 Ecosystem (11142220).* 
