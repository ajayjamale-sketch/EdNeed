import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Eye, Keyboard, MonitorSmartphone, Volume2, MousePointer2,
  Settings2, MessageSquare, Mail, CheckCircle, Accessibility,
  ZoomIn, Contrast, LayoutList
} from "lucide-react";

// ─── Page Sections ────────────────────────────────────────────────
const sections = [
  {
    id: "commitment",
    icon: Accessibility,
    title: "1. Our Commitment",
    content: [
      "EdNeed is committed to ensuring that our platform is accessible to everyone, including people with disabilities.",
      "We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards across all EdNeed products and services.",
      "Accessibility is treated as an ongoing effort — not a one-time checklist — and is reviewed as part of every product release cycle.",
      "Our accessibility goals align with the Rights of Persons with Disabilities Act (RPWD) 2016 and international best practices.",
    ],
  },
  {
    id: "standards",
    icon: CheckCircle,
    title: "2. Standards We Follow",
    content: [
      "WCAG 2.1 Level AA: We follow all four principles — Perceivable, Operable, Understandable, and Robust (POUR).",
      "WAI-ARIA 1.2: We use ARIA roles, states, and properties to enhance screen reader compatibility where native HTML semantics are insufficient.",
      "Section 508 (US): Our platform is compatible with US federal accessibility standards for digital government services.",
      "EN 301 549 (EU): We align with the European standard for accessibility requirements of ICT products and services.",
    ],
  },
  {
    id: "features",
    icon: Settings2,
    title: "3. Accessibility Features",
    content: [
      "Keyboard navigation: All interactive elements — buttons, links, forms, modals, and menus — are fully operable via keyboard alone.",
      "Screen reader support: Semantic HTML, ARIA landmarks, descriptive labels, and live regions ensure compatibility with NVDA, JAWS, VoiceOver, and TalkBack.",
      "Focus management: Visible focus indicators are present on all interactive elements; focus is programmatically managed in dialogs and dynamic content.",
      "Skip-to-content link: A visible 'Skip to main content' link appears at the top of each page for keyboard and screen reader users.",
      "Colour contrast: Text and interactive elements meet a minimum contrast ratio of 4.5:1 (AA) and 7:1 (AAA) where possible.",
      "Resizable text: All text can be resized up to 200% without loss of content or functionality.",
      "Alt text: All meaningful images have descriptive alternative text; decorative images are marked with empty alt attributes.",
      "Captions & transcripts: Video content on the platform includes synchronized captions and transcripts are available on request.",
    ],
  },
  {
    id: "keyboard",
    icon: Keyboard,
    title: "4. Keyboard Navigation Guide",
    content: [
      "Tab / Shift+Tab: Move forward and backward through interactive elements on a page.",
      "Enter / Space: Activate buttons, links, and form controls.",
      "Arrow keys: Navigate within components such as tabs, menus, sliders, and radio button groups.",
      "Escape: Close dialogs, dropdowns, and modal overlays.",
      "Home / End: Jump to the first or last item in lists and tab groups.",
      "Page Up / Page Down: Scroll content within scrollable regions.",
    ],
  },
  {
    id: "assistive-tech",
    icon: Volume2,
    title: "5. Assistive Technology Support",
    content: [
      "Screen readers: Tested with NVDA + Chrome, JAWS + Edge, VoiceOver + Safari (macOS & iOS), and TalkBack + Chrome (Android).",
      "Voice control: The platform is compatible with Dragon NaturallySpeaking and Apple Voice Control for hands-free operation.",
      "Zoom & magnification: The interface supports browser zoom up to 400% and OS-level magnification tools.",
      "High contrast mode: EdNeed's dark mode and high-contrast themes are compatible with Windows High Contrast and macOS Increased Contrast settings.",
      "Switch access: Page structure and focus order support single-switch and multi-switch access devices.",
    ],
  },
  {
    id: "display",
    icon: Contrast,
    title: "6. Display & Visual Options",
    content: [
      "Dark mode: Toggle dark mode from any page using the theme switcher in the top navigation or Settings.",
      "Reduced motion: Our animations respect the prefers-reduced-motion media query — users who have requested reduced motion at the OS level will not see auto-playing animations.",
      "Text spacing: Content reflows correctly when user stylesheets override letter spacing, line height, or word spacing.",
      "Dyslexia-friendly fonts: We support browser extensions like OpenDyslexic and do not override user font preferences in reading areas.",
    ],
  },
  {
    id: "mobile",
    icon: MonitorSmartphone,
    title: "7. Mobile Accessibility",
    content: [
      "EdNeed's mobile app (iOS & Android) is built with native accessibility APIs — UIAccessibility on iOS and Android Accessibility Framework.",
      "Content is fully navigable using touch gestures, swipe navigation, and TalkBack / VoiceOver on mobile devices.",
      "Touch targets meet the minimum size of 44×44 CSS pixels to support users with motor impairments.",
      "The app supports Dynamic Type (iOS) and font scaling (Android) across all screens.",
    ],
  },
  {
    id: "known-issues",
    icon: LayoutList,
    title: "8. Known Limitations",
    content: [
      "Some third-party embedded video players may not yet have full keyboard control support. We are working with providers to resolve this.",
      "Certain legacy PDF documents in our resource library may not be fully tagged for screen readers. We are progressively remediating these.",
      "Complex data visualizations (charts, graphs) in analytics dashboards currently provide text summaries but may lack full chart-level ARIA descriptions. This is in our roadmap for Q3 2025.",
      "We are aware of minor focus-trap issues in some older browser versions and are actively working to resolve them.",
    ],
  },
  {
    id: "feedback",
    icon: MessageSquare,
    title: "9. Feedback & Support",
    content: [
      "We welcome feedback from users about any accessibility barriers they encounter on EdNeed.",
      "If you are unable to access any content or feature due to a disability, please contact our accessibility team — we will provide information or assistance within 2 business days.",
      "You may also request content in an alternative format (e.g., large print, audio description) by contacting us.",
      "We take all accessibility complaints seriously and will respond with a proposed remedy within 10 working days.",
    ],
  },
];

// ─── Compliance Badges ─────────────────────────────────────────────
const badges = [
  "WCAG 2.1 AA",
  "WAI-ARIA 1.2",
  "Section 508",
  "EN 301 549",
  "RPWD 2016",
];

// ─── Quick Stats ───────────────────────────────────────────────────
const stats = [
  { val: "AA", label: "WCAG Compliance Level" },
  { val: "4.5:1", label: "Min Contrast Ratio" },
  { val: "4", label: "Screen Readers Tested" },
  { val: "48h", label: "Feedback Response Time" },
];

export default function AccessibilityPage() {
  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        aria-labelledby="accessibility-hero-heading"
        className="pt-20 pb-8 border-b border-border bg-gradient-to-b from-blue-50/30 to-background dark:from-slate-950"
      >
        <div className="container-custom max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
              <Accessibility className="w-5 h-5 text-primary" />
            </div>
            <span className="badge-blue">Accessibility</span>
          </div>
          <h1 id="accessibility-hero-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Accessibility Statement
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            EdNeed is committed to making our platform usable for everyone. This statement explains
            the standards we follow, the features we provide, and how to reach us if you encounter
            any barrier.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Last reviewed:</strong> June 1, 2025 &nbsp;·&nbsp; <strong>Conformance status:</strong>{" "}
            Partially conforms to WCAG 2.1 Level AA
          </p>
        </div>
      </section>

      {/* ── Standards Badges ──────────────────────────────── */}
      <section aria-label="Compliance standards" className="py-8 bg-muted/20 border-b border-border">
        <div className="container-custom">
          <ul className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 list-none">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-primary" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section aria-label="Accessibility at a glance" className="py-8 bg-background border-b border-border">
        <div className="container-custom">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="text-3xl font-bold gradient-text">{s.val}</dd>
                <dt className="text-xs text-muted-foreground mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <section aria-label="Accessibility details" className="py-14">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-10">

            {/* Table of Contents */}
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
                <h2 className="text-sm font-semibold mb-4">On This Page</h2>
                <ul className="space-y-2 list-none">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#contact"
                      className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                    >
                      10. Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">

              {/* Summary callout */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-5" role="note">
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  <strong>Summary:</strong> EdNeed partially conforms to WCAG 2.1 Level AA. We actively
                  test with assistive technologies and are working to close any remaining gaps. If you
                  need help, reach us at{" "}
                  <a href="mailto:accessibility@edneed.com" className="underline hover:text-blue-600">
                    accessibility@edneed.com
                  </a>
                  .
                </p>
              </div>

              {/* Sections */}
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`heading-${section.id}`}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <section.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <h2 id={`heading-${section.id}`} className="font-bold text-lg">{section.title}</h2>
                  </div>
                  <ul className="space-y-3 list-none">
                    {section.content.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              {/* Contact article */}
              <article
                id="contact"
                aria-labelledby="heading-contact"
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Mail className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 id="heading-contact" className="font-bold text-lg">10. Contact Us</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  If you experience any difficulty accessing EdNeed content or functionality, or to submit
                  an accessibility complaint, please contact our Accessibility Team:
                </p>
                <address className="not-italic space-y-1.5">
                  <p className="text-sm">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:accessibility@edneed.com" className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
                      accessibility@edneed.com
                    </a>
                  </p>
                  <p className="text-sm">
                    <strong>Address:</strong> EdNeed Pvt. Ltd., 4th Floor, Tech Park, Bangalore, Karnataka 560001, India
                  </p>
                  <p className="text-sm"><strong>Response time:</strong> Within 2 business days for all accessibility queries</p>
                  <p className="text-sm"><strong>Formal complaints resolved:</strong> Within 10 working days</p>
                </address>
              </article>

              <p className="text-xs text-muted-foreground text-center">
                This statement was last reviewed on June 1, 2025.&nbsp;
                <Link to="/privacy" className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
                  Privacy Policy
                </Link>
                {" "}·{" "}
                <Link to="/terms" className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Report an Issue CTA ───────────────────────────── */}
      <section
        aria-labelledby="report-cta-heading"
        className="section-padding bg-muted/20 border-t border-border"
      >
        <div className="container-custom max-w-4xl mx-auto text-center">
          <div className="glass-card-premium p-10 md:p-14 rounded-3xl relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <Accessibility className="w-12 h-12 text-primary mx-auto mb-5" aria-hidden="true" />
            <h2 id="report-cta-heading" className="text-3xl font-bold mb-4">Found an Accessibility Issue?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We want to hear from you. If something on our platform isn't working for you,
              tell us and we'll fix it — fast.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:accessibility@edneed.com"
                className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Report an Issue
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 bg-card border border-border rounded-xl font-semibold hover:border-primary/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Documents ─────────────────────────────── */}
      <section aria-labelledby="related-docs-heading" className="py-12 border-t border-border bg-background">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 id="related-docs-heading" className="font-semibold mb-6">Related Legal Documents</h2>
          <ul className="flex flex-wrap justify-center gap-4 list-none">
            {[
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Terms of Service", path: "/terms" },
              { name: "Community Guidelines", path: "/community" },
              { name: "FAQ", path: "/faq" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
