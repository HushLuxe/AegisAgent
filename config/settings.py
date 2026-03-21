import os

# ── API Keys (set via environment variables) ────────────────────────────────
DEXSCREENER_API   = "https://api.dexscreener.com/latest/dex/tokens/"
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
VENICE_API_KEY = os.environ.get("VENICE_API_KEY")
# Discord Webhook pour OpenClaw Agent
MORALIS_API_KEY   = os.environ.get("MORALIS_API_KEY", "")
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID  = os.environ.get("TELEGRAM_CHAT_ID", "")
MOLTBOOK_API_KEY  = os.environ.get("MOLTBOOK_API_KEY", "")

# ── Rate-limit delays (seconds) ─────────────────────────────────────────────
DEXSCREENER_DELAY  = 1.0
GECKOTERMINAL_DELAY = 1.5
MORALIS_DELAY      = 1.0

# ── Network ──────────────────────────────────────────────────────────────────
CHAIN = "celo"
CHAIN_ID = 42220  # Celo Mainnet

# ── Paywall ──────────────────────────────────────────────────────────────────
CUSD_ADDRESS  = "0x765DE816845861e75A25fCA122bb6898B8B1282a"  # cUSD Mainnet
RECEIVER_ADDR = "0x71fd4359eB2da83C1BCd34f93a1C206d68b1eFba"
