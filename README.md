# 🛡️ AegisAgent
> **Autonomous Sovereign Forensic Intelligence for the Celo L2 Ecosystem**

---

[![Live Demo](https://img.shields.io/badge/Live-aegisagento.vercel.app-00E5FF?style=for-the-badge)](https://aegisagento.vercel.app)
[![Celo L2](https://img.shields.io/badge/Network-Celo%20L2-FCFF52?style=for-the-badge)](https://explorer.celo.org/sepolia/)
[![Sovereign AI](https://img.shields.io/badge/AI-Venice.ai-FF3D00?style=for-the-badge)](https://venice.ai)

## 🚀 Overview

AegisAgent is a next-generation autonomous forensic agent designed for the Celo ecosystem. It provides institutional-grade on-chain intelligence, detecting liquidity fragility and adversarial patterns through 100+ proprietary metrics. By leveraging **Venice AI**, AegisAgent ensures that all risk narratives are generated with complete privacy and sovereign, permissionless inference.

---

## 🔍 Problem

The Celo ecosystem lacks real-time, autonomous on-chain risk intelligence. Traders, protocols, and investors have no systematic way to detect liquidity fragility, whale manipulation, or adversarial patterns in Celo-native tokens before they cause harm. Existing tools are reactive, manual, and do not model the full on-chain signal surface.

---

## ✅ Solution

AegisAgent is a fully autonomous AI forensic agent running natively on Celo L2. Every 60 minutes, it ingests live on-chain data across monitored Celo tokens and computes **100+ proprietary metrics** through **ForensicEngineV5**. A sovereign LLM (Venice.ai / Groq) synthesizes all signals into a structured forensic narrative with zero human input.

By integrating **Venice AI**, AegisAgent prioritizes user privacy and permissionless inference, qualifying for the **Private Agents** track at the Synthesis Hackathon.

Full per-token intelligence is monetized via a **non-custodial x402 micropayment subscription** (0.1 CELO / 24h) enforced by an on-chain smart contract — demonstrating genuine agent-native economic autonomy on Celo.

---

## 🏛️ Ecosystem Specs

| Component | specification |
|---|---|
| **Core Engine** | ForensicEngineV5 (Sovereign Metrics) |
| **Sovereign LLM** | **Venice AI** (Llama 3.3-70b) |
| **Network** | Celo L2 (Mainnet Optimized) |
| **Monetization** | x402 Non-custodial Micropayments |
| **Status** | Production Stable |

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

## 🏆 Capabilities

### 🔥 Autonomous Intelligence Loop
AegisAgent operates a fully self-sustaining pipeline. Every cycle, it ingests live on-chain telemetry, computes 100+ proprietary forensic markers, and synthesizes tactical risk narratives via Venice AI.

### 💰 On-Chain Economic Autonomy
The agent is gated by a non-custodial x402 micropayment subscription contract on Celo L2. Users pay 0.1 CELO for 24h of forensic access, demonstrating genuine agent-native economic sovereignty without centralized intervention.

---

## ⚡ Local Discovery

For local verification or developer testing, use the following commands:

```bash
# 1. Configure .env (VENICE_API_KEY)
# 2. Execute Discovery Scan
python3 scripts/nanobot_bridge.py scan

# 3. Analyze Token
python3 scripts/nanobot_bridge.py analyze <ADDRESS>
```

---

## 🧭 Intelligence Interface (Swagger-Style)

### `GET /api/forensics`
Returns the active forensic state of the Celo ecosystem.

#### 🟢 Response Schema `200 OK`
```json
{
  "timestamp": "ISO-8601",
  "ai_provider": "venice",
  "tokens": {
    "0x...": {
      "symbol": "string",
      "sai": 8.5,
      "phase": "ACCUMULATION",
      "lfi": 0.04,
      "narrative": {
        "insight": "AI-generated risk assessment...",
        "phase": "Institutional Accumulation"
      }
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
| `VENICE_API_KEY` | Venice.ai LLM narrative generation (Privacy-focused) |
| `GROQ_API_KEY` | Groq LLM fallback |
| `AI_PROVIDER` | Toggle between `venice` or `groq` |
| `MORALIS_API_KEY` | On-chain holder analysis |
| `PRIVATE_KEY` | Celo L2 contract operations |
| `KV_REST_API_URL` | Upstash Redis persistence |
| `KV_REST_API_TOKEN` | Upstash Redis auth |

---

*Autonomous intelligence. Non-custodial. Built for Celo L2 (Chain ID: 11142220).*
