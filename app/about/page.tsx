"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#█▓▒░";

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const scramble = () => {
    let iter = 0;
    const iv = setInterval(() => {
      iter += 0.6;
      setDisplay(text.split("").map((c, i) => i < iter ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join(""));
      if (iter >= text.length) { clearInterval(iv); setDisplay(text); }
    }, 28);
  };
  useEffect(() => { const t = setTimeout(scramble, 400); return () => clearTimeout(t); }, []);
  return <span className={className} onMouseEnter={scramble}>{display}</span>;
}

const FACTS = [
  { label: "LOCATION",  value: "Philippines 🇵🇭" },
  { label: "CONTENT",   value: "Gaming · Vlogs · Life" },
  { label: "CHANNEL",   value: "@kuyarobertjanyl" },
  { label: "STATUS",    value: "CREATING" },
];

const TIMELINE = [
  { year: "2024", event: "Started the YouTube channel", tag: "ORIGIN" },
  { year: "2024", event: "First vlog — Unang Vlog ko dito sa Maynila", tag: "MILESTONE" },
  { year: "2024", event: "Explored La Union, Batangas & festivals", tag: "TRAVEL" },
  { year: "2025", event: "Growing the channel & building this site", tag: "NOW" },
];

export default function AboutPage() {
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
        .fx-glow{position:fixed;top:-200px;right:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(245,230,66,.04) 0%,transparent 70%);pointer-events:none;z-index:0}

        /* HEADER */
        .page-header{position:relative;z-index:5;padding:48px 48px 28px;max-width:1300px;margin:0 auto;border-bottom:1px solid var(--border);opacity:0;animation:up .5s ease .1s forwards}
        .page-eyebrow{font-family:var(--mono);font-size:10px;color:var(--v);letter-spacing:.28em;text-transform:uppercase;margin-bottom:12px}
        .page-eyebrow::before{content:'▶ '}
        .page-title{font-family:var(--display);font-size:clamp(48px,7vw,90px);letter-spacing:.06em;color:var(--y);text-shadow:0 0 40px rgba(245,230,66,.2),3px 3px 0 rgba(168,85,247,.2);line-height:.9;margin-bottom:12px}
        .page-sub{font-family:var(--body);font-size:15px;font-weight:300;color:var(--dim);letter-spacing:.06em}

        /* BIO SECTION */
        .bio-section{position:relative;z-index:5;padding:40px 48px 0;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;opacity:0;animation:up .6s ease .25s forwards}

        /* Avatar */
        .avatar-wrap{display:flex;flex-direction:column;align-items:center;gap:20px}
        .avatar{
          width:180px;height:180px;position:relative;
          border:1px solid var(--border);
          clip-path:polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%);
          background:linear-gradient(135deg,rgba(245,230,66,.06),rgba(255,45,107,.06));
          display:flex;align-items:center;justify-content:center;
          overflow:hidden;
        }
        .avatar::before{content:'';position:absolute;inset:0;border:1px solid rgba(245,230,66,.1);clip-path:polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%);animation:border-pulse 3s ease infinite}
        @keyframes border-pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .avatar-letter{font-family:var(--display);font-size:80px;color:var(--y);text-shadow:0 0 30px rgba(245,230,66,.4);letter-spacing:.1em}
        .avatar-handle{font-family:var(--mono);font-size:10px;color:var(--c);letter-spacing:.2em;text-shadow:0 0 8px rgba(0,245,255,.4)}
        .avatar-status{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:9px;color:var(--dim);letter-spacing:.2em;text-transform:uppercase}
        .status-dot{width:6px;height:6px;border-radius:50%;background:var(--p);animation:blink 1.4s ease infinite}

        /* Bio text */
        .bio-text{}
        .bio-name{font-family:var(--display);font-size:clamp(36px,5vw,60px);letter-spacing:.06em;color:var(--y);line-height:.95;margin-bottom:16px}
        .bio-desc{font-family:var(--body);font-size:16px;font-weight:300;color:var(--text);line-height:1.75;margin-bottom:28px}
        .bio-desc span{color:var(--c);font-weight:500}
        .bio-desc strong{color:var(--y);font-weight:600}

        /* Facts grid */
        .facts-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;border:1px solid var(--border)}
        .fact{padding:12px 16px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);position:relative}
        .fact:nth-child(even){border-right:none}
        .fact:nth-last-child(-n+2){border-bottom:none}
        .fact::before{content:attr(data-label);position:absolute;top:-7px;left:10px;font-family:var(--mono);font-size:8px;letter-spacing:.2em;color:var(--dim);background:var(--dark);padding:0 6px;text-transform:uppercase}
        .fact-val{font-family:var(--mono);font-size:12px;color:var(--y);letter-spacing:.1em}

        /* DIVIDER */
        .divider{position:relative;z-index:5;display:flex;align-items:center;gap:16px;padding:0 48px;max-width:1300px;margin:36px auto 0;opacity:0;animation:up .4s ease .45s forwards}
        .div-label{font-family:var(--mono);font-size:10px;letter-spacing:.28em;color:var(--v);text-transform:uppercase;white-space:nowrap}
        .div-line{flex:1;height:1px;background:linear-gradient(90deg,var(--v),rgba(168,85,247,.05))}
        .div-dia{width:6px;height:6px;border:1px solid var(--v);transform:rotate(45deg);flex-shrink:0}

        /* TIMELINE */
        .timeline{position:relative;z-index:5;padding:24px 48px 0;max-width:1300px;margin:0 auto;opacity:0;animation:up .5s ease .55s forwards}
        .tl-list{position:relative;padding-left:24px}
        .tl-list::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:linear-gradient(180deg,var(--v),rgba(168,85,247,.05))}
        .tl-item{position:relative;padding:0 0 28px 28px}
        .tl-item::before{content:'';position:absolute;left:-4px;top:6px;width:9px;height:9px;border:1px solid var(--v);transform:rotate(45deg);background:var(--dark)}
        .tl-year{font-family:var(--mono);font-size:9px;color:var(--v);letter-spacing:.2em;margin-bottom:4px}
        .tl-event{font-family:var(--display);font-size:22px;letter-spacing:.04em;color:var(--text);margin-bottom:4px}
        .tl-tag{display:inline-block;font-family:var(--mono);font-size:8px;letter-spacing:.15em;color:var(--y);border:1px solid rgba(245,230,66,.25);padding:2px 8px}

        /* CHANNEL LINK */
        .channel-cta{position:relative;z-index:5;margin:36px 48px 0;max-width:1204px;margin-left:auto;margin-right:auto;border:1px solid rgba(245,230,66,.25);background:linear-gradient(135deg,rgba(245,230,66,.04),rgba(255,45,107,.03));padding:28px 36px;display:flex;justify-content:space-between;align-items:center;gap:24px;clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%);opacity:0;animation:up .5s ease .65s forwards}
        .channel-cta::before{content:'// FIND ME';position:absolute;top:-8px;left:20px;font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--y);background:var(--dark);padding:0 10px}
        .cta-text h3{font-family:var(--display);font-size:clamp(22px,3vw,32px);letter-spacing:.08em;color:var(--y);margin-bottom:4px}
        .cta-text p{font-family:var(--body);font-size:14px;font-weight:300;color:var(--text)}
        .cta-text p span{color:var(--c)}
        .btn-yt{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:14px 30px;background:var(--p);color:#fff;font-weight:700;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
        .btn-yt:hover{background:#ff5585;box-shadow:0 0 28px rgba(255,45,107,.5);transform:translateY(-2px)}
        .btn-yt svg{width:14px;height:14px;fill:currentColor}

        /* STATUS BAR */
        .statusbar{position:fixed;bottom:0;left:56px;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:7px 48px;background:rgba(3,3,6,.97);border-top:1px solid var(--border);backdrop-filter:blur(12px);opacity:0;animation:up .4s ease .7s forwards}
        .s-l,.s-r{display:flex;gap:24px;align-items:center}
        .s-i{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
        .s-i.hot{color:var(--c)}
        .s-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--p);margin-right:6px;animation:blink 1.4s ease infinite}

        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}

        @media(max-width:900px){
          .bio-section{grid-template-columns:1fr;gap:28px}
          .avatar-wrap{flex-direction:row;align-items:center;gap:24px}
        }
        @media(max-width:768px){
          .page-header,.bio-section,.divider,.timeline,.channel-cta{padding-left:24px;padding-right:24px}
          .channel-cta{margin-left:24px;margin-right:24px;flex-direction:column;align-items:flex-start}
          .statusbar{left:0;padding:7px 24px}
        }
        @media(max-width:480px){
          .page-header,.bio-section,.divider,.timeline,.channel-cta{padding-left:16px;padding-right:16px}
          .channel-cta{margin-left:16px;margin-right:16px}
          .facts-grid{grid-template-columns:1fr}
          .fact{border-right:none}
          .fact:nth-last-child(-n+2){border-bottom:1px solid var(--border)}
          .fact:last-child{border-bottom:none}
          .statusbar{padding:7px 16px}
          .s-i:not(.hot):not(:first-child){display:none}
        }
      `}</style>

      <div className="page">
        <div className="fx-grid" /><div className="fx-static" /><div className="fx-vignette" /><div className="fx-glow" />

        <div className="page-header">
          <div className="page-eyebrow">SYSTEM — ABOUT ME</div>
          <h1 className="page-title">ABOUT</h1>
          <p className="page-sub">The person behind the camera.</p>
        </div>

        <div className="bio-section">
          <div className="avatar-wrap">
            <div className="avatar">
              <span className="avatar-letter">R</span>
            </div>
            <div className="avatar-handle">@kuyarobertjanyl</div>
            <div className="avatar-status">
              <span className="status-dot" />
              Channel Active
            </div>
          </div>

          <div className="bio-text">
            <h2 className="bio-name">
              <GlitchText text="KUYA ROBERT" />
            </h2>
            <p className="bio-desc">
              Hello! I'm <strong>Robert</strong> — content creator, vlogger, and gamer from the{" "}
              <span>Philippines 🇵🇭</span>.<br /><br />
              This channel is where I document <strong>real life moments</strong> — from city adventures
              in Manila, surprise trips back home to Batangas, beach escapes in La Union, to local
              festivals and the everyday grind.<br /><br />
              Gaming content is also on the way. The goal is simple:{" "}
              <strong>share stories that feel real, relatable, and worth watching.</strong>
            </p>

            <div className="facts-grid">
              {FACTS.map(f => (
                <div key={f.label} className="fact" data-label={f.label}>
                  <div className="fact-val">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider">
          <span className="div-label">▶ Channel Timeline</span>
          <div className="div-line" /><div className="div-dia" />
        </div>

        <div className="timeline">
          <div className="tl-list">
            {TIMELINE.map((t, i) => (
              <div key={i} className="tl-item">
                <div className="tl-year">{t.year}</div>
                <div className="tl-event">{t.event}</div>
                <div className="tl-tag">{t.tag}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="channel-cta">
          <div className="cta-text">
            <h3>WATCH THE CHANNEL</h3>
            <p>Gaming, vlogs, life — all on <span>@kuyarobertjanyl</span>.</p>
          </div>
          <a href="https://www.youtube.com/@kuyarobertjanyl" target="_blank" rel="noopener noreferrer" className="btn-yt">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Subscribe Now
          </a>
        </div>

        <footer className="statusbar">
          <div className="s-l">
            <span className="s-i"><span className="s-dot" />LIVE</span>
            <span className="s-i hot">ABOUT_ROBERT</span>
          </div>
          <div className="s-r"><span className="s-i">@kuyarobertjanyl</span></div>
        </footer>
      </div>
    </>
  );
}