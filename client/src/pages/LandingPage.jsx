import { Link } from "react-router-dom";
import { ArrowRight, MapPinned, Leaf, Megaphone, ShieldCheck, CheckCircle2 } from "lucide-react";

/**
 * Fonts used: Fraunces (display serif) + Inter (body).
 * Add this to your index.html <head> if not already present:
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * Then in tailwind.config.js, extend your theme:
 * fontFamily: {
 *   display: ['Fraunces', 'serif'],
 *   sans: ['Inter', 'sans-serif'],
 * }
 */

// A quiet strip of chinar-leaf silhouettes, referencing Kashmiri papier-mâché
// border work without leaning on a stock photo.
function ChinarBorder({ className = "" }) {
  const leaf =
    "M12 2c3 3 8 5 8 11a8 8 0 1 1-16 0c0-6 5-8 8-11z";
  return (
    <svg
      viewBox="0 0 640 24"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 32 + 4} 0) scale(0.8)`}>
          <path d={leaf} fill={i % 2 === 0 ? "#C1440E" : "#D9A441"} opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

// Signature hero illustration: Pir Panjal ridgeline over Dal Lake with a
// shikara, built as flat SVG layers in the page's own palette.
function KashmirScape() {
  return (
    <svg viewBox="0 0 600 520" className="w-full h-auto" role="img" aria-label="Illustration of mountains over Dal Lake with a shikara boat">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3E4C2" />
          <stop offset="100%" stopColor="#EFD9B0" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C7C8C" />
          <stop offset="100%" stopColor="#2F5A69" />
        </linearGradient>
        <linearGradient id="reflection" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D6B7A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3D6B7A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="600" height="300" fill="url(#sky)" />
      <circle cx="480" cy="90" r="46" fill="#D9A441" opacity="0.85" />

      {/* far ridge */}
      <path
        d="M0 220 L60 160 L120 210 L190 130 L260 200 L330 120 L400 205 L470 150 L540 210 L600 175 L600 300 L0 300 Z"
        fill="#5B4636"
        opacity="0.35"
      />
      {/* near ridge */}
      <path
        d="M0 260 L80 190 L150 240 L230 170 L300 245 L380 175 L460 235 L540 195 L600 240 L600 300 L0 300 Z"
        fill="#33493C"
      />

      {/* chinar trees on the shoreline */}
      <g opacity="0.9">
        <circle cx="90" cy="255" r="20" fill="#B23A21" />
        <rect x="86" y="270" width="8" height="18" fill="#4A2E1E" />
        <circle cx="520" cy="250" r="16" fill="#C1440E" />
        <rect x="516" y="262" width="7" height="16" fill="#4A2E1E" />
      </g>

      {/* lake */}
      <rect x="0" y="300" width="600" height="220" fill="url(#water)" />
      {/* mountain reflection */}
      <path
        d="M0 300 L80 370 L150 320 L230 390 L300 315 L380 385 L460 325 L540 365 L600 320 L600 300 Z"
        fill="url(#reflection)"
        transform="scale(1,-1) translate(0,-600)"
        opacity="0.4"
      />

      {/* floating chinar leaves */}
      <g fill="#D9A441" opacity="0.8">
        <ellipse cx="140" cy="360" rx="7" ry="4" />
        <ellipse cx="165" cy="378" rx="6" ry="3.5" />
        <ellipse cx="440" cy="400" rx="7" ry="4" />
      </g>

      {/* shikara boat */}
      <g transform="translate(230,420)">
        <path
          d="M0 40 Q80 70 160 40 Q150 55 120 58 L40 58 Q10 55 0 40 Z"
          fill="#2B1B12"
        />
        <path d="M0 40 Q-14 24 4 12" stroke="#2B1B12" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M160 40 Q174 24 156 12" stroke="#2B1B12" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path
          d="M35 40 Q80 8 125 40"
          fill="none"
          stroke="#7A5A3A"
          strokeWidth="5"
        />
        <path d="M35 40 Q80 8 125 40" fill="#F3E4C2" opacity="0.9" />
      </g>
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-awaaz-background font-sans text-awaaz-text">
      <div className="max-w-7xl mx-auto px-8">
        <nav className="flex justify-between items-center pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#33493C] flex items-center justify-center">
              <MapPinned className="text-[#F3E9D2]" size={20} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold leading-none">
                Awaaz Kashmir
              </h2>
              <p className="text-xs text-[#5B4636] tracking-wide mt-0.5">
                Har Awaaz, Sunaaee Jaaye
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/login">
              <button className="border border-[#2B1B12]/20 px-5 py-2 rounded-xl hover:bg-[#2B1B12]/5 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-[#C1440E] text-[#F3E9D2] px-5 py-2 rounded-xl hover:bg-[#a83a0c] transition-colors">
                Register
              </button>
            </Link>
          </div>
        </nav>

        <ChinarBorder className="w-full h-4" />

        <div className="grid lg:grid-cols-2 items-center min-h-[75vh] gap-16 mt-8">
          <div>
            <span className="inline-block bg-[#33493C]/10 text-[#33493C] px-4 py-2 rounded-full text-sm font-medium tracking-wide">
              An AI-assisted civic platform for the Valley
            </span>

            <h1 className="font-display text-6xl font-black mt-8 leading-[1.05]">
              Your Voice.
              <br />
              <span className="text-[#C1440E]">Verified.</span>
              <br />
              Resolved.
            </h1>

            <p className="text-[#5B4636] mt-8 text-lg leading-8 max-w-md">
              From your mohalla to the authorities—report local issues, get them verified by your neighbours, and follow every update until they're resolved, across Kashmir.
            </p>

            <div className="flex gap-5 mt-10">
              <Link to="/register">
                <button className="bg-[#C1440E] text-[#F3E9D2] px-7 py-4 rounded-2xl flex items-center gap-2 hover:bg-[#a83a0c] transition-colors">
                  Get Started
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/map">
                <button className="border border-[#2B1B12]/20 px-7 py-4 rounded-2xl hover:bg-[#2B1B12]/5 transition-colors">
                  Explore Map
                </button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#2B1B12]/10">
            <KashmirScape />
          </div>
        </div>

        {/* 3-step process — a genuine sequence, so numbering earns its place */}
        <div className="grid sm:grid-cols-3 gap-6 py-20 border-t border-[#2B1B12]/10 mt-10">
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-full bg-[#C1440E]/10 flex items-center justify-center shrink-0">
              <Megaphone className="text-[#C1440E]" size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5B4636] tracking-widest">01 · REPORT</p>
              <h3 className="font-display text-xl font-bold mt-1">Speak up</h3>
              <p className="text-[#5B4636] text-sm mt-2 leading-6">
                Snap a photo of the pothole, the broken pipe, the blocked
                drain. Our AI tags the issue and location automatically.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-full bg-[#D9A441]/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-[#D9A441]" size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5B4636] tracking-widest">02 · VERIFY</p>
              <h3 className="font-display text-xl font-bold mt-1">Neighbours confirm</h3>
              <p className="text-[#5B4636] text-sm mt-2 leading-6">
                People nearby confirm what you've seen, so reports carry
                real weight before they reach anyone's desk.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-full bg-[#33493C]/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-[#33493C]" size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5B4636] tracking-widest">03 · RESOLVE</p>
              <h3 className="font-display text-xl font-bold mt-1">Track it through</h3>
              <p className="text-[#5B4636] text-sm mt-2 leading-6">
                Follow status updates from filed to fixed, in the open, so
                nothing quietly disappears.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pb-6 text-[#5B4636]/70 text-sm text-center w-full">
  <Leaf size={14} />
  <span>Built for every Mohalla</span>
</div>
      </div>
    </div>
  );
}