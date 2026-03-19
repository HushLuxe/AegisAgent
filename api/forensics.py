import os
import json
import requests
from datetime import datetime, timezone
import time
from upstash_redis import Redis

# Import relative path trick for Vercel
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from backend.forensic_engine_v5 import ForensicEngineV5

# Configuration from Environment
MORALIS_API_KEY = os.environ.get("MORALIS_API_KEY")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
KV_URL = os.environ.get("KV_REST_API_URL")
KV_TOKEN = os.environ.get("KV_REST_API_TOKEN")

# Tokens to monitor (Celo)
# We limit to 3 for stability on Vercel Free tier timeouts
TOKENS = [
    "0x471ece3750da237f93b8e339c536989b8978a438", # CELO
    "0x765de816845861e75a25fca122bb6898b8b1282a", # cUSD
    "0xce1240c5da237f93b8e33e339c536989b8978a43b"  # Dummy/Sample
]

def fetch_data(address):
    """Fetches raw data for a token."""
    pool = {}
    try:
        res = requests.get(f"https://api.dexscreener.com/latest/dex/tokens/{address}", timeout=5)
        pairs = res.json().get("pairs", [])
        if pairs:
            pool = max(pairs, key=lambda x: x.get("liquidity", {}).get("usd", 0))
    except: pass

    holders = []
    if MORALIS_API_KEY:
        try:
            url = f"https://deep-index.moralis.io/api/v2.2/erc20/{address}/owners?chain=celo"
            headers = {"X-API-Key": MORALIS_API_KEY}
            res = requests.get(url, headers=headers, timeout=5)
            holders = res.json().get("result", [])
        except: pass

    ohlcv = []
    try:
        if pool.get("pairAddress"):
            url = f"https://api.geckoterminal.com/api/v2/networks/celo/pools/{pool['pairAddress']}/ohlcv/hour?limit=24"
            res = requests.get(url, timeout=5)
            ohlcv = res.json().get("data", {}).get("attributes", {}).get("ohlcv_list", [])
    except: pass

    return {
        "token_address": address,
        "pool": pool,
        "holders": holders,
        "ohlcv": ohlcv
    }

def handler(request):
    """Vercel Serverless Function Entry Point (v2)."""
    
    # Initialize Redis
    # Note: Vercel KV env vars are usually named KV_REST_API_URL and KV_REST_API_TOKEN
    redis = None
    if KV_URL and KV_TOKEN:
        redis = Redis(url=KV_URL, token=KV_TOKEN)
    
    # Check for Cron or Refresh
    is_cron = request.headers.get('x-vercel-cron') == '1'
    # In Vercel, request params are in request.args or similar depending on the framework
    # Here we use a safe check
    try:
        is_force = "refresh=true" in request.url
    except:
        is_force = False

    if not is_cron and not is_force:
        # Just return the cached data
        if redis:
            try:
                cached = redis.get("aegis_forensics")
                if cached:
                    return {
                        "statusCode": 200,
                        "body": cached,
                        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
                    }
            except: pass

    # Run the Pipeline
    engine = ForensicEngineV5()
    results = {}
    
    for address in TOKENS:
        data = fetch_data(address)
        report = engine.analyze(data)
        results[address] = report.to_dict()
        time.sleep(1) # Courtesy delay

    final_payload = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "network": "Celo",
        "tokens": results
    }

    # Save to KV
    if redis:
        try:
            redis.set("aegis_forensics", json.dumps(final_payload))
        except: pass

    return {
        "statusCode": 200,
        "body": json.dumps(final_payload),
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
    }
