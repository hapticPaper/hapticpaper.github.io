import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── Historical Data Model ─────────────────────────────────────────────────────
// Each year has NS-analog index scores (0–1) and tagged events that map to equation terms.
// "issues" tracks how many distinct political concerns exist vs how many get absorbed into
// partisan megastructures — the "engulfing flow" dynamic.

const TIMELINE_DATA = [
  {
    year: 1928, label: "Pre-Crash Consensus",
    pressure: 0.25, viscosity: 0.7, external: 0.1, momentum: 0.6,
    issueCount: 14, absorbedCount: 3,
    events: [
      { text: "Roaring 20s prosperity masks rural poverty, racial terror, labor exploitation", term: "pressure" },
      { text: "Strong institutional consensus: courts, banks, churches all aligned", term: "viscosity" },
    ],
    narrative: "Laminar flow. The channel appears stable but pressure differentials are steepening along the walls — farm debt, Black migration, union suppression. The mainstream doesn't feel the turbulence building in the boundary layers.",
  },
  {
    year: 1932, label: "The Dam Breaks",
    pressure: 0.85, viscosity: 0.25, external: 0.8, momentum: 0.4,
    issueCount: 12, absorbedCount: 5,
    events: [
      { text: "Bank failures cascade — institutional viscosity collapses overnight", term: "viscosity" },
      { text: "25% unemployment: pressure gradient becomes unsurvivable", term: "pressure" },
      { text: "Dust Bowl adds environmental external shock", term: "external" },
      { text: "Bonus Army marches — veterans vs. government, individual grievances collectivizing", term: "momentum" },
    ],
    narrative: "Reynolds number spikes. Individual crises — farm foreclosures, bank runs, unemployment, racial violence — begin flowing in the same direction. Not because they're the same issue, but because the channel has narrowed. The fluid has no choice but to merge.",
  },
  {
    year: 1936, label: "The New Deal Coalescence",
    pressure: 0.7, viscosity: 0.35, external: 0.6, momentum: 0.75,
    issueCount: 10, absorbedCount: 8,
    events: [
      { text: "FDR's coalition absorbs labor, Black voters, Southern whites, intellectuals into ONE flow", term: "momentum" },
      { text: "Social Security, Wagner Act — new institutional channels being carved", term: "viscosity" },
      { text: "Father Coughlin, Huey Long: populist eddies that can't sustain independent flow", term: "pressure" },
    ],
    narrative: "The engulfing begins. Labor rights, racial justice, rural poverty, banking reform — issues that had their own currents — are absorbed into the New Deal megastructure. This is the fluid-dynamic coalescence: small eddies merging into a dominant vortex. Efficient for momentum. Devastating for nuance.",
  },
  {
    year: 1942, label: "Total Mobilization",
    pressure: 0.5, viscosity: 0.15, external: 0.95, momentum: 0.9,
    issueCount: 8, absorbedCount: 8,
    events: [
      { text: "WWII: overwhelming external force aligns ALL domestic currents", term: "external" },
      { text: "Japanese internment: individual rights absorbed into collective momentum", term: "momentum" },
      { text: "Women enter workforce — structural change masked as temporary wartime measure", term: "pressure" },
    ],
    narrative: "Maximum engulfing flow. External force so overwhelming that every domestic issue is absorbed into a single binary: war effort vs. not. Dissent becomes physically impossible — the current is too strong. But underneath, the pressure configuration is being fundamentally altered.",
  },
  {
    year: 1952, label: "Post-War Laminar",
    pressure: 0.2, viscosity: 0.85, external: 0.2, momentum: 0.65,
    issueCount: 6, absorbedCount: 5,
    events: [
      { text: "GI Bill, Levittown, Interstate Highway: new institutional channels hardening", term: "viscosity" },
      { text: "McCarthyism: viscosity enforced through fear — dissent as treason", term: "viscosity" },
      { text: "Korean War: external force maintaining alignment without WWII's totality", term: "external" },
      { text: "Emmett Till (1955): pressure building in boundary layers invisible to mainstream", term: "pressure" },
    ],
    narrative: "New laminar regime established. The channel is different from the 1920s — wider, with welfare-state banks — but the flow is smooth again. Conformity isn't just cultural preference; it's the fluid dynamics of a high-viscosity regime. Eddies are suppressed. But the boundary layers are where pressure is quietly accumulating.",
  },
  {
    year: 1963, label: "Boundary Layer Separation",
    pressure: 0.65, viscosity: 0.5, external: 0.55, momentum: 0.55,
    issueCount: 11, absorbedCount: 4,
    events: [
      { text: "JFK assassination: external shock cracks institutional confidence", term: "external" },
      { text: "Birmingham, March on Washington: suppressed pressure erupts into main channel", term: "pressure" },
      { text: "Betty Friedan's Feminine Mystique: new pressure gradient identified", term: "pressure" },
      { text: "Vietnam escalation begins — external force that DIVIDES rather than unites", term: "external" },
    ],
    narrative: "Critical transition. Unlike the 1930s where crises merged, the 1960s see the opposite: issues DE-coalesce. Civil rights, feminism, antiwar, counterculture — each carves its own channel. The post-war megastructure fragments. This is turbulent separation: the main flow can no longer contain its boundary layers.",
  },
  {
    year: 1968, label: "Peak Turbulence",
    pressure: 0.85, viscosity: 0.2, external: 0.75, momentum: 0.7,
    issueCount: 14, absorbedCount: 3,
    events: [
      { text: "MLK + RFK assassinations: external shocks in rapid succession", term: "external" },
      { text: "Tet Offensive: institutional credibility (military, media, government) collapses", term: "viscosity" },
      { text: "Chicago DNC: the system visibly fails to contain its own contradictions", term: "pressure" },
      { text: "Prague Spring crushed: global turbulence, not just American", term: "external" },
    ],
    narrative: "Maximum fragmentation. The Reynolds number peaks. Every issue has its own current, its own protest movement, its own vocabulary. The engulfing flow has reversed — the mega-vortex has shattered into dozens of independent eddies. This is the liberal rejection of conformity made literal: the refusal to let individual currents be absorbed.",
  },
  {
    year: 1978, label: "Neoliberal Re-channeling",
    pressure: 0.55, viscosity: 0.4, external: 0.45, momentum: 0.5,
    issueCount: 12, absorbedCount: 6,
    events: [
      { text: "Stagflation: New Deal channel no longer carries the flow efficiently", term: "pressure" },
      { text: "Prop 13, tax revolt: new pressure gradients emerging from the RIGHT", term: "pressure" },
      { text: "Moral Majority forming: cultural issues beginning to coalesce into conservative megastructure", term: "momentum" },
      { text: "Iranian Revolution, oil shocks: external forces reshaping global channels", term: "external" },
    ],
    narrative: "The post-turbulence reconstitution begins — but not as a return to the 1950s. New channels are being carved. The conservative movement learns the lesson of the 1960s left: individual issues (abortion, taxes, guns, religion) can be merged into a single powerful current. The engulfing begins again, from the other direction.",
  },
  {
    year: 1992, label: "Neoglobal Laminar",
    pressure: 0.3, viscosity: 0.65, external: 0.2, momentum: 0.7,
    issueCount: 9, absorbedCount: 7,
    events: [
      { text: "Cold War ends: massive reduction in external force. 'End of History' narrative", term: "external" },
      { text: "NAFTA, WTO, EU expansion: new institutional channels hardening globally", term: "viscosity" },
      { text: "Third Way politics: both parties absorbed into neoliberal consensus", term: "momentum" },
      { text: "LA Riots: boundary layer eruption, quickly re-suppressed", term: "pressure" },
    ],
    narrative: "New laminar regime. Globalization IS the channel — smooth, wide, apparently stable. Left and right absorbed into a single neoliberal flow. Dissent exists but can't sustain independent currents. Sound familiar? It should. This is structurally identical to 1952. The clock is running.",
  },
  {
    year: 2008, label: "Pressure Gradient Steepens",
    pressure: 0.6, viscosity: 0.45, external: 0.65, momentum: 0.55,
    issueCount: 10, absorbedCount: 5,
    events: [
      { text: "Financial crisis: institutional channels visibly fail (banks, regulators, ratings agencies)", term: "viscosity" },
      { text: "Occupy/Tea Party: SAME pressure gradient, opposite proposed channels", term: "pressure" },
      { text: "Social media: viscosity disruptor — reduces institutional friction, increases turbulence coupling", term: "viscosity" },
      { text: "Obama election: briefly appears to be new channel; actually accelerates polarization", term: "momentum" },
    ],
    narrative: "The boundary layers separate again. Inequality at 1928 levels. Institutional trust collapsing. But this time there's a new variable: digital networks that act as turbulence amplifiers. Information viscosity drops to near zero. Every eddy couples to every other eddy instantly. The Reynolds number starts climbing fast.",
  },
  {
    year: 2020, label: "Cascade Begins",
    pressure: 0.85, viscosity: 0.15, external: 0.9, momentum: 0.75,
    issueCount: 13, absorbedCount: 10,
    events: [
      { text: "COVID: external force on par with WWII, but DIVIDES rather than unites", term: "external" },
      { text: "George Floyd / BLM: pressure eruption, immediately absorbed into partisan binary", term: "pressure" },
      { text: "January 6: institutional channels physically breached", term: "viscosity" },
      { text: "Climate, AI, inequality, pandemic, democracy — all distinct issues, all engulfed into two-party flow", term: "momentum" },
    ],
    narrative: "The engulfing flow returns with terrifying efficiency. Unlike the 1960s, where issues fragmented into independent movements, the 2020s see the OPPOSITE: every issue — climate, race, pandemic response, AI, gender, economics — is immediately absorbed into one of two partisan mega-currents. Nuance doesn't survive. The channel has narrowed to a binary.",
  },
  {
    year: 2026, label: "Mid-Transition",
    pressure: 0.8, viscosity: 0.12, external: 0.85, momentum: 0.8,
    issueCount: 15, absorbedCount: 12,
    events: [
      { text: "AI disrupts information viscosity further — institutional knowledge channels eroding", term: "viscosity" },
      { text: "Authoritarian consolidation globally: the engulfing flow goes international", term: "momentum" },
      { text: "Climate events accelerating: external force becoming continuous, not episodic", term: "external" },
      { text: "Generational transfer of power stalled: institutional inertia vs. demographic pressure", term: "pressure" },
    ],
    narrative: "We are inside the turbulent zone. Not before it, not after it — inside it. The 1930s analogy is imprecise because digital coupling makes the engulfing flow faster and more total. Individual issues don't just merge — they lose their identity entirely. 'Climate policy' becomes 'which team are you on.' The question is not whether we go through. We're already through the threshold. The question is what shape the new channel takes on the other side.",
  },
];

// ─── NS Index Computation ──────────────────────────────────────────────────────

const computeReynolds = (d) => {
  const driving = d.pressure * 0.35 + d.external * 0.3 + d.momentum * 0.2;
  const damping = Math.max(d.viscosity * 0.8, 0.05);
  return Math.min(driving / damping, 1);
};

const computeEngulfment = (d) => d.issueCount > 0 ? d.absorbedCount / d.issueCount : 0;

// ─── Color Utilities ───────────────────────────────────────────────────────────

const TERM_COLORS = { pressure: "#ff6b6b", viscosity: "#ffe66d", external: "#a8e6cf", momentum: "#4ecdc4" };
const TERM_LABELS = { pressure: "∇p", viscosity: "μ", external: "f", momentum: "ρv" };

const getPhaseColor = (re) => {
  if (re < 0.3) return "#4ecdc4";
  if (re < 0.55) return "#ffe66d";
  if (re < 0.8) return "#ff6b6b";
  return "#c792ea";
};

const getPhaseLabel = (re) => {
  if (re < 0.3) return "Laminar Consensus";
  if (re < 0.55) return "Transitional Instability";
  if (re < 0.8) return "Turbulent Break";
  return "Through the Other Side";
};

const lerp = (a, b, t) => a + (b - a) * t;

// ─── Fluid Canvas — driven by timeline data ────────────────────────────────────

const FluidCanvas = ({ data, width, height }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);
  const dataRef = useRef(data);
  dataRef.current = data;

  useEffect(() => {
    const ps = [];
    for (let i = 0; i < 220; i++) {
      ps.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseY: 0,
        vx: 0, vy: 0,
        size: 1 + Math.random() * 2.5,
        hue: 180 + Math.random() * 30,
        issue: Math.floor(Math.random() * 15),
      });
      ps[i].baseY = ps[i].y;
    }
    particlesRef.current = ps;
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const animate = () => {
      timeRef.current += 0.01;
      const t = timeRef.current;
      const d = dataRef.current;
      const re = computeReynolds(d);
      const engulf = computeEngulfment(d);

      ctx.fillStyle = "rgba(10, 12, 18, 0.12)";
      ctx.fillRect(0, 0, width, height);

      const turb = re * re;
      const particles = particlesRef.current;

      const lane1Y = height * 0.3;
      const lane2Y = height * 0.7;
      const laneStrength = engulf * engulf * 0.07;

      for (const p of particles) {
        const laminarVx = 0.6 + (1 - d.viscosity) * 1.2;

        const nx = Math.sin(p.x * 0.007 + t * 1.8) * Math.cos(p.y * 0.011 + t * 1.1);
        const ny = Math.cos(p.x * 0.009 + t * 1.5) * Math.sin(p.y * 0.008 + t * 1.9);
        const vortex = Math.sin(p.x * 0.004 + p.y * 0.004 + t * 2.5) * turb * 2.5;

        const extPulse = d.external > 0.5
          ? Math.sin(t * 4 + p.x * 0.01) * (d.external - 0.5) * 3 * (Math.sin(t * 0.7) > 0.3 ? 1 : 0)
          : 0;

        const nearestLane = Math.abs(p.y - lane1Y) < Math.abs(p.y - lane2Y) ? lane1Y : lane2Y;
        const isEngulfed = p.issue < d.absorbedCount;
        const engulfPull = isEngulfed ? (nearestLane - p.y) * laneStrength : 0;

        const pressureForce = d.pressure > 0.6
          ? (height / 2 - p.y) * 0.002 * (d.pressure - 0.6) * Math.sin(t * 0.5)
          : 0;

        p.vx = laminarVx + nx * turb * 3.5 + vortex * 0.4;
        p.vy = ny * turb * 2.5 + engulfPull + extPulse + pressureForce;

        const inertiaFactor = d.momentum * 0.25;
        p.x += p.vx * (1 + inertiaFactor);
        p.y += p.vy;

        if (p.x > width + 10) { p.x = -10; p.y = Math.random() * height; p.baseY = p.y; }
        if (p.x < -10) p.x = width + 10;
        p.y = Math.max(-5, Math.min(height + 5, p.y));
        if (p.y <= -5 || p.y >= height + 5) p.vy *= -0.5;

        let hue, sat, lum;
        if (isEngulfed) {
          const inLane1 = Math.abs(p.y - lane1Y) < Math.abs(p.y - lane2Y);
          hue = inLane1 ? 355 : 200;
          sat = 55 + engulf * 30;
          lum = 48 + turb * 15;
        } else {
          hue = 170 + Math.sin(t + p.x * 0.01) * 20;
          sat = 50;
          lum = 62;
        }

        const alpha = 0.4 + turb * 0.45;
        const sz = p.size * (1 + turb * 0.7);

        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lum}%, ${alpha})`;
        ctx.fill();

        if (turb > 0.15) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * turb * 7, p.y - p.vy * turb * 7);
          ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${lum}%, ${alpha * 0.2})`;
          ctx.lineWidth = sz * 0.35;
          ctx.stroke();
        }
      }

      if (engulf > 0.45) {
        const la = (engulf - 0.45) * 0.18;
        ctx.save();
        ctx.setLineDash([3, 9]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,107,107,${la})`;
        ctx.beginPath(); ctx.moveTo(0, lane1Y); ctx.lineTo(width, lane1Y); ctx.stroke();
        ctx.strokeStyle = `rgba(78,160,220,${la})`;
        ctx.beginPath(); ctx.moveTo(0, lane2Y); ctx.lineTo(width, lane2Y); ctx.stroke();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "#0a0c12";
    ctx.fillRect(0, 0, width, height);
    animate();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px 8px 0 0" }}
    />
  );
};

// ─── Index Bars ────────────────────────────────────────────────────────────────

const IndexBars = ({ data }) => {
  const re = computeReynolds(data);
  const engulf = computeEngulfment(data);

  const bars = [
    { label: "∇p Pressure", value: data.pressure, color: "#ff6b6b" },
    { label: "μ Viscosity", value: data.viscosity, color: "#ffe66d" },
    { label: "f External", value: data.external, color: "#a8e6cf" },
    { label: "ρv Momentum", value: data.momentum, color: "#4ecdc4" },
    { label: "Re Social", value: re, color: getPhaseColor(re) },
    { label: "Engulfment", value: engulf, color: engulf > 0.7 ? "#ff6b6b" : engulf > 0.4 ? "#ffe66d" : "#4ecdc4" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px 14px", padding: "10px 16px", background: "#0b0e15", borderBottom: "1px solid #1a2232" }}>
      {bars.map((b) => (
        <div key={b.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 9, color: b.color, fontFamily: "monospace", letterSpacing: "0.04em", fontWeight: 600 }}>{b.label}</span>
            <span style={{ fontSize: 9, color: "#556", fontFamily: "monospace" }}>{(b.value * 100).toFixed(0)}</span>
          </div>
          <div style={{ height: 4, background: "#151a25", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${b.value * 100}%`, background: b.color, borderRadius: 2,
              transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 6px ${b.color}44`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Event Card ────────────────────────────────────────────────────────────────

const EventCard = ({ event }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "5px 0" }}>
    <div style={{
      width: 6, height: 6, borderRadius: "50%", background: TERM_COLORS[event.term],
      marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${TERM_COLORS[event.term]}55`,
    }} />
    <div>
      <span style={{ fontSize: 11, color: "#a0aec0", lineHeight: 1.5 }}>{event.text}</span>
      <span style={{
        fontSize: 7, color: TERM_COLORS[event.term], fontFamily: "monospace", marginLeft: 5,
        fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8,
      }}>
        {TERM_LABELS[event.term]}
      </span>
    </div>
  </div>
);

// ─── Coalescence Diagram ───────────────────────────────────────────────────────

const CoalescenceDiagram = ({ data }) => {
  const total = data.issueCount;
  const absorbed = data.absorbedCount;
  const engulf = computeEngulfment(data);

  return (
    <div style={{ padding: "10px 12px", background: "#0b0e15", border: "1px solid #1a2232", borderRadius: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 8, color: "#445566", fontFamily: "monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Issue Coalescence
        </span>
        <span style={{ fontSize: 9, fontFamily: "monospace", color: engulf > 0.7 ? "#ff6b6b" : "#667" }}>
          {absorbed}/{total}
        </span>
      </div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {Array.from({ length: total }).map((_, i) => {
          const isAbsorbed = i < absorbed;
          const inLane1 = i % 2 === 0;
          return (
            <div key={i} style={{
              width: 9, height: 9, borderRadius: 2,
              background: isAbsorbed ? (inLane1 ? "rgba(255,107,107,0.55)" : "rgba(78,160,220,0.55)") : "rgba(78,205,196,0.25)",
              border: `1px solid ${isAbsorbed ? (inLane1 ? "#ff6b6b33" : "#4ea0dc33") : "#4ecdc422"}`,
              transition: "all 0.5s",
            }} />
          );
        })}
      </div>
      <p style={{ fontSize: 8, color: "#3a4a5a", marginTop: 5, marginBottom: 0, lineHeight: 1.4 }}>
        {engulf > 0.75 ? "Binary absorption near-total. Nuance cannot survive."
          : engulf > 0.5 ? "Most issues pulled into dominant channels."
          : engulf > 0.3 ? "Mixed — some issues hold independence."
          : "Issues flow independently. Pluralism."}
      </p>
    </div>
  );
};

// ─── Sparkline ─────────────────────────────────────────────────────────────────

const Sparkline = ({ data, accessor, color, currentIdx, h = 24, w = 170 }) => {
  const values = data.map(accessor);
  const mx = Math.max(...values, 0.01);
  const pts = values.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / mx) * (h - 4) - 2}`).join(" ");
  const cx = (currentIdx / (data.length - 1)) * w;
  const cy = h - (values[currentIdx] / mx) * (h - 4) - 2;

  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={`${color}44`} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={2.5} fill={color} style={{ transition: "cx 0.3s, cy 0.3s" }} />
    </svg>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef(null);

  const data = TIMELINE_DATA[currentIdx];
  const re = computeReynolds(data);

  const [smoothData, setSmoothData] = useState(data);
  const smoothRef = useRef(data);

  useEffect(() => {
    const target = TIMELINE_DATA[currentIdx];
    let frame;
    const step = () => {
      const s = smoothRef.current;
      const next = {
        pressure: lerp(s.pressure, target.pressure, 0.07),
        viscosity: lerp(s.viscosity, target.viscosity, 0.07),
        external: lerp(s.external, target.external, 0.07),
        momentum: lerp(s.momentum, target.momentum, 0.07),
        issueCount: target.issueCount,
        absorbedCount: Math.round(lerp(s.absorbedCount, target.absorbedCount, 0.07)),
      };
      smoothRef.current = next;
      setSmoothData(next);
      if (Math.abs(next.pressure - target.pressure) > 0.004) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [currentIdx]);

  useEffect(() => {
    if (!isPlaying) { clearInterval(playRef.current); return; }
    playRef.current = setInterval(() => {
      setCurrentIdx((i) => {
        if (i >= TIMELINE_DATA.length - 1) { setIsPlaying(false); return i; }
        return i + 1;
      });
    }, 4000);
    return () => clearInterval(playRef.current);
  }, [isPlaying]);

  const phaseColor = getPhaseColor(re);

  return (
    <div style={{
      background: "#0a0c12", color: "#c8d6e5", minHeight: "100vh",
      fontFamily: "'Source Serif 4', Georgia, serif", maxWidth: 740, margin: "0 auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
        input[type="range"] { -webkit-appearance:none; appearance:none; background:#1a2232; border-radius:4px; outline:none; height:6px; cursor:pointer; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:${phaseColor}; cursor:pointer; border:3px solid #0a0c12; box-shadow:0 0 10px ${phaseColor}55; }
        ::selection { background:#4ecdc444; }
        * { box-sizing:border-box; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4ecdc4", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>
          Fluid Dynamics × Political History
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#e8f0f8", lineHeight: 1.2 }}>
          The Engulfing Flow
        </h1>
        <p style={{ fontSize: 12, color: "#5a6a7a", margin: "0 0 14px", lineHeight: 1.5, fontStyle: "italic" }}>
          Navier–Stokes governs how pressure, viscosity, momentum, and external force drive flow between order and chaos. Societies are fluids — and they obey the same math. Scrub through a century of history and watch the equation play out.
        </p>
      </div>

      {/* Canvas */}
      <FluidCanvas data={smoothData} width={740} height={220} />

      {/* Index bars */}
      <IndexBars data={data} />

      {/* Phase + Legend */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "6px 16px", background: "#0b0e15", borderBottom: "1px solid #1a2232",
      }}>
        <div>
          <span style={{ fontSize: 8, color: "#3a4a5a", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>REGIME </span>
          <span style={{ fontSize: 10, color: phaseColor, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
            {getPhaseLabel(re)}
          </span>
        </div>
        <div style={{ fontSize: 8, color: "#3a4a5a", fontFamily: "'DM Mono', monospace", display: "flex", gap: 8 }}>
          <span><span style={{ color: "#4ecdc4" }}>●</span> independent</span>
          <span><span style={{ color: "#ff6b6b" }}>●</span><span style={{ color: "#4ea0dc" }}>●</span> absorbed</span>
        </div>
      </div>

      {/* Scrubber */}
      <div style={{ padding: "12px 20px", background: "#0d1019", borderBottom: "1px solid #1a2232" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              background: isPlaying ? "#ff6b6b18" : "#4ecdc418",
              border: `1px solid ${isPlaying ? "#ff6b6b55" : "#4ecdc455"}`,
              color: isPlaying ? "#ff6b6b" : "#4ecdc4",
              fontSize: 12, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <input
            type="range" min={0} max={TIMELINE_DATA.length - 1} value={currentIdx}
            onChange={(e) => { setCurrentIdx(Number(e.target.value)); setIsPlaying(false); }}
            style={{ flex: 1 }}
          />
          <div style={{ fontSize: 18, fontWeight: 700, color: "#e8f0f8", fontFamily: "'DM Mono', monospace", minWidth: 44, textAlign: "right" }}>
            {data.year}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, padding: "0 20px 0 40px" }}>
          {TIMELINE_DATA.map((d, i) => (
            <div key={d.year} onClick={() => { setCurrentIdx(i); setIsPlaying(false); }}
              style={{
                fontSize: 7, cursor: "pointer", fontFamily: "'DM Mono', monospace", textAlign: "center", flex: 1,
                color: i === currentIdx ? getPhaseColor(computeReynolds(d)) : "#2a3a4a",
                fontWeight: i === currentIdx ? 700 : 400, transition: "color 0.3s",
              }}>
              {d.year === 2026 ? "NOW" : `'${String(d.year).slice(2)}`}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 20px 28px" }} key={data.year}>
        <div style={{ animation: "fadeIn 0.35s ease", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 3 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#e8f0f8", margin: 0 }}>{data.label}</h2>
            <span style={{
              fontSize: 8, padding: "2px 7px", borderRadius: 3,
              background: `${phaseColor}15`, color: phaseColor,
              fontFamily: "'DM Mono', monospace", fontWeight: 600,
            }}>
              Re={re.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Narrative */}
        <div style={{
          padding: "12px 14px", background: "#0d1117", borderLeft: `3px solid ${phaseColor}`,
          borderRadius: "0 6px 6px 0", marginBottom: 14, animation: "fadeIn 0.4s ease",
        }}>
          <p style={{ fontSize: 13, color: "#a0aec0", lineHeight: 1.75, margin: 0 }}>{data.narrative}</p>
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 190px", gap: 14, alignItems: "start" }}>
          <div style={{ animation: "fadeIn 0.45s ease" }}>
            <div style={{ fontSize: 8, color: "#3a4a5a", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              Forces Acting on the System
            </div>
            {data.events.map((ev, i) => <EventCard key={i} event={ev} />)}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeIn 0.5s ease" }}>
            <CoalescenceDiagram data={data} />

            <div style={{ padding: "8px 10px", background: "#0b0e15", border: "1px solid #1a2232", borderRadius: 6 }}>
              <div style={{ fontSize: 7, color: "#3a4a5a", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 4 }}>
                Re OVER TIME
              </div>
              <Sparkline data={TIMELINE_DATA} accessor={computeReynolds} color={phaseColor} currentIdx={currentIdx} />
            </div>

            <div style={{ padding: "8px 10px", background: "#0b0e15", border: "1px solid #1a2232", borderRadius: 6 }}>
              <div style={{ fontSize: 7, color: "#3a4a5a", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 4 }}>
                ENGULFMENT
              </div>
              <Sparkline data={TIMELINE_DATA} accessor={computeEngulfment} color="#ff6b6b" currentIdx={currentIdx} />
            </div>
          </div>
        </div>

        {/* First-time legend */}
        {currentIdx === 0 && (
          <div style={{
            marginTop: 16, padding: "10px 14px", background: "#0b0e1588",
            border: "1px solid #1a2232", borderRadius: 6, animation: "fadeIn 0.5s ease 0.2s both",
          }}>
            <div style={{ fontSize: 8, color: "#3a4a5a", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              Reading the Simulation
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 16px", fontSize: 9, color: "#667788", lineHeight: 1.5 }}>
              <div><span style={{ color: "#4ecdc4" }}>● Cyan</span> — issues with independent flow</div>
              <div><span style={{ color: "#ff6b6b" }}>● Red</span> / <span style={{ color: "#4ea0dc" }}>Blue</span> — absorbed into binary</div>
              <div><span style={{ color: "#556" }}>⋯ Lanes appear</span> — when engulfment is high</div>
              <div><span style={{ color: "#556" }}>~ Chaos</span> — tracks the social Reynolds number</div>
            </div>
            <p style={{ fontSize: 9, color: "#445566", marginTop: 6, marginBottom: 0, lineHeight: 1.5, fontStyle: "italic" }}>
              Hit play or scrub the timeline. Watch how the same fluid obeys different dynamics in each era — and how the engulfing flow keeps returning.
            </p>
          </div>
        )}

        {/* Endcap */}
        {currentIdx === TIMELINE_DATA.length - 1 && (
          <div style={{
            marginTop: 18, padding: "14px 16px", background: "#0d1117",
            border: "1px solid #c792ea33", borderRadius: 8, animation: "fadeIn 0.5s ease",
          }}>
            <h3 style={{ fontSize: 14, color: "#c792ea", margin: "0 0 8px", fontWeight: 700 }}>
              Not "Point of No Return" — Through the Other Side
            </h3>
            <p style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.75, margin: "0 0 10px" }}>
              Turbulence is not destruction. The river doesn't stop — it carves a new channel. The 1930s didn't end capitalism; they rebuilt it with a welfare-state chassis. The 1960s didn't end the American project; they rerouted it through civil rights infrastructure. Every transition produces a fundamentally new laminar regime, not a return to the old one.
            </p>
            <p style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.75, margin: "0 0 10px" }}>
              What makes THIS transition unprecedented: the engulfment ratio. Digital coupling absorbs individual issues into partisan binaries faster than ever. The question isn't whether society transitions — it always does — but whether the new channel preserves space for independent currents. Or whether the engulfing flow becomes the permanent condition.
            </p>
            <div style={{ padding: "10px 12px", background: "#0a0c12", borderRadius: 6, borderLeft: "3px solid #ff6b6b" }}>
              <p style={{ fontSize: 11, color: "#ff6b6b99", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>
                The most dangerous delusion is that turbulence can be prevented by increasing viscosity alone. Damming a river doesn't reduce its pressure — it increases it. The transition, when it comes, is more violent for having been delayed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
