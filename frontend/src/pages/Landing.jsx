import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <header>
        <div className="logo-area">
          <div className="logo-box">Δ</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>AegisAgent</div>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>SOVEREIGN INTELLIGENCE UNIT</div>
          </div>
        </div>
        <div className="status-ticker mono">
          <div className="status-item"><span>●</span> SYSTEM: ONLINE</div>
          <div className="status-item"><span>●</span> ANALYSIS: REAL-TIME</div>
          <div className="status-item"><span>●</span> CELO CHAIN: 19 TOKENS</div>
        </div>
      </header>

      <div className="hero">
        <div className="hero-left">
          <div className="eyebrow">On-chain forensic intelligence</div>
          <h1 className="hero-title">
            <span className="accent">AEGIS</span><br />
            <span className="dim">FORENSIC</span><br />
            AGENT
          </h1>
          <p>
            Autonomous crypto surveillance on Celo. Tokens monitored
            continuously — every 2 hours, AI agents compute <strong>100+ forensic metrics</strong>,
            detect wallet patterns, and score each token with a
            <strong>Sovereign Anomaly Index</strong>.
          </p>
          <div className="cta-group">
            <Link to="/dashboard" className="btn-primary">Access Dashboard →</Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="terminal">
            <div className="terminal-bar">
              <div className="t-dot" style={{ background: '#ff3e3e' }}></div>
              <div className="t-dot" style={{ background: '#ffb800' }}></div>
              <div className="t-dot" style={{ background: '#00E5FF' }}></div>
              <span className="t-label">aegis-agent · forensic_engine_v5.1</span>
            </div>
            <div className="t-line"><span className="cmd">$</span> <span className="out">aegis run</span> <span className="val">forensic_engine_v5.1</span></div>
                <div className="t-line"><span className="out">→ Loading watchlist... 19 tokens · Celo chain</span></div>
                <div className="t-line"><span className="out">→ Fetching onchain data [Celo Explorer / RPC Interface]</span></div>
                <div className="t-line"><span className="out">→ Computing metrics: SAI / TFA / LFI / LCR / BPI</span></div>
                <div className="t-line"><span className="warn">⚠️ CONVERGENCE DETECTED — LFI=0.88 → FRAGILITY_ZONE</span></div>
                <div className="t-line"><span className="out">→ Sentinel LLM synthesis... EN report generated</span></div>
                <div className="t-line"><span className="out">→ Pushing memory.json to Sovereign KV</span></div>
            <div className="t-line"><span className="out">→ Telegram:</span> <span className="val">3 alerts dispatched ✓</span></div>
            <div className="t-line"><span className="cmd">$</span> <span className="cursor"></span></div>
          </div>
          <div className="stats-strip">
            <div className="stat-cell"><div className="stat-val">19</div><div className="stat-key">Tokens</div></div>
              <div className="stat-cell">
                <div className="stat-val">100+</div>
                <div className="stat-key">Metrics</div>
              </div>
            <div className="stat-cell"><div className="stat-val">2H</div><div className="stat-key">Cycle</div></div>
            <div className="stat-cell"><div className="stat-val">x402</div><div className="stat-key">Paywall</div></div>
          </div>
        </div>
      </div>

      <section id="metrics" style={{ padding: '80px 64px', borderTop: '1px solid var(--border)' }}>
        <div className="section-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          // Core Forensic Metrics
          <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
        </div>
        <div className="metrics-grid">
          <div className="m-card">
            <div className="metric-name" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>FHS</div>
            <div className="metric-full" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>Forensic Health Score</div>
            <div className="metric-desc" style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.6 }}>Composite score aggregating all signals. Weights liquidity, flow quality, holder distribution and technical momentum.</div>
          </div>
          <div className="m-card">
            <div className="metric-name" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>NBP</div>
            <div className="metric-full" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>Net Buying Pressure</div>
            <div className="metric-desc" style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.6 }}>24h delta between buy and sell flows, normalized by volume. Detects accumulation vs distribution.</div>
          </div>
          <div className="m-card">
            <div className="metric-name" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>ICR</div>
            <div className="metric-full" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>Impact Crash Risk</div>
            <div className="metric-desc" style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.6 }}>Estimated price drop if top holder exits. Computed from liquidity depth vs top wallet size.</div>
          </div>
          <div className="m-card">
            <div className="metric-name" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>WCC</div>
            <div className="metric-full" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>Whale Concentration Coefficient</div>
            <div className="metric-desc" style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.6 }}>Gini-like measure of supply concentration across top 20 wallets. High WCC increases rug risk.</div>
          </div>
        </div>
      </section>

      <div style={{ padding: '80px 64px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          // x402 Micropayments · Celo Sepolia
          <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          <div style={{ background: 'var(--bg)', padding: '40px' }}>
            <div className="pw-chip">Per-token forensic</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '20px' }}>
              TOKEN<br/>DASHBOARD
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '28px' }}>
              FHS scores always visible. Full per-token analysis — 65 metrics, ICR breakdown, LLM narrative — unlocked with a single micropayment.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '28px' }}>
              <span className="paywall-price" style={{ fontSize: '52px' }}>$0.02</span>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>cUSD / session</span>
            </div>
            <Link to="/dashboard" className="btn-primary" style={{ padding: '14px 32px' }}>Open Dashboard →</Link>
          </div>
          <div style={{ background: 'var(--bg)', padding: '40px', borderLeft: '1px solid var(--border)' }}>
            <div className="pw-chip" style={{ borderColor: 'rgba(255,140,0,0.3)', background: 'rgba(255,140,0,0.06)', color: 'var(--amber)' }}>Global synthesis</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '20px' }}>
              GLOBAL<br/>SYNTHESIS
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '28px' }}>
              Every 1 hour, requests analysis across all Celo sentinel tokens. Full **Groq AI** forensic narrative generated autonomously.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '28px' }}>
              <span className="paywall-price" style={{ fontSize: '52px', color: 'var(--amber)' }}>0.1</span>
              <span className="mono" style={{ color: 'var(--text-ghost)', fontSize: '14px' }}>CELO / 24H</span>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ padding: '24px 64px', borderTop: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-ghost)', fontFamily: "'JetBrains Mono', monospace" }}>
        <div>AegisAgent · <span style={{ color: 'var(--accent)' }}>SOVEREIGN INTELLIGENCE UNIT</span> · Celo Chain</div>
        <div>BUILT FOR CELO HACKATHON · xSENTINEL v1.0</div>
        <div>© 2026 · <span style={{ color: 'var(--accent)' }}>ALL SCANS AUTOMATED</span></div>
      </footer>
    </>
  );
};

export default Landing;
