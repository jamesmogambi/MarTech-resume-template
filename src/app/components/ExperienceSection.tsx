import { SectionLabel, SectionHeading } from "./ui";

export function ExperienceSection() {
  const experience = [
    {
      role: "Freelance MarTech Specialist",
      type: "Self-employed — Consulting",
      period: "Ongoing",
      description:
        "End-to-end digital marketing and MarTech consulting for regional and international clients. Services span analytics implementation, paid media management, SEO, and marketing automation.",
      highlights: [
        "GA4 & GTM implementation",
        "Paid media strategy & management",
        "SEO audits & strategy",
        "Marketing automation & CRM",
      ],
      color: "#00d9b7",
    },
    {
      role: "Frontend & Web Development",
      type: "Projects — Marketing-Focused",
      period: "Ongoing",
      description:
        "React and Next.js development for marketing-driven web projects, with a focus on performance, SEO readiness, and integration with analytics and marketing tools.",
      highlights: [
        "React / Next.js applications",
        "CMS & e-commerce integrations",
        "Analytics & pixel implementation",
        "Performance optimisation",
      ],
      color: "#4d90fe",
    },
    // {
    //   role: "Digital Marketing — Cabs&More",
    //   type: "Selected Project",
    //   period: "Project",
    //   description: "Managed the digital marketing function for a regional ride-hailing service — covering organic search, paid acquisition, social media, and analytics infrastructure.",
    //   highlights: ["SEO implementation", "Meta & Google Ads", "Analytics setup & tracking", "Social media management"],
    //   color: "#10b981",
    // },
    // {
    //   role: "E-Commerce & MarTech — Saisa Motors",
    //   type: "Selected Project",
    //   period: "Project",
    //   description: "Implemented e-commerce tracking, SEO strategy, and digital marketing systems for an automotive dealership, supporting online lead generation and vehicle enquiries.",
    //   highlights: ["E-commerce tracking", "Google & Meta Ads", "SEO strategy", "Lead pipeline setup"],
    //   color: "#f59e0b",
    // },
  ];

  return (
    <section className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Background</SectionLabel>
          <SectionHeading>Experience</SectionHeading>
        </div>

        <div className="relative">
          <div
            className="absolute left-5 top-3 bottom-3 w-px hidden lg:block"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className="lg:pl-14 relative">
                <div
                  className="absolute left-3.5 top-4 w-3.5 h-3.5 rounded-full border-2 hidden lg:block"
                  style={{
                    background: "#080c1a",
                    borderColor: exp.color,
                    boxShadow: `0 0 0 4px ${exp.color}12`,
                  }}
                />
                <div
                  className="rounded-2xl p-6 border transition-colors hover:border-white/10"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="font-bold mb-0.5"
                        style={{ color: "#e4ecf7" }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-mono"
                          style={{ color: "#7a8bad" }}
                        >
                          {exp.type}
                        </span>
                        <span style={{ color: "rgba(122,139,173,0.3)" }}>
                          ·
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: exp.color }}
                        >
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "#7a8bad" }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-lg border font-medium"
                        style={{
                          color: exp.color,
                          background: `${exp.color}0e`,
                          borderColor: `${exp.color}28`,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
