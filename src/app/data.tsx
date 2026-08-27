import React from "react";
import {
  BarChart2, Target, Eye, Zap, Code2,
} from "lucide-react";

// ─── Navigation ─────────────────────────────────────────────────────────────────

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "case-studies", label: "Case Studies" },
  { id: "martech-lab", label: "MarTech Lab" },
  { id: "skills", label: "Skills" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

// ─── Skills ─────────────────────────────────────────────────────────────────────

export const SKILLS: Record<string, string[]> = {
  "Marketing Analytics": ["GA4", "Google Tag Manager", "Meta Pixel", "UTM Tracking", "Looker Studio", "Attribution Modeling", "Data Layer"],
  "Growth & Paid Media": ["Meta Ads", "Google Ads", "CRO", "A/B Testing", "Landing Page Optimisation", "Retargeting", "Audience Segmentation"],
  "SEO": ["Technical SEO", "On-Page SEO", "Keyword Research", "Core Web Vitals", "Schema Markup", "Search Console", "Crawl Optimisation"],
  "Automation & CRM": ["Marketing Automation", "CRM", "Email Sequences", "Lead Scoring", "Workflow Design", "Behavioural Triggers"],
  "Web Technology": ["React", "Next.js", "JavaScript", "TypeScript", "REST APIs", "Node.js", "Git"],
  "Data & Reporting": ["Analytics", "KPI Dashboards", "Funnel Analysis", "Conversion Tracking", "Segmentation"],
};

// ─── Case Studies ───────────────────────────────────────────────────────────────

export const CASE_STUDIES = [
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

// ─── MarTech Stack ──────────────────────────────────────────────────────────────

export const MARTECH_STACK: { category: string; color: string; icon: React.ReactNode; tools: string[] }[] = [
  { category: "Analytics", color: "#00d9b7", icon: <BarChart2 className="w-5 h-5" />, tools: ["Google Analytics 4", "Looker Studio", "Hotjar", "Google Search Console", "Tag Assistant"] },
  { category: "Advertising", color: "#4d90fe", icon: <Target className="w-5 h-5" />, tools: ["Meta Ads Manager", "Google Ads", "Meta Business Suite", "Google Merchant Center"] },
  { category: "Tracking", color: "#a78bfa", icon: <Eye className="w-5 h-5" />, tools: ["Google Tag Manager", "Meta Pixel", "UTM Framework", "Conversion API", "Data Layer"] },
  { category: "Marketing", color: "#f59e0b", icon: <Zap className="w-5 h-5" />, tools: ["Email Automation", "CRM Integration", "HubSpot", "Mailchimp", "Lead Scoring"] },
  { category: "Technology", color: "#f97316", icon: <Code2 className="w-5 h-5" />, tools: ["React / Next.js", "TypeScript", "REST APIs", "Vercel", "GitHub", "Node.js"] },
];

// ─── Traffic Data ───────────────────────────────────────────────────────────────

export const TRAFFIC_DATA = [
  { month: "Jan", organic: 3800, paid: 1600, social: 1900, direct: 1200 },
  { month: "Feb", organic: 4200, paid: 1900, social: 2100, direct: 1400 },
  { month: "Mar", organic: 4600, paid: 2100, social: 2300, direct: 1600 },
  { month: "Apr", organic: 5100, paid: 2400, social: 2000, direct: 1800 },
  { month: "May", organic: 5400, paid: 2600, social: 2500, direct: 2100 },
  { month: "Jun", organic: 6200, paid: 2900, social: 2700, direct: 2300 },
];

// ─── Channel Leads ──────────────────────────────────────────────────────────────

export const CHANNEL_LEADS = [
  { channel: "Organic", leads: 420, fill: "#00d9b7" },
  { channel: "Paid Search", leads: 310, fill: "#4d90fe" },
  { channel: "Social", leads: 185, fill: "#a78bfa" },
  { channel: "Direct", leads: 140, fill: "#f59e0b" },
  { channel: "Email", leads: 95, fill: "#f97316" },
];

// ─── Funnel Stages ──────────────────────────────────────────────────────────────

export const FUNNEL_STAGES_DEMO = [
  { stage: "Impressions", value: 28000, color: "#4d90fe" },
  { stage: "Clicks", value: 8400, color: "#00d9b7" },
  { stage: "Sessions", value: 6700, color: "#a78bfa" },
  { stage: "Leads", value: 840, color: "#f59e0b" },
  { stage: "Qualified", value: 252, color: "#f97316" },
  { stage: "Converted", value: 84, color: "#10b981" },
];

// ─── Insights ───────────────────────────────────────────────────────────────────

export const INSIGHTS = [
  { id: 1, title: "GA4 vs Universal Analytics: What Marketers Need to Know", excerpt: "The move to GA4 isn't just a platform upgrade — it's a fundamental shift in how events are modelled and sessions counted. Here's how to navigate it without losing historical context.", category: "Analytics", readTime: "7 min read", color: "#00d9b7" },
  { id: 2, title: "Building a Clean GTM Architecture at Scale", excerpt: "Tag sprawl is a silent killer of data quality. A well-governed Tag Manager setup starts with a clear data layer contract, a strict naming convention, and version-controlled container management.", category: "Tracking", readTime: "9 min read", color: "#4d90fe" },
  { id: 3, title: "The Modern Technical SEO Audit: From Crawl to CWV", excerpt: "Today's SEO audits go well beyond 404s and redirects. Core Web Vitals, structured data, crawl budget, and content quality signals all need systematic assessment.", category: "SEO", readTime: "11 min read", color: "#a78bfa" },
  { id: 4, title: "Designing a MarTech Stack for Growth-Stage Brands", excerpt: "Most teams buy tools before defining processes. The right approach starts with the customer journey, maps data needs to each stage, then selects technology to support — not lead — the strategy.", category: "MarTech", readTime: "8 min read", color: "#f59e0b" },
  { id: 5, title: "Customer Journey Mapping: From Touchpoint to Revenue", excerpt: "Understanding the modern customer journey requires connecting ad impressions to CRM records to revenue. This guide covers the methodology and tools to map it end-to-end.", category: "Strategy", readTime: "10 min read", color: "#10b981" },
  { id: 6, title: "UTM Parameters: A Framework for Clean Attribution", excerpt: "Bad UTM hygiene corrupts attribution models and makes channel reporting unreliable. A consistent naming convention and governance policy aren't optional — they're the foundation of analytics.", category: "Analytics", readTime: "6 min read", color: "#f97316" },
];

// ─── SEO Audit Items ────────────────────────────────────────────────────────────

export const SEO_AUDIT_ITEMS = [
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

// ─── Journey Stages ─────────────────────────────────────────────────────────────

export const JOURNEY_STAGES = [
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
