import { SectionLabel, SectionHeading } from "./ui";
import { MARTECH_STACK } from "../data";

export function MarTechStackSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Tools & Platforms</SectionLabel>
          <SectionHeading>MarTech Stack</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            The tools and platforms I work with across the full digital marketing and technology spectrum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MARTECH_STACK.map((cat) => (
            <div key={cat.category} className="rounded-2xl p-6 border transition-colors hover:border-white/10 group" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <span className="font-bold" style={{ color: "#e4ecf7" }}>{cat.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span key={tool} className="text-xs px-2.5 py-1 rounded-lg border transition-colors" style={{ color: "#7a8bad", background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl p-6 border border-dashed flex items-center justify-center text-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#7a8bad" }}>And growing</p>
              <p className="text-xs font-mono" style={{ color: "rgba(122,139,173,0.5)" }}>Continuously expanding toolkit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
