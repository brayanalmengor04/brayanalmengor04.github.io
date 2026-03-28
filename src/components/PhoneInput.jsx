import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

/* ─── Country list ─────────────────────────────────────────────────────────── */
const COUNTRIES = [
    { code: "PA", name: "Panamá", dial: "+507" },
    { code: "US", name: "United States", dial: "+1" },
    { code: "MX", name: "México", dial: "+52" },
    { code: "CO", name: "Colombia", dial: "+57" },
    { code: "AR", name: "Argentina", dial: "+54" },
    { code: "BR", name: "Brasil", dial: "+55" },
    { code: "CL", name: "Chile", dial: "+56" },
    { code: "PE", name: "Perú", dial: "+51" },
    { code: "VE", name: "Venezuela", dial: "+58" },
    { code: "EC", name: "Ecuador", dial: "+593" },
    { code: "BO", name: "Bolivia", dial: "+591" },
    { code: "PY", name: "Paraguay", dial: "+595" },
    { code: "UY", name: "Uruguay", dial: "+598" },
    { code: "CR", name: "Costa Rica", dial: "+506" },
    { code: "HN", name: "Honduras", dial: "+504" },
    { code: "GT", name: "Guatemala", dial: "+502" },
    { code: "SV", name: "El Salvador", dial: "+503" },
    { code: "NI", name: "Nicaragua", dial: "+505" },
    { code: "DO", name: "Rep. Dominicana", dial: "+1" },
    { code: "CU", name: "Cuba", dial: "+53" },
    { code: "ES", name: "España", dial: "+34" },
    { code: "GB", name: "United Kingdom", dial: "+44" },
    { code: "DE", name: "Deutschland", dial: "+49" },
    { code: "FR", name: "France", dial: "+33" },
    { code: "IT", name: "Italia", dial: "+39" },
    { code: "PT", name: "Portugal", dial: "+351" },
    { code: "CA", name: "Canada", dial: "+1" },
    { code: "CN", name: "China", dial: "+86" },
    { code: "JP", name: "Japan", dial: "+81" },
    { code: "KR", name: "Korea", dial: "+82" },
    { code: "IN", name: "India", dial: "+91" },
    { code: "AU", name: "Australia", dial: "+61" },
];

const DEFAULT = COUNTRIES[0]; // Panama +507

/* flagsapi.com — free CDN, no API key. Format: /{CODE}/flat/32.png */
const flagSrc = (code) => `https://flagsapi.com/${code}/flat/32.png`;

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function Flag({ code }) {
    return (
        <img
            src={flagSrc(code)}
            alt={code}
            width={22}
            height={22}
            style={{ objectFit: "contain", flexShrink: 0, display: "block" }}
        />
    );
}

function Chevron({ open }) {
    return (
        <svg
            width={13} height={13}
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{
                flexShrink: 0,
                transition: "transform 0.22s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

/* ─── PhoneInput ─────────────────────────────────────────────────────────── */
export default function PhoneInput({
    value = "",
    onChange,
    name = "phone",
    placeholder = "6123-4567",
}) {
    const [country, setCountry] = useState(DEFAULT);
    const [number, setNumber] = useState("");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 280 });

    const wrapRef = useRef(null);
    const searchRef = useRef(null);

    /* Parse initial value once */
    useEffect(() => {
        if (!value) return;
        const match = COUNTRIES.find((c) => value.startsWith(c.dial + " "));
        if (match) { setCountry(match); setNumber(value.slice(match.dial.length + 1)); }
        else { setNumber(value); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Close on outside click */
    useEffect(() => {
        function onOut(e) {
            const portal = document.getElementById("pi-portal");
            if (
                wrapRef.current && !wrapRef.current.contains(e.target) &&
                !(portal && portal.contains(e.target))
            ) { setOpen(false); setSearch(""); }
        }
        document.addEventListener("mousedown", onOut);
        return () => document.removeEventListener("mousedown", onOut);
    }, []);

    /* Auto-focus search */
    useEffect(() => {
        if (open && searchRef.current)
            setTimeout(() => searchRef.current?.focus(), 40);
    }, [open]);

    /* Emit combined value */
    useEffect(() => {
        const combined = number ? `${country.dial} ${number}` : "";
        onChange?.({ target: { name, value: combined } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, number]);

    /* Compute portal position */
    function openDropdown() {
        if (wrapRef.current) {
            const r = wrapRef.current.getBoundingClientRect();
            setDropPos({
                top: r.bottom + window.scrollY + 6,
                left: r.left + window.scrollX,
                width: Math.max(r.width, 270),
            });
        }
        setOpen((v) => !v);
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return COUNTRIES.filter(
            (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q)
        );
    }, [search]);

    function pick(c) { setCountry(c); setOpen(false); setSearch(""); }

    /* ── Portal dropdown ── */
    const dropdown =
        open && typeof document !== "undefined"
            ? createPortal(
                <div
                    id="pi-portal"
                    style={{
                        position: "absolute",
                        top: dropPos.top,
                        left: dropPos.left,
                        width: dropPos.width,
                        zIndex: 999999,
                        borderRadius: "0.55rem",
                        border: "1px solid var(--border-primary)",
                        /* bg-card is set here AND in the CSS class — belt & suspenders */
                        background: "var(--bg-card)",
                        boxShadow: "var(--shadow-lg)",
                        overflow: "hidden",
                        animation: "piDropIn 0.16s ease",
                        /* Ensure the portal inherits the correct theme background */
                        colorScheme: "inherit",
                    }}
                    role="listbox"
                >
                    {/* Search */}
                    <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-primary)", background: "var(--bg-card)" }}>
                        <input
                            ref={searchRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar / Search"
                            className="pi-search-input"
                        />
                    </div>

                    {/* List */}
                    <ul
                        className="pi-list"
                        role="listbox"
                        style={{ margin: 0, padding: 0, listStyle: "none" }}
                    >
                        {filtered.length === 0 && (
                            <li className="pi-no-results">No results</li>
                        )}
                        {filtered.map((c) => {
                            const sel = c.code === country.code;
                            return (
                                <li
                                    key={c.code}
                                    className={`pi-list-item${sel ? " pi-list-item--sel" : ""}`}
                                    role="option"
                                    aria-selected={sel}
                                    onClick={() => pick(c)}
                                >
                                    <Flag code={c.code} />
                                    <span className="pi-country-name">{c.name}</span>
                                    <span className="pi-country-dial">{c.dial}</span>
                                    {sel && (
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                            stroke="var(--accent-primary)" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Footer */}
                    <div className="pi-footer">🇵🇦 Por defecto: Panamá +507</div>
                </div>,
                document.body
            )
            : null;

    /* ─── Render ─── */
    return (
        <>
            <style>{`
        /* ── Animation ── */
        @keyframes piDropIn {
          from { opacity:0; transform:translateY(-5px) scale(0.98); }
          to   { opacity:1; transform:translateY(0)   scale(1);     }
        }

        /* ── Wrapper ── */
        .pi-wrap {
          display: flex;
          width: 100%;
          border: 1.5px solid var(--border-primary);
          border-radius: 0.4rem;
          background: var(--bg-card);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pi-wrap:focus-within {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 25%, transparent);
        }

        /* ── Trigger button ── */
        .pi-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0.6rem 0.55rem 0.6rem 0.72rem;
          cursor: pointer;
          border: none;
          border-right: 1.5px solid var(--border-primary);
          background: transparent;
          color: var(--text-primary);
          white-space: nowrap;
          user-select: none;
          border-radius: 0.4rem 0 0 0.4rem;
          min-width: 88px;
          transition: background 0.12s;
          outline: none;
        }
        .pi-trigger:hover   { background: var(--bg-hover); }
        .pi-trigger:focus   { background: var(--bg-hover); }

        /* ── Number input ── */
        .pi-number {
          flex: 1;
          min-width: 0; /* Ensures input shrinks on very small screens */
          width: 100%;
          padding: 0.6rem 0.72rem;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.875rem;
        }
        .pi-number::placeholder { color: var(--text-muted); opacity: 0.65; }

        /* ── Portal search input ── */
        .pi-search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.82rem;
          padding: 0;
        }
        .pi-search-input::placeholder { color: var(--text-muted); opacity: 0.7; }

        /* ── List scroll container ── */
        .pi-list {
          max-height: 230px;
          overflow-y: auto;
          overscroll-behavior: contain;
          background: var(--bg-card);
        }
        /* Scrollbar styling — theme aware */
        .pi-list::-webkit-scrollbar       { width: 5px; }
        .pi-list::-webkit-scrollbar-track { background: var(--bg-card); }
        .pi-list::-webkit-scrollbar-thumb {
          background: var(--border-secondary);
          border-radius: 9999px;
        }
        .pi-list::-webkit-scrollbar-thumb:hover { background: var(--accent-primary); }

        /* ── List items ── */
        .pi-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.45rem 0.75rem;
          cursor: pointer;
          font-size: 0.82rem;
          color: var(--text-primary);
          background: var(--bg-card);
          transition: background 0.1s;
        }
        .pi-list-item:hover           { background: var(--bg-hover) !important; }
        .pi-list-item--sel            { background: color-mix(in srgb, var(--accent-primary) 12%, var(--bg-card)) !important; }

        .pi-country-name { flex: 1; opacity: 0.9; }
        .pi-country-dial {
          font-size: 0.75rem;
          font-weight: 700;
          opacity: 0.6;
          font-variant-numeric: tabular-nums;
        }

        .pi-no-results {
          padding: 0.75rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-align: center;
          background: var(--bg-card);
        }

        /* ── Footer ── */
        .pi-footer {
          padding: 0.35rem 0.75rem;
          border-top: 1px solid var(--border-primary);
          font-size: 0.68rem;
          color: var(--text-muted);
          text-align: center;
          background: var(--bg-card);
        }

        /* ─── Global focus ring for ALL form inputs (theme-aware) ─── */
        input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus,
        textarea:focus,
        select:focus {
          outline: none !important;
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 22%, transparent) !important;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
      `}</style>

            <div ref={wrapRef} className="pi-wrap">
                {/* Country selector */}
                <button
                    type="button"
                    className="pi-trigger"
                    onClick={openDropdown}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                >
                    <Flag code={country.code} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{country.dial}</span>
                    <Chevron open={open} />
                </button>

                {/* Phone number */}
                <input
                    type="tel"
                    className="pi-number"
                    placeholder={placeholder}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    autoComplete="tel-national"
                />
            </div>

            {/* Dropdown portal — always above everything */}
            {dropdown}
        </>
    );
}
