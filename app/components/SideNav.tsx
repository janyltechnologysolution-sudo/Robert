"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "HOME",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: "/videos",
    label: "VIDEOS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: "/gaming",
    label: "GAMING",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="4"/>
        <path d="M8 12h4M10 10v4"/>
        <circle cx="16" cy="11" r=".6" fill="currentColor"/>
        <circle cx="18" cy="13" r=".6" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/vlogs",
    label: "VLOGS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14v-4z"/>
        <rect x="3" y="8" width="12" height="8" rx="2"/>
      </svg>
    ),
  },
  {
    href: "/about",
    label: "ABOUT",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "CONTACT",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M3 6l9 7 9-7"/>
      </svg>
    ),
  },
];

export default function SideNav() {
  const pathname  = usePathname();
  const [open, setOpen]   = useState(false);
  const [time, setTime]   = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');

        /* ── SIDEBAR ── */
        .sn {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: 56px;
          display: flex;
          flex-direction: column;
          background: rgba(3,3,6,0.97);
          border-right: 1px solid rgba(245,230,66,0.15);
          backdrop-filter: blur(16px);
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
          z-index: 500;               /* always on top of everything */
        }
        .sn:hover, .sn.open { width: 200px; }

        /* scan line sweeping down */
        .sn-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,255,0.18), transparent);
          pointer-events: none;
          animation: sn-sweep 3.5s linear infinite;
        }
        @keyframes sn-sweep {
          0%   { top: 0;    opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── LOGO ROW ── */
        .sn-logo {
          display: flex; align-items: center;
          min-height: 64px; flex-shrink: 0;
          border-bottom: 1px solid rgba(245,230,66,0.1);
          overflow: hidden;
        }
        .sn-logo-icon {
          width: 56px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .sn-diamond {
          width: 18px; height: 18px;
          border: 1.5px solid #f5e642;
          transform: rotate(45deg);
          box-shadow: 0 0 12px rgba(245,230,66,0.45);
          flex-shrink: 0;
          transition: box-shadow 0.3s;
        }
        .sn:hover .sn-diamond, .sn.open .sn-diamond {
          box-shadow: 0 0 20px rgba(245,230,66,0.7);
        }
        .sn-logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 0.22em;
          color: #f5e642;
          text-shadow: 0 0 16px rgba(245,230,66,0.55);
          white-space: nowrap; padding-left: 10px;
          opacity: 0; transition: opacity 0.2s ease 0.1s;
        }
        .sn:hover .sn-logo-text,
        .sn.open  .sn-logo-text { opacity: 1; }

        /* ── NAV ITEMS ── */
        .sn-items {
          flex: 1; display: flex; flex-direction: column;
          padding: 10px 0; gap: 2px; overflow: hidden;
        }
        .sn-link {
          display: flex; align-items: center;
          height: 48px; flex-shrink: 0;
          text-decoration: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: background 0.2s;
        }
        /* active left bar */
        .sn-link::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: #f5e642;
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }
        .sn-link:hover::before,
        .sn-link.active::before { transform: scaleY(1); }
        .sn-link:hover  { background: rgba(245,230,66,0.05); }
        .sn-link.active { background: rgba(245,230,66,0.08); }

        /* icon slot */
        .sn-icon {
          width: 56px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #4e4a3a;
          transition: color 0.2s, filter 0.2s;
        }
        .sn-icon svg { width: 18px; height: 18px; }
        .sn-link:hover  .sn-icon { color: #f5e642; }
        .sn-link.active .sn-icon {
          color: #f5e642;
          filter: drop-shadow(0 0 6px rgba(245,230,66,0.6));
        }

        /* label */
        .sn-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.2em;
          color: #4e4a3a; white-space: nowrap;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease 0.08s, transform 0.2s ease 0.08s, color 0.2s;
        }
        .sn:hover  .sn-label,
        .sn.open   .sn-label { opacity: 1; transform: translateX(0); }
        .sn-link:hover  .sn-label { color: #f5e642; }
        .sn-link.active .sn-label { color: #f5e642; }

        /* active dot (only visible when expanded) */
        .sn-dot {
          position: absolute; right: 14px;
          width: 4px; height: 4px; border-radius: 50%;
          background: #ff2d6b;
          box-shadow: 0 0 8px rgba(255,45,107,0.7);
          opacity: 0; transition: opacity 0.2s;
        }
        .sn-link.active .sn-dot { opacity: 1; }
        .sn:not(:hover):not(.open) .sn-dot { opacity: 0; }

        /* ── DIVIDER ── */
        .sn-hr {
          height: 1px;
          background: rgba(245,230,66,0.08);
          margin: 6px 12px; flex-shrink: 0;
        }

        /* ── BOTTOM AREA ── */
        .sn-bottom {
          border-top: 1px solid rgba(245,230,66,0.1);
          padding: 10px 0; flex-shrink: 0; overflow: hidden;
        }

        /* YouTube link */
        .sn-yt {
          display: flex; align-items: center;
          height: 46px; text-decoration: none; cursor: pointer;
          transition: background 0.2s; overflow: hidden;
        }
        .sn-yt:hover { background: rgba(255,45,107,0.08); }
        .sn-yt-icon {
          width: 56px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #ff2d6b; transition: filter 0.2s;
        }
        .sn-yt-icon svg { width: 18px; height: 18px; fill: currentColor; }
        .sn-yt:hover .sn-yt-icon { filter: drop-shadow(0 0 6px rgba(255,45,107,0.7)); }
        .sn-yt-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; color: #ff2d6b;
          white-space: nowrap; opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease 0.08s, transform 0.2s ease 0.08s;
        }
        .sn:hover  .sn-yt-label,
        .sn.open   .sn-yt-label { opacity: 1; transform: translateX(0); }

        /* Clock row */
        .sn-clock {
          display: flex; align-items: center;
          height: 36px; overflow: hidden;
        }
        .sn-clock-icon {
          width: 56px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .sn-pulse {
          width: 5px; height: 5px; border-radius: 50%;
          background: #00f5ff;
          box-shadow: 0 0 8px rgba(0,245,255,0.6);
          animation: sn-blink 1.4s ease infinite;
        }
        .sn-time {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; color: #00f5ff;
          text-shadow: 0 0 8px rgba(0,245,255,0.4);
          letter-spacing: 0.1em; white-space: nowrap;
          opacity: 0; transition: opacity 0.2s ease 0.08s;
        }
        .sn:hover  .sn-time,
        .sn.open   .sn-time { opacity: 1; }

        @keyframes sn-blink { 0%,100%{opacity:1} 50%{opacity:.2} }

        /* ── MOBILE HAMBURGER ── */
        .sn-toggle {
          display: none;
          position: fixed; top: 14px; left: 14px; z-index: 600;
          width: 40px; height: 40px;
          background: rgba(3,3,6,0.97);
          border: 1px solid rgba(245,230,66,0.2);
          align-items: center; justify-content: center;
          cursor: pointer; color: #f5e642;
        }
        .sn-toggle svg { width: 18px; height: 18px; }

        @media (max-width: 768px) {
          .sn          { display: none; }
          .sn.open     { display: flex; width: 200px; }
          .sn-toggle   { display: flex; }
        }
      `}</style>

      {/* Mobile toggle button */}
      <button className="sn-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {open
            ? <path d="M6 6l12 12M6 18L18 6"/>
            : <path d="M4 6h16M4 12h16M4 18h16"/>
          }
        </svg>
      </button>

      {/* Sidebar */}
      <nav className={`sn${open ? " open" : ""}`}>
        <div className="sn-scan" />

        {/* Logo */}
        <div className="sn-logo">
          <div className="sn-logo-icon">
            <div className="sn-diamond" />
          </div>
          <span className="sn-logo-text">KUYA_ROBERT</span>
        </div>

        {/* Nav links */}
        <div className="sn-items">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sn-link${pathname === item.href ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <div className="sn-icon">{item.icon}</div>
              <span className="sn-label">{item.label}</span>
              <span className="sn-dot" />
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="sn-bottom">
          <div className="sn-hr" />

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@kuyarobertjanyl"
            target="_blank"
            rel="noopener noreferrer"
            className="sn-yt"
          >
            <div className="sn-yt-icon">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <span className="sn-yt-label">YOUTUBE</span>
          </a>

          {/* Clock */}
          <div className="sn-clock">
            <div className="sn-clock-icon">
              <div className="sn-pulse" />
            </div>
            <span className="sn-time">{time}</span>
          </div>
        </div>
      </nav>
    </>
  );
}