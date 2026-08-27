import { ArrowRight, ChevronRight, BarChart2, Target, Search, Code2, Zap, Globe } from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>About James</SectionLabel>
            <SectionHeading>
              Digital Marketing meets{" "}
              <span style={{ background: "linear-gradient(120deg, #00d9b7 30%, #4d90fe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Web Development
              </span>
            </SectionHeading>
            <div className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: "#7a8bad" }}>
              <p>
                I&apos;m a MarTech Specialist and Digital Marketing Strategist who builds marketing systems from the ground up — combining deep knowledge of analytics and performance marketing with hands-on frontend development capability.
              </p>
              <p>
                My background spans both disciplines: I understand how users behave, how campaigns are structured, and how data flows from ad click to CRM record. This cross-functional perspective lets me identify gaps that specialists in one domain typically miss.
              </p>
              <p>
                I work with brands that want analytics that actually work, campaigns that are properly tracked, and marketing systems that connect — from attribution to automation.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: "Marketing Analytics", detail: "GA4 · GTM · Attribution" },
                { label: "Paid Media", detail: "Meta · Google Ads · CRO" },
                { label: "Web Development", detail: "React · Next.js · TypeScript" },
                { label: "SEO & Content", detail: "Technical · On-page · Strategy" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="text-sm font-bold mb-1" style={{ color: "#e4ecf7" }}>{item.label}</div>
                  <div className="text-xs font-mono" style={{ color: "#00d9b7" }}>{item.detail}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: "#00d9b7", color: "#080c1a" }}>
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#case-studies" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors" style={{ color: "#e4ecf7", borderColor: "rgba(255,255,255,0.1)" }}>
                View work
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-7 border" style={{ background: "linear-gradient(145deg, rgba(77,144,254,0.07) 0%, rgba(0,217,183,0.04) 100%)", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: <BarChart2 className="w-4 h-4" />, label: "Analytics", color: "#00d9b7" },
                { icon: <Target className="w-4 h-4" />, label: "Paid Ads", color: "#4d90fe" },
                { icon: <Search className="w-4 h-4" />, label: "SEO", color: "#a78bfa" },
                { icon: <Code2 className="w-4 h-4" />, label: "Development", color: "#f59e0b" },
                { icon: <Zap className="w-4 h-4" />, label: "Automation", color: "#10b981" },
                { icon: <Globe className="w-4 h-4" />, label: "Growth", color: "#f97316" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)", color: item.color }}>
                  {item.icon}
                  <span className="text-sm font-medium" style={{ color: "#e4ecf7" }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 border" style={{ background: "rgba(0,217,183,0.06)", borderColor: "rgba(0,217,183,0.15)" }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#00d9b7" }}>Current Focus</p>
              <p className="text-sm leading-relaxed" style={{ color: "#e4ecf7" }}>
                MarTech infrastructure for growth-stage brands — analytics, attribution, automation, and the web layer that powers them all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
