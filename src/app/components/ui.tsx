import React from "react";

// ─── Section Label ──────────────────────────────────────────────────────────────

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.2em] mb-3" style={{ color: "#00d9b7" }}>
      {children}
    </p>
  );
}

// ─── Section Heading ────────────────────────────────────────────────────────────

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "#e4ecf7", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {children}
    </h2>
  );
}

// ─── Chart Tooltip ──────────────────────────────────────────────────────────────

export function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-2xl" style={{ background: "#0d1525", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="font-mono mb-2" style={{ color: "#7a8bad" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}
