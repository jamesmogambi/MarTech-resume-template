import { TrendingUp, Code2, Database, ChevronRight } from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";

export function PillarsSection() {
  const pillars = [
    { icon: <TrendingUp className="w-6 h-6" />, title: "Marketing", color: "#00d9b7", points: ["Campaign strategy & execution", "Audience research & segmentation", "Paid media & organic growth", "Content & conversion optimisation"] },
    { icon: <Code2 className="w-6 h-6" />, title: "Technology", color: "#4d90fe", points: ["React & Next.js development", "MarTech stack architecture", "API integrations", "Tag management & data layer design"] },
    { icon: <Database className="w-6 h-6" />, title: "Data", color: "#a78bfa", points: ["GA4 analytics implementation", "Attribution modelling", "KPI dashboards & reporting", "Funnel analysis & optimisation"] },
  ];

  return (
    <section className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <SectionLabel>The MarTech Advantage</SectionLabel>
          <SectionHeading>Marketing. Technology. Data.</SectionHeading>
          <p className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#7a8bad" }}>
            Most specialists operate in one domain. I operate at the intersection of all three — which is where measurable digital growth actually lives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-8 border transition-transform duration-300 hover:-translate-y-1 group"
              style={{ background: `linear-gradient(145deg, ${p.color}0e 0%, rgba(13,21,37,0.7) 100%)`, borderColor: `${p.color}20` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: `${p.color}18`, color: p.color }}>
                {p.icon}
              </div>
              <h3 className="text-xl font-extrabold mb-4" style={{ color: p.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.title}</h3>
              <ul className="space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm" style={{ color: "#7a8bad" }}>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-10" style={{ color: "#7a8bad" }}>
          The intersection of these three disciplines is where{" "}
          <span className="font-semibold" style={{ color: "#00d9b7" }}>sustainable digital growth</span>{" "}
          is engineered — not guessed.
        </p>
      </div>
    </section>
  );
}
