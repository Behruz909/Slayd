import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ─────────────────────────────────────────────────────────────────
//  3D SVG ICONS
// ─────────────────────────────────────────────────────────────────

const Icon3D = ({ type, size = 80, color = "#C8992A" }) => {
  const icons = {
    balance: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="balTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="balSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <filter id="balShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#balShadow)">
          <rect x="46" y="15" width="8" height="60" rx="4" fill="url(#balTop)" />
          <rect x="20" y="18" width="60" height="6" rx="3" fill="url(#balTop)" />
          <ellipse cx="30" cy="42" rx="18" ry="12" fill="url(#balTop)" opacity="0.9" />
          <path d="M12 42 Q30 30 48 42 Q30 54 12 42Z" fill={color} opacity="0.3" />
          <ellipse cx="70" cy="55" rx="18" ry="12" fill="url(#balTop)" opacity="0.9" />
          <path d="M52 55 Q70 43 88 55 Q70 67 52 55Z" fill={color} opacity="0.3" />
          <ellipse cx="50" cy="78" rx="20" ry="6" fill={color} opacity="0.25" />
          <rect x="46" y="72" width="8" height="8" rx="2" fill="url(#balTop)" />
        </g>
      </svg>
    ),
    document: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="docFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="docSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <filter id="docShadow">
            <feDropShadow dx="2" dy="6" stdDeviation="6" floodColor={color} floodOpacity="0.35" />
          </filter>
        </defs>
        <g filter="url(#docShadow)">
          <rect x="22" y="12" width="52" height="68" rx="4" fill="url(#docFace)" />
          <path d="M74 12 L82 20 L82 80 L74 80 Z" fill="url(#docSide)" />
          <path d="M74 12 L82 20 L74 20 Z" fill={color} opacity="0.5" />
          <rect x="32" y="28" width="32" height="3" rx="1.5" fill="white" opacity="0.6" />
          <rect x="32" y="38" width="28" height="3" rx="1.5" fill="white" opacity="0.5" />
          <rect x="32" y="48" width="24" height="3" rx="1.5" fill="white" opacity="0.4" />
          <rect x="32" y="58" width="30" height="3" rx="1.5" fill="white" opacity="0.4" />
          <rect x="32" y="68" width="20" height="3" rx="1.5" fill="white" opacity="0.3" />
        </g>
      </svg>
    ),
    chart: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bar1g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="chartShadow">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#chartShadow)">
          <rect x="10" y="80" width="80" height="4" rx="2" fill={color} opacity="0.4" />
          <rect x="18" y="50" width="14" height="30" rx="2" fill="url(#bar1g)" />
          <path d="M18 50 L25 44 L32 50 L32 80 L18 80 Z" fill={color} opacity="0.2" />
          <rect x="38" y="35" width="14" height="45" rx="2" fill="url(#bar1g)" />
          <path d="M38 35 L45 29 L52 35 L52 80 L38 80 Z" fill={color} opacity="0.2" />
          <rect x="58" y="20" width="14" height="60" rx="2" fill="url(#bar1g)" />
          <path d="M58 20 L65 14 L72 20 L72 80 L58 80 Z" fill={color} opacity="0.2" />
          <polyline points="25,50 45,35 65,20" stroke={color} strokeWidth="2.5" strokeDasharray="4,2" opacity="0.8" />
          <circle cx="25" cy="50" r="3" fill={color} />
          <circle cx="45" cy="35" r="3" fill={color} />
          <circle cx="65" cy="20" r="3" fill={color} />
        </g>
      </svg>
    ),
    digital: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="digFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="digShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#digShadow)">
          <rect x="15" y="20" width="70" height="50" rx="5" fill="url(#digFace)" />
          <rect x="20" y="25" width="60" height="40" rx="3" fill="black" opacity="0.5" />
          <rect x="40" y="72" width="20" height="6" rx="2" fill={color} opacity="0.6" />
          <rect x="30" y="78" width="40" height="3" rx="1.5" fill={color} opacity="0.4" />
          <circle cx="38" cy="44" r="8" fill={color} opacity="0.7" />
          <circle cx="38" cy="44" r="4" fill="white" opacity="0.8" />
          <path d="M52 38 L70 38" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M52 44 L66 44" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M52 50 L62 50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </g>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="shShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#shShadow)">
          <path d="M50 10 L82 24 L82 52 Q82 74 50 90 Q18 74 18 52 L18 24 Z" fill="url(#shFace)" />
          <path d="M50 10 L82 24 L82 52 Q82 74 50 90 Q50 74 50 52 L50 10 Z" fill={color} opacity="0.15" />
          <path d="M36 48 L46 58 L66 38" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </g>
      </svg>
    ),
    book: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bookFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <filter id="bookShadow">
            <feDropShadow dx="2" dy="6" stdDeviation="6" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#bookShadow)">
          <rect x="14" y="16" width="38" height="68" rx="3" fill="url(#bookFace)" />
          <rect x="48" y="16" width="38" height="68" rx="3" fill={color} opacity="0.6" />
          <rect x="46" y="14" width="8" height="72" rx="2" fill={color} opacity="0.9" />
          <rect x="22" y="30" width="22" height="2.5" rx="1" fill="white" opacity="0.7" />
          <rect x="22" y="38" width="18" height="2.5" rx="1" fill="white" opacity="0.6" />
          <rect x="22" y="46" width="20" height="2.5" rx="1" fill="white" opacity="0.5" />
          <rect x="22" y="54" width="16" height="2.5" rx="1" fill="white" opacity="0.5" />
          <rect x="56" y="30" width="22" height="2.5" rx="1" fill="white" opacity="0.7" />
          <rect x="56" y="38" width="18" height="2.5" rx="1" fill="white" opacity="0.6" />
          <rect x="56" y="46" width="20" height="2.5" rx="1" fill="white" opacity="0.5" />
          <rect x="56" y="54" width="16" height="2.5" rx="1" fill="white" opacity="0.5" />
        </g>
      </svg>
    ),
    graduation: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="gradShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#gradShadow)">
          <polygon points="50,12 88,34 50,46 12,34" fill="url(#gradFace)" />
          <polygon points="50,12 88,34 88,36 50,48 12,36 12,34" fill={color} opacity="0.3" />
          <path d="M72 40 L72 62 Q72 74 50 78 Q28 74 28 62 L28 40 L50 48 Z" fill="url(#gradFace)" opacity="0.85" />
          <path d="M28 40 L50 48 L50 78 Q28 74 28 62 Z" fill={color} opacity="0.15" />
          <rect x="82" y="34" width="5" height="24" rx="2.5" fill={color} opacity="0.7" />
          <ellipse cx="84.5" cy="60" rx="6" ry="4" fill={color} opacity="0.5" />
        </g>
      </svg>
    ),
    building: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="buildFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="buildShadow">
            <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor={color} floodOpacity="0.35" />
          </filter>
        </defs>
        <g filter="url(#buildShadow)">
          <rect x="18" y="30" width="48" height="58" rx="2" fill="url(#buildFace)" />
          <path d="M66 30 L80 38 L80 88 L66 88 Z" fill={color} opacity="0.25" />
          <rect x="24" y="40" width="10" height="10" rx="1" fill="white" opacity="0.5" />
          <rect x="40" y="40" width="10" height="10" rx="1" fill="white" opacity="0.5" />
          <rect x="56" y="40" width="8" height="10" rx="1" fill="white" opacity="0.35" />
          <rect x="24" y="56" width="10" height="10" rx="1" fill="white" opacity="0.5" />
          <rect x="40" y="56" width="10" height="10" rx="1" fill="white" opacity="0.5" />
          <rect x="56" y="56" width="8" height="10" rx="1" fill="white" opacity="0.35" />
          <rect x="35" y="70" width="14" height="18" rx="2" fill="white" opacity="0.6" />
          <polygon points="42,14 18,30 66,30" fill={color} opacity="0.8" />
        </g>
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="starFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="starShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.5" />
          </filter>
        </defs>
        <g filter="url(#starShadow)">
          <polygon
            points="50,10 61,38 92,38 67,56 77,84 50,66 23,84 33,56 8,38 39,38"
            fill="url(#starFace)"
          />
          <polygon
            points="50,10 61,38 92,38 67,56 77,84 50,66 50,10"
            fill={color}
            opacity="0.15"
          />
        </g>
      </svg>
    ),
    youth: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="youthFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="youthShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#youthShadow)">
          <circle cx="50" cy="28" r="14" fill="url(#youthFace)" />
          <circle cx="50" cy="28" r="14" fill={color} opacity="0.1" />
          <path d="M24 82 Q24 58 50 58 Q76 58 76 82" fill="url(#youthFace)" opacity="0.85" />
          <path d="M50 58 Q76 58 76 82 L50 82 Z" fill={color} opacity="0.15" />
          <path d="M30 60 Q20 50 16 68" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M70 60 Q80 50 84 68" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <circle cx="30" cy="72" r="7" fill={color} opacity="0.5" />
          <circle cx="70" cy="72" r="7" fill={color} opacity="0.5" />
        </g>
      </svg>
    ),
    rocket: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rocketFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="rocketShadow">
            <feDropShadow dx="2" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#rocketShadow)">
          <path d="M50 8 Q68 20 68 50 L68 72 Q50 80 32 72 L32 50 Q32 20 50 8Z" fill="url(#rocketFace)" />
          <path d="M50 8 Q68 20 68 50 L68 72 Q50 80 50 72 L50 8Z" fill={color} opacity="0.15" />
          <circle cx="50" cy="40" r="10" fill="white" opacity="0.2" />
          <circle cx="50" cy="40" r="6" fill={color} opacity="0.8" />
          <path d="M32 62 L18 72 L18 80 L32 76 Z" fill={color} opacity="0.6" />
          <path d="M68 62 L82 72 L82 80 L68 76 Z" fill={color} opacity="0.6" />
          <path d="M40 76 Q50 90 60 76" fill={color} opacity="0.7" />
          <path d="M44 82 Q50 96 56 82" fill="orange" opacity="0.6" />
        </g>
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="globeFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
          <filter id="globeShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#globeShadow)">
          <circle cx="50" cy="50" r="36" fill="url(#globeFace)" />
          <circle cx="50" cy="50" r="36" fill={color} opacity="0.05" />
          <ellipse cx="50" cy="50" rx="18" ry="36" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <ellipse cx="50" cy="50" rx="36" ry="14" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <ellipse cx="50" cy="50" rx="36" ry="26" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
          <line x1="14" y1="50" x2="86" y2="50" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <line x1="50" y1="14" x2="50" y2="86" stroke="white" strokeWidth="1.5" opacity="0.3" />
        </g>
      </svg>
    ),
    network: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="netShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#netShadow)">
          <line x1="50" y1="18" x2="20" y2="50" stroke={color} strokeWidth="2" opacity="0.5" />
          <line x1="50" y1="18" x2="80" y2="50" stroke={color} strokeWidth="2" opacity="0.5" />
          <line x1="50" y1="18" x2="50" y2="70" stroke={color} strokeWidth="2" opacity="0.5" />
          <line x1="20" y1="50" x2="50" y2="70" stroke={color} strokeWidth="2" opacity="0.4" />
          <line x1="80" y1="50" x2="50" y2="70" stroke={color} strokeWidth="2" opacity="0.4" />
          <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="2" opacity="0.35" />
          <circle cx="50" cy="18" r="9" fill={color} opacity="0.9" />
          <circle cx="50" cy="18" r="5" fill="white" opacity="0.6" />
          <circle cx="20" cy="50" r="8" fill={color} opacity="0.8" />
          <circle cx="80" cy="50" r="8" fill={color} opacity="0.8" />
          <circle cx="50" cy="70" r="9" fill={color} opacity="0.85" />
          <circle cx="50" cy="70" r="5" fill="white" opacity="0.5" />
        </g>
      </svg>
    ),
    innovation: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="innFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="innShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#innShadow)">
          <path d="M50 10 Q72 18 72 42 Q72 58 62 64 L62 74 L38 74 L38 64 Q28 58 28 42 Q28 18 50 10Z" fill="url(#innFace)" />
          <path d="M50 10 Q72 18 72 42 Q72 58 62 64 L62 74 L50 74 L50 10Z" fill={color} opacity="0.15" />
          <rect x="38" y="74" width="24" height="6" rx="2" fill={color} opacity="0.7" />
          <rect x="40" y="80" width="20" height="6" rx="2" fill={color} opacity="0.6" />
          <line x1="50" y1="28" x2="50" y2="56" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="38" y1="40" x2="62" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </g>
      </svg>
    ),
    flag: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flagFace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="flagShadow">
            <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#flagShadow)">
          <rect x="20" y="14" width="5" height="76" rx="2.5" fill={color} opacity="0.7" />
          <path d="M25 16 Q60 10 72 24 Q60 38 25 36 Z" fill="url(#flagFace)" />
          <path d="M25 16 Q60 10 72 24 L72 24 Q60 38 25 36 Z" fill={color} opacity="0.1" />
          <path d="M25 40 Q60 34 72 48 Q60 62 25 60 Z" fill={color} opacity="0.7" />
        </g>
      </svg>
    ),
  };

  return icons[type] || icons["document"];
};

// ─────────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────────

const AGENCIES = [
  {
    id: "soliq",
    shortName: "SOLIQ XIZMATI",
    fullName: "O'zbekiston Respublikasi Soliq Xizmati",
    subtitle: "Davlat Soliq Qo'mitasi",
    accent: "#C8992A",
    accentLight: "#E8C060",
    accentDark: "#8A6510",
    bgFrom: "#0A1628",
    bgTo: "#0F2347",
    emblemIcon: "balance",
    heroStat: "142.3 trln",
    heroLabel: "2024-yil yig'ilgan soliqlar",
    slides: [
      {
        type: "cover",
        title: "O'ZBEKISTON RESPUBLIKASI\nSOLIQ XIZMATI",
        subtitle: "Davlat byudjetini mustahkamlash yo'lida",
        year: "2024",
        iconType: "balance",
      },
      {
        type: "mission",
        title: "Missiya va Vazifalar",
        iconType: "flag",
        points: [
          { icon: "document", title: "Soliq ma'muriyatchiligini takomillashtirish", desc: "Soliqlarni undirish, hisob-kitob qilish va nazorat qilish tizimini modernizatsiya qilish orqali davlat byudjetini mustahkamlash." },
          { icon: "shield", title: "Soliq to'lovchilar bilan hamkorlik", desc: "Fuqarolar va tadbirkorlar uchun qulay, shaffof xizmatlar ko'rsatish, maslahat va yordam berish tizimini rivojlantirish." },
          { icon: "chart", title: "Shaffoflik va hisobdorlik", desc: "Byudjet daromadlari haqida ochiq ma'lumot berish, jamoatchilik nazoratini kuchaytirishga ko'maklashish." },
          { icon: "digital", title: "Raqamlashtirish strategiyasi", desc: "Elektron xizmatlar, onlayn platforma va mobil ilovalar orqali soliq to'lash imkoniyatlarini kengaytirish." },
        ],
      },
      {
        type: "stats",
        title: "2024-yil Asosiy Ko'rsatkichlari",
        stats: [
          { value: "142.3", unit: "trln so'm", label: "Yig'ilgan soliqlar", trend: "+18.4%", iconType: "chart" },
          { value: "2.4", unit: "mln", label: "Faol soliq to'lovchilar", trend: "+12%", iconType: "youth" },
          { value: "94.2", unit: "%", label: "Elektron xizmatlar ulushi", trend: "+7%", iconType: "digital" },
          { value: "48", unit: "soat", label: "Murojaatga javob vaqti", trend: "−60%", iconType: "shield" },
        ],
      },
      {
        type: "services",
        title: "Ko'rsatiladigan Asosiy Xizmatlar",
        iconType: "document",
        services: [
          { name: "Soliq deklaratsiyasi topshirish", tag: "Online 24/7", iconType: "document" },
          { name: "QQS qaytarish talablari", tag: "Avtomatik", iconType: "chart" },
          { name: "Biznes ro'yxatdan o'tkazish", tag: "1 kun ichida", iconType: "building" },
          { name: "Soliq qarzlari bo'yicha maslahat", tag: "Bepul", iconType: "shield" },
          { name: "Elektron imzo xizmati", tag: "Xavfsiz", iconType: "digital" },
          { name: "Mobil ilova xizmatlari", tag: "iOS & Android", iconType: "network" },
        ],
      },
      {
        type: "digital",
        title: "Raqamli Transformatsiya",
        iconType: "digital",
        items: [
          { icon: "digital", title: "my.soliq.uz portali", desc: "6,000,000+ foydalanuvchi ro'yxatdan o'tgan yagona raqamli platforma", metric: "6M+", metricLabel: "Foydalanuvchi" },
          { icon: "document", title: "Elektron hisob-faktura", desc: "Barcha korxonalar uchun majburiy elektron format joriy etildi", metric: "100%", metricLabel: "Qamrov" },
          { icon: "chart", title: "Soliq kalkulyatori", desc: "Real vaqt rejimida hisob-kitob qilish imkoniyati", metric: "24/7", metricLabel: "Xizmat" },
          { icon: "network", title: "AI nazorat tizimi", desc: "Sun'iy intellekt yordamida soliq risklarini avtomatik aniqlash", metric: "AI", metricLabel: "Texnologiya" },
        ],
      },
      {
        type: "structure",
        title: "Tashkiliy Tuzilma",
        iconType: "building",
        levels: [
          { name: "Davlat Soliq Qo'mitasi", role: "Markaziy boshqaruv organi", count: "1", iconType: "shield" },
          { name: "Viloyat soliq boshqarmalari", role: "Mintaqaviy bo'linmalar", count: "14", iconType: "building" },
          { name: "Shahar va tuman inspeksiyalari", role: "Mahalliy xizmat ko'rsatish", count: "196", iconType: "network" },
          { name: "Malakali xodimlar", role: "Jami tarkibiy xodimlar", count: "11 000+", iconType: "youth" },
        ],
      },
      {
        type: "reforms",
        title: "2024–2026 Islohotlar Dasturi",
        iconType: "rocket",
        reforms: [
          { year: "2024", title: "Yangilangan Soliq kodeksi", status: "Bajarilmoqda", pct: 75, iconType: "document" },
          { year: "2025", title: "Blockchain soliq registri", status: "Ishlab chiqilmoqda", pct: 40, iconType: "digital" },
          { year: "2025", title: "AI-asosli audit tizimi", status: "Ishlab chiqilmoqda", pct: 45, iconType: "network" },
          { year: "2026", title: "To'liq qog'ozsiz ish yuritish", status: "Rejada", pct: 10, iconType: "globe" },
        ],
      },
      {
        type: "contact",
        title: "Aloqa Ma'lumotlari",
        iconType: "globe",
        contacts: [
          { icon: "globe", label: "Rasmiy portal", value: "my.soliq.uz" },
          { icon: "digital", label: "Ish markazi", value: "1198" },
          { icon: "building", label: "Manzil", value: "Toshkent sh., Amir Temur ko'ch." },
          { icon: "document", label: "Elektron pochta", value: "info@soliq.uz" },
        ],
      },
    ],
  },

  {
    id: "maktab",
    shortName: "TA'LIM VAZIRLIGI",
    fullName: "Maktabgacha va Maktab Ta'limi Vazirligi",
    subtitle: "Uzluksiz Ta'lim Tizimi",
    accent: "#2A8C5A",
    accentLight: "#4AB878",
    accentDark: "#1A6040",
    bgFrom: "#051410",
    bgTo: "#0A2C1E",
    emblemIcon: "graduation",
    heroStat: "5.2M",
    heroLabel: "O'quvchi va tarbiyalanuvchilar",
    slides: [
      {
        type: "cover",
        title: "MAKTABGACHA VA MAKTAB\nTA'LIMI VAZIRLIGI",
        subtitle: "Barkamol avlod tarbiyasi — kelajak poydevori",
        year: "2024",
        iconType: "graduation",
      },
      {
        type: "mission",
        title: "Missiya va Strategik Maqsadlar",
        iconType: "star",
        points: [
          { icon: "book", title: "Maktabgacha ta'limni rivojlantirish", desc: "3–6 yoshli bolalar uchun sifatli, qulaylik va tenglikka asoslangan maktabgacha ta'lim muassasalarini kengaytirish." },
          { icon: "graduation", title: "Umumiy o'rta ta'limni takomillashtirish", desc: "Zamonaviy o'quv dasturlari, innovatsion usullar va raqamli resurslarni ta'lim jarayoniga joriy etish." },
          { icon: "network", title: "O'qituvchilar salohiyatini oshirish", desc: "Pedagoglarni qayta tayyorlash, malaka oshirish va ularning kasbiy rivojlanishini qo'llab-quvvatlash." },
          { icon: "building", title: "Maktab infratuzilmasini modernizatsiya qilish", desc: "Barcha hududlarda zamonaviy maktab binolari, laboratoriyalar va sport zallari qurish hamda ta'mirlash." },
        ],
      },
      {
        type: "stats",
        title: "2024-yil Qamrovi va Natijalari",
        stats: [
          { value: "5.2", unit: "mln", label: "Jami o'quvchilar", trend: "+4.3%", iconType: "graduation" },
          { value: "10 700", unit: "+", label: "Umumta'lim maktablari", trend: "+2%", iconType: "building" },
          { value: "72.4", unit: "%", label: "Maktabgacha qamrov", trend: "+8%", iconType: "book" },
          { value: "494 000", unit: "+", label: "Pedagogik xodimlar", trend: "+3%", iconType: "youth" },
        ],
      },
      {
        type: "services",
        title: "Asosiy Dasturlar va Loyihalar",
        iconType: "book",
        services: [
          { name: "Maktabgacha ta'lim muassasalari kengaytirish", tag: "Ustuvor loyiha", iconType: "building" },
          { name: "Zamonaviy o'quv dasturlarini joriy etish", tag: "Yangilandi", iconType: "book" },
          { name: "Raqamli ta'lim platformasi", tag: "EduNet", iconType: "digital" },
          { name: "O'qituvchilar malaka oshirish tizimi", tag: "Doimiy", iconType: "graduation" },
          { name: "Inklyuziv ta'lim rivojlantirish", tag: "Barcha uchun", iconType: "network" },
          { name: "Iqtidorli yoshlarni qo'llab-quvvatlash", tag: "Olimpiadalar", iconType: "star" },
        ],
      },
      {
        type: "digital",
        title: "Raqamli Ta'lim Ekotizimi",
        iconType: "digital",
        items: [
          { icon: "digital", title: "EduNet platforma", desc: "O'quvchilar, o'qituvchilar va ota-onalar uchun birlashtirilgan raqamli ta'lim muhiti", metric: "2.1M+", metricLabel: "Foydalanuvchi" },
          { icon: "book", title: "Elektron darsliklar", desc: "Barcha sinf va fanlar uchun interaktiv elektron o'quv materiallari", metric: "1400+", metricLabel: "Darslik" },
          { icon: "network", title: "Masofaviy ta'lim tizimi", desc: "Internet qamrovi cheklanigan hududlar uchun maxsus onlayn ta'lim modeli", metric: "340+", metricLabel: "Maktab" },
          { icon: "chart", title: "Monitoring tizimi", desc: "O'quvchilar natijalari va ta'lim sifatini real vaqtda kuzatib borish", metric: "Real", metricLabel: "Vaqt" },
        ],
      },
      {
        type: "structure",
        title: "Boshqaruv Tizimi",
        iconType: "building",
        levels: [
          { name: "Vazirlik markaziy apparati", role: "Siyosatni belgilash va monitoring", count: "1", iconType: "shield" },
          { name: "Viloyat ta'lim boshqarmalari", role: "Mintaqaviy boshqaruv", count: "14", iconType: "building" },
          { name: "Tuman ta'lim bo'limlari", role: "Mahalliy nazorat", count: "196", iconType: "network" },
          { name: "Pedagogik xodimlar", role: "Bevosita ta'lim beruvchilar", count: "494 000+", iconType: "graduation" },
        ],
      },
      {
        type: "reforms",
        title: "Strategik Rivojlanish Yo'nalishlari",
        iconType: "rocket",
        reforms: [
          { year: "2024", title: "Maktabgacha qamrovni 80%ga yetkazish", status: "Amalga oshirilmoqda", pct: 72, iconType: "building" },
          { year: "2025", title: "Yangi avlod o'quv dasturlari", status: "Ishlab chiqilmoqda", pct: 55, iconType: "book" },
          { year: "2025", title: "STEM ta'limini kengaytirish", status: "Boshlangan", pct: 40, iconType: "innovation" },
          { year: "2026", title: "100% raqamli ta'lim muhiti", status: "Rejada", pct: 25, iconType: "digital" },
        ],
      },
      {
        type: "contact",
        title: "Aloqa va Ma'lumot",
        iconType: "globe",
        contacts: [
          { icon: "globe", label: "Rasmiy veb-sayt", value: "uzedu.uz" },
          { icon: "digital", label: "Qo'ng'iroq markazi", value: "1090" },
          { icon: "building", label: "Manzil", value: "Toshkent sh., Mustakillik kochasi" },
          { icon: "document", label: "Elektron pochta", value: "info@uzedu.uz" },
        ],
      },
    ],
  },

  {
    id: "yoshlar",
    shortName: "YOSHLAR AGENTLIGI",
    fullName: "O'zbekiston Yoshlar Ishlari Agentligi",
    subtitle: "Yoshlar Siyosati va Rivojlanish",
    accent: "#1A7DC8",
    accentLight: "#3AA0E8",
    accentDark: "#0F5A92",
    bgFrom: "#060E18",
    bgTo: "#0A1E35",
    emblemIcon: "youth",
    heroStat: "11M+",
    heroLabel: "Agentlik tomonidan qamrab olingan yoshlar",
    slides: [
      {
        type: "cover",
        title: "O'ZBEKISTON YOSHLAR\nISHLARI AGENTLIGI",
        subtitle: "Yoshlarning salohiyatini ochish — davlatimizning ustuvor vazifasi",
        year: "2024",
        iconType: "youth",
      },
      {
        type: "mission",
        title: "Missiya va Asosiy Yo'nalishlar",
        iconType: "star",
        points: [
          { icon: "youth", title: "Yoshlar siyosatini amalga oshirish", desc: "14–30 yoshli yoshlar manfaatlarini himoya qilish va ularning jamiyatga integratsiyasini ta'minlash." },
          { icon: "innovation", title: "Tadbirkorlik ruhini shakllantirish", desc: "Yoshlar orasida biznes ko'nikmalari, startaplar va innovatsion g'oyalarni qo'llab-quvvatlash." },
          { icon: "globe", title: "Xalqaro hamkorlik", desc: "Yoshlarning xorijiy ta'lim, staj va xalqaro loyihalarda ishtirokini kengaytirish." },
          { icon: "rocket", title: "Kasbga yo'naltirish va bandlik", desc: "Yoshlar ishsizligini kamaytirish uchun kasbiy tayyorgarlik va mehnat bozoriga kirish dasturlarini rivojlantirish." },
        ],
      },
      {
        type: "stats",
        title: "2024-yil Asosiy Ko'rsatkichlari",
        stats: [
          { value: "11", unit: "mln+", label: "Qamrab olingan yoshlar", trend: "+6.2%", iconType: "youth" },
          { value: "6 800", unit: "+", label: "Loyihalar va tadbirlar", trend: "+22%", iconType: "star" },
          { value: "142 000", unit: "+", label: "Yoshlar ish bilan ta'minlangan", trend: "+18%", iconType: "rocket" },
          { value: "340", unit: "+", label: "Xalqaro hamkorlik dasturlari", trend: "+30%", iconType: "globe" },
        ],
      },
      {
        type: "services",
        title: "Dasturlar va Tashabbuslar",
        iconType: "rocket",
        services: [
          { name: "Yoshlar markazlari tarmog'i", tag: "300+ markaz", iconType: "building" },
          { name: "Startap va biznes inkubatorlari", tag: "Yangi", iconType: "innovation" },
          { name: "Xalqaro ta'lim granslari", tag: "2000+ solishtiruvchi", iconType: "graduation" },
          { name: "Ixtiyoriy harakatlar tarmog'i", tag: "50 000+ faol", iconType: "network" },
          { name: "Yoshlar parlamenti", tag: "Respublika", iconType: "flag" },
          { name: "Sport va ijodiy loyihalar", tag: "Barcha yo'nalish", iconType: "star" },
        ],
      },
      {
        type: "digital",
        title: "Raqamli Platforma va Innovatsiyalar",
        iconType: "digital",
        items: [
          { icon: "digital", title: "yoshlar.uz portali", desc: "Yoshlar uchun ko'nikma, ta'lim va ish imkoniyatlarini birlashtirgan yagona platforma", metric: "890K+", metricLabel: "Foydalanuvchi" },
          { icon: "network", title: "Yoshlar jamg'armasi tizimi", desc: "Yoshlar loyihalari uchun moliyaviy qo'llab-quvvatlash va grant mexanizmlari", metric: "500B+", metricLabel: "So'm" },
          { icon: "rocket", title: "Startap ekotizimi", desc: "Innovatsion g'oyalarni qo'llab-quvvatlash uchun akselerator va mentorlik dasturlari", metric: "1200+", metricLabel: "Startap" },
          { icon: "globe", title: "Xalqaro almashinuv dasturlari", desc: "Xorijiy universitetlar va tashkilotlar bilan hamkorlik shartnomalar tizimi", metric: "48+", metricLabel: "Mamlakat" },
        ],
      },
      {
        type: "structure",
        title: "Tashkiliy Tuzilma va Tarmoq",
        iconType: "building",
        levels: [
          { name: "Agentlik markaziy idorasi", role: "Siyosat ishlab chiqish va boshqarish", count: "1", iconType: "flag" },
          { name: "Viloyat bo'linmalari", role: "Mintaqaviy faoliyat koordinatsiyasi", count: "14", iconType: "building" },
          { name: "Yoshlar markazlari", role: "Bevosita xizmat ko'rsatish nuqtalari", count: "300+", iconType: "youth" },
          { name: "Ixtiyoriy yoshlar xodimlari", role: "Jamoatchilik asosida faoliyat", count: "50 000+", iconType: "network" },
        ],
      },
      {
        type: "reforms",
        title: "2024–2027 Strategik Reja",
        iconType: "rocket",
        reforms: [
          { year: "2024", title: "Yoshlar markazlarini 400taga yetkazish", status: "Amalga oshirilmoqda", pct: 75, iconType: "building" },
          { year: "2025", title: "Yoshlar startap fondini kengaytirish", status: "Rejalashtirilmoqda", pct: 35, iconType: "innovation" },
          { year: "2026", title: "Har bir tuman yoshlar markazi", status: "Rejada", pct: 20, iconType: "network" },
          { year: "2027", title: "Xalqaro yoshlar markaziga aylantirish", status: "Strategik maqsad", pct: 10, iconType: "globe" },
        ],
      },
      {
        type: "contact",
        title: "Bog'lanish Yo'llari",
        iconType: "globe",
        contacts: [
          { icon: "globe", label: "Rasmiy portal", value: "yoshlar.uz" },
          { icon: "digital", label: "Ish markazi", value: "1030" },
          { icon: "building", label: "Manzil", value: "Toshkent sh., Yunusobod tumani" },
          { icon: "document", label: "Elektron pochta", value: "info@yoshlar.uz" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
//  PROGRESS BAR
// ─────────────────────────────────────────────────────────────────

const ProgressBar = ({ pct, accent }) => (
  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
    <div
      style={{
        height: "100%",
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
        borderRadius: "4px",
        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 10px ${accent}66`,
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  SLIDE RENDERERS
// ─────────────────────────────────────────────────────────────────

const CoverSlide = ({ slide, agency }) => (
  <div className="slide-content slide-cover">
    <div className="cover-icon-wrap">
      <Icon3D type={slide.iconType} size={110} color={agency.accent} />
    </div>
    <div className="cover-year-badge" style={{ borderColor: agency.accent, color: agency.accentLight }}>
      {slide.year}
    </div>
    <h1 className="cover-title" style={{ "--accent": agency.accent }}>
      {slide.title.split("\n").map((line, i) => (
        <span key={i}>{line}<br /></span>
      ))}
    </h1>
    <div className="cover-divider" style={{ background: `linear-gradient(90deg, transparent, ${agency.accent}, transparent)` }} />
    <p className="cover-subtitle" style={{ color: agency.accentLight }}>{slide.subtitle}</p>
    <div className="cover-stat-row">
      <div className="cover-stat">
        <span className="cover-stat-val" style={{ color: agency.accentLight }}>{agency.heroStat}</span>
        <span className="cover-stat-label">{agency.heroLabel}</span>
      </div>
    </div>
  </div>
);

const MissionSlide = ({ slide, agency }) => (
  <div className="slide-content slide-mission">
    <div className="slide-header">
      <Icon3D type={slide.iconType} size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="mission-grid">
      {slide.points.map((p, i) => (
        <div
          key={i}
          className="mission-card"
          style={{
            "--accent": agency.accent,
            "--accent-bg": `${agency.accent}14`,
            "--border": `${agency.accent}40`,
            animationDelay: `${i * 0.12}s`,
          }}
        >
          <div className="mission-icon"><Icon3D type={p.icon} size={42} color={agency.accent} /></div>
          <div className="mission-text">
            <h3 style={{ color: agency.accentLight }}>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatsSlide = ({ slide, agency }) => (
  <div className="slide-content slide-stats">
    <div className="slide-header">
      <Icon3D type="chart" size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="stats-grid">
      {slide.stats.map((s, i) => (
        <div
          key={i}
          className="stat-card"
          style={{
            "--accent": agency.accent,
            "--accent-bg": `${agency.accent}10`,
            "--border": `${agency.accent}40`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <div className="stat-icon"><Icon3D type={s.iconType} size={44} color={agency.accent} /></div>
          <div className="stat-value" style={{ color: agency.accentLight }}>
            {s.value}<span className="stat-unit">{s.unit}</span>
          </div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-trend" style={{ color: s.trend.startsWith("+") ? "#4ade80" : "#f87171" }}>
            {s.trend.startsWith("+") ? "▲" : "▼"} {s.trend}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ServicesSlide = ({ slide, agency }) => (
  <div className="slide-content slide-services">
    <div className="slide-header">
      <Icon3D type={slide.iconType} size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="services-grid">
      {slide.services.map((s, i) => (
        <div
          key={i}
          className="service-card"
          style={{
            "--accent": agency.accent,
            "--border": `${agency.accent}40`,
            "--accent-bg": `${agency.accent}0E`,
            animationDelay: `${i * 0.08}s`,
          }}
        >
          <div className="service-icon"><Icon3D type={s.iconType} size={38} color={agency.accent} /></div>
          <div className="service-info">
            <span className="service-name">{s.name}</span>
            <span className="service-tag" style={{ background: `${agency.accent}22`, color: agency.accentLight, border: `1px solid ${agency.accent}44` }}>{s.tag}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DigitalSlide = ({ slide, agency }) => (
  <div className="slide-content slide-digital">
    <div className="slide-header">
      <Icon3D type={slide.iconType} size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="digital-grid">
      {slide.items.map((item, i) => (
        <div
          key={i}
          className="digital-card"
          style={{
            "--accent": agency.accent,
            "--border": `${agency.accent}40`,
            "--accent-bg": `${agency.accent}0E`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <div className="digital-icon"><Icon3D type={item.icon} size={46} color={agency.accent} /></div>
          <div className="digital-metric" style={{ color: agency.accentLight }}>
            {item.metric}
            <span className="digital-metric-label">{item.metricLabel}</span>
          </div>
          <h3 style={{ color: "white", fontSize: "0.95rem", margin: "0 0 6px" }}>{item.title}</h3>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const StructureSlide = ({ slide, agency }) => (
  <div className="slide-content slide-structure">
    <div className="slide-header">
      <Icon3D type={slide.iconType} size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="structure-list">
      {slide.levels.map((lv, i) => (
        <div
          key={i}
          className="structure-item"
          style={{
            "--accent": agency.accent,
            "--border": `${agency.accent}40`,
            "--accent-bg": `${agency.accent}0E`,
            animationDelay: `${i * 0.12}s`,
          }}
        >
          <div className="structure-num" style={{ color: agency.accentLight, borderColor: `${agency.accent}50` }}>{String(i + 1).padStart(2, "0")}</div>
          <div className="structure-icon"><Icon3D type={lv.iconType} size={40} color={agency.accent} /></div>
          <div className="structure-info">
            <h3 style={{ color: "white" }}>{lv.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", margin: 0 }}>{lv.role}</p>
          </div>
          <div className="structure-count" style={{ color: agency.accentLight }}>{lv.count}</div>
        </div>
      ))}
    </div>
  </div>
);

const ReformsSlide = ({ slide, agency }) => (
  <div className="slide-content slide-reforms">
    <div className="slide-header">
      <Icon3D type={slide.iconType} size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="reforms-list">
      {slide.reforms.map((r, i) => (
        <div
          key={i}
          className="reform-item"
          style={{
            "--accent": agency.accent,
            "--border": `${agency.accent}40`,
            animationDelay: `${i * 0.12}s`,
          }}
        >
          <div className="reform-year-badge" style={{ background: `${agency.accent}22`, color: agency.accentLight, border: `1px solid ${agency.accent}55` }}>{r.year}</div>
          <div className="reform-icon"><Icon3D type={r.iconType} size={38} color={agency.accent} /></div>
          <div className="reform-body">
            <div className="reform-title-row">
              <span style={{ color: "white", fontWeight: 600 }}>{r.title}</span>
              <span className="reform-status" style={{ color: r.pct > 60 ? "#4ade80" : r.pct > 30 ? agency.accentLight : "rgba(255,255,255,0.45)" }}>{r.status}</span>
            </div>
            <ProgressBar pct={r.pct} accent={agency.accent} />
            <span style={{ color: agency.accentLight, fontSize: "0.78rem" }}>{r.pct}% bajarilgan</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactSlide = ({ slide, agency }) => (
  <div className="slide-content slide-contact">
    <div className="slide-header">
      <Icon3D type={slide.iconType} size={50} color={agency.accent} />
      <h2 className="slide-title" style={{ "--accent": agency.accent }}>{slide.title}</h2>
    </div>
    <div className="contact-grid">
      {slide.contacts.map((c, i) => (
        <div
          key={i}
          className="contact-card"
          style={{
            "--accent": agency.accent,
            "--border": `${agency.accent}40`,
            "--accent-bg": `${agency.accent}10`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <div className="contact-icon"><Icon3D type={c.icon} size={46} color={agency.accent} /></div>
          <div className="contact-label" style={{ color: "rgba(255,255,255,0.5)" }}>{c.label}</div>
          <div className="contact-value" style={{ color: agency.accentLight }}>{c.value}</div>
        </div>
      ))}
    </div>
    <div className="contact-footer" style={{ borderColor: `${agency.accent}30` }}>
      <div className="contact-org-icon"><Icon3D type={agency.emblemIcon} size={52} color={agency.accent} /></div>
      <div>
        <div style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>{agency.fullName}</div>
        <div style={{ color: agency.accentLight, fontSize: "0.85rem", marginTop: 4 }}>{agency.subtitle}</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  SLIDE DISPATCHER
// ─────────────────────────────────────────────────────────────────

const SlideRenderer = ({ slide, agency }) => {
  const map = {
    cover: CoverSlide,
    mission: MissionSlide,
    stats: StatsSlide,
    services: ServicesSlide,
    digital: DigitalSlide,
    structure: StructureSlide,
    reforms: ReformsSlide,
    contact: ContactSlide,
  };
  const Comp = map[slide.type];
  return Comp ? <Comp slide={slide} agency={agency} /> : null;
};

// ─────────────────────────────────────────────────────────────────
//  AGENCY SELECTOR
// ─────────────────────────────────────────────────────────────────

const AgencySelector = ({ agencies, activeIdx, onChange }) => (
  <div className="agency-selector">
    {agencies.map((ag, i) => (
      <button
        key={ag.id}
        className={`agency-btn ${i === activeIdx ? "active" : ""}`}
        style={{
          "--accent": ag.accent,
          "--border-active": ag.accent,
          "--bg-active": `${ag.accent}18`,
        }}
        onClick={() => onChange(i)}
      >
        <span className="agency-btn-icon"><Icon3D type={ag.emblemIcon} size={22} color={i === activeIdx ? ag.accent : "rgba(255,255,255,0.35)"} /></span>
        <span className="agency-btn-label">{ag.shortName}</span>
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  SLIDE DOT NAVIGATION
// ─────────────────────────────────────────────────────────────────

const SlideDots = ({ count, active, accent, onChange }) => (
  <div className="slide-dots">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        className={`dot ${i === active ? "dot-active" : ""}`}
        style={{ background: i === active ? accent : "rgba(255,255,255,0.2)", boxShadow: i === active ? `0 0 8px ${accent}` : "none" }}
        onClick={() => onChange(i)}
        aria-label={`Slayd ${i + 1}`}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  BACKGROUND PARTICLES
// ─────────────────────────────────────────────────────────────────

const Particles = ({ accent }) => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * -10,
  }));
  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: accent,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────────────────────────

export default function App() {
  const [agencyIdx, setAgencyIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [autoplay, setAutoplay] = useState(true);
  const autoRef = useRef(null);

  const agency = AGENCIES[agencyIdx];
  const slides = agency.slides;
  const totalSlides = slides.length;

  const goSlide = useCallback(
    (newIdx, dir = "next") => {
      if (animating) return;
      setAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setSlideIdx(newIdx);
        setAnimating(false);
      }, 380);
    },
    [animating]
  );

  const nextSlide = useCallback(() => {
    goSlide((slideIdx + 1) % totalSlides, "next");
  }, [slideIdx, totalSlides, goSlide]);

  const prevSlide = useCallback(() => {
    goSlide((slideIdx - 1 + totalSlides) % totalSlides, "prev");
  }, [slideIdx, totalSlides, goSlide]);

  useEffect(() => {
    if (autoplay) {
      autoRef.current = setInterval(nextSlide, 6000);
    }
    return () => clearInterval(autoRef.current);
  }, [autoplay, nextSlide]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const newIdx = e.key === "ArrowDown" ? (agencyIdx + 1) % AGENCIES.length : (agencyIdx - 1 + AGENCIES.length) % AGENCIES.length;
        setAgencyIdx(newIdx);
        setSlideIdx(0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide, agencyIdx]);

  const changeAgency = (i) => {
    setAgencyIdx(i);
    setSlideIdx(0);
  };

  return (
    <div
      className="app-root"
      style={{
        background: `linear-gradient(135deg, ${agency.bgFrom} 0%, ${agency.bgTo} 60%, ${agency.bgFrom} 100%)`,
        "--accent": agency.accent,
        "--accent-light": agency.accentLight,
      }}
    >
      <Particles accent={agency.accent} />

      {/* Grid overlay */}
      <div className="grid-overlay" style={{ "--accent": `${agency.accent}08` }} />

      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-logo">
          <Icon3D type={agency.emblemIcon} size={32} color={agency.accent} />
          <span className="topbar-name" style={{ color: agency.accentLight }}>{agency.shortName}</span>
        </div>
        <AgencySelector agencies={AGENCIES} activeIdx={agencyIdx} onChange={changeAgency} />
        <button
          className={`autoplay-btn ${autoplay ? "on" : "off"}`}
          style={{ "--accent": agency.accent }}
          onClick={() => setAutoplay((v) => !v)}
          title={autoplay ? "Avtomatik rejimni o'chirish" : "Avtomatik rejimni yoqish"}
        >
          {autoplay ? "⏸ Pauza" : "▶ Auto"}
        </button>
      </header>

      {/* Slide area */}
      <main className="slide-area">
        <button
          className="nav-btn nav-prev"
          style={{ "--accent": agency.accent }}
          onClick={prevSlide}
          aria-label="Oldingi slayd"
        >
          ‹
        </button>

        <div
          className={`slide-wrapper ${animating ? (direction === "next" ? "slide-exit-next" : "slide-exit-prev") : "slide-enter"}`}
          key={`${agencyIdx}-${slideIdx}`}
          style={{ "--accent": agency.accent, "--accent-bg": `${agency.accent}0A`, "--border": `${agency.accent}25` }}
        >
          <div className="slide-num-badge" style={{ color: agency.accentLight, borderColor: `${agency.accent}30` }}>
            {String(slideIdx + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </div>
          <SlideRenderer slide={slides[slideIdx]} agency={agency} />
        </div>

        <button
          className="nav-btn nav-next"
          style={{ "--accent": agency.accent }}
          onClick={nextSlide}
          aria-label="Keyingi slayd"
        >
          ›
        </button>
      </main>

      {/* Bottom bar */}
      <footer className="bottombar">
        <div className="bottombar-agency" style={{ color: "rgba(255,255,255,0.4)" }}>
          {agency.fullName}
        </div>
        <SlideDots count={totalSlides} active={slideIdx} accent={agency.accent} onChange={(i) => goSlide(i)} />
        <div className="progress-line" style={{ "--accent": agency.accent }}>
          <div
            className="progress-fill"
            style={{
              width: `${((slideIdx + 1) / totalSlides) * 100}%`,
              background: `linear-gradient(90deg, ${agency.accentDark}, ${agency.accentLight})`,
            }}
          />
        </div>
      </footer>
    </div>
  );
}