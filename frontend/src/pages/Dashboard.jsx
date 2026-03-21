import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CELO_L2_SEPOLIA_CHAIN_ID = 11142220;
const AEGIS_CONTRACT_ADDRESS = '0x74B24d2cd92046772674bFf9B85c11cFd2b9C3d2';

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt = (n, digits = 2) => (typeof n === 'number' ? n.toFixed(digits) : '—');
const fmtPrice = (p) => {
  if (!p) return '—';
  if (p >= 1) return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(4)}`;
  return `$${p.toExponential(3)}`;
};
const fmtK = (n) => {
  if (!n) return '—';
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
};

const phaseColor = (phase = '') => {
  if (phase.includes('ACCUM')) return 'var(--accent)';
  if (phase.includes('DIST')) return '#ff4466';
  return 'var(--text-dim)';
};

const getSAIClass = (sai) => {
  if (sai >= 8) return 'sai-high'; // Example class for high SAI
  if (sai >= 5) return 'sai-medium'; // Example class for medium SAI
  return 'sai-low'; // Example class for low SAI
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [status, setStatus] = useState('');
  const [stats, setStats] = useState({
    total_tokens: 0,
    avg_sai: 0,
    risk_alerts: 0
  });
  const [wallet, setWallet] = useState(null);
  const [updatedAt, setUpdatedAt] = useState('');
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiProvider, setAiProvider] = useState('venice');

  // Fetch forensics from Vercel API on mount and every 2 minutes
  useEffect(() => {
    const load = () => {
      fetch('/api/forensics?t=' + Date.now())
        .then(async r => {
          if (!r.ok) {
            const errBody = await r.text();
            console.error(`❌ API Error (${r.status}):`, errBody);
            throw new Error(`API Error ${r.status}`);
          }
          return r.json();
        })
        .then(data => {
          console.log("✅ Aegis API Response:", data);
          // The API returns { tokens: { addr: report }, api_source: "live/cache" }
          const list = Object.values(data.tokens || {});
          setTokens(list);
          if (data.api_source) {
            setStatus(`Connected (${data.api_source})`);
          }
          setAiEnabled(Boolean(data.ai_enabled));
          setAiProvider(data.ai_provider || 'venice');
          setUpdatedAt(data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : '');
          if (!selected && list.length) setSelected(list[0]);
        })
        .catch(() => {
          console.warn('Aegis API not yet online. Fallback to cached state.');
          setAiEnabled(false);
          fetch('/memory.json?t=' + Date.now())
            .then(res => res.json())
            .then(fallbackData => {
              if (fallbackData.tokens) {
                setTokens(fallbackData.tokens);
                setUpdatedAt(fallbackData.updated_at ? new Date(fallbackData.updated_at).toLocaleTimeString() : '');
                if (!selected && fallbackData.tokens.length) setSelected(fallbackData.tokens[0]);
              }
            })
            .catch(e => console.error('Fallback failed', e));
        });
    };
    load();
    const iv = setInterval(load, 120_000);
    return () => clearInterval(iv);
  }, []);

  // Check if wallet already connected
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts().then(accs => { 
        if (accs.length) {
          setWallet(accs[0]);
          checkSubscription(accs[0], provider);
        }
      });

      window.ethereum.on('accountsChanged', (accs) => {
        if (accs.length) {
          setWallet(accs[0]);
          checkSubscription(accs[0], new ethers.providers.Web3Provider(window.ethereum));
        } else {
          setWallet(null);
          setIsUnlocked(false);
        }
      });
    }
  }, []);

  const checkSubscription = async (addr, provider) => {
    if (AEGIS_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') return;
    
    // Check local cache first for "one-time" feel
    const cached = localStorage.getItem(`aegis_unlocked_${addr.toLowerCase()}`);
    if (cached === 'true') {
      setIsUnlocked(true);
      return;
    }

    try {
      const aegis = new ethers.Contract(
        AEGIS_CONTRACT_ADDRESS,
        ['function hasActiveSubscription(address user) view returns (bool)'],
        provider
      );
      const active = await aegis.hasActiveSubscription(addr);
      setIsUnlocked(active);
      if (active) {
        localStorage.setItem(`aegis_unlocked_${addr.toLowerCase()}`, 'true');
      }
    } catch (e) { console.error('Error checking sub:', e); }
  };

  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    console.log("🛠️ Attempting to connect wallet...");
    if (!window.ethereum) {
      console.error("❌ No window.ethereum found");
      alert('MetaMask or a Web3 wallet was not found. Please install it to continue.');
      return;
    }
    
    setIsLoading(true);
    setStatus('Connecting to wallet...');
    
    try {
      // Direct request to avoid any provider wrapper issues
      const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("✅ Wallet connected:", accs[0]);
      setWallet(accs[0]);
      setStatus('Wallet connected.');
      checkSubscription(accs[0], new ethers.providers.Web3Provider(window.ethereum));
    } catch (e) { 
      console.error('❌ Wallet connect error:', e); 
      if (e.code === -32002) {
        alert('Connection request already pending in MetaMask. Please check your wallet extension.');
      } else {
        setStatus('Connection failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ensureCeloNetwork = async () => {
    if (!window.ethereum) return false;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + CELO_L2_SEPOLIA_CHAIN_ID.toString(16) }],
      });
      return true;
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x' + CELO_L2_SEPOLIA_CHAIN_ID.toString(16),
              chainName: 'Celo L2 Sepolia',
              nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
              rpcUrls: ['https://forno.celo-sepolia.celo-testnet.org'],
              blockExplorerUrls: ['https://explorer.celo.org/sepolia/'],
            }],
          });
          return true;
        } catch { return false; }
      }
      return false;
    }
  };

  const handleUnlock = async () => {
    if (!wallet) { connectWallet(); return; }
    if (!await ensureCeloNetwork()) { setStatus('Please switch to Celo L2 Sepolia.'); return; }
    
    setStatus('Pending confirmation in wallet…');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const aegis = new ethers.Contract(
        AEGIS_CONTRACT_ADDRESS,
        ['function subscribe() payable', 'function subscriptionFee() view returns (uint256)'],
        signer
      );

      const fee = await aegis.subscriptionFee();
      const tx = await aegis.subscribe({ value: fee });
      
      setStatus('Transaction sent… awaiting confirmation.');
      await tx.wait();
      setStatus('✓ Subscription confirmed!');
      setIsUnlocked(true);
    } catch (err) {
      setStatus(err.code === 4001 ? 'Transaction cancelled.' : 'Payment failed. Ensure you have CELO on Celo L2 Sepolia.');
    }
  };

  const t = selected;
  const fhsValue = t?.fhs ?? t?.sai ?? 0;
  const nbpValue = t?.nbp ?? t?.tfa ?? null;
  const icrValue = t?.icr ?? t?.ips_50k ?? t?.ips_10k ?? null;
  const lfiValue = t?.lfi ?? 0;

  return (
    <div className="main-grid">
      {/* ── Top Bar Logic (Connect Wallet Button) ── */}
      <div style={{ position: 'fixed', top: '15px', right: '15px', zIndex: 1000, display: 'flex', gap: '8px' }}>
        <button 
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '11px', borderRadius: '4px', cursor: 'pointer' }}
          title="Force-rebuild backend cache"
          onClick={async () => {
            try {
              setIsLoading(true);
              await fetch('/api/forensics?refresh=true');
              window.location.reload();
            } catch(e) {
              console.error(e);
              setIsLoading(false);
            }
          }}
        >
          REFRESH
        </button>

        <div
          className="ai-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: aiEnabled ? '#FF3D00' : 'var(--text-ghost)'
          }}
          title={aiEnabled ? 'Venice Sovereignty Active' : 'AI Analysis Passive'}
        >
          <span style={{ opacity: 0.7 }}>SOVEREIGN</span>
          <span style={{ fontWeight: 700 }}>{aiEnabled ? 'ON' : 'OFF'}</span>
        </div>
        <button 
          onClick={connectWallet}
          className="btn-primary" 
          disabled={isLoading}
          style={{ 
            padding: '8px 16px', 
            fontSize: '11px', 
            borderRadius: '4px', 
            background: wallet ? 'rgba(0,229,255,0.1)' : 'var(--accent)', 
            color: wallet ? 'var(--accent)' : '#000',
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'CONNECTING...' : wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'CONNECT WALLET'}
        </button>
      </div>

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-label">
          <span>Forensic Assets</span>
          <span className="mono" style={{ color: 'var(--accent)' }}>{isUnlocked ? tokens.length : '??'}</span>
        </div>
        {!isUnlocked && (
          <div style={{ padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔒</div>
            <div style={{ fontSize: '11px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Surveillance Encrypted
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '8px', lineHeight: 1.4 }}>
              Payment required to unlock real-time asset tracking.
            </div>
          </div>
        )}
        {isUnlocked && updatedAt && (
          <div style={{ fontSize: '10px', color: 'var(--text-ghost)', padding: '4px 16px', marginBottom: '4px' }}>
            Updated {updatedAt}
          </div>
        )}
        <div className="token-list">
          {isUnlocked && tokens.length === 0 && (
            <div style={{ padding: '20px 16px', color: 'var(--text-ghost)', fontSize: '11px', textAlign: 'center' }}>
              AUTONOMOUS SURVEILLANCE ACTIVE<br/>
              Awaiting next forensic cycle...
            </div>
          )}
          {isUnlocked && tokens.map(tok => (
            <div
              key={tok.address || tok.symbol}
              className={`token-item ${selected?.symbol === tok.symbol ? 'active' : ''}`}
              onClick={() => setSelected(tok)}
            >
              <div>
                <div className="token-name">{tok.symbol}</div>
                <div className="token-meta" style={{ color: phaseColor(tok.phase), fontSize: '10px' }}>
                  {tok.phase || tok.chain?.toUpperCase() || 'CELO'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="token-score" style={{ color: (tok.fhs ?? tok.sai ?? 0) >= 8 ? 'var(--accent)' : 'var(--text-main)' }}>
                  {fmt((tok.fhs ?? tok.sai ?? 0), 1)}
                </div>
                <div className="token-rsi">RSI: {fmt(tok.rsi_1h, 0)}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className={`content-area ${!isUnlocked ? 'locked' : ''}`} style={{ position: 'relative' }}>
        {!isUnlocked && (
          <div className="paywall-overlay">
            <div className="paywall-card">
              <div className="pw-chip">Per-Token Forensic Intelligence · Celo L2</div>
              <div className="pw-icon" style={{ fontSize: '32px', marginBottom: '20px' }}>🔐</div>
              <h2>Intelligence Access</h2>
              <p>Full forensic depth — 100+ computed metrics, LFI simulation, whale mapping, bull flag detection, and an autonomous Sovereign AI narrative — unlocked with a single on-chain micropayment.</p>
              <div className="paywall-price">0.1 CELO</div>
              <div className="paywall-price-sub">Celo L2 Sepolia · 24h Access · Non-Custodial</div>
              <div className="pw-status" style={{
                color: status.includes('failed') || status.includes('cancel') ? '#ff4466' : 'var(--text-ghost)',
                marginBottom: '16px'
              }}>
                {status || (wallet ? 'Ready to unlock' : 'Connect wallet to unlock')}
              </div>
              <button
                className="btn-unlock-pw"
                onClick={handleUnlock}
                disabled={status.includes('Pending') || status.includes('sent')}
              >
                {wallet ? 'Unlock for 0.1 CELO' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        )}

        {t && (
          <div>
            {/* Token Header */}
            <div className="intel-header">
              <div>
                <div className="intel-title">
                  <h1 style={{ fontSize: '48px', fontWeight: 800 }}>{isUnlocked ? t.symbol : '••••••'}</h1>
                </div>
                <div className="addr-pill" title={t.address}>
                  {t.address ? `${t.address.slice(0, 6)}…${t.address.slice(-4)}` : 'Celo'}
                </div>
              </div>
              <div className="fhs-radar">
                <div style={{ fontSize: '10px', color: 'var(--text-ghost)', marginBottom: '4px' }}>FHS</div>
                <div className="fhs-val">{isUnlocked ? fmt(fhsValue, 1) : '—'}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-ghost)' }}>{isUnlocked ? (t.fhs_label || '') : 'LOCKED'}</div>
              </div>
            </div>

            {/* Price row */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {[
                ['Price', isUnlocked ? fmtPrice(t.price_usd) : '••••'],
                ['24h Δ', isUnlocked ? (t.price_change_24h != null ? `${t.price_change_24h > 0 ? '+' : ''}${fmt(t.price_change_24h)}%` : '—') : '••••'],
                ['Vol 24h', isUnlocked ? fmtK(t.volume_24h) : '••••'],
                ['Liq', isUnlocked ? fmtK(t.liquidity_usd) : '••••'],
                ['MCap', isUnlocked ? fmtK(t.mcap) : '••••'],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 14px', minWidth: '90px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-ghost)', marginBottom: '4px' }}>{label}</div>
                  <div className="mono" style={{ fontSize: '13px', color: isUnlocked && label === '24h Δ' && t.price_change_24h < 0 ? '#ff4466' : 'var(--text-main)' }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Core Metrics */}
            <div className="section-header">// Core Metrics</div>
            <div className="metrics-grid">
              <div className="m-card">
                <div className="m-label">Net Buy Pressure</div>
                <div className="m-val" style={{ color: (nbpValue ?? 0) > 0 ? 'var(--accent)' : '#ff4466' }}>
                  {nbpValue != null ? `${nbpValue > 0 ? '+' : ''}${fmt(nbpValue, 1)}%` : '—'}
                </div>
              </div>
              <div className="m-card">
                <div className="m-label">LFI Fragility</div>
                <div className="m-val" style={{ color: lfiValue > 0.5 ? '#ff4466' : 'var(--accent)' }}>
                  {(lfiValue * 100).toFixed(1)}%
                </div>
              </div>
              <div className="m-card">
                <div className="m-label">Impact Crash Risk</div>
                <div className="m-val" style={{ color: (icrValue ?? 0) > 1.0 ? '#ff4466' : 'var(--accent)' }}>
                  {icrValue != null ? fmt(icrValue) : '—'}
                </div>
              </div>
              <div className="m-card">
                <div className="m-label">Liquidity Cover</div>
                <div className="m-val">{fmt(t.lcr)}%</div>
              </div>
              <div className="m-card">
                <div className="m-label">Whale Concentration</div>
                <div className="m-val" style={{ color: t.wcc > 10 ? '#ffb800' : 'var(--text-main)' }}>
                  {fmt(t.wcc)}%
                </div>
              </div>
              <div className="m-card">
                <div className="m-label">Bull Flag</div>
                <div className="m-val" style={{ color: t.bull_flag ? 'var(--accent)' : 'var(--text-ghost)' }}>
                  {t.bull_flag ? `✓ Class ${t.bf_class}` : 'None'}
                </div>
              </div>
              <div className="m-card">
                <div className="m-label">SAI Index</div>
                <div className={`m-val ${getSAIClass(t.sai)}`}>
                  {t.sai?.toFixed(1) || '0.0'}
                </div>
              </div>
              <div className="m-card">
                <div className="m-label">BPI Score</div>
                <div className="m-val">{fmt(t.bpi)}</div>
              </div>
              <div className="m-card">
                <div className="m-label">Top 5 Holders</div>
                <div className="m-val">{fmt(t.top5_pct)}%</div>
              </div>
              <div className="m-card">
                <div className="m-label">RSI 1H</div>
                <div className="m-val">{fmt(t.rsi_1h, 0)}</div>
              </div>
            </div>

            {/* Alerts */}
            {t.alerts && t.alerts.length > 0 && (
              <>
                <div className="section-header">// Alerts</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {t.alerts.map((a, i) => (
                    <div key={i} style={{
                      padding: '10px 14px',
                      borderLeft: `3px solid ${a.severity === 'critical' ? '#ff4466' : '#ffb800'}`,
                      background: a.severity === 'critical' ? 'rgba(255,68,102,0.07)' : 'rgba(255,184,0,0.07)',
                      fontSize: '12px',
                      color: a.severity === 'critical' ? '#ff7799' : '#ffd066',
                      borderRadius: '0 4px 4px 0'
                    }}>
                      {a.message}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* AI Narrative */}
            <div className="section-header">// Sovereign AI Assessment</div>
            <div style={{ background: 'var(--surface)', borderLeft: '2px solid var(--accent)', padding: '20px 24px', lineHeight: 1.7, fontSize: '13px', color: 'var(--text-dim)', marginBottom: '24px' }}>
              <div style={{ marginBottom: '8px' }}>{isUnlocked ? (t.narrative_phase || '—') : 'LOCKED'}</div>
              <div style={{ marginBottom: '8px' }}>{isUnlocked ? (t.narrative_insight || '—') : 'Unlock full intelligence access to view the autonomous forensic risk assessment.'}</div>
              <div style={{ color: 'var(--text-ghost)' }}>{isUnlocked ? (t.narrative_structure || '—') : '••••'}</div>
            </div>
          </div>
        )}
      </main>

      {/* ── Telemetry ── */}
      <aside className={`telemetry ${!isUnlocked ? 'locked' : ''}`} style={{ borderLeft: '1px solid var(--border)', background: 'rgba(10,10,12,0.5)', padding: '20px' }}>
        <div className="t-section-title" style={{ color: 'var(--amber)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
          Autonomous Signal Watch
        </div>
        {!isUnlocked && (
          <div style={{ padding: '20px 0', fontSize: '11px', color: 'var(--text-ghost)', textAlign: 'center', borderTop: '1px dashed var(--border)' }}>
            PAVE PROTOCOL ACTIVE · DATA ENCRYPTED
          </div>
        )}
        {isUnlocked && t?.alerts && t.alerts.length > 0 ? t.alerts.map((a, i) => (
          <div key={i} style={{
            padding: '10px',
            background: a.severity === 'critical' ? 'rgba(255,68,102,0.1)' : 'rgba(255,184,0,0.1)',
            borderLeft: `3px solid ${a.severity === 'critical' ? '#ff4466' : '#ffb800'}`,
            color: a.severity === 'critical' ? '#ff9999' : '#ffdd88',
            fontSize: '11px',
            marginBottom: '8px',
            borderRadius: '0 4px 4px 0'
          }}>
            {a.code}
          </div>
        )) : (
          <div style={{ padding: '10px', background: 'rgba(252,255,82,0.07)', borderLeft: '3px solid var(--accent)', color: 'var(--text-ghost)', fontSize: '11px' }}>
            No active alerts
          </div>
        )}


        {t?.bull_flag && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-ghost)', marginBottom: '8px', textTransform: 'uppercase' }}>Bull Flag</div>
            <div style={{ padding: '10px', background: 'rgba(252,255,82,0.07)', borderLeft: '3px solid var(--accent)', color: 'var(--accent)', fontSize: '11px' }}>
              🚩 Class {t.bf_class} · Retrace {fmt(t.bf_retracement)}%
            </div>
            {t.fib_target > 0 && (
              <div style={{ padding: '8px 10px', background: 'var(--surface)', fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
                Target: {fmtPrice(t.fib_target)} (+{fmt(t.fib_upside_pct)}%)
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-ghost)', textTransform: 'uppercase', marginBottom: '8px' }}>Phase</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: phaseColor(t?.phase) }}>
            {t?.phase || '—'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-ghost)', marginTop: '4px' }}>
            NBP: {nbpValue != null ? `${nbpValue > 0 ? '+' : ''}${fmt(nbpValue, 1)}%` : '—'}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
