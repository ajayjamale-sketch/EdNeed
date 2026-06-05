import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { FileText, Users, BookOpen, CreditCard, Shield, AlertTriangle, Scale, Mail } from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "1. User Eligibility & Accounts",
    content: [
      "You must be at least 13 years old to use EdNeed. Users under 18 require parental consent.",
      "You are responsible for maintaining the security of your account credentials.",
      "You agree to provide accurate, complete, and current registration information.",
      "One account per person. Account sharing is prohibited and may result in suspension.",
      "You are responsible for all activities conducted through your account.",
    ]
  },
  {
    icon: BookOpen,
    title: "2. Platform Use & Content",
    content: [
      "EdNeed grants you a limited, non-exclusive, non-transferable license to access and use the platform for personal educational purposes.",
      "You may not copy, distribute, sell, or sublicense any EdNeed content without express written permission.",
      "User-generated content (forum posts, reviews, course content by educators) remains your intellectual property, but you grant EdNeed a license to display it.",
      "You must not post content that is illegal, harmful, harassing, defamatory, or violates third-party rights.",
      "EdNeed reserves the right to remove content that violates these terms without prior notice.",
    ]
  },
  {
    icon: CreditCard,
    title: "3. Payments & Refunds",
    content: [
      "All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless stated otherwise.",
      "Subscriptions auto-renew at the end of each billing cycle. You can cancel auto-renewal anytime.",
      "Pro and Educator plans include a 14-day free trial. No charge until the trial ends.",
      "Refund requests submitted within 14 days of any billing cycle will be processed in full.",
      "Individual course purchases are non-refundable after 7 days or if more than 30% of the course has been accessed.",
      "Institution plan payments are subject to separate contract terms agreed upon during onboarding.",
    ]
  },
  {
    icon: Shield,
    title: "4. Educator & Tutor Terms",
    content: [
      "Educators must hold relevant qualifications for the subjects they teach. EdNeed verifies credentials during onboarding.",
      "Educators retain 80% of all revenue generated from their courses and sessions.",
      "EdNeed charges a 20% platform fee to cover hosting, marketing, payment processing, and support.",
      "Educators are responsible for the accuracy and quality of their course content.",
      "EdNeed may remove courses that receive consistently low ratings (below 2.5/5 for more than 30 days).",
      "Revenue payouts are processed weekly, minimum ₹1,000 balance required.",
    ]
  },
  {
    icon: AlertTriangle,
    title: "5. Prohibited Activities",
    content: [
      "Attempting to hack, reverse-engineer, or compromise EdNeed's systems or data security.",
      "Creating fake accounts, reviews, or manipulating any platform metrics.",
      "Distributing malware, spam, or conducting phishing activities through the platform.",
      "Attempting to circumvent payment systems or using unauthorized discount codes.",
      "Harassing, bullying, or discriminating against other users on the platform.",
      "Using EdNeed for any commercial purpose without prior written authorization.",
    ]
  },
  {
    icon: Scale,
    title: "6. Limitation of Liability",
    content: [
      "EdNeed provides the platform 'as is' and makes no warranties regarding accuracy, completeness, or fitness for a particular purpose.",
      "EdNeed is not liable for any indirect, incidental, special, or consequential damages arising from use of the platform.",
      "Our total liability to you for any claims shall not exceed the amount you paid to EdNeed in the 12 months preceding the claim.",
      "EdNeed is not responsible for third-party content, services, or platforms linked from our platform.",
      "EdNeed does not guarantee specific academic results or outcomes from using the platform.",
    ]
  }
];

export default function Terms() {
  return (
    <Layout>
      <section className="pt-20 pb-8 border-b border-border bg-gradient-to-b from-blue-50/30 to-background dark:from-slate-950">
        <div className="container-custom max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <span className="badge-blue">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            These Terms of Service govern your use of the EdNeed platform. By creating an account or using EdNeed, you agree to these terms.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Last updated:</strong> June 1, 2025 &nbsp;·&nbsp; <strong>Effective:</strong> June 1, 2025
          </p>
        </div>
      </section>

      {/* Code of Conduct Highlights */}
      <section className="py-8 bg-muted/20 border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: BookOpen, text: "Learn Respectfully" },
              { icon: Shield, text: "Protect Integrity" },
              { icon: Scale, text: "Follow Guidelines" },
              { icon: Users, text: "Foster Community" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-bold text-sm text-muted-foreground hover:text-primary transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* ToC */}
            <div className="hidden lg:block">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((s, i) => (
                    <a key={i} href={`#tos-${i}`} className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 leading-relaxed">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-2xl p-5">
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Important:</strong> Please read these terms carefully. By using EdNeed, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
                </p>
              </div>

              {sections.map((section, i) => (
                <div key={i} id={`tos-${i}`} className="bg-card border border-border rounded-2xl p-6">
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
                    <Scale className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">7. Governing Law & Disputes</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  These Terms are governed by the laws of India. Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to binding arbitration in Bangalore, Karnataka, India.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For questions about these terms, contact us at <a href="mailto:legal@edneed.com" className="text-primary hover:underline">legal@edneed.com</a> or write to EdNeed Pvt. Ltd., 4th Floor, Tech Park, Bangalore 560001.
                </p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                These terms were last updated on June 1, 2025. &nbsp;
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                &nbsp;·&nbsp;
                <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action CTA */}
      <section className="section-padding bg-muted/20 border-t border-border">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <div className="glass-card-premium p-10 md:p-14 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-5" />
            <h2 className="text-3xl font-bold mb-4">Report a Violation</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Notice something that violates our Terms of Service? Help us maintain a safe learning environment by reporting it to our moderation team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
                Report Issue
              </Link>
              <a href="mailto:legal@edneed.com" className="px-6 py-3 bg-card border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-colors">
                Contact Legal Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-12 border-t border-border bg-background">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h3 className="font-semibold mb-6">Related Legal Documents</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Cookies Policy", path: "/cookies" },
              { name: "Accessibility Statement", path: "/accessibility" },
              { name: "Community Guidelines", path: "/community" }
            ].map((link, i) => (
              <Link key={i} to={link.path} className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
