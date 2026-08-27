import { useState, useCallback } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";
import { CASE_STUDIES, CaseStudy } from "../data";

export function CaseStudiesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = useCallback((id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  }, [toggle]);

  return (
    <section id="case-studies" className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Selected Work</SectionLabel>
          <SectionHeading>Case Studies</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            A selection of projects spanning analytics implementation, campaign management, SEO strategy, and e-commerce marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((cs) => {
            const isExpanded = expanded === cs.id;
            return (
              <div
                key={cs.id}
                className="rounded-2xl border cursor-pointer transition-all duration-300"
                style={{
                  background: isExpanded ? `linear-gradient(145deg, ${cs.accent}10 0%, rgba(13,21,37,0.95) 100%)` : "rgba(255,255,255,0.02)",
                  borderColor: isExpanded ? `${cs.accent}35` : "rgba(255,255,255,0.07)",
                }}
              >
                <button
                  className="w-full text-left p-6"
                  onClick={() => toggle(cs.id)}
                  onKeyDown={(e) => handleKeyDown(e, cs.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`case-study-${cs.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl font-black font-mono leading-none opacity-15" style={{ color: cs.accent }}>{cs.num}</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-200" style={{ color: "#7a8bad", transform: isExpanded ? "rotate(180deg)" : "none" }} />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#7a8bad" }}>{cs.category}</p>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm font-bold leading-snug" style={{ color: "#e4ecf7" }}>{cs.title}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5" style={{ color: "#f59e0b", borderColor: "rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.08)" }}>
                      Simulation Project
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#7a8bad" }}>{cs.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border font-medium" style={{ color: cs.accent, borderColor: `${cs.accent}30`, background: `${cs.accent}10` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>

                {isExpanded && (
                  <div id={`case-study-${cs.id}`} className="px-6 pb-6 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#7a8bad" }}>Approach</p>
                    <ul className="space-y-2 mb-5">
                      {cs.approach.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#7a8bad" }}>
                          <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cs.accent }} />
                          {step}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#7a8bad" }}>Tools & Platforms</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cs.tools.map((tool) => (
                        <span key={tool} className="text-xs px-2.5 py-1 rounded-lg border" style={{ color: "#7a8bad", background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#7a8bad" }}>Measurement</p>
                    <div className="flex flex-wrap gap-2">
                      {cs.kpis.map((kpi) => (
                        <span key={kpi} className="text-xs px-2.5 py-1 rounded-lg border" style={{ color: cs.accent, background: `${cs.accent}10`, borderColor: `${cs.accent}25` }}>
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
