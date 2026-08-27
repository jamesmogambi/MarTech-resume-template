import { SectionLabel, SectionHeading } from "./ui";
import { SKILLS } from "../data";

export function SkillsSection() {
  const colors = ["#00d9b7", "#4d90fe", "#a78bfa", "#f59e0b", "#f97316", "#10b981"];

  return (
    <section id="skills" className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Expertise</SectionLabel>
          <SectionHeading>Skills & Capabilities</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            Core competencies across marketing, analytics, technology, and automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(SKILLS).map(([category, items], idx) => {
            const color = colors[idx % colors.length];
            return (
              <div key={category} className="rounded-2xl p-6 border transition-colors hover:border-white/10" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <h3 className="text-sm font-bold" style={{ color: "#e4ecf7" }}>{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-lg border font-medium" style={{ color, background: `${color}10`, borderColor: `${color}25` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
