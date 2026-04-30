"use client";

import { useState } from "react";
import Image from "next/image";

const FILTERS = ["ALL", "VLOG", "GAMING", "ENTERTAINMENT"];

const VIDEOS = [
  {
    id: "001",
    videoId: "aCZkeweMbbw",
    cat: "VLOG",
    bg: "#00f5ff", fg: "#000",
    title: "LA UNION Vlog",
    sub: "Beach vibes and good times sa La Union!",
  },
  {
    id: "002",
    videoId: "3B1IYkOt1cw",
    cat: "VLOG",
    bg: "#00f5ff", fg: "#000",
    title: "Buhay ng Alipin Salapi",
    sub: "Ang totoo sa buhay ng isang OFW hustle.",
  },
  {
    id: "003",
    videoId: "jWWEHXrzChg",
    cat: "VLOG",
    bg: "#00f5ff", fg: "#000",
    title: "Unang Vlog ko dito sa Maynila",
    sub: "First day in the city — chaos and all.",
  },
  {
    id: "004",
    videoId: "EfOAXCIoZQM",
    cat: "VLOG",
    bg: "#00f5ff", fg: "#000",
    title: "Biglang uwi ko rine sa Batangas",
    sub: "Surprise homecoming — walang pasabi!",
  },
  {
    id: "005",
    videoId: "IipiyCh9YDg",
    cat: "VLOG",
    bg: "#00f5ff", fg: "#000",
    title: "Kabakahan Festival",
    sub: "Festival vibes, culture, and good food.",
  },
  {
    id: "006",
    videoId: "iy1e-ljqjrA",
    cat: "VLOG",
    bg: "#00f5ff", fg: "#000",
    title: "Trabaho at Lomi",
    sub: "Pagod sa trabaho? Lomi ang sagot.",
  },
];

function YTThumb({ videoId, title }: { videoId: string; title: string }) {
  const [quality, setQuality] = useState<"maxresdefault" | "hqdefault">("maxresdefault");

  return (
    <Image
      src={`https://img.youtube.com/vi/${videoId}/${quality}.jpg`}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="yt-thumb-img"
      onError={() => setQuality("hqdefault")}
      unoptimized
    />
  );
}

export default function VideosPage() {
  const [active, setActive] = useState("ALL");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === "ALL" ? VIDEOS : VIDEOS.filter(v => v.cat === active);

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
          --display:'Bebas Neue',sans-serif;
          --body:'Rajdhani',sans-serif;
          --mono:'Share Tech Mono',monospace;
        }
        html,body{background:#020204;overflow-x:hidden;cursor:crosshair}
        ::selection{background:var(--y);color:#000}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#020204}
        ::-webkit-scrollbar-thumb{background:var(--y)}

        .page{min-height:100vh;background:var(--dark);font-family:var(--body);position:relative;overflow-x:hidden}
        .fx-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(245,230,66,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(245,230,66,.02) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;z-index:0}
        .fx-static{position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px);pointer-events:none;z-index:99}
        .fx-vignette{position:fixed;inset:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.8) 100%);pointer-events:none;z-index:98}

        /* PAGE HEADER */
        .page-header{
          position:relative;z-index:5;
          padding:48px 48px 28px;
          max-width:1300px;margin:0 auto;
          border-bottom:1px solid var(--border);
          opacity:0;animation:up .5s ease .1s forwards;
        }
        .page-eyebrow{font-family:var(--mono);font-size:10px;color:var(--p);letter-spacing:.28em;text-transform:uppercase;margin-bottom:12px}
        .page-eyebrow::before{content:'▶ '}
        .page-title{font-family:var(--display);font-size:clamp(48px,7vw,90px);letter-spacing:.06em;color:var(--y);text-shadow:0 0 40px rgba(245,230,66,.2),3px 3px 0 rgba(255,45,107,.25);line-height:.9;margin-bottom:12px}
        .page-sub{font-family:var(--body);font-size:15px;font-weight:300;color:var(--dim);letter-spacing:.06em}
        .page-sub span{color:var(--c)}

        /* FILTER BAR */
        .filter-bar{
          position:relative;z-index:5;
          padding:18px 48px;
          max-width:1300px;margin:0 auto;
          display:flex;align-items:center;gap:10px;flex-wrap:wrap;
          border-bottom:1px solid var(--border);
          opacity:0;animation:up .5s ease .2s forwards;
        }
        .filter-label{font-family:var(--mono);font-size:9px;letter-spacing:.25em;color:var(--dim);text-transform:uppercase;margin-right:6px}
        .filter-btn{
          font-family:var(--mono);font-size:10px;letter-spacing:.18em;
          text-transform:uppercase;padding:7px 18px;
          background:transparent;border:1px solid var(--border);
          color:var(--dim);cursor:pointer;
          clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          transition:all .2s;
        }
        .filter-btn:hover{border-color:rgba(245,230,66,.4);color:var(--y)}
        .filter-btn.on{background:var(--y);color:#000;border-color:var(--y);font-weight:700}

        /* COUNT */
        .result-count{
          position:relative;z-index:5;
          padding:14px 48px 6px;
          max-width:1300px;margin:0 auto;
          font-family:var(--mono);font-size:9px;color:var(--dim);letter-spacing:.2em;
          opacity:0;animation:up .4s ease .25s forwards;
        }
        .result-count span{color:var(--y)}

        /* VIDEO GRID */
        .grid{
          position:relative;z-index:5;
          padding:12px 48px 100px;
          max-width:1300px;margin:0 auto;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:16px;
        }

        /* VIDEO CARD */
        .vcard{
          border:1px solid var(--border);background:var(--panel);
          position:relative;cursor:pointer;
          transition:border-color .25s,transform .25s,box-shadow .25s;
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%);
          text-decoration:none;display:flex;flex-direction:column;
          animation:up .4s ease both;
        }
        .vcard::after{content:'';position:absolute;top:-1px;right:-1px;width:0;height:0;border-style:solid;border-width:0 15px 15px 0;border-color:transparent var(--dark) transparent transparent}
        .vcard:hover{border-color:var(--bh);transform:translateY(-5px);box-shadow:0 12px 40px rgba(245,230,66,.08),0 0 0 1px rgba(245,230,66,.1)}
        .vcard:hover .vc-title{color:var(--y);text-shadow:0 0 14px rgba(245,230,66,.3)}

        /* THUMBNAIL */
        .vc-thumb{
          position:relative;width:100%;padding-top:56.25%;
          overflow:hidden;border-bottom:1px solid var(--border);
          background:#0a0a10;
        }
        .yt-thumb-img{
          object-fit:cover;
          transition:transform .4s ease, filter .3s ease;
        }
        .vcard:hover .yt-thumb-img{
          transform:scale(1.05);
          filter:brightness(0.7);
        }

        /* Play overlay */
        .vc-play-overlay{
          position:absolute;inset:0;
          display:flex;align-items:center;justify-content:center;
          opacity:0;transition:opacity .25s;
          background:rgba(0,0,0,0.3);
          z-index:2;
        }
        .vcard:hover .vc-play-overlay{opacity:1}
        .vc-play-btn{
          width:52px;height:52px;
          border-radius:50%;
          background:rgba(245,230,66,0.9);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 30px rgba(245,230,66,0.5);
          transform:scale(0.85);
          transition:transform .2s ease;
        }
        .vcard:hover .vc-play-btn{transform:scale(1)}
        .vc-play-btn svg{width:20px;height:20px;fill:#000;margin-left:3px}

        /* Badges */
        .vc-cat{
          position:absolute;top:10px;left:10px;z-index:3;
          font-family:var(--mono);font-size:8px;letter-spacing:.15em;
          padding:3px 8px;font-weight:700;
        }
        .vc-num-badge{
          position:absolute;bottom:8px;right:10px;z-index:3;
          font-family:var(--mono);font-size:8px;
          color:rgba(255,255,255,0.7);
          background:rgba(0,0,0,0.7);
          padding:2px 7px;letter-spacing:.1em;
          backdrop-filter:blur(4px);
        }

        /* Card body */
        .vc-body{padding:16px;flex:1;display:flex;flex-direction:column}
        .vc-title{
          font-family:var(--display);font-size:22px;line-height:1.15;
          letter-spacing:.04em;color:var(--text);
          margin-bottom:6px;
          transition:color .2s,text-shadow .2s;flex:1;
        }
        .vc-sub{font-family:var(--body);font-size:12px;font-weight:300;color:var(--dim);line-height:1.5;margin-bottom:14px}
        .vc-footer{
          display:flex;justify-content:space-between;align-items:center;
          border-top:1px solid var(--border);padding-top:10px;margin-top:auto;
        }
        .vc-yt-link{
          display:flex;align-items:center;gap:6px;
          font-family:var(--mono);font-size:9px;color:var(--p);letter-spacing:.12em;
          text-transform:uppercase;
        }
        .vc-yt-link svg{width:12px;height:12px;fill:currentColor}
        .vc-arr{color:var(--y);font-size:13px;transition:transform .2s}
        .vcard:hover .vc-arr{transform:translateX(3px)}

        /* EMPTY */
        .empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:16px}
        .empty-icon{font-family:var(--display);font-size:60px;color:var(--dim);letter-spacing:.1em}
        .empty-text{font-family:var(--mono);font-size:11px;color:var(--dim);letter-spacing:.2em;text-transform:uppercase}

        /* STATUS BAR */
        .statusbar{position:fixed;bottom:0;left:56px;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:7px 48px;background:rgba(3,3,6,.97);border-top:1px solid var(--border);backdrop-filter:blur(12px);opacity:0;animation:up .4s ease .4s forwards}
        .s-l,.s-r{display:flex;gap:24px;align-items:center}
        .s-i{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
        .s-i.hot{color:var(--c)}
        .s-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--p);margin-right:6px;animation:blink 1.4s ease infinite}

        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}

        /* RESPONSIVE */
        @media(max-width:1024px){.grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:768px){
          .page-header{padding:40px 24px 20px}
          .filter-bar{padding:14px 24px}
          .result-count{padding:10px 24px 4px}
          .grid{grid-template-columns:1fr;padding:10px 24px 100px}
          .statusbar{left:0;padding:7px 24px}
        }
        @media(max-width:480px){
          .page-header{padding:36px 16px 18px}
          .filter-bar{padding:12px 16px}
          .result-count{padding:8px 16px 4px}
          .grid{padding:8px 16px 100px}
          .statusbar{padding:7px 16px}
          .s-i:not(.hot):not(:first-child){display:none}
        }
      `}</style>

      <div className="page">
        <div className="fx-grid" />
        <div className="fx-static" />
        <div className="fx-vignette" />

        {/* PAGE HEADER */}
        <div className="page-header">
          <div className="page-eyebrow">CONTENT ARCHIVE — ALL VIDEOS</div>
          <h1 className="page-title">VIDEOS</h1>
          <p className="page-sub">
            Real stories, real places, real life —{" "}
            <span>{VIDEOS.length} transmissions</span> and counting.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <span className="filter-label">Filter//</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? " on" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* COUNT */}
        <div className="result-count">
          SHOWING <span>{filtered.length}</span> OF <span>{VIDEOS.length}</span> VIDEOS
        </div>

        {/* GRID */}
        <div className="grid">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">404</div>
              <div className="empty-text">No transmissions found</div>
            </div>
          ) : (
            filtered.map((v, i) => (
              <a
                key={v.id}
                href={`https://youtu.be/${v.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vcard"
                style={{ animationDelay: `${0.06 * i + 0.3}s` }}
                onMouseEnter={() => setHovered(v.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Thumbnail */}
                <div className="vc-thumb">
                  <YTThumb videoId={v.videoId} title={v.title} />

                  {/* Play overlay */}
                  <div className="vc-play-overlay">
                    <div className="vc-play-btn">
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="vc-cat" style={{ background: v.bg, color: v.fg }}>
                    {v.cat}
                  </div>
                  <div className="vc-num-badge">#{v.id}</div>
                </div>

                {/* Body */}
                <div className="vc-body">
                  <div className="vc-title">{v.title}</div>
                  <div className="vc-sub">{v.sub}</div>
                  <div className="vc-footer">
                    <span className="vc-yt-link">
                      <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      Watch on YouTube
                    </span>
                    <span className="vc-arr">→</span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {/* STATUS BAR */}
        <footer className="statusbar">
          <div className="s-l">
            <span className="s-i"><span className="s-dot" />LIVE</span>
            <span className="s-i hot">VIDEOS_ARCHIVE</span>
            <span className="s-i">{filtered.length} RESULTS</span>
          </div>
          <div className="s-r">
            <span className="s-i">@kuyarobertjanyl</span>
          </div>
        </footer>
      </div>
    </>
  );
}