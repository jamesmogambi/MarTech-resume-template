import { ArrowRight, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(77,144,254,0.15) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 110%, rgba(0,217,183,0.1) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-mono font-semibold" style={{ background: "rgba(0,217,183,0.1)", border: "1px solid rgba(0,217,183,0.2)", color: "#00d9b7" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d9b7] animate-pulse" />
            Available for projects & consulting
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e4ecf7" }}>
            I connect{" "}
            <span style={{ color: "#00d9b7" }}>marketing</span>,{" "}
            <span style={{ color: "#4d90fe" }}>technology</span>{" "}
            &{" "}
            <span style={{ background: "linear-gradient(120deg, #00d9b7 30%, #4d90fe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>data</span>{" "}
            to drive digital growth.
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: "#7a8bad" }}>
            James Mogambi — MarTech Specialist & Digital Marketing Strategist. I bridge the gap between marketing strategy and technical implementation to build systems that generate measurable results.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a href="#case-studies" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: "#00d9b7", color: "#080c1a" }}>
              View Case Studies <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#about" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-colors" style={{ color: "#e4ecf7", border: "1px solid rgba(255,255,255,0.1)" }}>
              About James <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {["GA4 Analytics", "Google Tag Manager", "React Developer", "SEO Strategy", "Paid Media", "Marketing Automation"].map((c) => (
              <div key={c} className="flex items-center gap-2 text-sm" style={{ color: "#7a8bad" }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#00d9b7" }} />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(122,139,173,0.4)" }}>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: "rgba(122,139,173,0.4)" }} />
      </div>
    </section>
  );
}
