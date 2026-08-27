import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { SectionLabel, SectionHeading, ChartTooltip } from "./ui";
import { TRAFFIC_DATA, CHANNEL_LEADS, FUNNEL_STAGES_DEMO } from "../data";

export function DashboardSection() {
  const [tab, setTab] = useState<"traffic" | "leads" | "funnel">("traffic");

  return (
    <section className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <SectionLabel>Analytics Dashboard</SectionLabel>
          <SectionHeading>Performance at a Glance</SectionHeading>
          <p className="mt-3 text-sm" style={{ color: "#7a8bad" }}>Interactive demo — illustrative data showing analytics reporting capabilities</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {[
            { label: "Total Sessions", value: "32.4K", change: "+18.2%", color: "#00d9b7" },
            { label: "Leads Generated", value: "1,150", change: "+24.7%", color: "#4d90fe" },
            { label: "Conversion Rate", value: "3.55%", change: "+0.8pp", color: "#a78bfa" },
            { label: "Cost per Lead", value: "$18.40", change: "–12.3%", color: "#f59e0b" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-mono mb-2" style={{ color: "#7a8bad" }}>{kpi.label}</p>
              <p className="text-2xl font-extrabold mb-1" style={{ color: "#e4ecf7" }}>{kpi.value}</p>
              <p className="text-xs font-semibold" style={{ color: kpi.color }}>{kpi.change} vs prev. period</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {(["traffic", "leads", "funnel"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200" style={{ background: tab === t ? "#00d9b7" : "transparent", color: tab === t ? "#080c1a" : "#7a8bad" }}>
              {t === "traffic" ? "Traffic" : t === "leads" ? "Leads" : "Funnel"}
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-6 md:p-8 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          {tab === "traffic" && (
            <div>
              <p className="text-sm font-semibold mb-6" style={{ color: "#e4ecf7" }}>Sessions by Channel — 6 Month Trend</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={TRAFFIC_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                  <defs>
                    {[{ id: "organic", c: "#00d9b7" }, { id: "paid", c: "#4d90fe" }, { id: "social", c: "#a78bfa" }, { id: "direct", c: "#f59e0b" }].map(({ id, c }) => (
                      <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.28} />
                        <stop offset="95%" stopColor={c} stopOpacity={0.02} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#7a8bad", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8bad", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="organic" name="Organic" stroke="#00d9b7" fill="url(#g-organic)" strokeWidth={2} />
                  <Area type="monotone" dataKey="paid" name="Paid" stroke="#4d90fe" fill="url(#g-paid)" strokeWidth={2} />
                  <Area type="monotone" dataKey="social" name="Social" stroke="#a78bfa" fill="url(#g-social)" strokeWidth={2} />
                  <Area type="monotone" dataKey="direct" name="Direct" stroke="#f59e0b" fill="url(#g-direct)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-5 mt-4">
                {[{ l: "Organic", c: "#00d9b7" }, { l: "Paid", c: "#4d90fe" }, { l: "Social", c: "#a78bfa" }, { l: "Direct", c: "#f59e0b" }].map((lx) => (
                  <div key={lx.l} className="flex items-center gap-2 text-xs" style={{ color: "#7a8bad" }}>
                    <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: lx.c }} />
                    {lx.l}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "leads" && (
            <div>
              <p className="text-sm font-semibold mb-6" style={{ color: "#e4ecf7" }}>Leads by Acquisition Channel</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={CHANNEL_LEADS} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="channel" tick={{ fill: "#7a8bad", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8bad", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="leads" name="Leads" radius={[6, 6, 0, 0]}>
                    {CHANNEL_LEADS.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {tab === "funnel" && (
            <div>
              <p className="text-sm font-semibold mb-6" style={{ color: "#e4ecf7" }}>Conversion Funnel — Demo Data</p>
              <div className="space-y-3">
                {FUNNEL_STAGES_DEMO.map((stage, i) => {
                  const pct = (stage.value / FUNNEL_STAGES_DEMO[0].value) * 100;
                  const dropoff = i > 0 ? (((FUNNEL_STAGES_DEMO[i - 1].value - stage.value) / FUNNEL_STAGES_DEMO[i - 1].value) * 100).toFixed(1) : null;
                  return (
                    <div key={stage.stage}>
                      {dropoff && (
                        <p className="text-xs font-mono px-2 py-0.5" style={{ color: "#f97316" }}>↓ {dropoff}% drop-off</p>
                      )}
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono w-24 text-right flex-shrink-0" style={{ color: "#7a8bad" }}>{stage.stage}</span>
                        <div className="flex-1 h-8 rounded-lg relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div className="h-full rounded-lg flex items-center pl-3 transition-all duration-700" style={{ width: `${pct}%`, background: `${stage.color}22`, borderLeft: `3px solid ${stage.color}` }}>
                            <span className="text-xs font-mono font-semibold" style={{ color: stage.color }}>{stage.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono w-12 flex-shrink-0" style={{ color: "#7a8bad" }}>{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
