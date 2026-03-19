# 🛡️ AegisAgent
**Autonomous Sovereign Forensic Intelligence for the Celo L2 Ecosystem**

AegisAgent is a next-generation autonomous forensic agent designed to provide surgical-grade intelligence on Celo L2 assets. Unlike traditional analytics, Aegis operates as a **Sovereign Intelligence**, autonomously auditing liquidity, flow, and fragility clusters without human intervention.

---

## 🏛️ [Sovereign Infrastructure] Production Status
- **⛓️ Contract**: `0x74B24d2cd92046772674bFf9B85c11cFd2b9C3d2` (Celo L2 Sepolia)
- **💠 Sentinel ID**: `66` (ERC-8004 Registered)
- **🌐 Live Intelligence**: [aegisagento.vercel.app](https://aegisagento.vercel.app)
- **Arch**: Vercel Serverless + Upstash KV + Celo L2 Cron

---

## ⚡ [Surgical Intelligence] The Sentinel Suite
Aegis Sentinel replaces legacy metrics with a proprietary forensic engine:

### 1. **SAI (Sovereign Anomaly Index)**
A multi-factor convergence score (0.0 - 10.0) measuring asset integrity across DEX liquidity and token holder clustering.

### 2. **LFI (Liquidity Fragility Index)**
A stress-test model predicting price impact thresholds. Monitors "dead zones" where liquidity cannot support current volume.

### 3. **TFA (Token Flow Analysis)**
Real-time net buy/sell pressure tracking with autonomous "Ventricular Flow" classification.

---

## 📡 [API Documentation] Professional Access
The Sentinel's intelligence is accessible via a high-performance REST API.

### `GET /api/forensics` ![REST API](https://img.shields.io/badge/API-REST-00F59B?style=for-the-badge)
Returns the current forensic snapshot of the Celo ecosystem.

**Response Schema**
```json
{
  "timestamp": "ISO-8601",
  "tokens": {
    "0x...": {
      "symbol": "string",
      "sai": "float",
      "phase": "ENUM",
      "tfa": "float",
      "lfi": "float",
      "assessment": "Sovereign AI Insights"
    }
  }
}
```

---

## 🛠️ [Integration] Deployment Guide

### Environment Variables
For production deployment, the following surgical-grade credentials are required:
- `GROQ_API_KEY`: Forensics & Reasoning
- `MORALIS_API_KEY`: Holder Analysis
- `PRIVATE_KEY`: Celo L2 Operations
- `KV_REST_API_URL`: Persistence Engine

### Local Setup
```bash
# 1. Initialize Engine
pip install -r requirements.txt
python3 backend/agent.py

# 2. Launch Interface
cd frontend && npm install && npm run dev
```

---

## 💠 [Identity] The Vanguard Obsidian System
The project follows the **Vanguard Obsidian (#050507)** design system — a sharp, high-contrast aesthetic representing clinical precision in decentralized forensics.

*Autonomous intelligence. Built for Celo L2 (11142220).*
