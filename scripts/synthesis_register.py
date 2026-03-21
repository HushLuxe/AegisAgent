import requests
import json
import sys
import os

API_BASE = "https://synthesis.devfolio.co"

def initiate_registration(config):
    """Step 1: POST /register/init"""
    url = f"{API_BASE}/register/init"
    try:
        response = requests.post(url, json=config)
        response.raise_for_status()
        data = response.json()
        print(f"✅ Registration Initiated!")
        print(f"Pending ID: {data['pendingId']}")
        print(f"NEXT STEP: Please check your Email or Twitter to verify.")
        return data['pendingId']
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error initiating registration: {e.response.text}")
        return None

def complete_registration(pending_id):
    """Step 3: POST /register/complete"""
    url = f"{API_BASE}/register/complete"
    try:
        response = requests.post(url, json={"pendingId": pending_id})
        response.raise_for_status()
        data = response.json()
        print(f"🚀 Registration COMPLETE!")
        print(f"API Key: {data['apiKey']}")
        
        # Save key locally
        with open(".synthesis_key", "w") as f:
            f.write(data['apiKey'])
        print("✅ API Key saved to .synthesis_key")
        return data['apiKey']
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error completing registration: {e.response.text}")
        return None

def submit_project(api_key, repo_url):
    """Step 4: POST /submission/skill.md"""
    url = f"{API_BASE}/submission/skill.md"
    headers = {"Authorization": f"Bearer {api_key}"}
    
    # Load skill.md content
    skill_content = ""
    try:
        with open("skill.md", "r") as f:
            skill_content = f.read()
    except Exception as e:
        print(f"⚠️ Warning: Could not read skill.md: {e}")

    payload = {
        "repoUrl": repo_url,
        "skillContent": skill_content,
        "harness": "nanobot"
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        print(f"🎉 Project SUBMITTED successfully to Synthesis!")
        return True
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error submitting project: {e.response.text}")
        return False

def verify_send(pending_id, method="email"):
    """Step 2a: POST /register/verify/[method]/send"""
    url = f"{API_BASE}/register/verify/{method}/send"
    try:
        response = requests.post(url, json={"pendingId": pending_id})
        response.raise_for_status()
        print(f"✅ Verification {method.upper()} sent!")
        print(f"Please check your {method} for the code/link.")
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error sending verification: {e.response.text}")

def verify_confirm(pending_id, code, method="email"):
    """Step 2b: POST /register/verify/[method]/confirm"""
    url = f"{API_BASE}/register/verify/{method}/confirm"
    try:
        response = requests.post(url, json={"pendingId": pending_id, "otp": code})
        response.raise_for_status()
        print(f"✅ Verification {method.upper()} confirmed!")
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error confirming verification: {e.response.text}")

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  1. Initiate: python3 scripts/synthesis_register.py init 'Name' 'Email' '@handle'")
        print("  2. Send Verify: python3 scripts/synthesis_register.py verify-send 'PENDING_ID' [email|social]")
        print("  3. Confirm:      python3 scripts/synthesis_register.py verify-confirm 'PENDING_ID' 'CODE' [email|social]")
        print("  4. Complete: python3 scripts/synthesis_register.py complete 'PENDING_ID'")
        print("  5. Submit:   python3 scripts/synthesis_register.py submit 'REPOSITORY_URL'")
        return

    cmd = sys.argv[1]
    # ... init logic ...
    if cmd == "init":
        try:
            with open("agent.json", "r") as f:
                agent_info = json.load(f)
        except:
            agent_info = {}

        registration_config = {
            "name": agent_info.get("name", "AegisAgent"),
            "description": agent_info.get("description", "Autonomous on-chain forensic surveillance on Celo."),
            "image": agent_info.get("image", "https://aegisagento.vercel.app/logo.svg"),
            "agentHarness": "other", 
            "agentHarnessOther": "Custom Python/Vercel (Nanobot Integrated)",
            "model": "llama-3.3-70b",
            "humanInfo": {
                "name": sys.argv[2] if len(sys.argv) > 2 else "REPLACE_ME",
                "email": sys.argv[3] if len(sys.argv) > 3 else "REPLACE_ME",
                "socialMediaHandle": sys.argv[4] if len(sys.argv) > 4 else "@hushluxe",
                "background": "builder",
                "codingComfort": 9,
                "cryptoExperience": "yes",
                "aiAgentExperience": "yes",
                "problemToSolve": "Autonomous forensic risk detection on-chain."
            }
        }
        initiate_registration(registration_config)
    elif cmd == "verify-send" and len(sys.argv) > 2:
        method = sys.argv[3] if len(sys.argv) > 3 else "email"
        verify_send(sys.argv[2], method)
    elif cmd == "verify-confirm" and len(sys.argv) > 3:
        method = sys.argv[4] if len(sys.argv) > 4 else "email"
        verify_confirm(sys.argv[2], sys.argv[3], method)
    elif cmd == "complete" and len(sys.argv) > 2:
        complete_registration(sys.argv[2])
    elif cmd == "submit" and len(sys.argv) > 2:
        # Load API key from local file
        try:
            with open(".synthesis_key", "r") as f:
                key = f.read().strip()
            submit_project(key, sys.argv[2])
        except FileNotFoundError:
            print("❌ Error: .synthesis_key not found. Run 'complete' first.")

if __name__ == "__main__":
    main()
