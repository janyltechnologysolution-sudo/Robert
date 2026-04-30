"use client";

import { useState } from "react";

const LINKS = [
  {
    label: "YouTube",
    handle: "@kuyarobertjanyl",
    url: "https://www.youtube.com/@kuyarobertjanyl",
    color: "#ff2d6b",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    cta: "Subscribe",
  },
  {
    label: "Facebook",
    handle: "Kuya Robert",
    url: "https://facebook.com",
    color: "#00f5ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    cta: "Follow",
  },
  {
    label: "TikTok",
    handle: "@kuyarobert",
    url: "https://tiktok.com",
    color: "#f5e642",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
    cta: "Follow",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --y:#f5e642;--c:#00f5ff;--p:#ff2d6b;--v:#a855f7;
          --dark:#050508;--panel:rgba(6,6,12,0.92);
          --border:rgba(245,230,66,0.18);--bh:rgba(245,230,66,0.6);
          --text:#bbb5a0;--dim:#4e4a3a;
          --display:'Bebas Neue',sans-serif;--body:'Rajdhani',sans-serif;--mono:'Share Tech Mono',monospace;
        }
        html,body{background:#020204;overflow-x:hidden;cursor:crosshair}
        ::selection{background:var(--y);color:#000}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#020204}::-webkit-scrollbar-thumb{background:var(--y)}

        .page{min-height:100vh;background:var(--dark);font-family:var(--body);position:relative;overflow-x:hidden;padding-bottom:80px}
        .fx-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(245,230,66,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(245,230,66,.02) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;z-index:0}
        .fx-static{position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px);pointer-events:none;z-index:99}
        .fx-vignette{position:fixed;inset:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.8) 100%);pointer-events:none;z-index:98}
        .fx-glow{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(168,85,247,.03) 0%,transparent 70%);pointer-events:none;z-index:0}

        /* HEADER */
        .page-header{position:relative;z-index:5;padding:48px 48px 28px;max-width:1300px;margin:0 auto;border-bottom:1px solid var(--border);opacity:0;animation:up .5s ease .1s forwards}
        .page-eyebrow{font-family:var(--mono);font-size:10px;color:var(--v);letter-spacing:.28em;text-transform:uppercase;margin-bottom:12px}
        .page-eyebrow::before{content:'▶ '}
        .page-title{font-family:var(--display);font-size:clamp(48px,7vw,90px);letter-spacing:.06em;color:var(--y);text-shadow:0 0 40px rgba(245,230,66,.2),3px 3px 0 rgba(168,85,247,.2);line-height:.9;margin-bottom:12px}
        .page-sub{font-family:var(--body);font-size:15px;font-weight:300;color:var(--dim);letter-spacing:.06em}

        /* MAIN GRID */
        .main-grid{position:relative;z-index:5;padding:40px 48px 0;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px}

        /* SOCIAL LINKS */
        .social-section{opacity:0;animation:up .5s ease .25s forwards}
        .section-label{font-family:var(--mono);font-size:9px;letter-spacing:.25em;color:var(--dim);text-transform:uppercase;margin-bottom:20px}
        .social-cards{display:flex;flex-direction:column;gap:12px}
        .social-card{
          border:1px solid var(--border);background:var(--panel);
          padding:20px 24px;
          display:flex;align-items:center;gap:20px;
          text-decoration:none;
          clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);
          position:relative;
          transition:border-color .25s,transform .2s,box-shadow .25s;
        }
        .social-card::after{content:'';position:absolute;top:-1px;right:-1px;width:0;height:0;border-style:solid;border-width:0 13px 13px 0;border-color:transparent var(--dark) transparent transparent}
        .social-card:hover{transform:translateX(4px)}
        .sc-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)}
        .sc-icon svg{width:18px;height:18px}
        .sc-info{flex:1}
        .sc-label{font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase;margin-bottom:3px}
        .sc-handle{font-family:var(--display);font-size:20px;letter-spacing:.04em;transition:color .2s}
        .sc-cta{font-family:var(--mono);font-size:9px;letter-spacing:.15em;text-transform:uppercase;transition:color .2s}
        .sc-arr{font-size:16px;transition:transform .2s}
        .social-card:hover .sc-arr{transform:translateX(4px)}

        /* CONTACT FORM */
        .form-section{opacity:0;animation:up .5s ease .35s forwards}
        .form-wrap{border:1px solid var(--border);background:var(--panel);padding:28px;position:relative;clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)}
        .form-wrap::before{content:'// SEND MESSAGE';position:absolute;top:-8px;left:20px;font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--y);background:var(--dark);padding:0 10px}
        .form-wrap::after{content:'';position:absolute;top:-1px;right:-1px;width:0;height:0;border-style:solid;border-width:0 17px 17px 0;border-color:transparent var(--dark) transparent transparent}

        .field{margin-bottom:20px}
        .field-label{font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase;margin-bottom:8px;display:block}
        .field-input,.field-textarea{
          width:100%;background:rgba(245,230,66,.02);
          border:1px solid var(--border);
          color:var(--text);font-family:var(--mono);font-size:12px;
          padding:11px 14px;letter-spacing:.08em;
          outline:none;transition:border-color .2s,box-shadow .2s;
          resize:none;cursor:text;
        }
        .field-input:focus,.field-textarea:focus{border-color:rgba(245,230,66,.5);box-shadow:0 0 12px rgba(245,230,66,.06)}
        .field-textarea{min-height:100px;line-height:1.6}
        .field-input::placeholder,.field-textarea::placeholder{color:var(--dim)}

        .btn-send{
          font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;
          padding:14px 32px;background:var(--y);color:#000;font-weight:700;
          border:none;cursor:pointer;width:100%;
          clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition:all .2s;
        }
        .btn-send:hover{background:#fff;box-shadow:0 0 24px rgba(245,230,66,.4)}
        .btn-send:disabled{opacity:.4;cursor:not-allowed}

        /* SUCCESS STATE */
        .success{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;padding:40px 20px;gap:16px;
        }
        .success-icon{font-family:var(--display);font-size:48px;color:var(--y);text-shadow:0 0 20px rgba(245,230,66,.4)}
        .success-title{font-family:var(--display);font-size:28px;letter-spacing:.08em;color:var(--y)}
        .success-sub{font-family:var(--mono);font-size:10px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase}

        /* STATUS BAR */
        .statusbar{position:fixed;bottom:0;left:56px;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:7px 48px;background:rgba(3,3,6,.97);border-top:1px solid var(--border);backdrop-filter:blur(12px);opacity:0;animation:up .4s ease .5s forwards}
        .s-l,.s-r{display:flex;gap:24px;align-items:center}
        .s-i{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
        .s-i.hot{color:var(--c)}
        .s-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--p);margin-right:6px;animation:blink 1.4s ease infinite}

        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}

        @media(max-width:900px){.main-grid{grid-template-columns:1fr}}
        @media(max-width:768px){
          .page-header,.main-grid{padding-left:24px;padding-right:24px}
          .statusbar{left:0;padding:7px 24px}
        }
        @media(max-width:480px){
          .page-header,.main-grid{padding-left:16px;padding-right:16px}
          .statusbar{padding:7px 16px}
          .s-i:not(.hot):not(:first-child){display:none}
        }
      `}</style>

      <div className="page">
        <div className="fx-grid" /><div className="fx-static" /><div className="fx-vignette" /><div className="fx-glow" />

        <div className="page-header">
          <div className="page-eyebrow">SYSTEM — CONTACT</div>
          <h1 className="page-title">CONTACT</h1>
          <p className="page-sub">Find me online or send a message.</p>
        </div>

        <div className="main-grid">
          {/* SOCIAL LINKS */}
          <div className="social-section">
            <div className="section-label">// Find me on</div>
            <div className="social-cards">
              {LINKS.map((l) => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="social-card"
                  style={{ borderColor: `${l.color}33` }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${l.color}88`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${l.color}22`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${l.color}33`;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="sc-icon" style={{ color: l.color, borderColor: `${l.color}55`, background: `${l.color}10` }}>
                    {l.icon}
                  </div>
                  <div className="sc-info">
                    <div className="sc-label">{l.label}</div>
                    <div className="sc-handle" style={{ color: l.color }}>{l.handle}</div>
                  </div>
                  <div className="sc-cta" style={{ color: l.color }}>{l.cta}</div>
                  <div className="sc-arr" style={{ color: l.color }}>→</div>
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="form-section">
            <div className="section-label">// Or drop a message</div>
            <div className="form-wrap">
              {sent ? (
                <div className="success">
                  <div className="success-icon">✓</div>
                  <div className="success-title">MESSAGE SENT</div>
                  <div className="success-sub">Transmission received. Talk soon!</div>
                </div>
              ) : (
                <>
                  <div className="field">
                    <label className="field-label">Name //</label>
                    <input className="field-input" placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label className="field-label">Email //</label>
                    <input className="field-input" type="email" placeholder="your@email.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field">
                    <label className="field-label">Message //</label>
                    <textarea className="field-textarea" placeholder="What's on your mind..." value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button className="btn-send" onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.message}>
                    ▶ SEND TRANSMISSION
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <footer className="statusbar">
          <div className="s-l">
            <span className="s-i"><span className="s-dot" />LIVE</span>
            <span className="s-i hot">CONTACT_NODE</span>
          </div>
          <div className="s-r"><span className="s-i">@kuyarobertjanyl</span></div>
        </footer>
      </div>
    </>
  );
}