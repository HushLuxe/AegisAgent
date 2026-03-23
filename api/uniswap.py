import os
import json
import requests
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Celo configuration
USDC_CELO = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C"
CELO_CHAIN_ID = 42220

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        self.end_headers()

    def do_GET(self):
        """Vercel Serverless Function to securely fetch a Uniswap route."""
        url_bits = urlparse(self.path)
        params = parse_qs(url_bits.query)

        token_address = params.get('token', [''])[0]
        wallet_address = params.get('wallet', [''])[0]
        amount = params.get('amount', ['1000000000000000000'])[0] # Default to 1 token base unit
        api_key = os.environ.get("UNISWAP_API_KEY", "").strip()

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        if not api_key:
            self.wfile.write(json.dumps({"error": "Missing UNISWAP_API_KEY. Add it to Vercel environment variables."}).encode('utf-8'))
            return
            
        if not token_address or not wallet_address:
            self.wfile.write(json.dumps({"error": "Missing token or wallet query parameters"}).encode('utf-8'))
            return

        url = "https://api.uniswap.org/v2/quote"
        query = {
            "tokenInAddress": token_address,
            "tokenInChainId": CELO_CHAIN_ID,
            "tokenOutAddress": USDC_CELO,
            "tokenOutChainId": CELO_CHAIN_ID,
            "amount": amount,
            "type": "exactIn",
            "slippageTolerance": "2",  # 2%
            "recipient": wallet_address
        }
        
        try:
            r = requests.get(url, params=query, headers={"x-api-key": api_key}, timeout=10)
            data = r.json()
            if r.status_code == 200:
                self.wfile.write(json.dumps(data).encode('utf-8'))
            else:
                self.wfile.write(json.dumps({"error": "Uniswap API Routing Error", "details": data}).encode('utf-8'))
        except Exception as e:
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
