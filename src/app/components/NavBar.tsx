import { Menu, X, Download } from "lucide-react";
import { NAV } from "../data";

interface NavBarProps {
  active: string;
  mobile: boolean;
  setMobile: (v: boolean) => void;
}

export function NavBar({ active, mobile, setMobile }: NavBarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8,12,26,0.88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="text-lg font-extrabold tracking-tight"
            style={{
              color: "#e4ecf7",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            James<span style={{ color: "#00d9b7" }}>.</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: active === n.id ? "#00d9b7" : "#7a8bad" }}
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-all"
              style={{
                color: "#00d9b7",
                border: "1px solid rgba(0,217,183,0.25)",
              }}
            >
              Let&apos;s talk
            </a>
            <a
              href="#resume"
              className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: "#00d9b7", color: "#080c1a" }}
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </a>
          </div>

          <button
            onClick={() => setMobile(!mobile)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#7a8bad" }}
          >
            {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobile && (
        <div
          className="md:hidden px-5 py-4 space-y-1 border-t"
          style={{
            background: "rgba(8,12,26,0.97)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setMobile(false)}
              className="block py-2.5 text-sm font-medium"
              style={{ color: "#7a8bad" }}
            >
              {n.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#resume"
              onClick={() => setMobile(false)}
              className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-lg w-full justify-center"
              style={{ background: "#00d9b7", color: "#080c1a" }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
