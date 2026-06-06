import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Star, Shield, Clock, Zap, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    tagline: "Get started at no cost",
    price: { monthly: 0, annual: 0 },
    color: "default",
    features: [
      { text: "5 free courses access", included: true },
      { text: "AI Study Assistant (10 queries/day)", included: true },
      { text: "Basic progress tracking", included: true },
      { text: "Community forums", included: true },
      { text: "Mobile app access", included: true },
      { text: "Unlimited courses", included: false },
      { text: "Mock tests & question banks", included: false },
      { text: "Career guidance tools", included: false },
      { text: "Certificates", included: false },
    ],
    cta: "Get Started Free",
    href: "/register",
  },
  {
    name: "Pro",
    tagline: "For serious learners",
    price: { monthly: 499, annual: 399 },
    color: "primary",
    popular: true,
    features: [
      { text: "Unlimited courses access", included: true },
      { text: "AI Study Assistant (unlimited)", included: true },
      { text: "Advanced learning analytics", included: true },
      { text: "Mock tests & question banks", included: true },
      { text: "Career guidance & counseling", included: true },
      { text: "Priority support", included: true },
      { text: "Completion certificates", included: true },
      { text: "Download for offline learning", included: true },
      { text: "Institution features", included: false },
    ],
    cta: "Start Pro",
    href: "/register",
  },
  {
    name: "Educator",
    tagline: "For teachers & tutors",
    price: { monthly: 999, annual: 799 },
    color: "purple",
    features: [
      { text: "All Pro features", included: true },
      { text: "Course publishing tools", included: true },
      { text: "Live class hosting", included: true },
      { text: "Student management (up to 500)", included: true },
      { text: "Revenue dashboard & payouts", included: true },
      { text: "Custom tutor profile page", included: true },
      { text: "Marketing & SEO tools", included: true },
      { text: "Priority listing in marketplace", included: true },
      { text: "Full institution features", included: false },
    ],
    cta: "Start Educating",
    href: "/register",
  },
  {
    name: "Institution",
    tagline: "For schools & coaching centers",
    price: { monthly: 4999, annual: 3999 },
    color: "default",
    features: [
      { text: "All Educator features", included: true },
      { text: "Unlimited students", included: true },
      { text: "Student management system", included: true },
      { text: "Attendance & timetable mgmt", included: true },
      { text: "Fee collection & reports", included: true },
      { text: "Parent communication portal", included: true },
      { text: "Custom branding & domain", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA-backed support", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

const compareFaqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle." },
  { q: "Is there a free trial for paid plans?", a: "All paid plans come with a 14-day free trial. No credit card required to start." },
  { q: "What payment methods are accepted?", a: "We accept UPI, credit/debit cards, net banking, and EMI options for all plans." },
  { q: "Can institutions get a custom quote?", a: "Yes! For institutions with 100+ students or specific requirements, contact our sales team for a custom pricing package." },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 to-background dark:from-slate-950 dark:to-background" />
        <div className="container-custom relative z-10 text-center">
          <span className="badge-blue mb-5 inline-block">Simple, Transparent Pricing</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Invest in Your <span className="gradient-text">Education</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Start free, upgrade as you grow. No hidden fees. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium", !annual && "text-foreground text-base font-semibold")}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn("relative w-14 h-7 rounded-full transition-colors", annual ? "bg-primary" : "bg-muted")}
            >
              <span className={cn("absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform", annual && "translate-x-7")} />
            </button>
            <span className={cn("text-sm font-medium", annual && "text-foreground text-base font-semibold")}>
              Annual <span className="ml-1.5 inline-flex items-center bg-accent/15 text-accent text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-3xl border p-8 relative flex flex-col transition-all duration-300",
                  plan.popular
                    ? "gradient-primary text-white border-primary/50 shadow-2xl shadow-primary/25 xl:scale-[1.03] z-10"
                    : "bg-card border-border hover:border-primary/30 card-hover"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className={cn("text-xl font-bold mb-0.5", plan.popular ? "text-white" : "")}>{plan.name}</h3>
                  <p className={cn("text-sm", plan.popular ? "text-white/70" : "text-muted-foreground")}>{plan.tagline}</p>
                </div>
                <div className="mb-6">
                  <span className={cn("text-5xl font-bold", plan.popular ? "text-white" : "gradient-text")}>
                    ₹{annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className={cn("text-sm ml-1.5", plan.popular ? "text-white/70" : "text-muted-foreground")}>/month</span>
                  )}
                  {annual && plan.price.monthly > 0 && (
                    <div className={cn("text-xs mt-1", plan.popular ? "text-white/60" : "text-muted-foreground")}>
                      Billed annually · Save ₹{(plan.price.monthly - plan.price.annual) * 12}/yr
                    </div>
                  )}
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className={cn("w-4 h-4 flex-shrink-0 mt-0.5", f.included ? (plan.popular ? "text-white/80" : "text-accent") : "text-muted-foreground/40")} />
                      <span className={cn(!f.included && "line-through", plan.popular ? "text-white/80" : f.included ? "" : "text-muted-foreground/50")}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.href}
                  className={cn(
                    "block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all",
                    plan.popular
                      ? "bg-white text-primary hover:bg-white/90"
                      : "gradient-primary text-white hover:opacity-90 shadow-md shadow-primary/20"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: Shield, text: "14-day free trial" },
              { icon: Clock, text: "Cancel anytime" },
              { icon: Star, text: "No hidden fees" },
              { icon: Zap, text: "Instant access" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />{text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="section-padding hidden md:block">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Compare <span className="gradient-text">Features</span></h2>
            <p className="text-muted-foreground">A detailed breakdown of everything included in our plans.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="py-4 px-6 font-semibold text-muted-foreground border-b border-border w-1/3">Features</th>
                  <th className="py-4 px-6 font-semibold text-center border-b border-border">Free</th>
                  <th className="py-4 px-6 font-semibold text-center border-b border-border text-primary">Pro</th>
                  <th className="py-4 px-6 font-semibold text-center border-b border-border text-purple-600">Educator</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: "Course Access", free: "5 Courses", pro: "Unlimited", edu: "Unlimited + Publish" },
                  { name: "AI Study Assistant", free: "10 queries/day", pro: "Unlimited", edu: "Unlimited" },
                  { name: "Live Classes", free: "View Only", pro: "View + Participate", edu: "Host & Manage" },
                  { name: "Certificates", free: "-", pro: "Included", edu: "Custom Branded" },
                  { name: "Analytics Dashboard", free: "Basic", pro: "Advanced", edu: "Revenue + Advanced" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6 border-b border-border font-medium">{row.name}</td>
                    <td className="py-4 px-6 border-b border-border text-center text-muted-foreground">{row.free}</td>
                    <td className="py-4 px-6 border-b border-border text-center font-medium">{row.pro}</td>
                    <td className="py-4 px-6 border-b border-border text-center font-medium">{row.edu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Compare FAQ */}
      <section className="section-padding border-t border-border bg-muted/20">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Pricing <span className="gradient-text">FAQs</span></h2>
            <p className="text-muted-foreground">Common questions about our plans and billing.</p>
          </div>
          <div className="space-y-3">
            {compareFaqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground border-t border-border pt-3 bg-muted/20 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            More questions? <Link to="/contact" className="text-primary font-semibold hover:underline">Chat with our team</Link>
          </p>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Enterprise Plan?</h2>
              <p className="text-white/75 text-lg mb-8">
                For large institutions, school chains, or government organizations — we offer fully customized pricing, white-labeling, and dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="px-8 py-3.5 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="px-8 py-3.5 bg-white/15 text-white border border-white/25 rounded-xl font-semibold hover:bg-white/25 transition-colors">
                  Learn About EdNeed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
