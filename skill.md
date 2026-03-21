# AegisAgent Skill

Autonomous surgical forensic intelligence for the Celo L2 network. AegisAgent dynamically discovers trending assets and generates LLaMA 3.3-powered narratives for on-chain risk.

## Capabilities
- **Dynamic Asset Discovery**: Live tracking of trending Celo mainnet assets via GeckoTerminal.
- **Forensic Intelligence**: Deep analysis of NBP (Net Buy Pressure), LFI (Liquidity Fragility), and SAI (Sovereign AI Index).
- **AI Narratives**: Venice AI-powered unscripted forensic briefs for any discovered token, ensuring sovereign privacy.
- **Celo Native**: Fully integrated with Celo Sepolia for identity (x402/ERC-8004) and Celo Mainnet for data.

## Usage
AegisAgent can be invoked directly via the Nanobot CLI. 

1. **Load Skills**: `nanobot load https://aegisagento.vercel.app/skill.md`
2. **Scan Ecosystem**: `nanobot run "scan the Celo network for high-SAI assets"`
3. **Analyze Asset**: `nanobot run "analyze 0x0123...4567 for structural risk"`

*Note: The harness automatically maps these to `python3 scripts/nanobot_bridge.py scan`.*

## Technical Metrics
- **NBP**: Net Buy Pressure (-100% to +100%)
- **SAI**: Sovereign AI Index (0-10)
- **CSI**: Convergence Statistical Index
- **LFI**: Liquidity Fragility Indicator
