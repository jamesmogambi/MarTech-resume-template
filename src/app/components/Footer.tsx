import { Mail, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t" style={{ background: "#080c1a", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-extrabold" style={{ color: "#e4ecf7", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            James<span style={{ color: "#00d9b7" }}>.</span>
          </span>
          <span className="text-sm" style={{ color: "#7a8bad" }}>MarTech & Digital Marketing Specialist</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="mailto:hello@jamesmogambi.com" className="transition-colors" style={{ color: "#7a8bad" }}>
            <Mail className="w-4 h-4" />
          </a>
          <a href="#" className="transition-colors" style={{ color: "#7a8bad" }}>
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="transition-colors" style={{ color: "#7a8bad" }}>
            <Github className="w-4 h-4" />
          </a>
          <span className="text-xs font-mono" style={{ color: "rgba(122,139,173,0.4)" }}>Marketing · Technology · Data</span>
        </div>
      </div>
    </footer>
  );
}
