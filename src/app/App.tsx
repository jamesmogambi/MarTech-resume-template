import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { PillarsSection } from "./components/PillarsSection";
import { AboutSection } from "./components/AboutSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { DashboardSection } from "./components/DashboardSection";
import { MarTechStackSection } from "./components/MarTechStackSection";
import { MarTechLabSection } from "./components/MarTechLabSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { InsightsSection } from "./components/InsightsSection";
import { ResumeSection } from "./components/ResumeSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [active, setActive] = useState("home");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px -35% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", background: "#080c1a" }}>
      <NavBar active={active} mobile={mobile} setMobile={setMobile} />
      <main>
        <HeroSection />
        <PillarsSection />
        <AboutSection />
        <CaseStudiesSection />
        <DashboardSection />
        <MarTechStackSection />
        <MarTechLabSection />
        <SkillsSection />
        <ExperienceSection />
        <InsightsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
