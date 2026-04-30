"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#█▓▒░│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);

  const scramble = () => {
    let iter = 0;
    const interval = setInterval(() => {
      iter += 0.7;
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " " || char === "_") return char;
          if (i < iter) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join("")
      );
      if (iter >= text.length) { clearInterval(interval); setDisplay(text); }
    }, 25);
  };

  useEffect(() => { const t = setTimeout(scramble, 600); return () => clearTimeout(t); }, []);
  return <span className={className} onMouseEnter={scramble}>{display}</span>;
}

const TAGS = [
  { label: "GAMING",        color: "#ff2d6b" },
  { label: "VLOGGING",      color: "#00f5ff" },
  { label: "ENTERTAINMENT", color: "#f5e642" },
  { label: "AND MORE",      color: "#a855f7" },
];

const CARDS = [
  { id: "001", cat: "GAMING",        bg: "#ff2d6b", fg: "#fff", title: "Late Night Gaming Sessions",  sub: "The grind never stops fr fr" },
  { id: "002", cat: "VLOG",          bg: "#00f5ff", fg: "#000", title: "A Day in My Life",            sub: "Just vibing, documenting everything" },
  { id: "003", cat: "ENTERTAINMENT", bg: "#f5e642", fg: "#000", title: "Random Stuff I Found Online", sub: "You won't believe this one" },
];

export default function Home() {
  const [mouse, setMouse]   = useState({ x: 0, y: 0 });
  const [scanY, setScanY]   = useState(0);
  const [time,  setTime]    = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let y = 0;
    const id = setInterval(() => {
      y = (y + 1.5) % (typeof window !== "undefined" ? window.innerHeight : 900);
      setScanY(y);
    }, 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Bebas+Neue&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --y: #f5e642; --c: #00f5ff; --p: #ff2d6b; --v: #a855f7;
          --dark: #050508; --panel: rgba(6,6,12,0.9);
          --border: rgba(245,230,66,0.18); --bh: rgba(245,230,66,0.6);
          --text: #bbb5a0; --dim: #4e4a3a;
          --display: 'Bebas Neue', sans-serif;
          --body: 'Rajdhani', sans-serif;
          --mono: 'Share Tech Mono', monospace;
        }

        html, body { background: #020204; overflow-x: hidden; cursor: crosshair; }
        ::selection { background: var(--y); color: #000; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #020204; }
        ::-webkit-scrollbar-thumb { background: var(--y); }

        /* ── FX ── */
        .page { min-height: 100vh; background: var(--dark); position: relative; font-family: var(--body); overflow-x: hidden; }
        .fx-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(245,230,66,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(245,230,66,.022) 1px,transparent 1px); background-size: 44px 44px; pointer-events: none; z-index: 0; }
        .fx-glow { position: fixed; bottom: -220px; left: 50%; transform: translateX(-50%); width: 110vw; height: 560px; background: radial-gradient(ellipse,rgba(255,45,107,.07) 0%,rgba(245,230,66,.03) 40%,transparent 70%); pointer-events: none; z-index: 0; }
        .fx-static { position: fixed; inset: 0; background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 4px); pointer-events: none; z-index: 99; }
        .fx-vignette { position: fixed; inset: 0; background: radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.85) 100%); pointer-events: none; z-index: 98; }
        .fx-scan { position: fixed; left: 0; right: 0; height: 2px; background: linear-gradient(transparent,rgba(0,245,255,.06),transparent); pointer-events: none; z-index: 100; }
        .fx-cursor { position: fixed; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle,rgba(245,230,66,.03) 0%,transparent 70%); transform: translate(-50%,-50%); pointer-events: none; z-index: 1; transition: left .09s, top .09s; }

        /* ── HERO — full viewport, centered ── */
        .hero {
          position: relative; z-index: 5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 32px 100px;
          gap: 0;
        }

        .hero-eyebrow {
          font-family: var(--mono); font-size: clamp(9px, 1.2vw, 11px);
          color: var(--p); letter-spacing: .28em; text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0; animation: up .5s ease .3s forwards;
        }
        .hero-eyebrow::before { content: '▶ '; }

        /* Big title */
        .hero-title {
          display: flex; align-items: flex-end; justify-content: center;
          flex-wrap: wrap; line-height: .88; gap: 0;
          margin-bottom: 28px;
        }
        .t-kuya {
          font-family: var(--display);
          font-size: clamp(56px, 12vw, 160px);
          color: var(--text); letter-spacing: .06em;
          opacity: 0; animation: up .6s ease .45s forwards;
          cursor: pointer; transition: color .2s;
        }
        .t-kuya:hover { color: var(--y); }
        .t-sep {
          font-family: var(--display);
          font-size: clamp(56px, 12vw, 160px);
          color: var(--dim); opacity: 0; animation: up .6s ease .5s forwards;
          padding: 0 4px;
        }
        .t-robert {
          font-family: var(--display);
          font-size: clamp(56px, 12vw, 160px);
          color: var(--y); letter-spacing: .06em;
          text-shadow: 0 0 50px rgba(245,230,66,.25), 5px 5px 0 rgba(255,45,107,.3);
          opacity: 0; animation: up .6s ease .55s forwards;
          cursor: pointer; display: inline-block; transition: text-shadow .15s;
        }
        .t-robert:hover { text-shadow: -3px 0 var(--c), 3px 0 var(--p), 0 0 40px rgba(245,230,66,.4); }

        /* Desc */
        .hero-desc {
          font-family: var(--body); font-size: clamp(14px, 2vw, 18px); font-weight: 300;
          color: var(--text); letter-spacing: .06em;
          max-width: 560px; line-height: 1.7;
          margin-bottom: 24px;
          opacity: 0; animation: up .5s ease .75s forwards;
        }
        .hero-desc strong { color: var(--c); font-weight: 600; }

        /* Tags */
        .tags {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 28px;
          opacity: 0; animation: up .5s ease .9s forwards;
        }
        .tag {
          font-family: var(--mono); font-size: clamp(9px, 1vw, 10px);
          letter-spacing: .16em; padding: 5px 14px; border: 1px solid;
          text-transform: uppercase;
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
        }

        /* Stats */
        .stats {
          display: flex; justify-content: center; flex-wrap: wrap;
          border: 1px solid var(--border); margin-bottom: 32px;
          opacity: 0; animation: up .5s ease .95s forwards;
        }
        .stat {
          padding: 14px 28px; border-right: 1px solid var(--border);
          position: relative; text-align: center;
        }
        .stat:last-child { border-right: none; }
        .stat::before {
          content: attr(data-label); position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
          font-family: var(--mono); font-size: 8px; letter-spacing: .2em;
          color: var(--dim); background: var(--dark); padding: 0 6px; white-space: nowrap;
        }
        .stat-num { font-family: var(--display); font-size: 28px; letter-spacing: .06em; color: var(--y); }
        .stat-unit { font-family: var(--mono); font-size: 8px; color: var(--dim); letter-spacing: .15em; margin-top: 2px; }

        /* CTAs */
        .ctas {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
          opacity: 0; animation: up .5s ease 1.05s forwards;
        }
        .btn {
          font-family: var(--mono); font-size: clamp(10px, 1.1vw, 11px);
          letter-spacing: .2em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; cursor: pointer; border: none;
          transition: all .2s; display: inline-flex; align-items: center; gap: 8px;
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
        }
        .btn-yt { background: var(--p); color: #fff; font-weight: 700; }
        .btn-yt:hover { background: #ff5585; box-shadow: 0 0 24px rgba(255,45,107,.6); transform: translateY(-2px); }
        .btn-ghost { background: transparent; color: var(--y); border: 1px solid rgba(245,230,66,.35); }
        .btn-ghost:hover { background: rgba(245,230,66,.07); }
        .yt-icon { width: 15px; height: 15px; fill: currentColor; flex-shrink: 0; }

        /* ── SECTION DIVIDER ── */
        .divider {
          position: relative; z-index: 5;
          display: flex; align-items: center; gap: 16px;
          padding: 0 48px; max-width: 1300px; margin: 0 auto;
          opacity: 0; animation: up .4s ease 1.1s forwards;
        }
        .div-label { font-family: var(--mono); font-size: 10px; letter-spacing: .28em; color: var(--p); text-transform: uppercase; white-space: nowrap; }
        .div-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--p), rgba(255,45,107,.05)); }
        .div-dia { width: 6px; height: 6px; border: 1px solid var(--p); transform: rotate(45deg); flex-shrink: 0; }

        /* ── CARDS ── */
        .cards {
          position: relative; z-index: 5;
          padding: 20px 48px 32px;
          max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          opacity: 0; animation: up .5s ease 1.2s forwards;
        }
        .card {
          border: 1px solid var(--border); background: var(--panel);
          padding: 22px; position: relative; cursor: pointer;
          transition: border-color .25s, transform .25s, box-shadow .25s;
          clip-path: polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
          text-decoration: none; display: block;
        }
        .card::after { content: ''; position: absolute; top: -1px; right: -1px; width: 0; height: 0; border-style: solid; border-width: 0 17px 17px 0; border-color: transparent var(--dark) transparent transparent; }
        .card:hover { border-color: var(--bh); transform: translateY(-4px); box-shadow: 0 8px 32px rgba(245,230,66,.08); }
        .card:hover .card-title { color: var(--y); text-shadow: 0 0 16px rgba(245,230,66,.3); }
        .card-num { font-family: var(--mono); font-size: 9px; color: var(--dim); letter-spacing: .2em; margin-bottom: 10px; }
        .card-cat { display: inline-block; font-family: var(--mono); font-size: 9px; letter-spacing: .15em; padding: 2px 8px; margin-bottom: 14px; font-weight: 700; }
        .card-title { font-family: var(--display); font-size: 26px; line-height: 1.1; letter-spacing: .04em; color: var(--text); margin-bottom: 8px; transition: color .2s, text-shadow .2s; }
        .card-sub { font-family: var(--body); font-size: 13px; font-weight: 300; color: var(--dim); line-height: 1.5; margin-bottom: 18px; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 12px; }
        .card-lnk { font-family: var(--mono); font-size: 9px; color: var(--p); letter-spacing: .15em; }
        .card-arr { color: var(--y); font-size: 14px; }

        /* ── SUBSCRIBE BANNER ── */
        .sub-banner {
          position: relative; z-index: 5;
          margin: 8px 48px 90px; max-width: 1204px;
          margin-left: auto; margin-right: auto;
          border: 1px solid rgba(255,45,107,.3);
          background: linear-gradient(135deg,rgba(255,45,107,.06) 0%,rgba(245,230,66,.04) 100%);
          padding: 28px 36px;
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
          clip-path: polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%);
          opacity: 0; animation: up .5s ease 1.35s forwards;
        }
        .sub-banner::before { content: '// SUBSCRIBE'; position: absolute; top: -8px; left: 20px; font-family: var(--mono); font-size: 9px; letter-spacing: .2em; color: var(--p); background: var(--dark); padding: 0 10px; }
        .sub-text h3 { font-family: var(--display); font-size: clamp(22px, 3vw, 32px); letter-spacing: .08em; color: var(--y); text-shadow: 0 0 20px rgba(245,230,66,.25); margin-bottom: 4px; }
        .sub-text p { font-family: var(--body); font-size: 14px; font-weight: 300; color: var(--text); }
        .sub-text p span { color: var(--c); }
        .btn-sub { font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase; padding: 15px 32px; background: var(--p); color: #fff; font-weight: 700; border: none; cursor: pointer; clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); transition: all .2s; text-decoration: none; display: inline-block; white-space: nowrap; }
        .btn-sub:hover { background: #ff5585; box-shadow: 0 0 28px rgba(255,45,107,.5); transform: translateY(-2px); }

        /* ── STATUS BAR ── */
        .statusbar {
          position: fixed; bottom: 0; left: 56px; right: 0; z-index: 50;
          display: flex; justify-content: space-between; align-items: center;
          padding: 7px 48px;
          background: rgba(3,3,6,.97); border-top: 1px solid var(--border);
          backdrop-filter: blur(12px);
          opacity: 0; animation: up .4s ease 1.5s forwards;
        }
        .s-l, .s-r { display: flex; gap: 24px; align-items: center; }
        .s-i { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; color: var(--dim); text-transform: uppercase; }
        .s-i.hot { color: var(--c); }
        .s-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--p); margin-right: 6px; animation: blink 1.4s ease infinite; }

        @keyframes up   { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }

        /* ── RESPONSIVE ── */

        /* Tablet landscape */
        @media (max-width: 1024px) {
          .cards { grid-template-columns: repeat(2, 1fr); }
        }

        /* Tablet portrait + large mobile */
        @media (max-width: 768px) {
          .hero { padding: 72px 24px 96px; }
          .cards { grid-template-columns: 1fr; padding: 16px 24px 28px; }
          .divider { padding: 0 24px; }
          .sub-banner { margin: 8px 24px 90px; padding: 24px 20px; flex-direction: column; align-items: flex-start; }
          .statusbar { left: 0; padding: 7px 24px; }
          .stat { padding: 12px 18px; }
        }

        /* Mobile portrait */
        @media (max-width: 480px) {
          .hero { padding: 64px 16px 96px; }
          .stats { flex-direction: column; border: none; gap: 0; }
          .stat { border-right: none; border-bottom: 1px solid var(--border); }
          .stat:last-child { border-bottom: none; }
          .cards { padding: 16px 16px 24px; }
          .divider { padding: 0 16px; }
          .sub-banner { margin: 8px 16px 90px; }
          .statusbar { padding: 7px 16px; }
          .s-i:not(.hot):not(:first-child) { display: none; }
        }

        /* Landscape phones */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero { min-height: auto; padding: 80px 48px 40px; }
        }
      `}</style>

      <div className="page">
        {/* FX layers */}
        <div className="fx-grid" />
        <div className="fx-glow" />
        <div className="fx-static" />
        <div className="fx-vignette" />
        <div className="fx-scan" style={{ top: scanY }} />
        <div className="fx-cursor" style={{ left: mouse.x, top: mouse.y }} />

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-eyebrow">TRANSMISSION ACTIVE — YOUTUBE CHANNEL ONLINE</div>

          <div className="hero-title">
            <GlitchText text="KUYA" className="t-kuya" />
            <span className="t-sep">_</span>
            <GlitchText text="ROBERT" className="t-robert" />
          </div>

          <p className="hero-desc">
            Welcome to my channel — where we explore <strong>gaming</strong>,{" "}
            <strong>vlogging</strong>, <strong>entertainment</strong> and a whole lot of other stuffs. 😊
            <br />Sit back, stay a while, and hit that subscribe button.
          </p>

          <div className="tags">
            {TAGS.map((t) => (
              <span key={t.label} className="tag" style={{ color: t.color, borderColor: t.color, textShadow: `0 0 10px ${t.color}33` }}>
                {t.label}
              </span>
            ))}
          </div>

          <div className="stats">
            <div className="stat" data-label="SUBSCRIBERS">
              <div className="stat-num">—</div>
              <div className="stat-unit">AND GROWING</div>
            </div>
            <div className="stat" data-label="CONTENT">
              <div className="stat-num">3+</div>
              <div className="stat-unit">CATEGORIES</div>
            </div>
            <div className="stat" data-label="STATUS">
              <div className="stat-num" style={{ color: "var(--p)", fontSize: 18 }}>ONLINE</div>
              <div className="stat-unit">ACTIVE</div>
            </div>
          </div>

          <div className="ctas">
            <a href="https://www.youtube.com/@kuyarobertjanyl" target="_blank" rel="noopener noreferrer" className="btn btn-yt">
              <svg className="yt-icon" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Watch Now
            </a>
            <a href="/videos" className="btn btn-ghost">Browse Content</a>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="divider">
          <span className="div-label">▶ Featured Content</span>
          <div className="div-line" />
          <div className="div-dia" />
        </div>

        {/* ── CARDS ── */}
        <section className="cards">
          {CARDS.map((c) => (
            <a key={c.id} href="https://www.youtube.com/@kuyarobertjanyl" target="_blank" rel="noopener noreferrer" className="card">
              <div className="card-num">FILE_{c.id}</div>
              <div className="card-cat" style={{ background: c.bg, color: c.fg }}>{c.cat}</div>
              <div className="card-title">{c.title}</div>
              <div className="card-sub">{c.sub}</div>
              <div className="card-footer">
                <span className="card-lnk">Watch on YouTube</span>
                <span className="card-arr">→</span>
              </div>
            </a>
          ))}
        </section>

        {/* ── SUBSCRIBE BANNER ── */}
        <div className="sub-banner">
          <div className="sub-text">
            <h3>JOIN THE CHANNEL</h3>
            <p>Gaming, vlogs, and everything in between — <span>@kuyarobertjanyl</span> on YouTube.</p>
          </div>
          <a href="https://www.youtube.com/@kuyarobertjanyl" target="_blank" rel="noopener noreferrer" className="btn-sub">▶ Subscribe Now</a>
        </div>

        {/* ── STATUS BAR ── */}
        <footer className="statusbar">
          <div className="s-l">
            <span className="s-i"><span className="s-dot" />LIVE</span>
            <span className="s-i hot">CHANNEL_ONLINE</span>
            <span className="s-i">@kuyarobertjanyl</span>
          </div>
          <div className="s-r">
            <span className="s-i">NIGHT CITY // GRID</span>
            <span className="s-i hot">{time}</span>
          </div>
        </footer>
      </div>
    </>
  );
}