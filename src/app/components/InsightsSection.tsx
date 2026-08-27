import { Clock, ArrowRight } from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";
import { INSIGHTS } from "../data";

export function InsightsSection() {
  return (
    <section id="insights" className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Perspectives</SectionLabel>
          <SectionHeading>Insights & Writing</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            Thinking on analytics, tracking, SEO, and the technology that powers digital marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSIGHTS.map((post) => (
            <div key={post.id} className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full border font-medium" style={{ color: post.color, background: `${post.color}10`, borderColor: `${post.color}28` }}>
                  {post.category}
                </span>
                <span className="text-xs font-mono flex items-center gap-1" style={{ color: "#7a8bad" }}>
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-bold text-sm leading-snug mb-3 group-hover:text-white transition-colors" style={{ color: "#e4ecf7" }}>
                {post.title}
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#7a8bad" }}>{post.excerpt}</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: post.color }}>
                Read article
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
