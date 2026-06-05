import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Database, Bell, Globe, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: [
      "Account information: name, email address, phone number, and profile details you provide during registration.",
      "Academic data: courses enrolled, test scores, learning progress, study habits, and performance analytics.",
      "Usage data: how you interact with the platform, features used, time spent, and navigation patterns.",
      "Device information: IP address, browser type, operating system, and device identifiers.",
      "Communications: messages you send through our platform, support tickets, and community posts.",
    ]
  },
  {
    icon: Eye,
    title: "2. How We Use Your Information",
    content: [
      "To personalize your learning experience and provide AI-powered recommendations.",
      "To connect you with suitable tutors, courses, and career guidance resources.",
      "To send you important notifications about classes, test reminders, and platform updates.",
      "To analyze platform performance and improve our services.",
      "To comply with legal obligations and prevent fraudulent activity.",
    ]
  },
  {
    icon: Lock,
    title: "3. Data Security",
    content: [
      "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
      "We conduct regular security audits and penetration testing by certified third-party firms.",
      "Access to personal data is strictly limited to authorized personnel on a need-to-know basis.",
      "We maintain comprehensive incident response procedures and will notify you within 72 hours of any breach.",
      "Our infrastructure is hosted on ISO 27001 certified data centers located in India.",
    ]
  },
  {
    icon: Globe,
    title: "4. Information Sharing",
    content: [
      "We never sell your personal data to third parties for advertising purposes.",
      "Data may be shared with tutors and institutions you choose to engage with on the platform.",
      "We use carefully vetted service providers for hosting, analytics, and payment processing under strict data processing agreements.",
      "We may disclose data to comply with legal requirements, court orders, or government requests.",
    ]
  },
  {
    icon: Bell,
    title: "5. Your Rights & Choices",
    content: [
      "Access: Request a copy of all personal data we hold about you at any time.",
      "Correction: Update or correct inaccurate information through your Profile settings.",
      "Deletion: Request deletion of your account and associated data. Processing takes up to 30 days.",
      "Portability: Export your learning data in standard formats (CSV, JSON).",
      "Opt-out: Unsubscribe from marketing communications at any time via settings or email links.",
    ]
  },
  {
    icon: Shield,
    title: "6. Children's Privacy",
    content: [
      "EdNeed serves students of all ages, including children under 13. For users under 13, we require verified parental consent during registration.",
      "Parents can review, modify, or delete their child's data at any time through the Parent Dashboard.",
      "We do not display targeted advertising to users under 18.",
      "Child accounts have enhanced privacy protections with limited data collection.",
    ]
  }
];

export default function Privacy() {
  return (
    <Layout>
      <section className="pt-20 pb-8 border-b border-border bg-gradient-to-b from-blue-50/30 to-background dark:from-slate-950">
        <div className="container-custom max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="badge-blue">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Your privacy is fundamental to EdNeed. This policy explains how we collect, use, protect, and share your information when you use our platform.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Last updated:</strong> June 1, 2025 &nbsp;·&nbsp; <strong>Effective:</strong> June 1, 2025
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Table of Contents */}
            <div className="hidden lg:block">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((s, i) => (
                    <a key={i} href={`#section-${i}`} className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 leading-relaxed">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-5">
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  <strong>Summary:</strong> We collect only the data needed to provide and improve EdNeed's educational services. We never sell your data. You have full control over your information and can request deletion at any time. For questions, contact <a href="mailto:privacy@edneed.com" className="underline">privacy@edneed.com</a>.
                </p>
              </div>

              {sections.map((section, i) => (
                <div key={i} id={`section-${i}`} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <h2 className="font-bold text-lg">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">7. Contact Us</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  For privacy-related queries, data requests, or concerns, contact our Data Protection Officer:
                </p>
                <div className="space-y-1.5">
                  <p className="text-sm"><strong>Email:</strong> <a href="mailto:privacy@edneed.com" className="text-primary hover:underline">privacy@edneed.com</a></p>
                  <p className="text-sm"><strong>Address:</strong> EdNeed Pvt. Ltd., 4th Floor, Tech Park, Bangalore, Karnataka 560001, India</p>
                  <p className="text-sm"><strong>Response time:</strong> Within 48 hours for standard requests</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By using EdNeed, you agree to this Privacy Policy. We'll notify you of significant changes via email. &nbsp;
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
