import { useState } from "react";
import React from "react";
import { Link, Copy, Check, Filter, Search, Map, ChevronRight, BarChart2, Settings } from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";
import { SEO_AUDIT_ITEMS, JOURNEY_STAGES } from "../data";

export function MarTechLabSection() {
  const [tool, setTool] = useState<"utm" | "funnel" | "seo" | "journey">("utm");

  // UTM Builder
  const [utm, setUtm] = useState({ url: "", source: "", medium: "", campaign: "", term: "", content: "" });
  const [copied, setCopied] = useState(false);
  const utmUrl = utm.url && utm.source && utm.medium && utm.campaign
    ? `${utm.url}${utm.url.includes("?") ? "&" : "?"}utm_source=${encodeURIComponent(utm.source)}&utm_medium=${encodeURIComponent(utm.medium)}&utm_campaign=${encodeURIComponent(utm.campaign)}${utm.term ? `&utm_term=${encodeURIComponent(utm.term)}` : ""}${utm.content ? `&utm_content=${encodeURIComponent(utm.content)}` : ""}`
    : "";
  const copyUtm = async () => {
    if (!utmUrl) return;
    await navigator.clipboard.writeText(utmUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Funnel Analyzer
  const [funnelStages, setFunnelStages] = useState([
    { name: "Visitors", value: "10000" },
    { name: "Leads", value: "800" },
    { name: "Qualified", value: "240" },
    { name: "Proposals", value: "96" },
    { name: "Customers", value: "32" },
  ]);
  const updateStage = (i: number, field: "name" | "value", val: string) => {
    const next = [...funnelStages];
    next[i] = { ...next[i], [field]: val };
    setFunnelStages(next);
  };

  // SEO Audit
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (id: number) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };
  const seoScore = Math.round((checked.size / SEO_AUDIT_ITEMS.length) * 100);
  const seoCategories = [...new Set(SEO_AUDIT_ITEMS.map((i) => i.category))];

  // Journey
  const [activeStage, setActiveStage] = useState(0);

  const toolBtns = [
    { id: "utm" as const, label: "UTM Builder", icon: <Link className="w-4 h-4" /> },
    { id: "funnel" as const, label: "Funnel Analyzer", icon: <Filter className="w-4 h-4" /> },
    { id: "seo" as const, label: "SEO Audit", icon: <Search className="w-4 h-4" /> },
    { id: "journey" as const, label: "Customer Journey", icon: <Map className="w-4 h-4" /> },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e4ecf7",
  };

  return (
    <section id="martech-lab" className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <SectionLabel>Interactive Tools</SectionLabel>
          <SectionHeading>MarTech Lab</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            Functional tools demonstrating practical MarTech expertise — from UTM generation to journey mapping.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {toolBtns.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: tool === t.id ? "rgba(0,217,183,0.12)" : "rgba(255,255,255,0.03)",
                color: tool === t.id ? "#00d9b7" : "#7a8bad",
                border: tool === t.id ? "1px solid rgba(0,217,183,0.3)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>

          {/* ── UTM Builder ── */}
          {tool === "utm" && (
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Link className="w-5 h-5" style={{ color: "#00d9b7" }} />
                <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>UTM Campaign URL Builder</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                {[
                  { key: "url" as const, label: "Website URL *", placeholder: "https://example.com/landing-page", mono: false },
                  { key: "source" as const, label: "Campaign Source *", placeholder: "google, facebook, newsletter", mono: true },
                  { key: "medium" as const, label: "Campaign Medium *", placeholder: "cpc, email, social, organic", mono: true },
                  { key: "campaign" as const, label: "Campaign Name *", placeholder: "spring_sale_2024, brand_awareness", mono: true },
                  { key: "term" as const, label: "Campaign Term", placeholder: "keyword (for paid search)", mono: true },
                  { key: "content" as const, label: "Campaign Content", placeholder: "banner_a, text_link", mono: true },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "#7a8bad" }}>{f.label}</label>
                    <input
                      type="text"
                      value={utm[f.key]}
                      onChange={(e) => setUtm((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{ ...inputStyle, fontFamily: f.mono ? "JetBrains Mono, monospace" : "inherit" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,217,183,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                ))}
              </div>
              {utmUrl ? (
                <div className="rounded-xl p-4 border" style={{ background: "rgba(0,217,183,0.06)", borderColor: "rgba(0,217,183,0.2)" }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "#00d9b7" }}>Generated URL</p>
                    <button
                      onClick={copyUtm}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                      style={{ background: copied ? "rgba(0,217,183,0.2)" : "rgba(0,217,183,0.1)", color: "#00d9b7" }}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy URL"}
                    </button>
                  </div>
                  <p className="text-xs font-mono break-all leading-relaxed" style={{ color: "#e4ecf7" }}>{utmUrl}</p>
                </div>
              ) : (
                <div className="rounded-xl p-4 text-center border" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <p className="text-sm" style={{ color: "#7a8bad" }}>Fill in URL, Source, Medium and Campaign name to generate your tracked URL.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Funnel Analyzer ── */}
          {tool === "funnel" && (
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5" style={{ color: "#4d90fe" }} />
                <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>Conversion Funnel Analyzer</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#7a8bad" }}>Edit Funnel Stages</p>
                  <div className="space-y-3">
                    {funnelStages.map((stage, i) => (
                      <div key={i} className="flex gap-2.5">
                        <input
                          value={stage.name}
                          onChange={(e) => updateStage(i, "name", e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-all"
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(77,144,254,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                        <input
                          type="number"
                          value={stage.value}
                          onChange={(e) => updateStage(i, "value", e.target.value)}
                          className="w-28 px-3 py-2 rounded-lg text-sm text-right outline-none font-mono transition-all"
                          style={{ ...inputStyle, color: "#4d90fe" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(77,144,254,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#7a8bad" }}>Funnel Visualisation</p>
                  <div className="space-y-2.5">
                    {funnelStages.map((stage, i) => {
                      const max = Math.max(1, Number(funnelStages[0].value));
                      const val = Math.max(0, Number(stage.value));
                      const pct = (val / max) * 100;
                      const cr = i > 0 ? ((val / Math.max(1, Number(funnelStages[i - 1].value))) * 100).toFixed(1) : "100";
                      const colors = ["#4d90fe", "#00d9b7", "#a78bfa", "#f59e0b", "#f97316"];
                      const c = colors[i % colors.length];
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-xs font-mono mb-1" style={{ color: "#7a8bad" }}>
                            <span>{stage.name || `Stage ${i + 1}`}</span>
                            <span style={{ color: c }}>{val.toLocaleString()} · {cr}% CR</span>
                          </div>
                          <div className="h-7 rounded-lg relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                            <div className="h-full rounded-lg transition-all duration-500" style={{ width: `${pct}%`, background: `${c}20`, borderLeft: `3px solid ${c}` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 p-3.5 rounded-xl text-center border" style={{ background: "rgba(77,144,254,0.08)", borderColor: "rgba(77,144,254,0.2)" }}>
                    <p className="text-xs font-mono mb-1" style={{ color: "#7a8bad" }}>End-to-end conversion</p>
                    <p className="text-2xl font-extrabold" style={{ color: "#4d90fe" }}>
                      {((Math.max(0, Number(funnelStages[funnelStages.length - 1].value)) / Math.max(1, Number(funnelStages[0].value))) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SEO Audit ── */}
          {tool === "seo" && (
            <div className="p-7 md:p-8">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5" style={{ color: "#a78bfa" }} />
                  <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>SEO Audit Checklist</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono mb-0.5" style={{ color: "#7a8bad" }}>Audit Score</p>
                  <p className="text-2xl font-extrabold" style={{ color: seoScore >= 80 ? "#00d9b7" : seoScore >= 50 ? "#f59e0b" : "#f97316" }}>
                    {seoScore}%
                  </p>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${seoScore}%`, background: seoScore >= 80 ? "#00d9b7" : seoScore >= 50 ? "#f59e0b" : "#f97316" }} />
              </div>
              <div className="space-y-6">
                {seoCategories.map((cat) => {
                  const items = SEO_AUDIT_ITEMS.filter((i) => i.category === cat);
                  const done = items.filter((i) => checked.has(i.id)).length;
                  return (
                    <div key={cat}>
                      <p className="text-xs font-mono uppercase tracking-widest mb-2.5 flex items-center gap-2" style={{ color: "#7a8bad" }}>
                        {cat}
                        <span style={{ color: "#00d9b7" }}>({done}/{items.length})</span>
                      </p>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                            style={{ background: checked.has(item.id) ? "rgba(0,217,183,0.06)" : "rgba(255,255,255,0.02)" }}
                          >
                            <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-all" style={{ background: checked.has(item.id) ? "#00d9b7" : "transparent", borderColor: checked.has(item.id) ? "#00d9b7" : "rgba(255,255,255,0.15)" }}>
                              {checked.has(item.id) && <Check className="w-3 h-3" style={{ color: "#080c1a" }} />}
                            </div>
                            <span className="text-sm flex-1 transition-colors" style={{ color: checked.has(item.id) ? "#7a8bad" : "#e4ecf7", textDecoration: checked.has(item.id) ? "line-through" : "none" }}>
                              {item.item}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full border font-mono capitalize flex-shrink-0" style={{
                              color: item.priority === "high" ? "#f97316" : item.priority === "medium" ? "#f59e0b" : "#7a8bad",
                              borderColor: item.priority === "high" ? "rgba(249,115,22,0.3)" : item.priority === "medium" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)",
                              background: item.priority === "high" ? "rgba(249,115,22,0.08)" : item.priority === "medium" ? "rgba(245,158,11,0.08)" : "transparent",
                            }}>
                              {item.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Customer Journey ── */}
          {tool === "journey" && (
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-5 h-5" style={{ color: "#f59e0b" }} />
                <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>Customer Journey Mapper</h3>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-7">
                {JOURNEY_STAGES.map((s, i) => (
                  <React.Fragment key={s.stage}>
                    <button
                      onClick={() => setActiveStage(i)}
                      className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200"
                      style={{
                        background: activeStage === i ? `${s.color}18` : "transparent",
                        color: activeStage === i ? s.color : "#7a8bad",
                        borderColor: activeStage === i ? `${s.color}40` : "rgba(255,255,255,0.07)",
                      }}
                    >
                      {s.stage}
                    </button>
                    {i < JOURNEY_STAGES.length - 1 && (
                      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(122,139,173,0.3)" }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {(() => {
                const s = JOURNEY_STAGES[activeStage];
                return (
                  <div>
                    <div className="rounded-xl p-4 border mb-5" style={{ background: `${s.color}0c`, borderColor: `${s.color}25` }}>
                      <p className="font-bold mb-1" style={{ color: s.color }}>{s.stage} Stage</p>
                      <p className="text-sm" style={{ color: "#7a8bad" }}>{s.description}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Touchpoints", items: s.touchpoints, dotColor: s.color, icon: null },
                        { label: "Key Metrics", items: s.kpis, dotColor: s.color, icon: <BarChart2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }} /> },
                        { label: "MarTech Tools", items: s.tools, dotColor: s.color, icon: <Settings className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }} /> },
                      ].map((col) => (
                        <div key={col.label} className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#7a8bad" }}>{col.label}</p>
                          <ul className="space-y-2">
                            {col.items.map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#e4ecf7" }}>
                                {col.icon ? col.icon : <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.dotColor }} />}
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
