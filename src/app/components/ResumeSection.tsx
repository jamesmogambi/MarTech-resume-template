import { Download, BarChart2, Target, Search, Code2, Zap, Database } from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Curriculum Vitae</SectionLabel>
          <SectionHeading>Download CV</SectionHeading>
          <p className="mt-4 leading-relaxed mb-8" style={{ color: "#7a8bad" }}>
            Download James Mogambi&apos;s curriculum vitae for a structured overview of experience, skills, and capabilities in digital marketing and MarTech.
          </p>

          <div className="rounded-2xl p-10 border mb-6" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { label: "Marketing Analytics", icon: <BarChart2 className="w-4 h-4" /> },
                { label: "Paid Media", icon: <Target className="w-4 h-4" /> },
                { label: "SEO", icon: <Search className="w-4 h-4" /> },
                { label: "Web Development", icon: <Code2 className="w-4 h-4" /> },
                { label: "Automation", icon: <Zap className="w-4 h-4" /> },
                { label: "Data & Analytics", icon: <Database className="w-4 h-4" /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm" style={{ color: "#7a8bad" }}>
                  <span style={{ color: "#00d9b7" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            <a
              href="https://app.enhancv.com/share/25fabfef/?utm_medium=growth&utm_campaign=share-resume&utm_source=dynamic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base hover:opacity-90 transition-opacity"
              style={{ background: "#00d9b7", color: "#080c1a" }}
            >
              <Download className="w-5 h-5" />
              Download CV — James Mogambi
            </a>
            <p className="text-xs font-mono mt-4" style={{ color: "#7a8bad" }}>Available on request — contact James to receive the CV.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
