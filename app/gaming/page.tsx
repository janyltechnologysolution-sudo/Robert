"use client";

const GAMES = [
  { title: "Mobile Legends", genre: "MOBA",       color: "#ff2d6b" },
  { title: "Valorant",       genre: "FPS",         color: "#f5e642" },
  { title: "Minecraft",      genre: "SANDBOX",     color: "#00f5ff" },
  { title: "GTA V",          genre: "OPEN WORLD",  color: "#a855f7" },
];

export default function GamingPage() {
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
          --display:'Bebas Neue',sans-serif;
          --body:'Rajdhani',sans-serif;
          --mono:'Share Tech Mono',monospace;
        }
        html,body{background:#020204;overflow-x:hidden;cursor:crosshair}
        ::selection{background:var(--y);color:#000}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#020204}
        ::-webkit-scrollbar-thumb{background:var(--y)}

        .page{min-height:100vh;background:var(--dark);font-family:var(--body);position:relative;overflow-x:hidden;padding-bottom:80px}
        .fx-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(245,230,66,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(245,230,66,.02) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;z-index:0}
        .fx-static{position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px);pointer-events:none;z-index:99}
        .fx-vignette{position:fixed;inset:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.8) 100%);pointer-events:none;z-index:98}
        .fx-glow{position:fixed;bottom:-200px;left:50%;transform:translateX(-50%);width:110vw;height:500px;background:radial-gradient(ellipse,rgba(255,45,107,.08) 0%,transparent 70%);pointer-events:none;z-index:0}

        /* HEADER */
        .page-header{position:relative;z-index:5;padding:48px 48px 28px;max-width:1300px;margin:0 auto;border-bottom:1px solid var(--border);opacity:0;animation:up .5s ease .1s forwards}
        .page-eyebrow{font-family:var(--mono);font-size:10px;color:var(--p);letter-spacing:.28em;text-transform:uppercase;margin-bottom:12px}
        .page-eyebrow::before{content:'▶ '}
        .page-title{font-family:var(--display);font-size:clamp(48px,7vw,90px);letter-spacing:.06em;color:var(--y);text-shadow:0 0 40px rgba(245,230,66,.2),3px 3px 0 rgba(255,45,107,.25);line-height:.9;margin-bottom:12px}
        .page-sub{font-family:var(--body);font-size:15px;font-weight:300;color:var(--dim);letter-spacing:.06em}
        .page-sub span{color:var(--p)}

        /* COMING SOON HERO */
        .coming-hero{
          position:relative;z-index:5;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;
          padding:80px 48px 60px;
          max-width:1300px;margin:0 auto;
          opacity:0;animation:up .6s ease .3s forwards;
        }
        .cs-icon{
          width:80px;height:80px;
          border:1px solid rgba(255,45,107,.3);
          display:flex;align-items:center;justify-content:center;
          margin-bottom:28px;
          position:relative;
          clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
          background:rgba(255,45,107,.06);
        }
        .cs-icon svg{width:36px;height:36px;color:var(--p)}
        .cs-icon::before{content:'';position:absolute;inset:0;border:1px solid rgba(255,45,107,.15);animation:pulse 2s ease infinite}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:0}}

        .cs-label{font-family:var(--mono);font-size:10px;letter-spacing:.3em;color:var(--p);text-transform:uppercase;margin-bottom:16px}
        .cs-title{font-family:var(--display);font-size:clamp(40px,6vw,80px);letter-spacing:.06em;color:var(--y);text-shadow:0 0 30px rgba(245,230,66,.2);margin-bottom:16px;line-height:1}
        .cs-sub{font-family:var(--body);font-size:16px;font-weight:300;color:var(--text);max-width:480px;line-height:1.7;margin-bottom:40px}
        .cs-sub span{color:var(--c)}

        /* Progress bar */
        .progress-wrap{width:100%;max-width:400px;margin-bottom:40px}
        .progress-label{display:flex;justify-content:space-between;margin-bottom:8px}
        .progress-label span{font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase}
        .progress-label strong{font-family:var(--mono);font-size:9px;color:var(--y)}
        .progress-track{width:100%;height:3px;background:rgba(245,230,66,.1);position:relative;overflow:hidden}
        .progress-fill{height:100%;background:linear-gradient(90deg,var(--p),var(--y));width:15%;animation:load 2s ease .5s forwards}
        @keyframes load{from{width:0}to{width:15%}}
        .progress-track::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(245,230,66,.15),transparent);animation:shimmer 2s linear infinite}
        @keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}

        /* Notify btn */
        .btn-notify{font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:13px 32px;background:transparent;color:var(--y);border:1px solid rgba(245,230,66,.35);cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .2s;text-decoration:none;display:inline-block}
        .btn-notify:hover{background:rgba(245,230,66,.07);box-shadow:0 0 20px rgba(245,230,66,.12)}

        /* DIVIDER */
        .divider{position:relative;z-index:5;display:flex;align-items:center;gap:16px;padding:0 48px;max-width:1300px;margin:0 auto;opacity:0;animation:up .4s ease .5s forwards}
        .div-label{font-family:var(--mono);font-size:10px;letter-spacing:.28em;color:var(--p);text-transform:uppercase;white-space:nowrap}
        .div-line{flex:1;height:1px;background:linear-gradient(90deg,var(--p),rgba(255,45,107,.05))}
        .div-dia{width:6px;height:6px;border:1px solid var(--p);transform:rotate(45deg);flex-shrink:0}

        /* GAMES I PLAY */
        .games-section{position:relative;z-index:5;padding:24px 48px 0;max-width:1300px;margin:0 auto;opacity:0;animation:up .5s ease .6s forwards}
        .games-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:4px}
        .game-card{border:1px solid var(--border);background:var(--panel);padding:20px 16px;position:relative;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);transition:all .25s;text-align:center}
        .game-card::after{content:'';position:absolute;top:-1px;right:-1px;width:0;height:0;border-style:solid;border-width:0 11px 11px 0;border-color:transparent var(--dark) transparent transparent}
        .game-card:hover{transform:translateY(-4px)}
        .game-name{font-family:var(--display);font-size:20px;letter-spacing:.06em;margin-bottom:4px;transition:text-shadow .2s}
        .game-genre{font-family:var(--mono);font-size:8px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase}

        /* STATUS BAR */
        .statusbar{position:fixed;bottom:0;left:56px;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:7px 48px;background:rgba(3,3,6,.97);border-top:1px solid var(--border);backdrop-filter:blur(12px);opacity:0;animation:up .4s ease .7s forwards}
        .s-l,.s-r{display:flex;gap:24px;align-items:center}
        .s-i{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
        .s-i.hot{color:var(--c)}
        .s-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--p);margin-right:6px;animation:blink 1.4s ease infinite}

        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}

        @media(max-width:1024px){.games-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:768px){
          .page-header,.coming-hero,.games-section,.divider{padding-left:24px;padding-right:24px}
          .statusbar{left:0;padding:7px 24px}
        }
        @media(max-width:480px){
          .page-header,.coming-hero,.games-section,.divider{padding-left:16px;padding-right:16px}
          .games-grid{grid-template-columns:repeat(2,1fr)}
          .statusbar{padding:7px 16px}
          .s-i:not(.hot):not(:first-child){display:none}
        }
      `}</style>

      <div className="page">
        <div className="fx-grid" /><div className="fx-static" /><div className="fx-vignette" /><div className="fx-glow" />

        <div className="page-header">
          <div className="page-eyebrow">CONTENT CATEGORY — GAMING</div>
          <h1 className="page-title">GAMING</h1>
          <p className="page-sub">Where the <span>grind</span> never stops.</p>
        </div>

        <div className="coming-hero">
          <div className="cs-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="6" width="20" height="12" rx="4"/>
              <path d="M8 12h4M10 10v4"/><circle cx="16" cy="11" r=".8" fill="currentColor"/><circle cx="18" cy="13" r=".8" fill="currentColor"/>
            </svg>
          </div>
          <div className="cs-label">// STATUS: LOADING</div>
          <h2 className="cs-title">COMING SOON</h2>
          <p className="cs-sub">
            Gaming content is currently being prepared.<br/>
            <span>Stay tuned — the grind starts soon.</span>
          </p>

          <div className="progress-wrap">
            <div className="progress-label">
              <span>Content Progress</span>
              <strong>15%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
          </div>

          <a href="https://www.youtube.com/@kuyarobertjanyl" target="_blank" rel="noopener noreferrer" className="btn-notify">
            ▶ Subscribe for Updates
          </a>
        </div>

        <div className="divider">
          <span className="div-label">▶ Games I Play</span>
          <div className="div-line" /><div className="div-dia" />
        </div>

        <div className="games-section">
          <div className="games-grid">
            {GAMES.map((g) => (
              <div key={g.title} className="game-card" style={{ borderColor: `${g.color}33` }}
                onMouseEnter={e => (e.currentTarget.querySelector('.game-name') as HTMLElement).style.textShadow = `0 0 16px ${g.color}88`}
                onMouseLeave={e => (e.currentTarget.querySelector('.game-name') as HTMLElement).style.textShadow = 'none'}
              >
                <div className="game-name" style={{ color: g.color }}>{g.title}</div>
                <div className="game-genre">{g.genre}</div>
              </div>
            ))}
          </div>
        </div>

        <footer className="statusbar">
          <div className="s-l">
            <span className="s-i"><span className="s-dot" />LIVE</span>
            <span className="s-i hot">GAMING_FEED</span>
            <span className="s-i">LOADING...</span>
          </div>
          <div className="s-r"><span className="s-i">@kuyarobertjanyl</span></div>
        </footer>
      </div>
    </>
  );
}