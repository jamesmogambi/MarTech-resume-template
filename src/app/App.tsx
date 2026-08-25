import React, { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import {
  Menu, X, Download, Mail, Copy, Check, TrendingUp, Target, Zap, Database,
  Code2, BarChart2, Search, Globe, ArrowRight, CheckCircle, ChevronDown,
  ChevronRight, Link, Users, MessageSquare, Linkedin, Github, Clock,
  Settings, Filter, Map, ExternalLink, Eye,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "case-studies", label: "Case Studies" },
  { id: "martech-lab", label: "MarTech Lab" },
  { id: "skills", label: "Skills" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

const SKILLS: Record<string, string[]> = {
  "Marketing Analytics": ["GA4", "Google Tag Manager", "Meta Pixel", "UTM Tracking", "Looker Studio", "Attribution Modeling", "Data Layer"],
  "Growth & Paid Media": ["Meta Ads", "Google Ads", "CRO", "A/B Testing", "Landing Page Optimisation", "Retargeting", "Audience Segmentation"],
  "SEO": ["Technical SEO", "On-Page SEO", "Keyword Research", "Core Web Vitals", "Schema Markup", "Search Console", "Crawl Optimisation"],
  "Automation & CRM": ["Marketing Automation", "CRM", "Email Sequences", "Lead Scoring", "Workflow Design", "Behavioural Triggers"],
  "Web Technology": ["React", "Next.js", "JavaScript", "TypeScript", "REST APIs", "Node.js", "Git"],
  "Data & Reporting": ["Analytics", "KPI Dashboards", "Funnel Analysis", "Conversion Tracking", "Segmentation"],
};

const CASE_STUDIES = [
  {
    id: 1, num: "01",
    title: "Marketing Analytics & Tracking Architecture",
    category: "Analytics & Tracking",
    tags: ["GA4", "GTM", "Meta Pixel", "UTM Framework"],
    summary: "Designed and implemented a full-stack tracking architecture — from GA4 and GTM configuration to custom event taxonomies and a structured UTM naming framework — creating a reliable foundation for cross-channel attribution.",
    approach: [
      "Audit of existing tracking gaps and data layer state",
      "GA4 property setup with custom event taxonomy",
      "GTM container structure, triggers and variable logic",
      "Meta Pixel and Conversion API implementation",
      "UTM naming convention and documentation",
      "Looker Studio reporting dashboard",
    ],
    tools: ["Google Analytics 4", "Google Tag Manager", "Meta Pixel", "Looker Studio"],
    accent: "#00d9b7",
  },
  {
    id: 2, num: "02",
    title: "Email Marketing & Automation Workflows",
    category: "Marketing Automation",
    tags: ["CRM", "Automation", "Segmentation", "Email"],
    summary: "Built behavioural email automation sequences and lead nurture workflows, integrating CRM audience data with targeted messaging to move prospects through the funnel at the right moment.",
    approach: [
      "Customer journey mapping and stage definition",
      "Behavioural trigger and segment logic design",
      "Email sequence structure and copy direction",
      "CRM integration and list hygiene",
      "A/B testing on subject lines and send times",
      "Performance monitoring and sequence iteration",
    ],
    tools: ["CRM Platform", "Email Automation", "Segmentation Engine", "Analytics"],
    accent: "#4d90fe",
  },
  {
    id: 3, num: "03",
    title: "SEO & Content Strategy",
    category: "Search & Content",
    tags: ["Technical SEO", "Content", "Core Web Vitals", "Keyword Research"],
    summary: "Conducted in-depth technical SEO audits and built content frameworks aligned to keyword opportunity and user intent, addressing crawl-level issues and strategic content gaps for sustained organic visibility.",
    approach: [
      "Technical audit: crawl errors, redirects, canonicals, indexation",
      "Core Web Vitals assessment and remediation",
      "Keyword research and search intent clustering",
      "On-page optimisation across priority pages",
      "Content gap analysis and editorial planning",
      "Internal linking strategy and schema implementation",
    ],
    tools: ["Google Search Console", "Screaming Frog", "GA4", "Ahrefs / Semrush"],
    accent: "#a78bfa",
  },
  {
    id: 4, num: "04",
    title: "Paid Advertising Campaign Management",
    category: "Paid Media",
    tags: ["Meta Ads", "Google Ads", "CRO", "Attribution"],
    summary: "Planned and operated multi-platform paid advertising campaigns across Meta and Google Ads, combining audience architecture, creative testing strategy, and conversion tracking for iterative performance improvement.",
    approach: [
      "Audience research and persona-based targeting",
      "Campaign and ad set architecture",
      "Creative briefing and copy direction",
      "Conversion tracking and attribution setup",
      "Iterative performance analysis and bid optimisation",
      "Cross-channel attribution reporting",
    ],
    tools: ["Meta Ads Manager", "Google Ads", "GA4", "UTM Framework", "Looker Studio"],
    accent: "#f59e0b",
  },
  {
    id: 5, num: "05",
    title: "Cabs&More — Digital Growth Marketing",
    category: "Full-Service Digital Marketing",
    tags: ["SEO", "Paid Ads", "Analytics", "Social Media"],
    summary: "Led the digital marketing function for Cabs&More, a regional ride-hailing service, covering organic search, paid acquisition, social media, and analytics infrastructure to grow brand awareness and drive bookings.",
    approach: [
      "Market and competitor landscape analysis",
      "Multi-channel digital marketing strategy",
      "SEO implementation for local and branded search",
      "Paid campaign setup and ongoing management",
      "Analytics and conversion tracking setup",
      "Regular performance reporting and optimisation",
    ],
    tools: ["GA4", "Meta Ads", "Google Ads", "Google Search Console", "GTM"],
    accent: "#10b981",
  },
  {
    id: 6, num: "06",
    title: "Saisa Motors — E-Commerce & Digital Marketing",
    category: "E-Commerce & MarTech",
    tags: ["E-Commerce", "SEO", "Analytics", "CRO", "Lead Gen"],
    summary: "Implemented e-commerce tracking, SEO infrastructure, and digital marketing systems for Saisa Motors, an automotive dealership, supporting online vehicle browsing, enquiry capture, and lead pipeline management.",
    approach: [
      "E-commerce event tracking and GA4 configuration",
      "Product page SEO and structured data implementation",
      "Lead capture form optimisation and CRM integration",
      "Google Ads and Meta Ads for vehicle categories",
      "Conversion rate optimisation on key landing pages",
      "Performance reporting framework",
    ],
    tools: ["GA4", "GTM", "Google Ads", "Meta Ads", "Google Search Console", "CRM"],
    accent: "#f97316",
  },
];

const MARTECH_STACK: { category: string; color: string; icon: React.ReactNode; tools: string[] }[] = [
  { category: "Analytics", color: "#00d9b7", icon: <BarChart2 className="w-5 h-5" />, tools: ["Google Analytics 4", "Looker Studio", "Hotjar", "Google Search Console", "Tag Assistant"] },
  { category: "Advertising", color: "#4d90fe", icon: <Target className="w-5 h-5" />, tools: ["Meta Ads Manager", "Google Ads", "Meta Business Suite", "Google Merchant Center"] },
  { category: "Tracking", color: "#a78bfa", icon: <Eye className="w-5 h-5" />, tools: ["Google Tag Manager", "Meta Pixel", "UTM Framework", "Conversion API", "Data Layer"] },
  { category: "Marketing", color: "#f59e0b", icon: <Zap className="w-5 h-5" />, tools: ["Email Automation", "CRM Integration", "HubSpot", "Mailchimp", "Lead Scoring"] },
  { category: "Technology", color: "#f97316", icon: <Code2 className="w-5 h-5" />, tools: ["React / Next.js", "TypeScript", "REST APIs", "Vercel", "GitHub", "Node.js"] },
];

const TRAFFIC_DATA = [
  { month: "Jan", organic: 3800, paid: 1600, social: 1900, direct: 1200 },
  { month: "Feb", organic: 4200, paid: 1900, social: 2100, direct: 1400 },
  { month: "Mar", organic: 4600, paid: 2100, social: 2300, direct: 1600 },
  { month: "Apr", organic: 5100, paid: 2400, social: 2000, direct: 1800 },
  { month: "May", organic: 5400, paid: 2600, social: 2500, direct: 2100 },
  { month: "Jun", organic: 6200, paid: 2900, social: 2700, direct: 2300 },
];

const CHANNEL_LEADS = [
  { channel: "Organic", leads: 420, fill: "#00d9b7" },
  { channel: "Paid Search", leads: 310, fill: "#4d90fe" },
  { channel: "Social", leads: 185, fill: "#a78bfa" },
  { channel: "Direct", leads: 140, fill: "#f59e0b" },
  { channel: "Email", leads: 95, fill: "#f97316" },
];

const FUNNEL_STAGES_DEMO = [
  { stage: "Impressions", value: 28000, color: "#4d90fe" },
  { stage: "Clicks", value: 8400, color: "#00d9b7" },
  { stage: "Sessions", value: 6700, color: "#a78bfa" },
  { stage: "Leads", value: 840, color: "#f59e0b" },
  { stage: "Qualified", value: 252, color: "#f97316" },
  { stage: "Converted", value: 84, color: "#10b981" },
];

const INSIGHTS = [
  { id: 1, title: "GA4 vs Universal Analytics: What Marketers Need to Know", excerpt: "The move to GA4 isn't just a platform upgrade — it's a fundamental shift in how events are modelled and sessions counted. Here's how to navigate it without losing historical context.", category: "Analytics", readTime: "7 min read", color: "#00d9b7" },
  { id: 2, title: "Building a Clean GTM Architecture at Scale", excerpt: "Tag sprawl is a silent killer of data quality. A well-governed Tag Manager setup starts with a clear data layer contract, a strict naming convention, and version-controlled container management.", category: "Tracking", readTime: "9 min read", color: "#4d90fe" },
  { id: 3, title: "The Modern Technical SEO Audit: From Crawl to CWV", excerpt: "Today's SEO audits go well beyond 404s and redirects. Core Web Vitals, structured data, crawl budget, and content quality signals all need systematic assessment.", category: "SEO", readTime: "11 min read", color: "#a78bfa" },
  { id: 4, title: "Designing a MarTech Stack for Growth-Stage Brands", excerpt: "Most teams buy tools before defining processes. The right approach starts with the customer journey, maps data needs to each stage, then selects technology to support — not lead — the strategy.", category: "MarTech", readTime: "8 min read", color: "#f59e0b" },
  { id: 5, title: "Customer Journey Mapping: From Touchpoint to Revenue", excerpt: "Understanding the modern customer journey requires connecting ad impressions to CRM records to revenue. This guide covers the methodology and tools to map it end-to-end.", category: "Strategy", readTime: "10 min read", color: "#10b981" },
  { id: 6, title: "UTM Parameters: A Framework for Clean Attribution", excerpt: "Bad UTM hygiene corrupts attribution models and makes channel reporting unreliable. A consistent naming convention and governance policy aren't optional — they're the foundation of analytics.", category: "Analytics", readTime: "6 min read", color: "#f97316" },
];

const SEO_AUDIT_ITEMS = [
  { id: 1, category: "Technical", item: "XML Sitemap present and submitted to GSC", priority: "high" },
  { id: 2, category: "Technical", item: "Robots.txt correctly configured", priority: "high" },
  { id: 3, category: "Technical", item: "HTTPS implemented across all pages", priority: "high" },
  { id: 4, category: "Technical", item: "No broken internal links (4xx errors)", priority: "high" },
  { id: 5, category: "Technical", item: "Canonical tags implemented correctly", priority: "medium" },
  { id: 6, category: "Technical", item: "Structured data / schema markup in place", priority: "medium" },
  { id: 7, category: "Core Web Vitals", item: "LCP under 2.5 seconds", priority: "high" },
  { id: 8, category: "Core Web Vitals", item: "CLS under 0.1", priority: "high" },
  { id: 9, category: "Core Web Vitals", item: "INP under 200ms", priority: "high" },
  { id: 10, category: "On-Page", item: "Title tags unique and within 60 characters", priority: "high" },
  { id: 11, category: "On-Page", item: "Meta descriptions present and compelling", priority: "medium" },
  { id: 12, category: "On-Page", item: "H1 tag unique per page", priority: "high" },
  { id: 13, category: "On-Page", item: "Image alt attributes complete", priority: "medium" },
  { id: 14, category: "On-Page", item: "Internal linking structure logical", priority: "medium" },
  { id: 15, category: "Content", item: "Content aligned to primary keyword intent", priority: "high" },
  { id: 16, category: "Content", item: "No duplicate or thin content pages", priority: "medium" },
  { id: 17, category: "Content", item: "Content regularly updated and maintained", priority: "low" },
];

const JOURNEY_STAGES = [
  {
    stage: "Awareness", color: "#4d90fe",
    description: "Prospect discovers the brand for the first time",
    touchpoints: ["Google Search (SEO)", "Social Media Ads", "Content / Blog", "Word of Mouth"],
    kpis: ["Impressions", "Reach", "Clicks", "Brand Searches"],
    tools: ["GA4", "GSC", "Social Analytics", "GTM"],
  },
  {
    stage: "Consideration", color: "#a78bfa",
    description: "Prospect evaluates options and researches solutions",
    touchpoints: ["Website Pages", "Product / Service Pages", "Reviews & Testimonials", "Email Nurture"],
    kpis: ["Sessions", "Time on Site", "Pages per Session", "Return Visits"],
    tools: ["CRM", "Email Platform", "GA4", "Heatmaps"],
  },
  {
    stage: "Decision", color: "#00d9b7",
    description: "Prospect is ready to convert",
    touchpoints: ["Retargeting Ads", "Landing Page", "Contact Form", "Live Chat"],
    kpis: ["Conversions", "CVR", "Cost per Lead", "Form Completions"],
    tools: ["GA4 Conversions", "GTM", "Meta Pixel", "CRM"],
  },
  {
    stage: "Retention", color: "#f59e0b",
    description: "Customer engages and advocates post-conversion",
    touchpoints: ["Onboarding Emails", "CRM Sequences", "Loyalty Offers", "Support"],
    kpis: ["Retention Rate", "LTV", "Email Open Rate", "NPS"],
    tools: ["CRM Automation", "Email Sequences", "NPS Tool", "Analytics"],
  },
];

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.2em] mb-3" style={{ color: "#00d9b7" }}>
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "#e4ecf7", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {children}
    </h2>
  );
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-2xl" style={{ background: "#0d1525", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="font-mono mb-2" style={{ color: "#7a8bad" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────────

function NavBar({ active, mobile, setMobile }: { active: string; mobile: boolean; setMobile: (v: boolean) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(8,12,26,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-lg font-extrabold tracking-tight" style={{ color: "#e4ecf7", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
            <a href="#contact" className="text-sm font-medium px-4 py-2 rounded-lg transition-all" style={{ color: "#00d9b7", border: "1px solid rgba(0,217,183,0.25)" }}>
              Let&apos;s talk
            </a>
            <a href="#resume" className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ background: "#00d9b7", color: "#080c1a" }}>
              <Download className="w-3.5 h-3.5" />
              Download CV
            </a>
          </div>

          <button onClick={() => setMobile(!mobile)} className="md:hidden p-2 rounded-lg" style={{ color: "#7a8bad" }}>
            {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="md:hidden px-5 py-4 space-y-1 border-t" style={{ background: "rgba(8,12,26,0.97)", borderColor: "rgba(255,255,255,0.05)" }}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setMobile(false)} className="block py-2.5 text-sm font-medium" style={{ color: "#7a8bad" }}>
              {n.label}
            </a>
          ))}
          <div className="pt-3">
            <a href="#resume" onClick={() => setMobile(false)} className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-lg w-full justify-center" style={{ background: "#00d9b7", color: "#080c1a" }}>
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
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

// ─── Pillars ───────────────────────────────────────────────────────────────────

function PillarsSection() {
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

// ─── About ─────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>About James</SectionLabel>
            <SectionHeading>
              Digital Marketing meets{" "}
              <span style={{ background: "linear-gradient(120deg, #00d9b7 30%, #4d90fe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Web Development
              </span>
            </SectionHeading>
            <div className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: "#7a8bad" }}>
              <p>
                I&apos;m a MarTech Specialist and Digital Marketing Strategist who builds marketing systems from the ground up — combining deep knowledge of analytics and performance marketing with hands-on frontend development capability.
              </p>
              <p>
                My background spans both disciplines: I understand how users behave, how campaigns are structured, and how data flows from ad click to CRM record. This cross-functional perspective lets me identify gaps that specialists in one domain typically miss.
              </p>
              <p>
                I work with brands that want analytics that actually work, campaigns that are properly tracked, and marketing systems that connect — from attribution to automation.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: "Marketing Analytics", detail: "GA4 · GTM · Attribution" },
                { label: "Paid Media", detail: "Meta · Google Ads · CRO" },
                { label: "Web Development", detail: "React · Next.js · TypeScript" },
                { label: "SEO & Content", detail: "Technical · On-page · Strategy" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="text-sm font-bold mb-1" style={{ color: "#e4ecf7" }}>{item.label}</div>
                  <div className="text-xs font-mono" style={{ color: "#00d9b7" }}>{item.detail}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: "#00d9b7", color: "#080c1a" }}>
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#case-studies" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors" style={{ color: "#e4ecf7", borderColor: "rgba(255,255,255,0.1)" }}>
                View work
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-7 border" style={{ background: "linear-gradient(145deg, rgba(77,144,254,0.07) 0%, rgba(0,217,183,0.04) 100%)", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: <BarChart2 className="w-4 h-4" />, label: "Analytics", color: "#00d9b7" },
                { icon: <Target className="w-4 h-4" />, label: "Paid Ads", color: "#4d90fe" },
                { icon: <Search className="w-4 h-4" />, label: "SEO", color: "#a78bfa" },
                { icon: <Code2 className="w-4 h-4" />, label: "Development", color: "#f59e0b" },
                { icon: <Zap className="w-4 h-4" />, label: "Automation", color: "#10b981" },
                { icon: <Globe className="w-4 h-4" />, label: "Growth", color: "#f97316" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)", color: item.color }}>
                  {item.icon}
                  <span className="text-sm font-medium" style={{ color: "#e4ecf7" }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 border" style={{ background: "rgba(0,217,183,0.06)", borderColor: "rgba(0,217,183,0.15)" }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#00d9b7" }}>Current Focus</p>
              <p className="text-sm leading-relaxed" style={{ color: "#e4ecf7" }}>
                MarTech infrastructure for growth-stage brands — analytics, attribution, automation, and the web layer that powers them all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Case Studies ──────────────────────────────────────────────────────────────

function CaseStudiesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="case-studies" className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Selected Work</SectionLabel>
          <SectionHeading>Case Studies</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            A selection of projects spanning analytics implementation, campaign management, SEO strategy, and e-commerce marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl border cursor-pointer transition-all duration-300"
              style={{
                background: expanded === cs.id ? `linear-gradient(145deg, ${cs.accent}10 0%, rgba(13,21,37,0.95) 100%)` : "rgba(255,255,255,0.02)",
                borderColor: expanded === cs.id ? `${cs.accent}35` : "rgba(255,255,255,0.07)",
              }}
              onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-black font-mono leading-none opacity-15" style={{ color: cs.accent }}>{cs.num}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-200" style={{ color: "#7a8bad", transform: expanded === cs.id ? "rotate(180deg)" : "none" }} />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#7a8bad" }}>{cs.category}</p>
                <h3 className="text-sm font-bold mb-3 leading-snug" style={{ color: "#e4ecf7" }}>{cs.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#7a8bad" }}>{cs.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border font-medium" style={{ color: cs.accent, borderColor: `${cs.accent}30`, background: `${cs.accent}10` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {expanded === cs.id && (
                <div className="px-6 pb-6 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#7a8bad" }}>Approach</p>
                  <ul className="space-y-2 mb-5">
                    {cs.approach.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#7a8bad" }}>
                        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cs.accent }} />
                        {step}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#7a8bad" }}>Tools & Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tools.map((tool) => (
                      <span key={tool} className="text-xs px-2.5 py-1 rounded-lg border" style={{ color: "#7a8bad", background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Analytics Dashboard ───────────────────────────────────────────────────────

function DashboardSection() {
  const [tab, setTab] = useState<"traffic" | "leads" | "funnel">("traffic");

  return (
    <section className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <SectionLabel>Analytics Dashboard</SectionLabel>
          <SectionHeading>Performance at a Glance</SectionHeading>
          <p className="mt-3 text-sm" style={{ color: "#7a8bad" }}>Interactive demo — illustrative data showing analytics reporting capabilities</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {[
            { label: "Total Sessions", value: "32.4K", change: "+18.2%", color: "#00d9b7" },
            { label: "Leads Generated", value: "1,150", change: "+24.7%", color: "#4d90fe" },
            { label: "Conversion Rate", value: "3.55%", change: "+0.8pp", color: "#a78bfa" },
            { label: "Cost per Lead", value: "$18.40", change: "–12.3%", color: "#f59e0b" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-mono mb-2" style={{ color: "#7a8bad" }}>{kpi.label}</p>
              <p className="text-2xl font-extrabold mb-1" style={{ color: "#e4ecf7" }}>{kpi.value}</p>
              <p className="text-xs font-semibold" style={{ color: kpi.color }}>{kpi.change} vs prev. period</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {(["traffic", "leads", "funnel"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200" style={{ background: tab === t ? "#00d9b7" : "transparent", color: tab === t ? "#080c1a" : "#7a8bad" }}>
              {t === "traffic" ? "Traffic" : t === "leads" ? "Leads" : "Funnel"}
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-6 md:p-8 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          {tab === "traffic" && (
            <div>
              <p className="text-sm font-semibold mb-6" style={{ color: "#e4ecf7" }}>Sessions by Channel — 6 Month Trend</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={TRAFFIC_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                  <defs>
                    {[{ id: "organic", c: "#00d9b7" }, { id: "paid", c: "#4d90fe" }, { id: "social", c: "#a78bfa" }, { id: "direct", c: "#f59e0b" }].map(({ id, c }) => (
                      <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.28} />
                        <stop offset="95%" stopColor={c} stopOpacity={0.02} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#7a8bad", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8bad", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="organic" name="Organic" stroke="#00d9b7" fill="url(#g-organic)" strokeWidth={2} />
                  <Area type="monotone" dataKey="paid" name="Paid" stroke="#4d90fe" fill="url(#g-paid)" strokeWidth={2} />
                  <Area type="monotone" dataKey="social" name="Social" stroke="#a78bfa" fill="url(#g-social)" strokeWidth={2} />
                  <Area type="monotone" dataKey="direct" name="Direct" stroke="#f59e0b" fill="url(#g-direct)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-5 mt-4">
                {[{ l: "Organic", c: "#00d9b7" }, { l: "Paid", c: "#4d90fe" }, { l: "Social", c: "#a78bfa" }, { l: "Direct", c: "#f59e0b" }].map((lx) => (
                  <div key={lx.l} className="flex items-center gap-2 text-xs" style={{ color: "#7a8bad" }}>
                    <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: lx.c }} />
                    {lx.l}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "leads" && (
            <div>
              <p className="text-sm font-semibold mb-6" style={{ color: "#e4ecf7" }}>Leads by Acquisition Channel</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={CHANNEL_LEADS} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="channel" tick={{ fill: "#7a8bad", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8bad", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="leads" name="Leads" radius={[6, 6, 0, 0]}>
                    {CHANNEL_LEADS.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {tab === "funnel" && (
            <div>
              <p className="text-sm font-semibold mb-6" style={{ color: "#e4ecf7" }}>Conversion Funnel — Demo Data</p>
              <div className="space-y-3">
                {FUNNEL_STAGES_DEMO.map((stage, i) => {
                  const pct = (stage.value / FUNNEL_STAGES_DEMO[0].value) * 100;
                  const dropoff = i > 0 ? (((FUNNEL_STAGES_DEMO[i - 1].value - stage.value) / FUNNEL_STAGES_DEMO[i - 1].value) * 100).toFixed(1) : null;
                  return (
                    <div key={stage.stage}>
                      {dropoff && (
                        <p className="text-xs font-mono px-2 py-0.5" style={{ color: "#f97316" }}>↓ {dropoff}% drop-off</p>
                      )}
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono w-24 text-right flex-shrink-0" style={{ color: "#7a8bad" }}>{stage.stage}</span>
                        <div className="flex-1 h-8 rounded-lg relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div className="h-full rounded-lg flex items-center pl-3 transition-all duration-700" style={{ width: `${pct}%`, background: `${stage.color}22`, borderLeft: `3px solid ${stage.color}` }}>
                            <span className="text-xs font-mono font-semibold" style={{ color: stage.color }}>{stage.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono w-12 flex-shrink-0" style={{ color: "#7a8bad" }}>{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── MarTech Stack ─────────────────────────────────────────────────────────────

function MarTechStackSection() {
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

// ─── MarTech Lab ───────────────────────────────────────────────────────────────

function MarTechLabSection() {
  const [tool, setTool] = useState<"utm" | "funnel" | "seo" | "journey">("utm");

  // UTM Builder
  const [utm, setUtm] = useState({ url: "", source: "", medium: "", campaign: "", term: "", content: "" });
  const [copied, setCopied] = useState(false);
  const utmUrl = utm.url && utm.source && utm.medium && utm.campaign
    ? `${utm.url}${utm.url.includes("?") ? "&" : "?"}utm_source=${encodeURIComponent(utm.source)}&utm_medium=${encodeURIComponent(utm.medium)}&utm_campaign=${encodeURIComponent(utm.campaign)}${utm.term ? `&utm_term=${encodeURIComponent(utm.term)}` : ""}${utm.content ? `&utm_content=${encodeURIComponent(utm.content)}` : ""}`
    : "";
  const copyUtm = async () => {
    if (!utmUrl) return;
    await navigator.clipboard.writeText(utmUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Funnel Analyzer
  const [funnelStages, setFunnelStages] = useState([
    { name: "Visitors", value: "10000" },
    { name: "Leads", value: "800" },
    { name: "Qualified", value: "240" },
    { name: "Proposals", value: "96" },
    { name: "Customers", value: "32" },
  ]);
  const updateStage = (i: number, field: "name" | "value", val: string) => {
    const next = [...funnelStages];
    next[i] = { ...next[i], [field]: val };
    setFunnelStages(next);
  };

  // SEO Audit
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (id: number) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };
  const seoScore = Math.round((checked.size / SEO_AUDIT_ITEMS.length) * 100);
  const seoCategories = [...new Set(SEO_AUDIT_ITEMS.map((i) => i.category))];

  // Journey
  const [activeStage, setActiveStage] = useState(0);

  const toolBtns = [
    { id: "utm" as const, label: "UTM Builder", icon: <Link className="w-4 h-4" /> },
    { id: "funnel" as const, label: "Funnel Analyzer", icon: <Filter className="w-4 h-4" /> },
    { id: "seo" as const, label: "SEO Audit", icon: <Search className="w-4 h-4" /> },
    { id: "journey" as const, label: "Customer Journey", icon: <Map className="w-4 h-4" /> },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e4ecf7",
  };

  return (
    <section id="martech-lab" className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <SectionLabel>Interactive Tools</SectionLabel>
          <SectionHeading>MarTech Lab</SectionHeading>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "#7a8bad" }}>
            Functional tools demonstrating practical MarTech expertise — from UTM generation to journey mapping.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {toolBtns.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: tool === t.id ? "rgba(0,217,183,0.12)" : "rgba(255,255,255,0.03)",
                color: tool === t.id ? "#00d9b7" : "#7a8bad",
                border: tool === t.id ? "1px solid rgba(0,217,183,0.3)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>

          {/* ── UTM Builder ── */}
          {tool === "utm" && (
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Link className="w-5 h-5" style={{ color: "#00d9b7" }} />
                <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>UTM Campaign URL Builder</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                {[
                  { key: "url" as const, label: "Website URL *", placeholder: "https://example.com/landing-page", mono: false },
                  { key: "source" as const, label: "Campaign Source *", placeholder: "google, facebook, newsletter", mono: true },
                  { key: "medium" as const, label: "Campaign Medium *", placeholder: "cpc, email, social, organic", mono: true },
                  { key: "campaign" as const, label: "Campaign Name *", placeholder: "spring_sale_2024, brand_awareness", mono: true },
                  { key: "term" as const, label: "Campaign Term", placeholder: "keyword (for paid search)", mono: true },
                  { key: "content" as const, label: "Campaign Content", placeholder: "banner_a, text_link", mono: true },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "#7a8bad" }}>{f.label}</label>
                    <input
                      type="text"
                      value={utm[f.key]}
                      onChange={(e) => setUtm((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{ ...inputStyle, fontFamily: f.mono ? "JetBrains Mono, monospace" : "inherit" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,217,183,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                ))}
              </div>
              {utmUrl ? (
                <div className="rounded-xl p-4 border" style={{ background: "rgba(0,217,183,0.06)", borderColor: "rgba(0,217,183,0.2)" }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "#00d9b7" }}>Generated URL</p>
                    <button
                      onClick={copyUtm}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                      style={{ background: copied ? "rgba(0,217,183,0.2)" : "rgba(0,217,183,0.1)", color: "#00d9b7" }}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy URL"}
                    </button>
                  </div>
                  <p className="text-xs font-mono break-all leading-relaxed" style={{ color: "#e4ecf7" }}>{utmUrl}</p>
                </div>
              ) : (
                <div className="rounded-xl p-4 text-center border" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <p className="text-sm" style={{ color: "#7a8bad" }}>Fill in URL, Source, Medium and Campaign name to generate your tracked URL.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Funnel Analyzer ── */}
          {tool === "funnel" && (
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5" style={{ color: "#4d90fe" }} />
                <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>Conversion Funnel Analyzer</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#7a8bad" }}>Edit Funnel Stages</p>
                  <div className="space-y-3">
                    {funnelStages.map((stage, i) => (
                      <div key={i} className="flex gap-2.5">
                        <input
                          value={stage.name}
                          onChange={(e) => updateStage(i, "name", e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-all"
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(77,144,254,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                        <input
                          type="number"
                          value={stage.value}
                          onChange={(e) => updateStage(i, "value", e.target.value)}
                          className="w-28 px-3 py-2 rounded-lg text-sm text-right outline-none font-mono transition-all"
                          style={{ ...inputStyle, color: "#4d90fe" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(77,144,254,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#7a8bad" }}>Funnel Visualisation</p>
                  <div className="space-y-2.5">
                    {funnelStages.map((stage, i) => {
                      const max = Math.max(1, Number(funnelStages[0].value));
                      const val = Math.max(0, Number(stage.value));
                      const pct = (val / max) * 100;
                      const cr = i > 0 ? ((val / Math.max(1, Number(funnelStages[i - 1].value))) * 100).toFixed(1) : "100";
                      const colors = ["#4d90fe", "#00d9b7", "#a78bfa", "#f59e0b", "#f97316"];
                      const c = colors[i % colors.length];
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-xs font-mono mb-1" style={{ color: "#7a8bad" }}>
                            <span>{stage.name || `Stage ${i + 1}`}</span>
                            <span style={{ color: c }}>{val.toLocaleString()} · {cr}% CR</span>
                          </div>
                          <div className="h-7 rounded-lg relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                            <div className="h-full rounded-lg transition-all duration-500" style={{ width: `${pct}%`, background: `${c}20`, borderLeft: `3px solid ${c}` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 p-3.5 rounded-xl text-center border" style={{ background: "rgba(77,144,254,0.08)", borderColor: "rgba(77,144,254,0.2)" }}>
                    <p className="text-xs font-mono mb-1" style={{ color: "#7a8bad" }}>End-to-end conversion</p>
                    <p className="text-2xl font-extrabold" style={{ color: "#4d90fe" }}>
                      {((Math.max(0, Number(funnelStages[funnelStages.length - 1].value)) / Math.max(1, Number(funnelStages[0].value))) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SEO Audit ── */}
          {tool === "seo" && (
            <div className="p-7 md:p-8">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5" style={{ color: "#a78bfa" }} />
                  <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>SEO Audit Checklist</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono mb-0.5" style={{ color: "#7a8bad" }}>Audit Score</p>
                  <p className="text-2xl font-extrabold" style={{ color: seoScore >= 80 ? "#00d9b7" : seoScore >= 50 ? "#f59e0b" : "#f97316" }}>
                    {seoScore}%
                  </p>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${seoScore}%`, background: seoScore >= 80 ? "#00d9b7" : seoScore >= 50 ? "#f59e0b" : "#f97316" }} />
              </div>
              <div className="space-y-6">
                {seoCategories.map((cat) => {
                  const items = SEO_AUDIT_ITEMS.filter((i) => i.category === cat);
                  const done = items.filter((i) => checked.has(i.id)).length;
                  return (
                    <div key={cat}>
                      <p className="text-xs font-mono uppercase tracking-widest mb-2.5 flex items-center gap-2" style={{ color: "#7a8bad" }}>
                        {cat}
                        <span style={{ color: "#00d9b7" }}>({done}/{items.length})</span>
                      </p>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                            style={{ background: checked.has(item.id) ? "rgba(0,217,183,0.06)" : "rgba(255,255,255,0.02)" }}
                          >
                            <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-all" style={{ background: checked.has(item.id) ? "#00d9b7" : "transparent", borderColor: checked.has(item.id) ? "#00d9b7" : "rgba(255,255,255,0.15)" }}>
                              {checked.has(item.id) && <Check className="w-3 h-3" style={{ color: "#080c1a" }} />}
                            </div>
                            <span className="text-sm flex-1 transition-colors" style={{ color: checked.has(item.id) ? "#7a8bad" : "#e4ecf7", textDecoration: checked.has(item.id) ? "line-through" : "none" }}>
                              {item.item}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full border font-mono capitalize flex-shrink-0" style={{
                              color: item.priority === "high" ? "#f97316" : item.priority === "medium" ? "#f59e0b" : "#7a8bad",
                              borderColor: item.priority === "high" ? "rgba(249,115,22,0.3)" : item.priority === "medium" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)",
                              background: item.priority === "high" ? "rgba(249,115,22,0.08)" : item.priority === "medium" ? "rgba(245,158,11,0.08)" : "transparent",
                            }}>
                              {item.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Customer Journey ── */}
          {tool === "journey" && (
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-5 h-5" style={{ color: "#f59e0b" }} />
                <h3 className="font-extrabold" style={{ color: "#e4ecf7" }}>Customer Journey Mapper</h3>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-7">
                {JOURNEY_STAGES.map((s, i) => (
                  <React.Fragment key={s.stage}>
                    <button
                      onClick={() => setActiveStage(i)}
                      className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200"
                      style={{
                        background: activeStage === i ? `${s.color}18` : "transparent",
                        color: activeStage === i ? s.color : "#7a8bad",
                        borderColor: activeStage === i ? `${s.color}40` : "rgba(255,255,255,0.07)",
                      }}
                    >
                      {s.stage}
                    </button>
                    {i < JOURNEY_STAGES.length - 1 && (
                      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(122,139,173,0.3)" }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {(() => {
                const s = JOURNEY_STAGES[activeStage];
                return (
                  <div>
                    <div className="rounded-xl p-4 border mb-5" style={{ background: `${s.color}0c`, borderColor: `${s.color}25` }}>
                      <p className="font-bold mb-1" style={{ color: s.color }}>{s.stage} Stage</p>
                      <p className="text-sm" style={{ color: "#7a8bad" }}>{s.description}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Touchpoints", items: s.touchpoints, dotColor: s.color, icon: null },
                        { label: "Key Metrics", items: s.kpis, dotColor: s.color, icon: <BarChart2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }} /> },
                        { label: "MarTech Tools", items: s.tools, dotColor: s.color, icon: <Settings className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }} /> },
                      ].map((col) => (
                        <div key={col.label} className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#7a8bad" }}>{col.label}</p>
                          <ul className="space-y-2">
                            {col.items.map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#e4ecf7" }}>
                                {col.icon ? col.icon : <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.dotColor }} />}
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────

function SkillsSection() {
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

// ─── Experience ────────────────────────────────────────────────────────────────

function ExperienceSection() {
  const experience = [
    {
      role: "Freelance MarTech Specialist",
      type: "Self-employed — Consulting",
      period: "Ongoing",
      description: "End-to-end digital marketing and MarTech consulting for regional and international clients. Services span analytics implementation, paid media management, SEO, and marketing automation.",
      highlights: ["GA4 & GTM implementation", "Paid media strategy & management", "SEO audits & strategy", "Marketing automation & CRM"],
      color: "#00d9b7",
    },
    {
      role: "Frontend & Web Development",
      type: "Projects — Marketing-Focused",
      period: "Ongoing",
      description: "React and Next.js development for marketing-driven web projects, with a focus on performance, SEO readiness, and integration with analytics and marketing tools.",
      highlights: ["React / Next.js applications", "CMS & e-commerce integrations", "Analytics & pixel implementation", "Performance optimisation"],
      color: "#4d90fe",
    },
    {
      role: "Digital Marketing — Cabs&More",
      type: "Selected Project",
      period: "Project",
      description: "Managed the digital marketing function for a regional ride-hailing service — covering organic search, paid acquisition, social media, and analytics infrastructure.",
      highlights: ["SEO implementation", "Meta & Google Ads", "Analytics setup & tracking", "Social media management"],
      color: "#10b981",
    },
    {
      role: "E-Commerce & MarTech — Saisa Motors",
      type: "Selected Project",
      period: "Project",
      description: "Implemented e-commerce tracking, SEO strategy, and digital marketing systems for an automotive dealership, supporting online lead generation and vehicle enquiries.",
      highlights: ["E-commerce tracking", "Google & Meta Ads", "SEO strategy", "Lead pipeline setup"],
      color: "#f59e0b",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ background: "#080c1a" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionLabel>Background</SectionLabel>
          <SectionHeading>Experience</SectionHeading>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-3 bottom-3 w-px hidden lg:block" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className="lg:pl-14 relative">
                <div className="absolute left-3.5 top-4 w-3.5 h-3.5 rounded-full border-2 hidden lg:block" style={{ background: "#080c1a", borderColor: exp.color, boxShadow: `0 0 0 4px ${exp.color}12` }} />
                <div className="rounded-2xl p-6 border transition-colors hover:border-white/10" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold mb-0.5" style={{ color: "#e4ecf7" }}>{exp.role}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono" style={{ color: "#7a8bad" }}>{exp.type}</span>
                        <span style={{ color: "rgba(122,139,173,0.3)" }}>·</span>
                        <span className="text-xs font-mono" style={{ color: exp.color }}>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#7a8bad" }}>{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 rounded-lg border font-medium" style={{ color: exp.color, background: `${exp.color}0e`, borderColor: `${exp.color}28` }}>
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

// ─── Insights ──────────────────────────────────────────────────────────────────

function InsightsSection() {
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

// ─── Resume ────────────────────────────────────────────────────────────────────

function ResumeSection() {
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
              href="#contact"
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

// ─── Contact ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e4ecf7",
  };

  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: "#0b1020" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionHeading>Let&apos;s Work Together</SectionHeading>
            <p className="mt-4 leading-relaxed mb-8" style={{ color: "#7a8bad" }}>
              If you&apos;re working on a project that needs solid analytics, better-performing campaigns, or a MarTech infrastructure built from the ground up — let&apos;s talk.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@jamesmogambi.com", href: "mailto:hello@jamesmogambi.com", color: "#00d9b7" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/james-mogambi", href: "#", color: "#4d90fe" },
                { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/james-mogambi", href: "#", color: "#a78bfa" },
              ].map((contact) => (
                <a key={contact.label} href={contact.href} className="flex items-center gap-4 p-4 rounded-xl border transition-colors group" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${contact.color}14`, color: contact.color }}>
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono" style={{ color: "#7a8bad" }}>{contact.label}</p>
                    <p className="text-sm font-semibold" style={{ color: "#e4ecf7" }}>{contact.value}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto transition-colors" style={{ color: "#7a8bad" }} />
                </a>
              ))}
            </div>

            <div className="rounded-xl p-5 border" style={{ background: "rgba(0,217,183,0.05)", borderColor: "rgba(0,217,183,0.15)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#00d9b7" }}>Open to opportunities</p>
              <p className="text-sm leading-relaxed" style={{ color: "#7a8bad" }}>
                Freelance projects, consulting retainers, and collaborative partnerships in digital marketing and MarTech.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name" as const, label: "Your Name", type: "text", placeholder: "Jane Smith" },
              { key: "email" as const, label: "Email Address", type: "email", placeholder: "jane@company.com" },
              { key: "subject" as const, label: "Subject", type: "text", placeholder: "Analytics audit, campaign setup, MarTech consulting..." },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "#7a8bad" }}>{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,217,183,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "#7a8bad" }}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Tell me about your project, what you need, and any relevant context..."
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,217,183,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: "#00d9b7", color: "#080c1a" }}
            >
              {sent ? (
                <><Check className="w-4 h-4" /> Message Sent — Thanks!</>
              ) : (
                <><MessageSquare className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
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

// ─── App ───────────────────────────────────────────────────────────────────────

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
