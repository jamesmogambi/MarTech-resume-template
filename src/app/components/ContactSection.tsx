import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  MessageSquare,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SectionLabel, SectionHeading } from "./ui";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e4ecf7",
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "#0b1020" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionHeading>Let&apos;s Work Together</SectionHeading>
            <p
              className="mt-4 leading-relaxed mb-8"
              style={{ color: "#7a8bad" }}
            >
              If you&apos;re working on a project that needs solid analytics,
              better-performing campaigns, or a MarTech infrastructure built
              from the ground up — let&apos;s talk.
            </p>

            <div className="space-y-3 mb-8">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "jamesmg@cabsandmore.com",
                  href: "mailto:mugambijames96@gmail.com",
                  color: "#00d9b7",
                },
                // { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/james-mogambi", href: "#", color: "#4d90fe" },
                {
                  icon: <Github className="w-5 h-5" />,
                  label: "GitHub",
                  value: "github.com/jamesmogambi",
                  href: "#",
                  color: "#a78bfa",
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-colors group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${contact.color}14`,
                      color: contact.color,
                    }}
                  >
                    {contact.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-mono"
                      style={{ color: "#7a8bad" }}
                    >
                      {contact.label}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#e4ecf7" }}
                    >
                      {contact.value}
                    </p>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 ml-auto transition-colors"
                    style={{ color: "#7a8bad" }}
                  />
                </a>
              ))}
            </div>

            <div
              className="rounded-xl p-5 border"
              style={{
                background: "rgba(0,217,183,0.05)",
                borderColor: "rgba(0,217,183,0.15)",
              }}
            >
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: "#00d9b7" }}
              >
                Open to opportunities
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#7a8bad" }}
              >
                Freelance projects, consulting retainers, and collaborative
                partnerships in digital marketing and MarTech.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                key: "name" as const,
                label: "Your Name",
                type: "text",
                placeholder: "Jane Smith",
              },
              {
                key: "email" as const,
                label: "Email Address",
                type: "email",
                placeholder: "jane@company.com",
              },
              {
                key: "subject" as const,
                label: "Subject",
                type: "text",
                placeholder:
                  "Analytics audit, campaign setup, MarTech consulting...",
              },
            ].map((field) => (
              <div key={field.key}>
                <label
                  className="block text-xs font-mono uppercase tracking-widest mb-1.5"
                  style={{ color: "#7a8bad" }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [field.key]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(0,217,183,0.4)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                  }
                />
              </div>
            ))}
            <div>
              <label
                className="block text-xs font-mono uppercase tracking-widest mb-1.5"
                style={{ color: "#7a8bad" }}
              >
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell me about your project, what you need, and any relevant context..."
                required
                disabled={status === "loading"}
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none disabled:opacity-50"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(0,217,183,0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
            </div>

            {status === "error" && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#fca5a5",
                }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: "#00d9b7", color: "#080c1a" }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : status === "success" ? (
                <>
                  <Check className="w-4 h-4" /> Message Sent — Thanks!
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
