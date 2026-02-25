// ═══════════════════════════════════════════════════════════════════════════════
//  DAVLAT TASHKILOTLARI TAQDIMOTI
//  Muallif sahifasi + Soliq Xizmati + Ta'lim Vazirligi + Yoshlar Agentligi
//  Barcha CSS, ma'lumotlar va komponentlar shu bir faylda joylashgan
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from "react";

// ───────────────────────────────────────────────────────────────────────────────
//  EMBEDDED STYLES  (barcha CSS shu yerda)
// ───────────────────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { height: 100%; width: 100%; overflow: hidden; }
body { font-family: 'Jost', sans-serif; }

/* ── ROOT ── */
.root {
  position: fixed; inset: 0;
  display: flex; flex-direction: column;
  transition: background 0.9s ease;
  overflow: hidden;
}

/* ── GRID OVERLAY ── */
.grid-bg {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 52px 52px;
}

/* ── CORNER DECO ── */
.corner { position: absolute; width: 80px; height: 80px; pointer-events: none; z-index: 2; }
.corner-tl { top: 0; left: 0; border-top: 2px solid var(--acc); border-left: 2px solid var(--acc); opacity: 0.4; }
.corner-tr { top: 0; right: 0; border-top: 2px solid var(--acc); border-right: 2px solid var(--acc); opacity: 0.4; }
.corner-bl { bottom: 0; left: 0; border-bottom: 2px solid var(--acc); border-left: 2px solid var(--acc); opacity: 0.4; }
.corner-br { bottom: 0; right: 0; border-bottom: 2px solid var(--acc); border-right: 2px solid var(--acc); opacity: 0.4; }

/* ── PARTICLES ── */
.particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
.ptcl {
  position: absolute; border-radius: 50%; opacity: 0;
  animation: ptclFloat linear infinite;
}
@keyframes ptclFloat {
  0%   { opacity: 0; transform: translateY(0) scale(0.4); }
  10%  { opacity: 0.35; }
  90%  { opacity: 0.12; }
  100% { opacity: 0; transform: translateY(-110px) scale(1.3); }
}

/* ── HEADER ── */
.topbar {
  position: relative; z-index: 20;
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 24px; gap: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  background: rgba(0,0,0,0.38);
  backdrop-filter: blur(18px);
  flex-shrink: 0;
}
.topbar-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.topbar-badge {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--acc-l);
}
.agency-tabs { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.atab {
  display: flex; align-items: center; gap: 7px;
  padding: 6px 14px; border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.4);
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.07em; text-transform: uppercase;
  cursor: pointer; transition: all 0.25s ease;
}
.atab:hover { color: rgba(255,255,255,0.72); border-color: rgba(255,255,255,0.22); }
.atab.on {
  border-color: var(--acc);
  background: var(--acc-bg);
  color: white;
  box-shadow: 0 0 16px var(--acc)33;
}
.atab-author {
  border-color: rgba(255,255,255,0.18) !important;
  background: rgba(255,255,255,0.07) !important;
  color: rgba(255,255,255,0.55) !important;
}
.atab-author.on {
  border-color: #a78bfa !important;
  background: rgba(167,139,250,0.14) !important;
  color: white !important;
  box-shadow: 0 0 16px #a78bfa33 !important;
}
.autoplay-btn {
  padding: 6px 13px; border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.42);
  font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s ease; flex-shrink: 0;
}
.autoplay-btn.on { border-color: var(--acc); color: var(--acc); background: var(--acc-bg); }

/* ── SLIDE AREA ── */
.slide-area {
  position: relative; z-index: 5; flex: 1;
  display: flex; align-items: center; justify-content: center;
  padding: 14px 62px; overflow: hidden;
}
.nav-btn {
  position: absolute; z-index: 30;
  width: 44px; height: 44px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.45); backdrop-filter: blur(8px);
  color: rgba(255,255,255,0.5); font-size: 1.7rem; line-height: 1;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.25s ease; padding-bottom: 2px;
}
.nav-btn:hover { border-color: var(--acc); color: var(--acc); box-shadow: 0 0 18px var(--acc)44; transform: scale(1.08); }
.nav-l { left: 10px; }
.nav-r { right: 10px; }

/* ── SLIDE CARD ── */
.slide-card {
  position: relative; width: 100%; max-width: 940px;
  border: 1px solid var(--brd);
  border-radius: 18px;
  background: rgba(0,0,0,0.44); backdrop-filter: blur(22px);
  box-shadow: 0 0 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 50px var(--acc)0A;
  padding: 30px 34px 26px; overflow: hidden;
}
.slide-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--acc), transparent); opacity: 0.75;
}
.slide-num {
  position: absolute; top: 13px; right: 16px;
  font-family: 'Cormorant Garamond', serif; font-size: 0.7rem;
  letter-spacing: 0.14em; color: var(--acc-l); opacity: 0.55;
  border: 1px solid var(--brd); padding: 2px 8px; border-radius: 4px;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(38px) scale(0.975); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideOut {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to   { opacity: 0; transform: translateX(-28px) scale(0.975); }
}
@keyframes slideInRev {
  from { opacity: 0; transform: translateX(-38px) scale(0.975); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
.anim-in   { animation: slideIn 0.36s cubic-bezier(0.4,0,0.2,1) forwards; }
.anim-out  { animation: slideOut 0.36s cubic-bezier(0.4,0,0.2,1) forwards; }
.anim-rev  { animation: slideInRev 0.36s cubic-bezier(0.4,0,0.2,1) forwards; }

/* ── FOOTER ── */
.bottombar {
  position: relative; z-index: 20;
  display: flex; flex-direction: column; align-items: center; gap: 7px;
  padding: 9px 24px 11px;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.32); backdrop-filter: blur(14px);
  flex-shrink: 0;
}
.agency-label { font-size: 0.65rem; color: rgba(255,255,255,0.32); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
.dots { display: flex; gap: 5px; align-items: center; }
.dot {
  border: none; border-radius: 50%; cursor: pointer;
  transition: all 0.25s ease; padding: 0;
  width: 7px; height: 7px; background: rgba(255,255,255,0.18);
}
.dot.on { width: 20px; border-radius: 4px; }
.dot:hover:not(.on) { background: rgba(255,255,255,0.38) !important; transform: scale(1.2); }
.prog-bar { width: 100%; max-width: 480px; height: 3px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
.prog-fill { height: 100%; border-radius: 2px; transition: width 0.55s cubic-bezier(0.4,0,0.2,1); }

/* ── SLIDE HEADER ── */
.sh { display: flex; align-items: center; gap: 13px; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.sh-title {
  font-family: 'Cormorant Garamond', serif; font-size: 1.32rem; font-weight: 700;
  background: linear-gradient(90deg, white 45%, var(--acc));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.sh-sub { font-size: 0.75rem; color: rgba(255,255,255,0.42); margin-top: 3px; letter-spacing: 0.04em; }

/* ── COVER SLIDE ── */
.cover-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 6px 0 2px; }
.cover-icon { margin-bottom: 16px; filter: drop-shadow(0 0 28px var(--acc)); animation: iconBob 4.2s ease-in-out infinite; }
@keyframes iconBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.cover-year { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.32em; text-transform: uppercase; color: var(--acc-l); border: 1px solid var(--acc); padding: 3px 14px; border-radius: 50px; margin-bottom: 14px; opacity: 0.85; }
.cover-h1 {
  font-family: 'Cormorant Garamond', serif; font-size: 1.85rem; font-weight: 700; line-height: 1.18;
  letter-spacing: 0.04em; margin-bottom: 12px;
  background: linear-gradient(135deg, white 42%, var(--acc));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.cover-line { width: 200px; height: 1px; margin: 0 auto 12px; background: linear-gradient(90deg, transparent, var(--acc), transparent); }
.cover-sub { font-size: 0.88rem; font-weight: 300; letter-spacing: 0.06em; color: var(--acc-l); margin-bottom: 18px; }
.cover-stat-box { display: flex; gap: 28px; }
.cover-stat { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.cover-stat-v { font-family: 'Cormorant Garamond', serif; font-size: 2.1rem; font-weight: 700; line-height: 1; color: var(--acc-l); }
.cover-stat-l { font-size: 0.7rem; color: rgba(255,255,255,0.4); letter-spacing: 0.05em; }

/* ── MISSION GRID ── */
.mgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
.mcard {
  display: flex; gap: 11px; padding: 13px 15px;
  border: 1px solid var(--brd); border-radius: 11px; background: var(--acc-bg);
  animation: cardUp 0.48s ease forwards; opacity: 0;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.mcard:hover { border-color: var(--acc); box-shadow: 0 0 18px var(--acc)1E; }
@keyframes cardUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
.mcard h3 { font-family:'Cormorant Garamond',serif; font-size:0.88rem; font-weight:700; color: var(--acc-l); margin-bottom:5px; line-height:1.3; }
.mcard p  { font-size:0.77rem; color:rgba(255,255,255,0.5); line-height:1.55; }

/* ── STATS GRID ── */
.sgrid { display: grid; grid-template-columns: repeat(4,1fr); gap: 11px; }
.scard {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 16px 10px 13px; border: 1px solid var(--brd); border-radius: 11px; background: var(--acc-bg);
  gap: 5px; animation: cardUp 0.48s ease forwards; opacity: 0;
  transition: transform 0.25s, box-shadow 0.25s;
}
.scard:hover { transform: translateY(-5px); box-shadow: 0 12px 30px var(--acc)1E; }
.scard-val { font-family:'Cormorant Garamond',serif; font-size:1.58rem; font-weight:700; line-height:1; color: var(--acc-l); }
.scard-unit { font-size:0.7rem; font-family:'Jost',sans-serif; opacity:0.65; }
.scard-lbl { font-size:0.7rem; color:rgba(255,255,255,0.48); line-height:1.4; }
.scard-trend { font-size:0.7rem; font-weight:800; letter-spacing:0.04em; }
.scard-desc { font-size:0.68rem; color:rgba(255,255,255,0.32); text-align:center; line-height:1.45; }

/* ── SERVICE GRID ── */
.svgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.svcard {
  display: flex; align-items: center; gap: 11px;
  padding: 11px 13px; border: 1px solid var(--brd); border-radius: 10px; background: var(--acc-bg);
  animation: cardUp 0.44s ease forwards; opacity: 0; transition: all 0.25s ease;
}
.svcard:hover { border-color: var(--acc); transform: translateX(4px); box-shadow: 0 0 16px var(--acc)18; }
.svcard-name { font-size:0.8rem; color:rgba(255,255,255,0.84); font-weight:600; line-height:1.35; }
.svcard-tag {
  display:inline-block; font-size:0.65rem; font-weight:800; letter-spacing:0.06em;
  padding:2px 8px; border-radius:50px; margin-top:3px;
  background: var(--acc-bg); color: var(--acc-l); border: 1px solid var(--brd);
}

/* ── DIGITAL GRID ── */
.dgrid { display: grid; grid-template-columns: repeat(4,1fr); gap: 11px; }
.dcard {
  display:flex; flex-direction:column; gap:5px;
  padding:15px 12px 12px; border:1px solid var(--brd); border-radius:11px; background: var(--acc-bg);
  animation: cardUp 0.48s ease forwards; opacity:0; transition: all 0.25s ease;
}
.dcard:hover { border-color:var(--acc); box-shadow:0 8px 26px var(--acc)18; transform:translateY(-3px); }
.dcard-metric { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:700; line-height:1; color: var(--acc-l); }
.dcard-mlbl { font-size:0.62rem; font-family:'Jost',sans-serif; font-weight:700; opacity:0.58; letter-spacing:0.1em; text-transform:uppercase; }
.dcard h3 { font-size:0.84rem; font-weight:700; color:white; line-height:1.3; }
.dcard p  { font-size:0.74rem; color:rgba(255,255,255,0.48); line-height:1.5; }

/* ── STRUCTURE LIST ── */
.strlist { display:flex; flex-direction:column; gap:9px; }
.stritem {
  display:flex; align-items:center; gap:13px;
  padding:13px 16px; border:1px solid var(--brd); border-radius:11px; background: var(--acc-bg);
  animation: cardUp 0.48s ease forwards; opacity:0; transition: all 0.25s ease;
}
.stritem:hover { border-color:var(--acc); transform:translateX(5px); box-shadow:0 0 20px var(--acc)18; }
.str-num {
  font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:700;
  width:34px; height:34px; display:flex; align-items:center; justify-content:center;
  border-radius:8px; border:1px solid var(--brd); color: var(--acc-l); flex-shrink:0;
}
.str-info { flex:1; }
.str-info h3 { font-size:0.88rem; font-weight:700; color:white; margin-bottom:2px; }
.str-info p  { font-size:0.73rem; color:rgba(255,255,255,0.48); }
.str-count { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color: var(--acc-l); white-space:nowrap; }

/* ── REFORMS LIST ── */
.rflist { display:flex; flex-direction:column; gap:10px; }
.rfitem {
  display:flex; align-items:center; gap:11px;
  padding:13px 15px; border:1px solid var(--brd); border-radius:11px;
  animation: cardUp 0.48s ease forwards; opacity:0; transition: all 0.25s ease;
}
.rfitem:hover { border-color:var(--acc); box-shadow:0 0 16px var(--acc)18; }
.rf-yr { font-size:0.68rem; font-weight:800; letter-spacing:0.08em; padding:3px 9px; border-radius:6px; background: var(--acc-bg); color: var(--acc-l); border:1px solid var(--brd); white-space:nowrap; flex-shrink:0; }
.rf-body { flex:1; display:flex; flex-direction:column; gap:5px; }
.rf-row  { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.rf-row span:first-child { font-size:0.83rem; font-weight:700; color:white; }
.rf-status { font-size:0.68rem; font-weight:700; letter-spacing:0.04em; white-space:nowrap; }
.rf-pct { font-size:0.72rem; color: var(--acc-l); margin-top:2px; }
.prog-sm { width:100%; height:7px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden; }
.prog-sm-fill { height:100%; border-radius:4px; transition:width 1.3s cubic-bezier(0.4,0,0.2,1); }

/* ── ACHIEVEMENTS GRID ── */
.achgrid { display:grid; grid-template-columns: repeat(3,1fr); gap:10px; }
.achcard {
  display:flex; flex-direction:column; gap:6px;
  padding:13px 12px; border:1px solid var(--brd); border-radius:11px; background: var(--acc-bg);
  animation: cardUp 0.44s ease forwards; opacity:0; transition: all 0.25s ease;
}
.achcard:hover { border-color:var(--acc); transform:translateY(-3px); box-shadow:0 8px 24px var(--acc)18; }
.ach-badge { display:inline-block; font-size:0.62rem; font-weight:800; letter-spacing:0.07em; padding:2px 8px; border-radius:50px; background: var(--acc-bg); color: var(--acc-l); border:1px solid var(--brd); width:fit-content; }
.achcard h4 { font-size:0.82rem; font-weight:700; color:white; line-height:1.3; }
.achcard p  { font-size:0.73rem; color:rgba(255,255,255,0.48); line-height:1.48; }
.ach-yr { font-size:0.68rem; color:rgba(255,255,255,0.3); margin-top:auto; }

/* ── CONTACT GRID ── */
.ctgrid { display:grid; grid-template-columns: repeat(4,1fr); gap:11px; margin-bottom:16px; }
.ctcard {
  display:flex; flex-direction:column; align-items:center; text-align:center;
  padding:16px 12px; border:1px solid var(--brd); border-radius:11px; background: var(--acc-bg);
  gap:6px; animation: cardUp 0.44s ease forwards; opacity:0; transition: all 0.25s ease;
}
.ctcard:hover { border-color:var(--acc); transform:translateY(-4px); box-shadow:0 10px 26px var(--acc)18; }
.ct-lbl { font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.4); }
.ct-val { font-size:0.8rem; font-weight:700; color: var(--acc-l); word-break:break-all; text-align:center; }
.ct-footer { display:flex; align-items:center; gap:13px; padding:13px 16px; border:1px solid var(--brd); border-radius:11px; background:rgba(255,255,255,0.03); }
.ct-org { font-size:0.88rem; font-weight:700; color:white; }
.ct-sub { font-size:0.75rem; color: var(--acc-l); margin-top:3px; }

/* ══════════════════════════════════════════════════
   AUTHOR PAGE STYLES
══════════════════════════════════════════════════ */
.author-page {
  width:100%; display:flex; flex-direction:column; gap:18px;
}
.author-header {
  text-align:center; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.08);
}
.author-title {
  font-family:'Cormorant Garamond',serif; font-size:1.55rem; font-weight:700; letter-spacing:0.08em;
  background: linear-gradient(135deg, white 40%, #a78bfa);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  margin-bottom:6px;
}
.author-subtitle { font-size:0.78rem; color:rgba(255,255,255,0.42); letter-spacing:0.06em; }
.author-cards { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.author-card {
  display:flex; flex-direction:column; gap:0;
  border-radius:15px; overflow:hidden;
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(0,0,0,0.3);
  animation: cardUp 0.5s ease forwards; opacity:0;
  transition: box-shadow 0.3s, transform 0.3s;
}
.author-card:hover { transform:translateY(-4px); }
.author-card:nth-child(1) { animation-delay:0.1s; }
.author-card:nth-child(2) { animation-delay:0.22s; }
.author-card-top {
  padding:22px 22px 18px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:10px;
}
.author-avatar {
  width:76px; height:76px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700;
  color:white; flex-shrink:0;
  box-shadow:0 0 30px currentColor;
}
.author-num { font-size:0.65rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; opacity:0.6; }
.author-fullname { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:white; line-height:1.25; }
.author-role-badge {
  display:inline-block; font-size:0.66rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;
  padding:3px 12px; border-radius:50px; border:1px solid; margin-top:2px;
}
.author-about { font-size:0.77rem; color:rgba(255,255,255,0.52); line-height:1.58; text-align:center; }
.author-card-bottom {
  padding:14px 20px 18px;
  border-top:1px solid rgba(255,255,255,0.07);
  background:rgba(255,255,255,0.03);
  display:flex; flex-direction:column; gap:10px;
}
.author-info-row { display:flex; flex-direction:column; gap:7px; }
.author-info-item { display:flex; align-items:flex-start; gap:9px; }
.author-info-icon { font-size:0.85rem; flex-shrink:0; margin-top:1px; opacity:0.7; }
.author-info-content { display:flex; flex-direction:column; gap:1px; }
.author-info-label { font-size:0.62rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.36); }
.author-info-value { font-size:0.82rem; font-weight:600; color:rgba(255,255,255,0.88); }
.author-achievements { display:flex; flex-direction:column; gap:5px; }
.author-ach-title { font-size:0.65rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.36); margin-bottom:2px; }
.author-ach-item { display:flex; align-items:center; gap:6px; font-size:0.76rem; color:rgba(255,255,255,0.62); }
.author-ach-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.author-project-info {
  display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:4px;
}
.api-card {
  display:flex; flex-direction:column; align-items:center; text-align:center; gap:4px;
  padding:10px 8px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);
  background:rgba(255,255,255,0.04);
}
.api-label { font-size:0.6rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.35); }
.api-value { font-size:0.82rem; font-weight:700; color:white; }

/* ── RESPONSIVE ── */
@media (max-width:768px) {
  .topbar { flex-wrap:wrap; padding:9px 14px; }
  .agency-tabs { order:2; width:100%; }
  .slide-area { padding:10px 44px; }
  .slide-card { padding:18px 16px 16px; }
  .mgrid,.svgrid { grid-template-columns:1fr; }
  .sgrid,.dgrid { grid-template-columns:1fr 1fr; }
  .ctgrid { grid-template-columns:1fr 1fr; }
  .achgrid { grid-template-columns:1fr 1fr; }
  .author-cards { grid-template-columns:1fr; }
  .author-project-info { grid-template-columns:1fr 1fr; }
}
@media (max-width:480px) {
  .cover-h1 { font-size:1.25rem; }
  .sgrid { grid-template-columns:1fr 1fr; }
  .nav-btn { width:36px; height:36px; font-size:1.4rem; }
}
`;

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 2 — 3D SVG ICON LIBRARY
// ───────────────────────────────────────────────────────────────────────────────

const Icon3D = ({ type, size = 80, color = "#C8992A" }) => {
  const c = color;
  const uid = `${type}_${size}_${c.replace("#","")}`;

  const defs_balance = (
    <defs>
      <linearGradient id={`bla${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c} stopOpacity="1" /><stop offset="100%" stopColor={c} stopOpacity="0.45" />
      </linearGradient>
      <filter id={`blf${uid}`}><feDropShadow dx="0" dy="5" stdDeviation="6" floodColor={c} floodOpacity="0.5" /></filter>
    </defs>
  );
  const defs_doc = (
    <defs>
      <linearGradient id={`dca${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c} stopOpacity="0.95" /><stop offset="100%" stopColor={c} stopOpacity="0.48" />
      </linearGradient>
      <filter id={`dcf${uid}`}><feDropShadow dx="2" dy="6" stdDeviation="6" floodColor={c} floodOpacity="0.42" /></filter>
    </defs>
  );
  const defs_chart = (
    <defs>
      <linearGradient id={`cha${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c} stopOpacity="1" /><stop offset="100%" stopColor={c} stopOpacity="0.38" />
      </linearGradient>
      <filter id={`chf${uid}`}><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={c} floodOpacity="0.45" /></filter>
    </defs>
  );
  const defs_gen = (
    <defs>
      <linearGradient id={`gna${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c} stopOpacity="0.95" /><stop offset="100%" stopColor={c} stopOpacity="0.42" />
      </linearGradient>
      <filter id={`gnf${uid}`}><feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={c} floodOpacity="0.48" /></filter>
    </defs>
  );

  const shapes = {
    balance: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_balance}
        <g filter={`url(#blf${uid})`}>
          <rect x="47" y="14" width="6" height="58" rx="3" fill={`url(#bla${uid})`} />
          <rect x="20" y="17" width="60" height="5" rx="2.5" fill={`url(#bla${uid})`} />
          <ellipse cx="30" cy="40" rx="17" ry="12" fill={c} opacity="0.88" />
          <path d="M13 40 Q30 28 47 40 Q30 52 13 40Z" fill={c} opacity="0.22" />
          <ellipse cx="70" cy="52" rx="17" ry="12" fill={c} opacity="0.88" />
          <path d="M53 52 Q70 40 87 52 Q70 64 53 52Z" fill={c} opacity="0.22" />
          <ellipse cx="50" cy="76" rx="19" ry="6" fill={c} opacity="0.18" />
          <rect x="47" y="70" width="6" height="7" rx="2" fill={`url(#bla${uid})`} />
          <line x1="30" y1="17" x2="30" y2="28" stroke={c} strokeWidth="1.5" opacity="0.7" />
          <line x1="70" y1="17" x2="70" y2="40" stroke={c} strokeWidth="1.5" opacity="0.7" />
        </g>
      </svg>
    ),
    document: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_doc}
        <g filter={`url(#dcf${uid})`}>
          <rect x="18" y="10" width="54" height="74" rx="4" fill={`url(#dca${uid})`} />
          <path d="M72 10 L84 22 L84 84 L72 84 Z" fill={c} opacity="0.22" />
          <path d="M72 10 L84 22 L72 22 Z" fill={c} opacity="0.55" />
          <rect x="28" y="26" width="36" height="3" rx="1.5" fill="white" opacity="0.68" />
          <rect x="28" y="36" width="30" height="3" rx="1.5" fill="white" opacity="0.58" />
          <rect x="28" y="46" width="34" height="3" rx="1.5" fill="white" opacity="0.48" />
          <rect x="28" y="56" width="26" height="3" rx="1.5" fill="white" opacity="0.42" />
          <rect x="28" y="66" width="32" height="3" rx="1.5" fill="white" opacity="0.35" />
          <rect x="28" y="76" width="20" height="3" rx="1.5" fill="white" opacity="0.28" />
        </g>
      </svg>
    ),
    chart: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_chart}
        <g filter={`url(#chf${uid})`}>
          <rect x="8" y="82" width="84" height="4" rx="2" fill={c} opacity="0.32" />
          <rect x="14" y="52" width="16" height="30" rx="2" fill={`url(#cha${uid})`} />
          <path d="M14 52 L22 46 L30 52 L30 82 L14 82 Z" fill={c} opacity="0.16" />
          <rect x="36" y="34" width="16" height="48" rx="2" fill={`url(#cha${uid})`} />
          <path d="M36 34 L44 28 L52 34 L52 82 L36 82 Z" fill={c} opacity="0.16" />
          <rect x="58" y="18" width="16" height="64" rx="2" fill={`url(#cha${uid})`} />
          <path d="M58 18 L66 12 L74 18 L74 82 L58 82 Z" fill={c} opacity="0.16" />
          <polyline points="22,52 44,34 66,18" stroke={c} strokeWidth="2.5" strokeDasharray="4,2" opacity="0.85" />
          <circle cx="22" cy="52" r="3.5" fill={c} /><circle cx="22" cy="52" r="1.5" fill="white" opacity="0.85" />
          <circle cx="44" cy="34" r="3.5" fill={c} /><circle cx="44" cy="34" r="1.5" fill="white" opacity="0.85" />
          <circle cx="66" cy="18" r="3.5" fill={c} /><circle cx="66" cy="18" r="1.5" fill="white" opacity="0.85" />
        </g>
      </svg>
    ),
    digital: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="12" y="18" width="76" height="54" rx="5" fill={`url(#gna${uid})`} />
          <rect x="18" y="24" width="64" height="42" rx="3" fill="black" opacity="0.5" />
          <rect x="38" y="74" width="24" height="7" rx="2" fill={c} opacity="0.55" />
          <rect x="28" y="81" width="44" height="3.5" rx="1.75" fill={c} opacity="0.35" />
          <circle cx="36" cy="44" r="9" fill={c} opacity="0.68" />
          <circle cx="36" cy="44" r="5" fill="white" opacity="0.78" />
          <rect x="50" y="36" width="24" height="3" rx="1.5" fill={c} opacity="0.68" />
          <rect x="50" y="43" width="20" height="3" rx="1.5" fill={c} opacity="0.52" />
          <rect x="50" y="50" width="16" height="3" rx="1.5" fill={c} opacity="0.4" />
          <rect x="50" y="57" width="18" height="3" rx="1.5" fill={c} opacity="0.32" />
        </g>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <path d="M50 8 L84 23 L84 54 Q84 76 50 92 Q16 76 16 54 L16 23 Z" fill={`url(#gna${uid})`} />
          <path d="M50 8 L84 23 L84 54 Q84 76 50 92 L50 8Z" fill={c} opacity="0.12" />
          <path d="M34 50 L45 61 L68 38" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
        </g>
      </svg>
    ),
    book: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="12" y="14" width="38" height="72" rx="3" fill={`url(#gna${uid})`} />
          <rect x="50" y="14" width="38" height="72" rx="3" fill={c} opacity="0.62" />
          <rect x="46" y="12" width="8" height="76" rx="3" fill={c} opacity="0.92" />
          <rect x="20" y="28" width="22" height="2.5" rx="1.25" fill="white" opacity="0.72" />
          <rect x="20" y="36" width="18" height="2.5" rx="1.25" fill="white" opacity="0.62" />
          <rect x="20" y="44" width="20" height="2.5" rx="1.25" fill="white" opacity="0.52" />
          <rect x="20" y="52" width="16" height="2.5" rx="1.25" fill="white" opacity="0.45" />
          <rect x="20" y="60" width="22" height="2.5" rx="1.25" fill="white" opacity="0.4" />
          <rect x="20" y="68" width="14" height="2.5" rx="1.25" fill="white" opacity="0.35" />
          <rect x="58" y="28" width="22" height="2.5" rx="1.25" fill="white" opacity="0.72" />
          <rect x="58" y="36" width="18" height="2.5" rx="1.25" fill="white" opacity="0.62" />
          <rect x="58" y="44" width="20" height="2.5" rx="1.25" fill="white" opacity="0.52" />
          <rect x="58" y="52" width="16" height="2.5" rx="1.25" fill="white" opacity="0.45" />
          <rect x="58" y="60" width="22" height="2.5" rx="1.25" fill="white" opacity="0.4" />
          <rect x="58" y="68" width="14" height="2.5" rx="1.25" fill="white" opacity="0.35" />
        </g>
      </svg>
    ),
    graduation: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <polygon points="50,10 90,32 50,44 10,32" fill={`url(#gna${uid})`} />
          <polygon points="50,10 90,32 90,35 50,47 10,35 10,32" fill={c} opacity="0.25" />
          <path d="M70 38 L70 62 Q70 76 50 80 Q30 76 30 62 L30 38 L50 44 Z" fill={`url(#gna${uid})`} opacity="0.88" />
          <path d="M30 38 L50 44 L50 80 Q30 76 30 62 Z" fill={c} opacity="0.12" />
          <rect x="84" y="32" width="5" height="26" rx="2.5" fill={c} opacity="0.72" />
          <ellipse cx="86.5" cy="60" rx="6" ry="4" fill={c} opacity="0.55" />
        </g>
      </svg>
    ),
    building: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <polygon points="42,12 16,28 16,88 68,88 68,28" fill={`url(#gna${uid})`} />
          <polygon points="68,28 82,36 82,88 68,88" fill={c} opacity="0.25" />
          <rect x="22" y="36" width="10" height="10" rx="1.5" fill="white" opacity="0.52" />
          <rect x="38" y="36" width="10" height="10" rx="1.5" fill="white" opacity="0.52" />
          <rect x="54" y="36" width="10" height="10" rx="1.5" fill="white" opacity="0.42" />
          <rect x="22" y="52" width="10" height="10" rx="1.5" fill="white" opacity="0.52" />
          <rect x="38" y="52" width="10" height="10" rx="1.5" fill="white" opacity="0.52" />
          <rect x="54" y="52" width="10" height="10" rx="1.5" fill="white" opacity="0.42" />
          <rect x="36" y="68" width="16" height="20" rx="2" fill="white" opacity="0.62" />
        </g>
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <polygon points="50,8 62,36 94,36 68,56 78,84 50,64 22,84 32,56 6,36 38,36" fill={`url(#gna${uid})`} />
          <polygon points="50,8 62,36 94,36 68,56 78,84 50,64 50,8" fill={c} opacity="0.12" />
        </g>
      </svg>
    ),
    youth: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <circle cx="50" cy="26" r="14" fill={`url(#gna${uid})`} />
          <path d="M22 84 Q22 58 50 58 Q78 58 78 84 Z" fill={`url(#gna${uid})`} opacity="0.88" />
          <path d="M50 58 Q78 58 78 84 L50 84 Z" fill={c} opacity="0.12" />
          <path d="M28 60 Q16 50 14 68" stroke={c} strokeWidth="3.5" strokeLinecap="round" opacity="0.62" />
          <path d="M72 60 Q84 50 86 68" stroke={c} strokeWidth="3.5" strokeLinecap="round" opacity="0.62" />
          <circle cx="28" cy="72" r="8" fill={c} opacity="0.52" />
          <circle cx="72" cy="72" r="8" fill={c} opacity="0.52" />
        </g>
      </svg>
    ),
    rocket: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <path d="M50 6 Q70 18 70 50 L70 74 Q50 82 30 74 L30 50 Q30 18 50 6Z" fill={`url(#gna${uid})`} />
          <path d="M50 6 Q70 18 70 50 L70 74 Q50 82 50 74 L50 6Z" fill={c} opacity="0.12" />
          <circle cx="50" cy="38" r="11" fill="white" opacity="0.18" />
          <circle cx="50" cy="38" r="6" fill={c} opacity="0.82" />
          <circle cx="50" cy="38" r="2.5" fill="white" opacity="0.82" />
          <path d="M30 64 L14 74 L14 83 L30 78 Z" fill={c} opacity="0.62" />
          <path d="M70 64 L86 74 L86 83 L70 78 Z" fill={c} opacity="0.62" />
          <ellipse cx="50" cy="80" rx="12" ry="6" fill={c} opacity="0.72" />
          <ellipse cx="50" cy="86" rx="8" ry="4" fill="#ff8800" opacity="0.65" />
          <ellipse cx="50" cy="90" rx="5" ry="3" fill="#ffcc00" opacity="0.55" />
        </g>
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <circle cx="50" cy="50" r="38" fill={`url(#gna${uid})`} />
          <ellipse cx="50" cy="50" rx="20" ry="38" fill="none" stroke="white" strokeWidth="1.5" opacity="0.28" />
          <ellipse cx="50" cy="50" rx="38" ry="15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.28" />
          <ellipse cx="50" cy="50" rx="38" ry="27" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="white" strokeWidth="1.5" opacity="0.28" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="white" strokeWidth="1.5" opacity="0.28" />
        </g>
      </svg>
    ),
    network: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <line x1="50" y1="16" x2="18" y2="50" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="50" y1="16" x2="82" y2="50" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="50" y1="16" x2="50" y2="72" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="18" y1="50" x2="50" y2="72" stroke={c} strokeWidth="2" opacity="0.42" />
          <line x1="82" y1="50" x2="50" y2="72" stroke={c} strokeWidth="2" opacity="0.42" />
          <line x1="18" y1="50" x2="82" y2="50" stroke={c} strokeWidth="2" opacity="0.35" />
          <circle cx="50" cy="16" r="9" fill={c} opacity="0.92" /><circle cx="50" cy="16" r="4.5" fill="white" opacity="0.6" />
          <circle cx="18" cy="50" r="8" fill={c} opacity="0.82" /><circle cx="18" cy="50" r="3.5" fill="white" opacity="0.5" />
          <circle cx="82" cy="50" r="8" fill={c} opacity="0.82" /><circle cx="82" cy="50" r="3.5" fill="white" opacity="0.5" />
          <circle cx="50" cy="72" r="9" fill={c} opacity="0.88" /><circle cx="50" cy="72" r="4.5" fill="white" opacity="0.55" />
        </g>
      </svg>
    ),
    innovation: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <path d="M50 8 Q74 16 74 42 Q74 58 63 65 L63 76 L37 76 L37 65 Q26 58 26 42 Q26 16 50 8Z" fill={`url(#gna${uid})`} />
          <path d="M50 8 Q74 16 74 42 Q74 58 63 65 L63 76 L50 76 L50 8Z" fill={c} opacity="0.12" />
          <rect x="37" y="76" width="26" height="7" rx="3" fill={c} opacity="0.72" />
          <rect x="39" y="83" width="22" height="7" rx="3" fill={c} opacity="0.62" />
          <line x1="50" y1="26" x2="50" y2="58" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.82" />
          <line x1="37" y1="42" x2="63" y2="42" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.82" />
        </g>
      </svg>
    ),
    flag: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="18" y="12" width="5" height="78" rx="2.5" fill={c} opacity="0.72" />
          <path d="M23 14 Q62 8 76 24 Q62 40 23 38 Z" fill={`url(#gna${uid})`} />
          <path d="M23 42 Q62 36 76 52 Q62 68 23 66 Z" fill={c} opacity="0.72" />
          <circle cx="46" cy="26" r="5" fill="white" opacity="0.35" />
          <circle cx="46" cy="54" r="5" fill="white" opacity="0.28" />
        </g>
      </svg>
    ),
    group: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <circle cx="50" cy="24" r="11" fill={`url(#gna${uid})`} />
          <path d="M30 72 Q30 54 50 54 Q70 54 70 72 Z" fill={`url(#gna${uid})`} opacity="0.9" />
          <circle cx="22" cy="32" r="8" fill={c} opacity="0.72" />
          <path d="M8 68 Q8 52 22 52 Q36 52 36 68 Z" fill={c} opacity="0.55" />
          <circle cx="78" cy="32" r="8" fill={c} opacity="0.72" />
          <path d="M64 68 Q64 52 78 52 Q92 52 92 68 Z" fill={c} opacity="0.55" />
        </g>
      </svg>
    ),
    award: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <circle cx="50" cy="40" r="26" fill={`url(#gna${uid})`} />
          <circle cx="50" cy="40" r="20" fill={c} opacity="0.15" />
          <circle cx="50" cy="40" r="13" fill={c} opacity="0.3" />
          <polygon points="50,30 53,38 62,38 55,43 57,52 50,47 43,52 45,43 38,38 47,38" fill="white" opacity="0.75" />
          <path d="M38 62 L28 86 L40 80 L50 90 L50 68" fill={c} opacity="0.62" />
          <path d="M62 62 L72 86 L60 80 L50 90 L50 68" fill={c} opacity="0.52" />
        </g>
      </svg>
    ),
    money: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="10" y="30" width="76" height="48" rx="5" fill={`url(#gna${uid})`} />
          <rect x="16" y="22" width="76" height="48" rx="5" fill={c} opacity="0.42" />
          <rect x="22" y="14" width="76" height="48" rx="5" fill={c} opacity="0.25" />
          <rect x="10" y="30" width="76" height="48" rx="5" fill="black" opacity="0.28" />
          <circle cx="48" cy="54" r="14" fill={c} opacity="0.72" />
          <circle cx="48" cy="54" r="10" fill={c} opacity="0.38" />
          <text x="43" y="60" fontSize="14" fontWeight="bold" fill="white" opacity="0.9">$</text>
          <rect x="18" y="42" width="10" height="6" rx="1.5" fill="white" opacity="0.4" />
          <rect x="72" y="56" width="10" height="6" rx="1.5" fill="white" opacity="0.4" />
        </g>
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <circle cx="50" cy="50" r="38" fill={`url(#gna${uid})`} />
          <circle cx="50" cy="50" r="32" fill="black" opacity="0.4" />
          <line x1="50" y1="28" x2="50" y2="20" stroke={c} strokeWidth="2.5" opacity="0.62" />
          <line x1="50" y1="80" x2="50" y2="72" stroke={c} strokeWidth="2.5" opacity="0.62" />
          <line x1="20" y1="50" x2="28" y2="50" stroke={c} strokeWidth="2.5" opacity="0.62" />
          <line x1="80" y1="50" x2="72" y2="50" stroke={c} strokeWidth="2.5" opacity="0.62" />
          <line x1="50" y1="50" x2="50" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.88" />
          <line x1="50" y1="50" x2="64" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.88" />
          <circle cx="50" cy="50" r="4" fill={c} />
          <circle cx="50" cy="50" r="2" fill="white" opacity="0.92" />
        </g>
      </svg>
    ),
    phone: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="28" y="8" width="44" height="84" rx="8" fill={`url(#gna${uid})`} />
          <path d="M72 8 L80 14 L80 92 L72 92 Z" fill={c} opacity="0.22" />
          <rect x="34" y="20" width="32" height="52" rx="3" fill="black" opacity="0.48" />
          <circle cx="50" cy="82" r="5" fill={c} opacity="0.62" />
          <circle cx="50" cy="82" r="2.5" fill="white" opacity="0.72" />
          <rect x="42" y="12" width="16" height="3" rx="1.5" fill={c} opacity="0.55" />
        </g>
      </svg>
    ),
    location: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <path d="M50 8 Q72 8 72 34 Q72 52 50 80 Q28 52 28 34 Q28 8 50 8Z" fill={`url(#gna${uid})`} />
          <path d="M50 8 Q72 8 72 34 Q72 52 50 80 L50 8Z" fill={c} opacity="0.12" />
          <circle cx="50" cy="34" r="13" fill="black" opacity="0.38" />
          <circle cx="50" cy="34" r="8" fill="white" opacity="0.62" />
          <ellipse cx="50" cy="82" rx="16" ry="5" fill={c} opacity="0.22" />
        </g>
      </svg>
    ),
    email: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="10" y="24" width="80" height="52" rx="5" fill={`url(#gna${uid})`} />
          <path d="M10 29 L50 56 L90 29" stroke="white" strokeWidth="2.5" fill="none" opacity="0.72" />
          <line x1="10" y1="76" x2="38" y2="52" stroke="white" strokeWidth="1.5" opacity="0.38" />
          <line x1="90" y1="76" x2="62" y2="52" stroke="white" strokeWidth="1.5" opacity="0.38" />
        </g>
      </svg>
    ),
    target: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <circle cx="50" cy="50" r="38" fill={c} opacity="0.18" />
          <circle cx="50" cy="50" r="28" fill={c} opacity="0.28" />
          <circle cx="50" cy="50" r="18" fill={c} opacity="0.52" />
          <circle cx="50" cy="50" r="9" fill={c} opacity="0.92" />
          <line x1="50" y1="12" x2="50" y2="88" stroke={c} strokeWidth="2" opacity="0.35" />
          <line x1="12" y1="50" x2="88" y2="50" stroke={c} strokeWidth="2" opacity="0.35" />
          <circle cx="50" cy="50" r="3" fill="white" opacity="0.92" />
        </g>
      </svg>
    ),
    laptop: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <rect x="16" y="20" width="68" height="46" rx="4" fill={`url(#gna${uid})`} />
          <rect x="22" y="26" width="56" height="34" rx="2" fill="black" opacity="0.52" />
          <rect x="8" y="66" width="84" height="8" rx="3" fill={c} opacity="0.72" />
          <rect x="36" y="74" width="28" height="4" rx="2" fill={c} opacity="0.42" />
          <circle cx="50" cy="43" r="6" fill={c} opacity="0.72" />
          <circle cx="50" cy="43" r="3" fill="white" opacity="0.65" />
          <rect x="30" y="32" width="10" height="2.5" rx="1.25" fill={c} opacity="0.45" />
          <rect x="60" y="32" width="10" height="2.5" rx="1.25" fill={c} opacity="0.45" />
        </g>
      </svg>
    ),
    pen: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {defs_gen}
        <g filter={`url(#gnf${uid})`}>
          <path d="M68 12 L88 32 L36 84 L16 84 L16 64 Z" fill={`url(#gna${uid})`} />
          <path d="M68 12 L88 32 L80 40 L60 20 Z" fill={c} opacity="0.55" />
          <path d="M68 12 L88 32 L80 40 L60 20 Z" fill={c} opacity="0.25" />
          <path d="M16 84 L16 64 L36 84 Z" fill={c} opacity="0.62" />
          <line x1="60" y1="20" x2="36" y2="44" stroke="white" strokeWidth="2" opacity="0.4" />
          <line x1="68" y1="28" x2="44" y2="52" stroke="white" strokeWidth="2" opacity="0.3" />
        </g>
      </svg>
    ),
  };

  return shapes[type] || shapes["document"];
};

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 3 — PROGRESS BAR
// ───────────────────────────────────────────────────────────────────────────────

const ProgressBar = ({ pct, accent }) => {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 250); return () => clearTimeout(t); }, [pct]);
  return (
    <div className="prog-sm">
      <div className="prog-sm-fill" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${accent}99, ${accent})`, boxShadow: `0 0 10px ${accent}66` }} />
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 4 — AUTHORS DATA  (← bu yerga o'z ma'lumotlarini yozing)
// ───────────────────────────────────────────────────────────────────────────────

const AUTHORS_DATA = [
  {
    id: 1,
    firstName:  "Afruz",           // ← o'zgartiring
    lastName:   "Baxtiyorov",      // ← o'zgartiring
    // middleName: "Otasining ismi",// ← o'zgartiring
    grade:      "11B - sinf",     // ← o'zgartiring, masalan: "9 - A sinf"
    school:     "12 - maktab",   // ← o'zgartiring, masalan: "14 - maktab"
    city:       "Chirchiq Shahar Maktabgacha va Maktab bolimiga qarashli",  // ← o'zgartiring
    role:       "Loyiha rahbari",
    color:      "#C8992A",
    colorDark:  "#8A6510",
    initials:   "IF",            // ← ism va familiyaning birinchi harflari
    about:      "Bu yerga o'quvchi haqida qisqacha ma'lumot yozing — qiziqishlari, yutuqlari va kelajakdagi maqsadlari.",
    achievements: [
      // "Matematika olimpiadasi — g'olib",
      // "Dasturlash kursi — sertifikat",
      // "Maktab kengashi a'zosi",
    ],
    // subjects:   "Matematika, Informatika",
    // hobby:      "Dasturlash, Robotexnika",
  },
  {
    id: 2,
    firstName:  "Behruz",           // ← o'zgartiring
    lastName:   "Ahmedov",      // ← o'zgartiring
    // middleName: "Otasining ismi",// ← o'zgartiring
    grade:      "11B - sinf",     // ← o'zgartiring
    school:     "12 - maktab",   // ← o'zgartiring
    city:       "Chirchiq Shahar Maktabgacha va Maktab bolimiga qarashli",  // ← o'zgartiring
    role:       "Loyiha ishtirokchisi",
    color:      "#1A7DC8",
    colorDark:  "#0F5A92",
    initials:   "IF",            // ← o'zgartiring
    about:      "Bu yerga ikkinchi o'quvchi haqida qisqacha ma'lumot yozing — qiziqishlari, yutuqlari va kelajakdagi maqsadlari.",
    achievements: [
      // "Ingliz tili — xalqaro sertifikat",
      // "Maktab gazetasi muharriri",
      // "Sport musobaqasi — 2-o'rin",
    ],
    // subjects:   "Ingliz tili, Tarix",
    // hobby:      "Jurnalistika, Sport",
  },
];

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 5 — FULL AGENCY DATA  (3 tashkilot, har biri 9 ta slayd)
// ───────────────────────────────────────────────────────────────────────────────

const AGENCIES = [
  // ════════════════════════════════════════════════════
  //  1 — SOLIQ XIZMATI
  // ════════════════════════════════════════════════════
  {
    id: "soliq",
    shortName: "SOLIQ XIZMATI",
    fullName: "O'zbekiston Respublikasi Soliq Xizmati",
    subtitle: "Davlat Soliq Qo'mitasi",
    accent: "#C8992A", accentLight: "#E8C060", accentDark: "#8A6510",
    bgFrom: "#080F1E", bgTo: "#0C1D3A",
    emblemIcon: "balance",
    heroStat: "142.3 trln so'm", heroLabel: "2024-yil yig'ilgan soliqlar",
    slides: [
      {
        type: "cover", title: "O'ZBEKISTON RESPUBLIKASI\nSOLIQ XIZMATI",
        subtitle: "Davlat byudjetini mustahkamlash yo'lida — 2024",
        year: "2024", iconType: "balance",
        extraStats: [
          { v: "142.3 trln", l: "Yig'ilgan soliqlar" },
          { v: "2.4 mln", l: "Soliq to'lovchilar" },
          { v: "94%", l: "Elektron xizmatlar" },
        ],
      },
      {
        type: "mission", title: "Missiya va Strategik Vazifalar", iconType: "flag",
        intro: "Soliq xizmatining asosiy maqsadi — davlat byudjetini mustahkamlash, adolatli soliq muhitini ta'minlash va fuqarolarga sifatli xizmat ko'rsatish.",
        points: [
          { icon: "document", title: "Soliq ma'muriyatchiligini takomillashtirish", desc: "Soliqlarni undirish, hisob-kitob qilish va nazorat qilish tizimini modernizatsiya qilish orqali davlat byudjetini mustahkamlash va soliq bazasini kengaytirish." },
          { icon: "shield",   title: "Soliq to'lovchilar bilan samarali hamkorlik", desc: "Fuqarolar va tadbirkorlar uchun qulay, shaffof xizmatlar ko'rsatish, tushuntirish va konsultatsiya berish tizimini rivojlantirish hamda o'zaro ishonchni mustahkamlash." },
          { icon: "chart",    title: "Shaffoflik va jamoatchilik hisobdorligi", desc: "Byudjet daromadlari haqida ochiq va aniq ma'lumot berish, jamoatchilik nazoratini kuchaytirish va hisobot tizimini xalqaro standartlarga moslashtirish." },
          { icon: "digital",  title: "Keng qamrovli raqamlashtirish strategiyasi", desc: "Elektron xizmatlar, zamonaviy onlayn platform va mobil ilovalar orqali soliq to'lash imkoniyatlarini kengaytirish, ma'muriy yukni minimumga tushirish." },
        ],
      },
      {
        type: "stats", title: "2024-yil Asosiy Ko'rsatkichlari", iconType: "chart",
        subtitle: "Oldingi yilga nisbatan o'sish dinamikasi",
        stats: [
          { value: "142.3", unit: "trln so'm", label: "Yig'ilgan soliqlar", trend: "+18.4%", iconType: "money", desc: "Davlat byudjeti daromadlari tarixiy rekord darajaga yetdi" },
          { value: "2.4",   unit: "mln",        label: "Faol soliq to'lovchilar", trend: "+12%", iconType: "group", desc: "Jismoniy va yuridik shaxslar birgalikda" },
          { value: "94.2",  unit: "%",           label: "Elektron xizmatlar ulushi", trend: "+7%", iconType: "digital", desc: "Barcha operatsiyalarning 94.2 foizi onlayn amalga oshirildi" },
          { value: "48",    unit: "soat",        label: "Murojaatga javob vaqti", trend: "−60%", iconType: "clock", desc: "Avvalgi 120 soatga nisbatan keskin kamaydi" },
        ],
      },
      {
        type: "services", title: "Ko'rsatiladigan Asosiy Xizmatlar", iconType: "document",
        intro: "Soliq xizmati fuqarolar va tadbirkorlar uchun keng qamrovli, qulay va tezkor xizmatlar majmuini taqdim etadi.",
        services: [
          { name: "Soliq deklaratsiyasini topshirish", tag: "Online 24/7", iconType: "document", desc: "Barcha turdagi deklaratsiyalar onlayn formatda" },
          { name: "QQS qaytarish talablarini berish",  tag: "Avtomatik",   iconType: "money",    desc: "Avtomatlashtirilgan tekshiruv va qaytarish tizimi" },
          { name: "Yangi biznesni ro'yxatdan o'tkazish", tag: "1 kun",     iconType: "building", desc: "Tezlashtirilgan tadbirkorlik ro'yxatga olish" },
          { name: "Soliq qarzlari bo'yicha maslahat",  tag: "Bepul",       iconType: "shield",   desc: "Malakali mutaxassislar bilan bepul konsultatsiya" },
          { name: "Elektron imzo (ERI) xizmati",       tag: "Xavfsiz",     iconType: "digital",  desc: "Barcha elektron hujjatlar uchun raqamli imzo" },
          { name: "my.soliq.uz mobil ilovasi",         tag: "iOS & Android", iconType: "phone",  desc: "Istalgan vaqt, istalgan joydan xizmat" },
        ],
      },
      {
        type: "digital", title: "Raqamli Transformatsiya Dasturi", iconType: "digital",
        intro: "2022–2026 yillarga mo'ljallangan raqamli transformatsiya dasturi soliq tizimini tubdan yangilaydi.",
        items: [
          { icon: "digital",    title: "my.soliq.uz portali",         desc: "6 000 000+ foydalanuvchi ro'yxatdan o'tgan yagona raqamli platforma — barcha soliq xizmatlari bir joyda jamlangan", metric: "6M+",  metricLabel: "Foydalanuvchi" },
          { icon: "document",   title: "Elektron hisob-faktura tizimi", desc: "Barcha korxonalar uchun majburiy elektron format joriy etildi, qog'oz hujjatlar ulushi minimumga tushirildi", metric: "100%", metricLabel: "Qamrov" },
          { icon: "chart",      title: "Real vaqt soliq kalkulyatori",  desc: "Turli soliq turlari bo'yicha avtomatik hisob-kitob va to'lov muddatlarini eslatish xizmati", metric: "24/7", metricLabel: "Xizmat" },
          { icon: "network",    title: "AI asosidagi nazorat tizimi",   desc: "Machine learning algoritmlari yordamida soliq risklarini avtomatik aniqlash va profilaktik choralar ko'rish", metric: "AI",   metricLabel: "Texnologiya" },
        ],
      },
      {
        type: "structure", title: "Tashkiliy Tuzilma va Tarmoq", iconType: "building",
        intro: "Soliq xizmati tizimi uch pog'onali boshqaruv ierarxiyasiga asoslanib, butun mamlakat bo'ylab keng tarmoq orqali ishlaydi.",
        levels: [
          { name: "Davlat Soliq Qo'mitasi",           role: "Markaziy boshqaruv va strategik siyosat organi",   count: "1",       iconType: "shield",   detail: "Normativ hujjatlarni ishlab chiqadi, strategik yo'nalishlarni belgilaydi" },
          { name: "Viloyat soliq boshqarmalari",       role: "Mintaqaviy nazorat va muvofiqlashtirish",         count: "14",      iconType: "building", detail: "Har bir viloyat va Toshkent shahrida alohida boshqarma faoliyat yuritadi" },
          { name: "Shahar va tuman inspeksiyalari",    role: "Bevosita xizmat ko'rsatish punktlari",            count: "196",     iconType: "location", detail: "Mahalliy darajada fuqarolar va tadbirkorlar bilan bevosita ishlaydigan bo'linmalar" },
          { name: "Malakali xodimlar — jami",          role: "Tarkibiy xodimlar umumiy soni",                   count: "11 000+", iconType: "group",    detail: "Oliy ma'lumotli mutaxassislar, tekshiruvchilar va texnik xodimlar" },
        ],
      },
      {
        type: "reforms", title: "2024–2026 Islohotlar Dasturi", iconType: "rocket",
        intro: "Prezident farmonlari asosida soliq tizimini isloh qilishning kompleks dasturi jadal amalga oshirilmoqda.",
        reforms: [
          { year: "2024", title: "Yangilangan Soliq kodeksini joriy etish",   status: "Amalga oshirilmoqda",  pct: 78, iconType: "document",  detail: "Soliq yukini optimallashtirish, imtiyozlar tizimini takomillashtirish maqsadida" },
          { year: "2025", title: "Blockchain asosidagi soliq registri",        status: "Ishlab chiqilmoqda",   pct: 42, iconType: "digital",   detail: "Soliq ma'lumotlarini saqlash va almashishda yangi texnologiyalarni joriy etish" },
          { year: "2025", title: "AI asosli audit va risk baholash tizimi",    status: "Sinovdan o'tkazilmoqda", pct: 48, iconType: "network", detail: "Avtomatik risk baholash va maqsadli tekshiruvlar tizimini ishga tushirish" },
          { year: "2026", title: "To'liq qog'ozsiz ish yuritishga o'tish",     status: "Rejalashtirilgan",     pct: 14, iconType: "globe",     detail: "Barcha hujjat aylanmasini to'liq raqamli formatga o'tkazish" },
        ],
      },
      {
        type: "achievements", title: "So'nggi Yutuqlar va Mukofotlar", iconType: "award",
        intro: "Soliq xizmati xalqaro va milliy darajada bir qancha muhim yutuq va mukofotlarga erishdi.",
        achievements: [
          { icon: "award",    title: "Doing Business reytingi yuqoriladi", desc: "Soliq to'lash ko'rsatkichi bo'yicha O'zbekiston 69-o'rindan 12-o'ringa ko'tarildi (2019–2024 yillar)", year: "2024", badge: "Xalqaro reyting" },
          { icon: "star",     title: "CIAT xalqaro mukofoti",              desc: "Amerika soliq ma'murlari assotsiatsiyasi tomonidan innovatsion xizmatlar sohasida maxsus mukofotga sazovor bo'lindi", year: "2023", badge: "Xalqaro" },
          { icon: "chart",    title: "Soliq yig'im rejasi ortiqcha bajarildi", desc: "2024-yilda soliq yig'imi rejalashtirilganidan 18.4% ko'p tushdi — tarixiy rekord natija qayd etildi", year: "2024", badge: "Milliy rekord" },
          { icon: "digital",  title: "Eng yaxshi e-Gov xizmati",           desc: "O'zbekiston e-hukumat ko'rgazmasida 'Yilning eng yaxshi soliq xizmati' nominatsiyasida g'olib bo'lindi", year: "2023", badge: "Milliy" },
          { icon: "group",    title: "Soliq to'lovchilar ishonchi oshdi",   desc: "Mustaqil so'rovnomada soliq xizmatiga ishonch darajasi 71%ga yetdi — o'tgan yilga nisbatan 14 foizga oshdi", year: "2024", badge: "So'rovnoma" },
          { icon: "globe",    title: "Xalqaro hamkorlik shartnomasi",       desc: "IMF va Jahon banki bilan hamkorlikda soliq tizimini modernizatsiya qilish bo'yicha keng qamrovli dastur imzolandi", year: "2024", badge: "Hamkorlik" },
        ],
      },
      {
        type: "contact", title: "Aloqa va Murojaat", iconType: "globe",
        intro: "Soliq masalalari bo'yicha istalgan qulay kanal orqali murojaat qilishingiz mumkin. Barcha murojaat va savollar 48 soat ichida ko'rib chiqiladi.",
        contacts: [
          { icon: "globe",    label: "Rasmiy portal",     value: "my.soliq.uz" },
          { icon: "phone",    label: "Ish markazi",       value: "1198" },
          { icon: "location", label: "Bosh ofis manzili", value: "Toshkent, Amir Temur ko'ch., 7" },
          { icon: "email",    label: "Elektron pochta",   value: "info@soliq.uz" },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  2 — TA'LIM VAZIRLIGI
  // ════════════════════════════════════════════════════
  {
    id: "maktab",
    shortName: "TA'LIM VAZIRLIGI",
    fullName: "Maktabgacha va Maktab Ta'limi Vazirligi",
    subtitle: "Uzluksiz Ta'lim Tizimi",
    accent: "#2A8C5A", accentLight: "#4AB878", accentDark: "#1A6040",
    bgFrom: "#040E08", bgTo: "#082014",
    emblemIcon: "graduation",
    heroStat: "5.2 million", heroLabel: "O'quvchi va tarbiyalanuvchilar",
    slides: [
      {
        type: "cover", title: "MAKTABGACHA VA MAKTAB\nTA'LIMI VAZIRLIGI",
        subtitle: "Barkamol avlod tarbiyasi — kelajak poydevori",
        year: "2024", iconType: "graduation",
        extraStats: [
          { v: "5.2 mln", l: "O'quvchilar" },
          { v: "10 700+", l: "Maktablar" },
          { v: "494 000+", l: "O'qituvchilar" },
        ],
      },
      {
        type: "mission", title: "Missiya va Strategik Maqsadlar", iconType: "star",
        intro: "Vazirlikning asosiy vazifasi — har bir bolaga sifatli, teng imkoniyatli ta'lim berish hamda barkamol shaxs shakllantirishga hissa qo'shish.",
        points: [
          { icon: "book",       title: "Maktabgacha ta'limni jadal rivojlantirish",  desc: "3–6 yoshli bolalar uchun sifatli, ilmiy asosda qurilgan maktabgacha ta'lim muassasalari tarmoqini kengaytirish va xalqaro standartlarga muvofiqlashtirish." },
          { icon: "graduation", title: "Umumiy o'rta ta'limni tubdan takomillashtirish", desc: "Zamonaviy o'quv dasturlari, innovatsion pedagogik usullar va raqamli ta'lim resurslarini o'quv jarayoniga keng ko'lamda joriy etish." },
          { icon: "group",      title: "O'qituvchilar salohiyatini muntazam oshirish", desc: "Pedagoglarni sistemali qayta tayyorlash, malaka oshirish va kasbiy rivojlanish imkoniyatlarini kengaytirish hamda munosib mehnat sharoiti yaratish." },
          { icon: "building",   title: "Zamonaviy ta'lim infratuzilmasini barpo etish", desc: "Barcha hududlarda zamonaviy maktab binolari, laboratoriyalar, sport majmualari va internet infratuzilmasini qurish hamda ta'mirlash." },
        ],
      },
      {
        type: "stats", title: "2024-yil Ta'lim Tizimi Ko'rsatkichlari", iconType: "chart",
        subtitle: "Statistik ma'lumotlar va rivojlanish tendentsiyalari",
        stats: [
          { value: "5.2",     unit: "mln",   label: "Jami o'quvchilar soni",   trend: "+4.3%", iconType: "graduation", desc: "Barcha ta'lim bosqichlari, shu jumladan maktabgacha" },
          { value: "10 700",  unit: "+",     label: "Umumta'lim maktablari",   trend: "+2%",   iconType: "building",   desc: "Davlat va nodavlat maktablar birgalikda" },
          { value: "72.4",    unit: "%",     label: "Maktabgacha qamrov",      trend: "+8%",   iconType: "book",       desc: "3–6 yoshli bolalar maktabgacha ta'lim qamrovi" },
          { value: "494 000", unit: "+",     label: "Pedagogik xodimlar",      trend: "+3%",   iconType: "group",      desc: "O'qituvchilar, tarbiyachilar va metodistlar" },
        ],
      },
      {
        type: "services", title: "Asosiy Dasturlar va Tashabbuslar", iconType: "book",
        intro: "Vazirlik keng qamrovli dasturlar orqali ta'lim sifatini yaxshilash va har bir o'quvchining muvaffaqiyatini ta'minlaydi.",
        services: [
          { name: "MTM infratuzilmasini kengaytirish",     tag: "Ustuvor",      iconType: "building",   desc: "Yangi maktabgacha ta'lim muassasalari qurish loyihasi" },
          { name: "Zamonaviy o'quv dasturlarini joriy etish", tag: "Yangilandi", iconType: "book",       desc: "Kompetensiyaga asoslangan xalqaro standart dasturlar" },
          { name: "EduNet raqamli ta'lim platformasi",     tag: "Ishlaydi",     iconType: "digital",    desc: "Barcha o'quvchilarga ochiq bepul onlayn ta'lim muhiti" },
          { name: "O'qituvchilar malaka oshirish tizimi",  tag: "Muntazam",     iconType: "graduation", desc: "Respublika va viloyat malaka oshirish markazlari orqali" },
          { name: "Inklyuziv ta'limni rivojlantirish",     tag: "Barcha uchun", iconType: "group",      desc: "Nogironligi bo'lgan bolalar uchun keng imkoniyatlar" },
          { name: "Iqtidorli yoshlarni qo'llab-quvvatlash", tag: "Olimpiadalar", iconType: "award",     desc: "Xalqaro va respublika olimpiadalari tizimi" },
        ],
      },
      {
        type: "digital", title: "Raqamli Ta'lim Ekotizimi", iconType: "digital",
        intro: "Ta'lim jarayonini raqamlashtirish — vazirlikning strategik ustuvorligidan biri bo'lib, yangi imkoniyatlar yaratmoqda.",
        items: [
          { icon: "digital",    title: "EduNet platformasi",             desc: "O'quvchilar, o'qituvchilar va ota-onalar uchun birlashtirilgan raqamli ta'lim muhiti — darsliklar, topshiriqlar, natijalar", metric: "2.1M+", metricLabel: "Foydalanuvchi" },
          { icon: "book",       title: "Elektron darsliklar kutubxonasi", desc: "Barcha sinf va fanlar uchun interaktiv, multimedia bilan boyitilgan elektron o'quv materiallari", metric: "1400+", metricLabel: "Darslik" },
          { icon: "network",    title: "Masofaviy ta'lim tizimi",         desc: "Internet qamrovi cheklanigan qishloq hududlarida ham ta'limni uzluksiz ta'minlash uchun maxsus platforma", metric: "340+", metricLabel: "Maktab" },
          { icon: "chart",      title: "Tahlil va monitoring tizimi",     desc: "O'quvchilar natijalari, o'qituvchilar faoliyati va ta'lim sifatini real vaqtda kuzatib, tahlil qilish imkoni", metric: "100%", metricLabel: "Qamrov" },
        ],
      },
      {
        type: "structure", title: "Boshqaruv Tizimi va Tarmoq", iconType: "building",
        intro: "Vazirlikning boshqaruv tizimi mahalliy darajagacha barcha bosqichlarda nazorat va yordam ta'minlaydi.",
        levels: [
          { name: "Vazirlik markaziy apparati",    role: "Siyosat ishlab chiqish, muvofiqlashtirish va monitoring", count: "1",        iconType: "shield",     detail: "Ta'lim standartlarini belgilaydi, normativ hujjatlarni ishlab chiqadi" },
          { name: "Viloyat ta'lim boshqarmalari",  role: "Mintaqaviy boshqaruv va koordinatsiya",                  count: "14",       iconType: "building",   detail: "Viloyat va Toshkent shahridagi maktablarni boshqaradi" },
          { name: "Tuman ta'lim bo'limlari",       role: "Mahalliy nazorat va bevosita yordam",                    count: "196",      iconType: "network",    detail: "Har bir tuman maktablarini bevosita nazorat qiladigan bo'linma" },
          { name: "Pedagogik xodimlar — jami",     role: "Bevosita ta'lim beradigan mutaxassislar",                count: "494 000+", iconType: "graduation", detail: "O'qituvchilar, tarbiyachilar, psixologlar va metodik xodimlar" },
        ],
      },
      {
        type: "reforms", title: "Strategik Rivojlanish Yo'nalishlari", iconType: "rocket",
        intro: "Vazirlik tomonidan amalga oshirilayotgan islohotlar ta'lim sifatini xalqaro standartlarga yaqinlashtirish maqsadiga qaratilgan.",
        reforms: [
          { year: "2024", title: "Maktabgacha qamrovni 80%ga yetkazish",       status: "Amalga oshirilmoqda",  pct: 74, iconType: "building",   detail: "Yangi MTM binolari qurishni jadallashtirish va xususiy sektori jalb etish" },
          { year: "2025", title: "Yangi avlod o'quv dasturlarini joriy etish",  status: "Ishlab chiqilmoqda",   pct: 58, iconType: "book",       detail: "Kompetensiyaga asoslangan, hayot bilan bog'liq ta'lim yondashuvi" },
          { year: "2025", title: "STEM ta'limini keng ko'lamda kengaytirish",   status: "Boshlangan",           pct: 42, iconType: "innovation", detail: "Texnologiya, muhandislik, san'at va matematika ta'limini kuchaytirish" },
          { year: "2026", title: "To'liq raqamli ta'lim muhitini yaratish",     status: "Rejalashtirilgan",     pct: 22, iconType: "digital",    detail: "Har bir sinfxona zamonaviy kompyuter va proyeksiya texnologiyalari bilan" },
        ],
      },
      {
        type: "achievements", title: "Yutuqlar va Xalqaro Tan Olinish", iconType: "award",
        intro: "O'zbekiston ta'lim tizimi so'nggi yillarda xalqaro darajada e'tirof etilgan muhim natijalarga erishdi.",
        achievements: [
          { icon: "award",      title: "PISA baholash natijalari yaxshilandi",  desc: "2022-yilgi PISA testida matematika bo'yicha ball 2018-yilga nisbatan 18 ballga oshdi — sezilarli natija", year: "2023", badge: "PISA" },
          { icon: "star",       title: "UNESCO ta'lim mukofoti",                desc: "Maktabgacha ta'limni kengaytirish bo'yicha IIPE-UNESCO tomonidan maqtov yorlig'iga va maxsus mukofotga sazovor bo'lindi", year: "2024", badge: "UNESCO" },
          { icon: "graduation", title: "Xalqaro olimpiada rekordi",             desc: "2024-yilda xalqaro fan olimpiadalarida 47 ta medal qo'lga kiritildi — tarixiy eng yuqori natija", year: "2024", badge: "Olimpiada" },
          { icon: "building",   title: "400+ yangi zamonaviy maktab",           desc: "2021–2024 yillar davomida 412 ta yangi maktab binosi qurib ishga tushirildi yoki kapital ta'mirlandi", year: "2024", badge: "Qurilish" },
          { icon: "digital",    title: "EduNet platformasi rekordi",            desc: "Raqamli ta'lim platformasi faol foydalanuvchilar soni 2 milliondan oshdi — yillik o'sish 45%", year: "2024", badge: "Raqamli" },
          { icon: "group",      title: "O'qituvchilar maoshi 2.4x oshdi",       desc: "2021-yilga nisbatan o'qituvchilarning o'rtacha ish haqi 2.4 barobar oshirildi, kasbga qiziqish ortdi", year: "2023", badge: "Ijtimoiy" },
        ],
      },
      {
        type: "contact", title: "Aloqa va Ma'lumot", iconType: "globe",
        intro: "Ta'lim vazirligi bilan bog'lanish uchun quyidagi rasmiy kanallardan foydalaning.",
        contacts: [
          { icon: "globe",    label: "Rasmiy veb-sayt",   value: "uzedu.uz" },
          { icon: "phone",    label: "Qo'ng'iroq markazi", value: "1090" },
          { icon: "location", label: "Vazirlik manzili",   value: "Toshkent, Mustaqillik ko'ch., 5" },
          { icon: "email",    label: "Elektron pochta",    value: "info@uzedu.uz" },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  3 — YOSHLAR ISHLARI AGENTLIGI
  // ════════════════════════════════════════════════════
  {
    id: "yoshlar",
    shortName: "YOSHLAR AGENTLIGI",
    fullName: "O'zbekiston Yoshlar Ishlari Agentligi",
    subtitle: "Yoshlar Siyosati va Rivojlanish",
    accent: "#1A7DC8", accentLight: "#3AA0E8", accentDark: "#0F5A92",
    bgFrom: "#040810", bgTo: "#081520",
    emblemIcon: "youth",
    heroStat: "11 million+", heroLabel: "Qamrab olingan yoshlar",
    slides: [
      {
        type: "cover", title: "O'ZBEKISTON YOSHLAR\nISHLARI AGENTLIGI",
        subtitle: "Yoshlarning salohiyatini ochish — davlatimizning ustuvor vazifasi",
        year: "2024", iconType: "youth",
        extraStats: [
          { v: "11 mln+", l: "Yoshlar qamrovi" },
          { v: "300+", l: "Yoshlar markazlari" },
          { v: "50 000+", l: "Faol ko'ngillilar" },
        ],
      },
      {
        type: "mission", title: "Missiya va Asosiy Yo'nalishlar", iconType: "star",
        intro: "Agentlik 14–30 yoshli yoshlarning ijtimoiy faolligi, kasbiy rivojlanishi va davlat boshqaruvida ishtirokini ta'minlash maqsadida faoliyat yuritadi.",
        points: [
          { icon: "youth",      title: "Yoshlar siyosatini to'liq amalga oshirish",  desc: "14–30 yoshli yoshlar manfaatlarini himoya qilish, ularning jamiyatga integratsiyasini ta'minlash va fuqarolik faolligini oshirish." },
          { icon: "innovation", title: "Tadbirkorlik ruhini keng shakllantirish",    desc: "Yoshlar orasida biznes ko'nikmalari, startaplar va innovatsion g'oyalarni qo'llab-quvvatlash uchun zamonaviy akselerator va inkubator dasturlar." },
          { icon: "globe",      title: "Xalqaro hamkorlik va almashinuvni rivojlantirish", desc: "Yoshlarning xorijiy ta'lim, staj dasturlari va xalqaro loyihalarda faol ishtirokini kengaytirish, global tarmoqlar bilan aloqalar o'rnatish." },
          { icon: "target",     title: "Kasbga yo'naltirish va bandlikni ta'minlash", desc: "Yoshlar ishsizligini kamaytirish uchun kasbiy tayyorgarlik, ko'nikma oshirish va mehnat bozoriga kirish dasturlarini rivojlantirish." },
        ],
      },
      {
        type: "stats", title: "2024-yil Asosiy Ko'rsatkichlari", iconType: "chart",
        subtitle: "Agentlik faoliyatining raqamlarda ifodalanishi",
        stats: [
          { value: "11",    unit: "mln+",  label: "Qamrab olingan yoshlar",      trend: "+6.2%", iconType: "youth",    desc: "14–30 yoshli fuqarolar agentlik dasturlari bilan qamrab olindi" },
          { value: "6 800", unit: "+",     label: "Loyihalar va tadbirlar soni", trend: "+22%",  iconType: "star",     desc: "Respublika va mahalliy darajadagi barcha tadbirlar birgalikda" },
          { value: "142 000", unit: "+",   label: "Yoshlar ish bilan ta'minlandi", trend: "+18%", iconType: "rocket", desc: "Agentlik dasturlari orqali ish topgan yoshlar soni" },
          { value: "340",   unit: "+",     label: "Xalqaro hamkorlik dasturlari", trend: "+30%", iconType: "globe",   desc: "Xorijiy tashkilotlar va davlatlar bilan hamkorlik dasturlari" },
        ],
      },
      {
        type: "services", title: "Dasturlar va Tashabbuslar", iconType: "rocket",
        intro: "Agentlik yoshlarning har tomonlama rivojlanishi uchun keng qamrovli dasturlar to'plamini amalga oshiradi.",
        services: [
          { name: "Yoshlar markazlari keng tarmog'i",    tag: "300+ markaz",  iconType: "building",   desc: "Barcha viloyatlarda zamonaviy yoshlar markazlari" },
          { name: "Startap va biznes inkubatorlar",       tag: "Yangi",        iconType: "innovation", desc: "Yoshlar g'oyalarini biznesga aylantirish platformasi" },
          { name: "Xalqaro ta'lim granti dasturlari",    tag: "2000+ stipendiya", iconType: "graduation", desc: "Xorijiy universitetlarda o'qish imkoniyatlari" },
          { name: "Ko'ngillilar harakati tarmog'i",      tag: "50 000+ faol", iconType: "group",      desc: "Jamoatchilik asosida faoliyat yurituvchi tashkilot" },
          { name: "Yoshlar parlamenti — respublika",     tag: "Milliy organ",  iconType: "flag",       desc: "Yoshlar siyosiy jarayonlarda ishtirok etish platformasi" },
          { name: "Sport, madaniyat va ijodiy loyihalar", tag: "Barcha yo'nalish", iconType: "star",   desc: "Yoshlarning qiziqish va salohiyatini rivojlantirish" },
        ],
      },
      {
        type: "digital", title: "Raqamli Platforma va Innovatsiyalar", iconType: "digital",
        intro: "Yoshlar ishlari agentligi raqamli texnologiyalarni faol qo'llab, yoshlarga yangi imkoniyatlar yaratmoqda.",
        items: [
          { icon: "digital",    title: "yoshlar.uz portali",        desc: "Yoshlar uchun ko'nikma, ta'lim va ish imkoniyatlarini birlashtirgan yagona raqamli platforma va mobil ilova", metric: "890K+", metricLabel: "Foydalanuvchi" },
          { icon: "money",      title: "Yoshlar jamg'armasi tizimi", desc: "Yoshlar loyihalari uchun moliyaviy qo'llab-quvvatlash, grant va kreditlash mexanizmlari tizimi", metric: "500B+", metricLabel: "So'm" },
          { icon: "rocket",     title: "Startap akselerator ekotizimi", desc: "Innovatsion g'oyalarni tijoriy loyihaga aylantirish uchun akselerator va mentorlik dasturlari", metric: "1200+", metricLabel: "Startap" },
          { icon: "globe",      title: "Xalqaro almashinuv platformasi", desc: "Xorijiy universitetlar, kompaniyalar va tashkilotlar bilan hamkorlik shartnomalar tizimi", metric: "48+", metricLabel: "Mamlakat" },
        ],
      },
      {
        type: "structure", title: "Tashkiliy Tuzilma va Tarmoq", iconType: "building",
        intro: "Agentlikning tashkiliy tuzilmasi respublika darajasidan mahalliy darajagacha barcha bosqichlarni qamrab oladi.",
        levels: [
          { name: "Agentlik markaziy idorasi",   role: "Siyosat ishlab chiqish va umumiy boshqaruv",    count: "1",        iconType: "flag",   detail: "Yoshlar siyosatini belgilaydi, strategik dasturlarni muvofiqlashtiradi" },
          { name: "Viloyat bo'linmalari",         role: "Mintaqaviy faoliyat koordinatsiyasi",           count: "14",       iconType: "building", detail: "Har bir viloyatda faoliyat yurituvchi agentlik bo'linmalari" },
          { name: "Yoshlar markazlari tarmog'i",  role: "Bevosita xizmat ko'rsatish nuqtalari",         count: "300+",     iconType: "youth",  detail: "Zamonaviy jihozlangan yoshlar markazlari barcha tumanlarda" },
          { name: "Faol ko'ngillilar",            role: "Jamoatchilik asosida mehnat qiluvchilar",       count: "50 000+",  iconType: "group",  detail: "Turli yoshlar tashkilotlari va initsiativalari vakillari" },
        ],
      },
      {
        type: "reforms", title: "2024–2027 Strategik Reja", iconType: "rocket",
        intro: "Agentlikning strategik rivojlanish rejasi yoshlar hayot sifatini yaxshilash va ularning imkoniyatlarini kengaytirishga yo'naltirilgan.",
        reforms: [
          { year: "2024", title: "Yoshlar markazlarini 400taga yetkazish",        status: "Amalga oshirilmoqda",    pct: 78, iconType: "building",   detail: "Qurilish va ta'mirlash ishlari barcha viloyatlarda jadal davom ettirilmoqda" },
          { year: "2025", title: "Yoshlar startap fondini 3 barobar kengaytirish", status: "Rejalashtirilmoqda",    pct: 38, iconType: "innovation", detail: "Xususiy investorlar bilan hamkorlikda yangi moliyalashtirish mexanizmlari" },
          { year: "2026", title: "Har bir tuman yoshlar markazi bilan ta'minlansin", status: "Rejada",              pct: 22, iconType: "network",    detail: "Masofaviy hududlarda ham zamonaviy yoshlar infratuzilmasini yaratish" },
          { year: "2027", title: "Mintaqaviy xalqaro yoshlar markaziga aylantirish", status: "Strategik maqsad",   pct: 10, iconType: "globe",      detail: "Markaziy Osiyo yoshlar hamkorligining asosiy platformasiga aylanish" },
        ],
      },
      {
        type: "achievements", title: "Yutuqlar va Natijalar", iconType: "award",
        intro: "Agentlik so'nggi yillarda yoshlar hayotini yaxshilashda muhim natijalarga erishdi va xalqaro tan olinishga sazovor bo'ldi.",
        achievements: [
          { icon: "award",      title: "COYF xalqaro mukofoti",               desc: "Markaziy Osiyo yoshlar forumida eng faol yoshlar tashkiloti sifatida xalqaro mukofotga sazovor bo'lindi", year: "2024", badge: "Xalqaro" },
          { icon: "star",       title: "YoISH dasturi — global e'tirof",       desc: "BMT Yoshlar ishlari kengashi tomonidan innovatsion yoshlar siyosati uchun maxsus maqtov yorlig'i berildi", year: "2023", badge: "BMT" },
          { icon: "rocket",     title: "1200+ startap ro'yxatga olindi",       desc: "2024-yilda agentlik akseleratori orqali 1200 dan ortiq yangi startap loyihalari ro'yxatdan o'tdi", year: "2024", badge: "Biznes" },
          { icon: "graduation", title: "2000+ chet el granti ajratildi",       desc: "Yil davomida 2000 dan ortiq yoshga xorijiy universitetlarda o'qish uchun to'liq grant mablag'lari ajratildi", year: "2024", badge: "Ta'lim" },
          { icon: "group",      title: "50 000 faol ko'ngillilar",             desc: "Ko'ngillilar harakati a'zolari soni 2020-yilga nisbatan 5 barobar oshdi — katta ijtimoiy yutuq", year: "2024", badge: "Ijtimoiy" },
          { icon: "globe",      title: "48 mamlakat bilan hamkorlik",          desc: "Yoshlar almashinuvi va hamkorlik dasturlari bo'yicha 48 mamlakatning yoshlar tashkilotlari bilan shartnomalar tuzildi", year: "2024", badge: "Xalqaro" },
        ],
      },
      {
        type: "contact", title: "Bog'lanish Yo'llari", iconType: "globe",
        intro: "Yoshlar ishlari agentligi bilan bog'lanish uchun quyidagi kanallardan foydalaning. Har qanday savol va takliflarga 24 soat ichida javob beramiz.",
        contacts: [
          { icon: "globe",    label: "Rasmiy portal",     value: "yoshlar.uz" },
          { icon: "phone",    label: "Ish markazi",       value: "1030" },
          { icon: "location", label: "Agentlik manzili",  value: "Toshkent, Yunusobod tumani" },
          { icon: "email",    label: "Elektron pochta",   value: "info@yoshlar.uz" },
        ],
      },
    ],
  },
];

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 6 — AUTHOR PAGE COMPONENT
// ───────────────────────────────────────────────────────────────────────────────

const AuthorPage = () => {
  return (
    <div className="author-page">
      {/* Header */}
      <div className="author-header">
        <div className="author-title">Loyiha Mualliflari</div>
        <div className="author-subtitle">
          Ushbu taqdimotni tayyorlagan o'quvchilar haqida
        </div>
      </div>

      {/* 2 ta o'quvchi kartasi */}
      <div className="author-cards">
        {AUTHORS_DATA.map((a, idx) => (
          <div
            key={a.id}
            className="author-card"
            style={{
              borderColor: `${a.color}30`,
              boxShadow: `0 0 40px ${a.color}12`,
            }}
          >
            {/* Yuqori qism — avatar va asosiy ma'lumot */}
            <div
              className="author-card-top"
              style={{
                background: `linear-gradient(160deg, ${a.color}18 0%, transparent 70%)`,
                borderBottom: `1px solid ${a.color}20`,
              }}
            >
              {/* Avatar */}
              <div
                className="author-avatar"
                style={{
                  background: `linear-gradient(135deg, ${a.color} 0%, ${a.colorDark} 100%)`,
                  boxShadow: `0 0 28px ${a.color}55`,
                  color: "white",
                }}
              >
                {a.initials}
              </div>

              {/* Tartib raqami */}
              <div
                className="author-num"
                style={{ color: a.accentLight || a.color }}
              >
                {idx === 0 ? "01 — BIRINCHI MUALLIF" : "02 — IKKINCHI MUALLIF"}
              </div>

              {/* To'liq ism */}
              <div className="author-fullname">
                {a.lastName} {a.firstName}
                <br />
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {a.middleName}
                </span>
              </div>

              {/* Rol */}
              <div
                className="author-role-badge"
                style={{
                  color: a.color,
                  borderColor: `${a.color}60`,
                  background: `${a.color}18`,
                }}
              >
                {a.role}
              </div>

              {/* Haqida */}
              <div className="author-about">{a.about}</div>
            </div>

            {/* Quyi qism — batafsil ma'lumot */}
            <div className="author-card-bottom">
              {/* Asosiy ma'lumotlar */}
              <div className="author-info-row">
                {[
                  { icon: "🏫", label: "Maktab", value: a.school },
                  { icon: "📚", label: "Sinf",   value: a.grade },
                  { icon: "📍", label: "Shahar",  value: a.city },
                  { icon: "⭐", label: "Fan",     value: a.subjects },
                  { icon: "🎯", label: "Qiziqish", value: a.hobby },
                ].map((item, i) => (
                  <div className="author-info-item" key={i}>
                    <span className="author-info-icon">{item.icon}</span>
                    <div className="author-info-content">
                      <span className="author-info-label">{item.label}</span>
                      <span className="author-info-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Yutuqlar */}
              <div className="author-achievements">
                <div className="author-ach-title">Yutuqlar va Sertifikatlar</div>
                {a.achievements.map((ach, i) => (
                  <div className="author-ach-item" key={i}>
                    <div
                      className="author-ach-dot"
                      style={{ background: a.color }}
                    />
                    {ach}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loyiha haqida umumiy ma'lumot */}
      <div
        className="author-project-info"
        style={{ marginTop: 4 }}
      >
        {[
          { label: "Loyiha turi",     value: "Taqdimot" },
          { label: "Mavzu soni",      value: "3 ta tashkilot" },
          { label: "Slaydlar soni",   value: "27 ta slayd" },
          { label: "Texnologiya",     value: "React JS" },
          { label: "Yaratilgan yil",  value: "2024–2025" },
          { label: "Til",             value: "O'zbek tili" },
        ].map((item, i) => (
          <div className="api-card" key={i}>
            <div className="api-label">{item.label}</div>
            <div className="api-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 7 — SLIDE TYPE COMPONENTS
// ───────────────────────────────────────────────────────────────────────────────

/* ── Cover ── */
const CoverSlide = ({ slide, agency }) => (
  <div className="cover-wrap">
    <div className="cover-icon" style={{ "--acc": agency.accent }}>
      <Icon3D type={slide.iconType} size={108} color={agency.accent} />
    </div>
    <div className="cover-year">{slide.year}</div>
    <h1 className="cover-h1">
      {slide.title.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
    </h1>
    <div className="cover-line" />
    <p className="cover-sub">{slide.subtitle}</p>
    <div className="cover-stat-box">
      {(slide.extraStats || []).map((s, i) => (
        <div className="cover-stat" key={i}>
          <span className="cover-stat-v">{s.v}</span>
          <span className="cover-stat-l">{s.l}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Mission ── */
const MissionSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="mgrid">
      {slide.points.map((p, i) => (
        <div className="mcard" key={i} style={{ animationDelay: `${i * 0.11}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}12`, "--brd": `${agency.accent}38` }}>
          <div style={{ flexShrink: 0 }}><Icon3D type={p.icon} size={40} color={agency.accent} /></div>
          <div><h3>{p.title}</h3><p>{p.desc}</p></div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Stats ── */
const StatsSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.subtitle && <div className="sh-sub">{slide.subtitle}</div>}
      </div>
    </div>
    <div className="sgrid">
      {slide.stats.map((s, i) => (
        <div className="scard" key={i} style={{ animationDelay: `${i * 0.1}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}10`, "--brd": `${agency.accent}38`, "--acc-l": agency.accentLight }}>
          <Icon3D type={s.iconType} size={42} color={agency.accent} />
          <div className="scard-val">{s.value}<span className="scard-unit"> {s.unit}</span></div>
          <div className="scard-lbl">{s.label}</div>
          <div className="scard-trend" style={{ color: s.trend.startsWith("+") ? "#4ade80" : "#f87171" }}>
            {s.trend.startsWith("+") ? "▲" : "▼"} {s.trend}
          </div>
          {s.desc && <div className="scard-desc">{s.desc}</div>}
        </div>
      ))}
    </div>
  </div>
);

/* ── Services ── */
const ServicesSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="svgrid">
      {slide.services.map((s, i) => (
        <div className="svcard" key={i} style={{ animationDelay: `${i * 0.08}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}0E`, "--brd": `${agency.accent}38`, "--acc-l": agency.accentLight }}>
          <Icon3D type={s.iconType} size={36} color={agency.accent} />
          <div>
            <div className="svcard-name">{s.name}</div>
            <span className="svcard-tag">{s.tag}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Digital ── */
const DigitalSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="dgrid">
      {slide.items.map((item, i) => (
        <div className="dcard" key={i} style={{ animationDelay: `${i * 0.1}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}0E`, "--brd": `${agency.accent}38`, "--acc-l": agency.accentLight }}>
          <Icon3D type={item.icon} size={44} color={agency.accent} />
          <div className="dcard-metric">{item.metric}<span className="dcard-mlbl"> {item.metricLabel}</span></div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ── Structure ── */
const StructureSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="strlist">
      {slide.levels.map((lv, i) => (
        <div className="stritem" key={i} style={{ animationDelay: `${i * 0.12}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}0E`, "--brd": `${agency.accent}38`, "--acc-l": agency.accentLight }}>
          <div className="str-num">{String(i + 1).padStart(2, "0")}</div>
          <Icon3D type={lv.iconType} size={38} color={agency.accent} />
          <div className="str-info">
            <h3>{lv.name}</h3>
            <p>{lv.role}</p>
          </div>
          <div className="str-count">{lv.count}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Reforms ── */
const ReformsSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="rflist">
      {slide.reforms.map((r, i) => (
        <div className="rfitem" key={i} style={{ animationDelay: `${i * 0.11}s`, "--acc": agency.accent, "--brd": `${agency.accent}38`, "--acc-bg": `${agency.accent}0E`, "--acc-l": agency.accentLight }}>
          <div className="rf-yr">{r.year}</div>
          <Icon3D type={r.iconType} size={36} color={agency.accent} />
          <div className="rf-body">
            <div className="rf-row">
              <span>{r.title}</span>
              <span className="rf-status" style={{ color: r.pct > 60 ? "#4ade80" : r.pct > 30 ? agency.accentLight : "rgba(255,255,255,0.45)" }}>{r.status}</span>
            </div>
            <ProgressBar pct={r.pct} accent={agency.accent} />
            <span className="rf-pct" style={{ color: agency.accentLight }}>{r.pct}% bajarilgan</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Achievements ── */
const AchievementsSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="achgrid">
      {slide.achievements.map((a, i) => (
        <div className="achcard" key={i} style={{ animationDelay: `${i * 0.08}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}0E`, "--brd": `${agency.accent}38`, "--acc-l": agency.accentLight }}>
          <div className="ach-badge">{a.badge}</div>
          <Icon3D type={a.icon} size={36} color={agency.accent} />
          <h4>{a.title}</h4>
          <p>{a.desc}</p>
          <div className="ach-yr">{a.year}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Contact ── */
const ContactSlide = ({ slide, agency }) => (
  <div>
    <div className="sh">
      <Icon3D type={slide.iconType} size={48} color={agency.accent} />
      <div>
        <div className="sh-title">{slide.title}</div>
        {slide.intro && <div className="sh-sub">{slide.intro}</div>}
      </div>
    </div>
    <div className="ctgrid">
      {slide.contacts.map((c, i) => (
        <div className="ctcard" key={i} style={{ animationDelay: `${i * 0.1}s`, "--acc": agency.accent, "--acc-bg": `${agency.accent}10`, "--brd": `${agency.accent}38`, "--acc-l": agency.accentLight }}>
          <Icon3D type={c.icon} size={44} color={agency.accent} />
          <div className="ct-lbl">{c.label}</div>
          <div className="ct-val">{c.value}</div>
        </div>
      ))}
    </div>
    <div className="ct-footer" style={{ borderColor: `${agency.accent}28` }}>
      <Icon3D type={agency.emblemIcon} size={50} color={agency.accent} />
      <div>
        <div className="ct-org">{agency.fullName}</div>
        <div className="ct-sub">{agency.subtitle}</div>
      </div>
    </div>
  </div>
);

/* ── Dispatcher ── */
const SlideContent = ({ slide, agency }) => {
  const map = {
    cover: CoverSlide, mission: MissionSlide, stats: StatsSlide,
    services: ServicesSlide, digital: DigitalSlide, structure: StructureSlide,
    reforms: ReformsSlide, achievements: AchievementsSlide, contact: ContactSlide,
  };
  const Comp = map[slide.type];
  return Comp ? <Comp slide={slide} agency={agency} /> : null;
};

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 8 — PARTICLES COMPONENT
// ───────────────────────────────────────────────────────────────────────────────

const Particles = ({ accent }) => {
  const pts = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x:   Math.random() * 100,
      y:   Math.random() * 100,
      sz:  Math.random() * 3 + 1,
      dur: Math.random() * 12 + 8,
      del: -(Math.random() * 12),
    }))
  );
  return (
    <div className="particles" aria-hidden="true">
      {pts.current.map(p => (
        <div key={p.id} className="ptcl" style={{
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.sz}px`, height: `${p.sz}px`,
          background: accent,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.del}s`,
        }} />
      ))}
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
//  SECTION 9 — MAIN APP COMPONENT
// ───────────────────────────────────────────────────────────────────────────────

export default function App() {
  // inject styles once
  useEffect(() => {
    const id = "app-global-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id; tag.textContent = GLOBAL_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  const [view,      setView]      = useState("author");   // "author" | agency id
  const [slideIdx,  setSlideIdx]  = useState(0);
  const [animCls,   setAnimCls]   = useState("anim-in");
  const [autoplay,  setAutoplay]  = useState(true);
  const autoRef = useRef(null);

  const activeAgency = AGENCIES.find(a => a.id === view);
  const isAuthor     = view === "author";
  const totalSlides  = activeAgency ? activeAgency.slides.length : 1;

  // CSS vars from active agency
  const cssVars = activeAgency
    ? {
        "--acc":    activeAgency.accent,
        "--acc-l":  activeAgency.accentLight,
        "--acc-bg": `${activeAgency.accent}12`,
        "--brd":    `${activeAgency.accent}35`,
      }
    : { "--acc": "#a78bfa", "--acc-l": "#c4b5fd", "--acc-bg": "#a78bfa14", "--brd": "#a78bfa35" };

  const bg = activeAgency
    ? `linear-gradient(135deg, ${activeAgency.bgFrom} 0%, ${activeAgency.bgTo} 55%, ${activeAgency.bgFrom} 100%)`
    : "linear-gradient(135deg, #080810 0%, #10101e 55%, #080810 100%)";

  const accentColor = activeAgency ? activeAgency.accent : "#a78bfa";

  // go to slide
  const gotoSlide = useCallback((idx, dir = "next") => {
    setAnimCls(dir === "next" ? "anim-out" : "anim-out");
    setTimeout(() => {
      setSlideIdx(idx);
      setAnimCls(dir === "next" ? "anim-in" : "anim-rev");
    }, 340);
  }, []);

  const next = useCallback(() => {
    if (!isAuthor) gotoSlide((slideIdx + 1) % totalSlides, "next");
  }, [isAuthor, slideIdx, totalSlides, gotoSlide]);

  const prev = useCallback(() => {
    if (!isAuthor) gotoSlide((slideIdx - 1 + totalSlides) % totalSlides, "prev");
  }, [isAuthor, slideIdx, totalSlides, gotoSlide]);

  // autoplay
  useEffect(() => {
    clearInterval(autoRef.current);
    if (autoplay && !isAuthor) autoRef.current = setInterval(next, 6500);
    return () => clearInterval(autoRef.current);
  }, [autoplay, isAuthor, next]);

  // keyboard
  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // switch agency
  const switchTo = id => {
    setView(id);
    setSlideIdx(0);
    setAnimCls("anim-in");
  };

  return (
    <div className="root" style={{ background: bg, ...cssVars }}>
      {/* decorative corners */}
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      <div className="grid-bg" />
      <Particles accent={accentColor} />

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <div className="topbar-left">
          {activeAgency
            ? <Icon3D type={activeAgency.emblemIcon} size={30} color={activeAgency.accent} />
            : <span style={{ fontSize: "1.3rem" }}>📋</span>}
          <span className="topbar-badge">
            {isAuthor ? "MUALLIF SAHIFASI" : activeAgency.shortName}
          </span>
        </div>

        {/* tabs */}
        <div className="agency-tabs">
          <button className={`atab atab-author ${isAuthor ? "on" : ""}`} onClick={() => switchTo("author")}>
            <span>👤</span> <span>Mualliflar</span>
          </button>
          {AGENCIES.map(ag => (
            <button
              key={ag.id}
              className={`atab ${view === ag.id ? "on" : ""}`}
              style={{ "--acc": ag.accent, "--acc-bg": `${ag.accent}18` }}
              onClick={() => switchTo(ag.id)}
            >
              <Icon3D type={ag.emblemIcon} size={18} color={view === ag.id ? ag.accent : "rgba(255,255,255,0.3)"} />
              <span>{ag.shortName}</span>
            </button>
          ))}
        </div>

        {/* autoplay */}
        <button
          className={`autoplay-btn ${autoplay ? "on" : ""}`}
          onClick={() => setAutoplay(v => !v)}
          title={autoplay ? "Pauza" : "Avtomatik"}
        >
          {autoplay ? "⏸ Pauza" : "▶ Auto"}
        </button>
      </header>

      {/* ── SLIDE AREA ── */}
      <main className="slide-area">
        {!isAuthor && (
          <button className="nav-btn nav-l" onClick={prev} aria-label="Oldingi">‹</button>
        )}

        <div
          className={`slide-card ${animCls}`}
          style={{ borderColor: `${accentColor}28`, boxShadow: `0 0 70px rgba(0,0,0,0.55), 0 0 50px ${accentColor}0A` }}
          key={`${view}-${slideIdx}`}
        >
          {!isAuthor && (
            <div className="slide-num">
              {String(slideIdx + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </div>
          )}

          {isAuthor
            ? <AuthorPage />
            : <SlideContent slide={activeAgency.slides[slideIdx]} agency={activeAgency} />
          }
        </div>

        {!isAuthor && (
          <button className="nav-btn nav-r" onClick={next} aria-label="Keyingi">›</button>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bottombar">
        <div className="agency-label">
          {isAuthor ? "O'quvchilar tomonidan tayyorlangan" : activeAgency.fullName}
        </div>

        {!isAuthor && (
          <>
            <div className="dots">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === slideIdx ? "on" : ""}`}
                  style={{
                    background: i === slideIdx ? accentColor : "rgba(255,255,255,0.18)",
                    boxShadow: i === slideIdx ? `0 0 8px ${accentColor}` : "none",
                  }}
                  onClick={() => gotoSlide(i)}
                  aria-label={`Slayd ${i + 1}`}
                />
              ))}
            </div>
            <div className="prog-bar">
              <div
                className="prog-fill"
                style={{
                  width: `${((slideIdx + 1) / totalSlides) * 100}%`,
                  background: `linear-gradient(90deg, ${activeAgency.accentDark}, ${activeAgency.accentLight})`,
                }}
              />
            </div>
          </>
        )}
      </footer>
    </div>
  );
}