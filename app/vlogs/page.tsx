"use client";

import Image from "next/image";
import { useState } from "react";

const VLOGS = [
  { id: "001", videoId: "aCZkeweMbbw",  title: "LA UNION Vlog",                      sub: "Beach vibes and good times sa La Union!",          tag: "TRAVEL"   },
  { id: "002", videoId: "3B1IYkOt1cw",  title: "Buhay ng Alipin Salapi",              sub: "Ang totoo sa buhay ng isang OFW hustle.",          tag: "LIFE"     },
  { id: "003", videoId: "jWWEHXrzChg",  title: "Unang Vlog ko dito sa Maynila",       sub: "First day in the city — chaos and all.",           tag: "CITY"     },
  { id: "004", videoId: "EfOAXCIoZQM",  title: "Biglang uwi ko rine sa Batangas",     sub: "Surprise homecoming — walang pasabi!",             tag: "HOME"     },
  { id: "005", videoId: "IipiyCh9YDg",  title: "Kabakahan Festival",                  sub: "Festival vibes, culture, and good food.",          tag: "CULTURE"  },
  { id: "006", videoId: "iy1e-ljqjrA",  title: "Trabaho at Lomi",                     sub: "Pagod sa trabaho? Lomi ang sagot.",                tag: "DAILY"    },
];

const TAG_COLORS: Record<string, string> = {
  TRAVEL: "#00f5ff", LIFE: "#f5e642", CITY: "#a855f7",
  HOME: "#ff2d6b",   CULTURE: "#f5e642", DAILY: "#00f5ff",
};

function YTThumb({ videoId, title }: { videoId: string; title: string }) {
  const [q, setQ] = useState<"maxresdefault"|"hqdefault">("maxresdefault");
  return (
    <Image src={`https://img.youtube.com/vi/${videoId}/${q}.jpg`} alt={title}
      fill sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw"
      className="yt-img" onError={() => setQ("hqdefault")} unoptimized />
  );
}

export default function VlogsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --y:#f5e642;--c:#00f5ff;--p:#ff2d6b;
          --dark:#050508;--panel:rgba(6,6,12,0.92);
          --border:rgba(245,230,66,0.18);--bh:rgba(245,230,66,0.6);
          --text:#bbb5a0;--dim:#4e4a3a;
          --display:'Bebas Neue',sans-serif;--body:'Rajdhani',sans-serif;--mono:'Share Tech Mono',monospace;
        }
        html,body{background:#020204;overflow-x:hidden;cursor:crosshair}
        ::selection{background:var(--y);color:#000}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#020204}::-webkit-scrollbar-thumb{background:var(--y)}

        .page{min-height:100vh;background:var(--dark);font-family:var(--body);position:relative;overflow-x:hidden}
        .fx-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(245,230,66,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(245,230,66,.02) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;z-index:0}
        .fx-static{position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px);pointer-events:none;z-index:99}
        .fx-vignette{position:fixed;inset:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.8) 100%);pointer-events:none;z-index:98}
        .fx-glow{position:fixed;bottom:-200px;left:50%;transform:translateX(-50%);width:110vw;height:500px;background:radial-gradient(ellipse,rgba(0,245,255,.05) 0%,transparent 70%);pointer-events:none;z-index:0}

        /* HEADER */
        .page-header{position:relative;z-index:5;padding:48px 48px 28px;max-width:1300px;margin:0 auto;border-bottom:1px solid var(--border);opacity:0;animation:up .5s ease .1s forwards}
        .page-eyebrow{font-family:var(--mono);font-size:10px;color:var(--c);letter-spacing:.28em;text-transform:uppercase;margin-bottom:12px}
        .page-eyebrow::before{content:'▶ '}
        .page-title{font-family:var(--display);font-size:clamp(48px,7vw,90px);letter-spacing:.06em;color:var(--y);text-shadow:0 0 40px rgba(245,230,66,.2),3px 3px 0 rgba(0,245,255,.2);line-height:.9;margin-bottom:12px}
        .page-sub{font-family:var(--body);font-size:15px;font-weight:300;color:var(--dim);letter-spacing:.06em}
        .page-sub span{color:var(--c)}

        /* FEATURED — big first card */
        .featured{position:relative;z-index:5;padding:28px 48px 0;max-width:1300px;margin:0 auto;opacity:0;animation:up .5s ease .25s forwards}
        .feat-label{font-family:var(--mono);font-size:9px;letter-spacing:.25em;color:var(--c);text-transform:uppercase;margin-bottom:12px}
        .feat-card{
          display:grid;grid-template-columns:1fr 1fr;
          border:1px solid var(--border);background:var(--panel);
          clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%);
          overflow:hidden;position:relative;
          text-decoration:none;
          transition:border-color .25s,box-shadow .25s;
        }
        .feat-card::after{content:'';position:absolute;top:-1px;right:-1px;width:0;height:0;border-style:solid;border-width:0 21px 21px 0;border-color:transparent var(--dark) transparent transparent}
        .feat-card:hover{border-color:var(--bh);box-shadow:0 8px 40px rgba(245,230,66,.07)}
        .feat-thumb{position:relative;min-height:260px}
        .yt-img{object-fit:cover;transition:transform .4s,filter .3s}
        .feat-card:hover .yt-img{transform:scale(1.04);filter:brightness(.75)}
        .feat-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s;background:rgba(0,0,0,.2);z-index:2}
        .feat-card:hover .feat-play{opacity:1}
        .feat-play-btn{width:60px;height:60px;border-radius:50%;background:rgba(245,230,66,.9);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(245,230,66,.5)}
        .feat-play-btn svg{width:22px;height:22px;fill:#000;margin-left:4px}
        .feat-body{padding:32px;display:flex;flex-direction:column;justify-content:center}
        .feat-tag{display:inline-block;font-family:var(--mono);font-size:9px;letter-spacing:.15em;padding:3px 10px;margin-bottom:16px;font-weight:700;color:#000}
        .feat-title{font-family:var(--display);font-size:clamp(28px,3.5vw,44px);letter-spacing:.04em;color:var(--text);line-height:1.1;margin-bottom:12px;transition:color .2s}
        .feat-card:hover .feat-title{color:var(--y)}
        .feat-sub{font-family:var(--body);font-size:14px;font-weight:300;color:var(--dim);line-height:1.6;margin-bottom:24px}
        .feat-link{font-family:var(--mono);font-size:10px;color:var(--p);letter-spacing:.15em;display:flex;align-items:center;gap:8px}
        .feat-link svg{width:12px;height:12px;fill:currentColor}

        /* DIVIDER */
        .divider{position:relative;z-index:5;display:flex;align-items:center;gap:16px;padding:0 48px;max-width:1300px;margin:24px auto 0;opacity:0;animation:up .4s ease .4s forwards}
        .div-label{font-family:var(--mono);font-size:10px;letter-spacing:.28em;color:var(--c);text-transform:uppercase;white-space:nowrap}
        .div-line{flex:1;height:1px;background:linear-gradient(90deg,var(--c),rgba(0,245,255,.05))}
        .div-dia{width:6px;height:6px;border:1px solid var(--c);transform:rotate(45deg);flex-shrink:0}

        /* GRID */
        .grid{position:relative;z-index:5;padding:16px 48px 100px;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .vcard{border:1px solid var(--border);background:var(--panel);position:relative;cursor:pointer;transition:border-color .25s,transform .25s,box-shadow .25s;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%);text-decoration:none;display:flex;flex-direction:column;animation:up .4s ease both}
        .vcard::after{content:'';position:absolute;top:-1px;right:-1px;width:0;height:0;border-style:solid;border-width:0 15px 15px 0;border-color:transparent var(--dark) transparent transparent}
        .vcard:hover{border-color:var(--bh);transform:translateY(-4px);box-shadow:0 8px 32px rgba(245,230,66,.07)}
        .vcard:hover .vc-title{color:var(--y);text-shadow:0 0 14px rgba(245,230,66,.3)}
        .vc-thumb{position:relative;width:100%;padding-top:56.25%;overflow:hidden;border-bottom:1px solid var(--border);background:#0a0a10}
        .vc-play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s;background:rgba(0,0,0,.3);z-index:2}
        .vcard:hover .vc-play-overlay{opacity:1}
        .vc-play-btn{width:44px;height:44px;border-radius:50%;background:rgba(245,230,66,.9);display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(245,230,66,.4)}
        .vc-play-btn svg{width:16px;height:16px;fill:#000;margin-left:2px}
        .vc-tag{position:absolute;top:8px;left:8px;z-index:3;font-family:var(--mono);font-size:8px;letter-spacing:.15em;padding:2px 8px;font-weight:700;color:#000}
        .vc-body{padding:14px;flex:1;display:flex;flex-direction:column}
        .vc-title{font-family:var(--display);font-size:20px;line-height:1.15;letter-spacing:.04em;color:var(--text);margin-bottom:5px;transition:color .2s,text-shadow .2s;flex:1}
        .vc-sub{font-family:var(--body);font-size:12px;font-weight:300;color:var(--dim);line-height:1.5;margin-bottom:12px}
        .vc-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:10px;margin-top:auto}
        .vc-num{font-family:var(--mono);font-size:9px;color:var(--dim);letter-spacing:.15em}
        .vc-watch{font-family:var(--mono);font-size:9px;color:var(--p);letter-spacing:.12em}

        /* STATUS BAR */
        .statusbar{position:fixed;bottom:0;left:56px;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:7px 48px;background:rgba(3,3,6,.97);border-top:1px solid var(--border);backdrop-filter:blur(12px);opacity:0;animation:up .4s ease .5s forwards}
        .s-l,.s-r{display:flex;gap:24px;align-items:center}
        .s-i{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
        .s-i.hot{color:var(--c)}
        .s-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--p);margin-right:6px;animation:blink 1.4s ease infinite}

        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}

        @media(max-width:1024px){.grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:768px){
          .page-header,.featured,.divider,.grid{padding-left:24px;padding-right:24px}
          .feat-card{grid-template-columns:1fr}
          .feat-thumb{min-height:200px}
          .grid{grid-template-columns:1fr;padding-bottom:100px}
          .statusbar{left:0;padding:7px 24px}
        }
        @media(max-width:480px){
          .page-header,.featured,.divider,.grid{padding-left:16px;padding-right:16px}
          .statusbar{padding:7px 16px}
          .s-i:not(.hot):not(:first-child){display:none}
        }
      `}</style>

      <div className="page">
        <div className="fx-grid" /><div className="fx-static" /><div className="fx-vignette" /><div className="fx-glow" />

        <div className="page-header">
          <div className="page-eyebrow">CONTENT CATEGORY — VLOGS</div>
          <h1 className="page-title">VLOGS</h1>
          <p className="page-sub">Real life. Real stories. <span>{VLOGS.length} episodes</span> and counting.</p>
        </div>

        {/* FEATURED — latest vlog */}
        <div className="featured">
          <div className="feat-label">// LATEST UPLOAD</div>
          <a href={`https://youtu.be/${VLOGS[0].videoId}`} target="_blank" rel="noopener noreferrer" className="feat-card">
            <div className="feat-thumb">
              <YTThumb videoId={VLOGS[0].videoId} title={VLOGS[0].title} />
              <div className="feat-play">
                <div className="feat-play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
              </div>
            </div>
            <div className="feat-body">
              <div className="feat-tag" style={{ background: TAG_COLORS[VLOGS[0].tag] }}>{VLOGS[0].tag}</div>
              <div className="feat-title">{VLOGS[0].title}</div>
              <div className="feat-sub">{VLOGS[0].sub}</div>
              <div className="feat-link">
                <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Watch on YouTube →
              </div>
            </div>
          </a>
        </div>

        <div className="divider">
          <span className="div-label">▶ All Vlogs</span>
          <div className="div-line" /><div className="div-dia" />
        </div>

        <div className="grid">
          {VLOGS.slice(1).map((v, i) => (
            <a key={v.id} href={`https://youtu.be/${v.videoId}`} target="_blank" rel="noopener noreferrer"
              className="vcard" style={{ animationDelay: `${0.06 * i + 0.45}s` }}>
              <div className="vc-thumb">
                <YTThumb videoId={v.videoId} title={v.title} />
                <div className="vc-play-overlay">
                  <div className="vc-play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                </div>
                <div className="vc-tag" style={{ background: TAG_COLORS[v.tag] }}>{v.tag}</div>
              </div>
              <div className="vc-body">
                <div className="vc-title">{v.title}</div>
                <div className="vc-sub">{v.sub}</div>
                <div className="vc-footer">
                  <span className="vc-num">EP_{v.id}</span>
                  <span className="vc-watch">▶ WATCH</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <footer className="statusbar">
          <div className="s-l">
            <span className="s-i"><span className="s-dot" />LIVE</span>
            <span className="s-i hot">VLOGS_FEED</span>
            <span className="s-i">{VLOGS.length} EPISODES</span>
          </div>
          <div className="s-r"><span className="s-i">@kuyarobertjanyl</span></div>
        </footer>
      </div>
    </>
  );
}