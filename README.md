# 🛡️ AegisAgent
**Autonomous Sovereign Forensic Intelligence for the Celo L2 Ecosystem**

[![Live Demo](https://img.shields.io/badge/Live-aegisagento.vercel.app-00E5FF?style=for-the-badge)](https://aegisagento.vercel.app)
[![Celo Sepolia](https://img.shields.io/badge/Chain-Celo%20L2%20Sepolia-FCFF52?style=for-the-badge)](https://explorer.celo.org/sepolia/)
[![Track](https://img.shields.io/badge/Track-Best%20Agent%20on%20Celo-00E5FF?style=for-the-badge)]()

---

## 🎯 Mission

AegisAgent's mission is to make autonomous, institutional-grade on-chain intelligence accessible to every participant in the Celo ecosystem. By running a fully self-sustaining forensic AI agent that continuously monitors token health, detects anomalies, and generates AI-synthesized risk narratives — all gated by a non-custodial micropayment on Celo — we prove that AI agents can operate with genuine economic autonomy, providing real utility without a centralized operator.

---

## 🔍 Problem

The Celo ecosystem lacks real-time, autonomous on-chain risk intelligence. Traders, protocols, and investors have no systematic way to detect liquidity fragility, whale manipulation, or adversarial patterns in Celo-native tokens before they cause harm. Existing tools are reactive, manual, and do not model the full on-chain signal surface.

---

## ✅ Solution

AegisAgent is a fully autonomous AI forensic agent running natively on Celo L2. Every 60 minutes, it ingests live on-chain data across monitored Celo tokens and computes **100+ proprietary metrics** through **ForensicEngineV5**. A Groq LLM (LLaMA 3.3-70b) synthesizes all signals into a structured forensic narrative with zero human input.

Full per-token intelligence is monetized via a **non-custodial x402 micropayment subscription** (0.1 CELO / 24h) enforced by an on-chain smart contract — demonstrating genuine agent-native economic autonomy on Celo.

---

## 🏛️ Production Status

| | |
|---|---|
| **Live Dashboard** | [aegisagento.vercel.app](https://aegisagento.vercel.app) |
| **Smart Contract** | `0x74B24d2cd92046772674bFf9B85c11cFd2b9C3d2` (Celo L2 Sepolia) |
| **Agent Wallet** | `0xE32A943635107CA464a2c1328EFf34AE0bFa8247` |
| **Sentinel ID** | `66` (ERC-8004) |
| **Infrastructure** | Vercel Serverless + Upstash KV + Celo L2 Cron |
| **LLM** | LLaMA 3.3-70b via Groq |

---

## ⚡ The Forensic Metric Suite

### **SAI — Sovereign Anomaly Index**
Weighted composite score (0–10) integrating liquidity depth, directional flow, holder concentration, and structural momentum. The primary risk-adjusted output of each forensic cycle.

### **LFI — Liquidity Fragility Index**
Simulated price impact of a top-wallet exit event, derived from live liquidity pool depth. Threshold-based alert fires at LFI > 0.6.

### **TFA — Tactical Flow Analysis**
Net buy/sell pressure over a 24h rolling window, normalised against on-chain volume. Distinguishes programmatic accumulation from retail-driven distribution at the transaction level.

### **WCC — Whale Concentration Coefficient**
Gini-derived supply concentration ratio across the top 20 on-chain wallets. Elevated WCC (>15%) correlates strongly with coordination risk and asymmetric sell pressure.

### Additional Metrics
`LCR` · `DAI` · `ICR` · `IPS` · `BPI` · `BER` · `RSI 1H/1D` · `Bull Flag (Class 1/2/3)` · `Fibonacci Target` · `NBP` · `EV` · `VWAD` · `SCR` · `TCI` · `FCI`

---

## 🏆 Milestones

### Milestone 1 — Core Autonomous Agent & Forensic Engine ✅
Designed and deployed the full autonomous agent pipeline on Celo L2. Built **ForensicEngineV5** from scratch — a Python computation engine that fetches live on-chain data (liquidity pools, OHLCV, holder distribution) from DexScreener, GeckoTerminal, and Moralis, then computes 100+ proprietary forensic metrics. Deployed the **AegisSubscription smart contract** on Celo Sepolia with non-custodial x402 micropayment paywall (0.1 CELO / 24h). Integrated Groq LLM to autonomously generate structured forensic narratives — phase classification, structural insight, and risk assessment — with no human input.

### Milestone 2 — Live Intelligence Dashboard & Submission-Ready Polish ✅
Shipped a production-grade React frontend exposing the full forensic feed to users. Dashboard surfaces real-time SAI, LFI, TFA, WCC, RSI, Bull Flag status, and Groq AI narrative — populated from live on-chain data fetched in parallel via `ThreadPoolExecutor` to stay within Vercel serverless limits. Wallet-gated paywall overlay with automatic Celo L2 network switching and on-chain subscription verification. Project is fully deployed, publicly accessible, and submission-ready.

---

## 📡 API Reference

### `GET /api/forensics`
Returns the current forensic snapshot of the Celo ecosystem.

```json
{
  "timestamp": "ISO-8601",
  "network": "Celo",
  "tokens": {
    "0x...": {
      "symbol": "string",
      "sai": "float",
      "phase": "ENUM: ACCUMULATION | DISTRIBUTION | CONSOLIDATION",
      "tfa": "float",
      "lfi": "float",
      "narrative_phase": "string",
      "narrative_insight": "string",
      "alerts": []
    }
  }
}
```

---

## 🛠️ Local Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run a full forensic agent cycle
python3 backend/agent.py

# Launch the frontend
cd frontend && npm install && npm run dev
```

### Environment Variables
| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq LLM narrative generation |
| `MORALIS_API_KEY` | On-chain holder analysis |
| `PRIVATE_KEY` | Celo L2 contract operations |
| `KV_REST_API_URL` | Upstash Redis persistence |
| `KV_REST_API_TOKEN` | Upstash Redis auth |

---

*Autonomous intelligence. Non-custodial. Built for Celo L2 (Chain ID: 11142220).*
