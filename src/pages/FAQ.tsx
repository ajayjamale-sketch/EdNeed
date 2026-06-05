import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    category: "Getting Started",
    faqs: [
      { q: "What is EdNeed?", a: "EdNeed is an AI-powered education ecosystem that connects students, parents, teachers, and institutions through a unified platform for learning, assessment, career guidance, and academic management." },
      { q: "Is EdNeed free to use?", a: "Yes! EdNeed offers a completely free plan that includes access to 5 courses, 10 AI study queries per day, basic progress tracking, and community access. Paid plans unlock unlimited features." },
      { q: "How do I create an account?", a: "Click 'Get Started' on the homepage, enter your name and email, choose your role (Student, Teacher, Parent, or Institution), and you're ready to go. No credit card required for the free plan." },
      { q: "Is EdNeed available on mobile?", a: "Yes, EdNeed is available on iOS and Android with full feature parity including offline learning, live class access, and push notification reminders." },
    ]
  },
  {
    category: "For Students",
    faqs: [
      { q: "Which exams does EdNeed support?", a: "EdNeed supports JEE, NEET, UPSC, CAT, GATE, SSC, Banking (SBI, IBPS), CLAT, IELTS, SAT, GRE, GMAT, and 50+ other competitive examinations with dedicated courses, mock tests, and mentoring." },
      { q: "How does the AI Study Assistant work?", a: "The AI Study Assistant uses advanced language models to instantly answer academic questions, explain complex concepts step-by-step, generate personalized study plans, and guide your exam preparation — available 24/7." },
      { q: "Can I download lessons for offline use?", a: "Yes, Pro and above subscribers can download course content for offline viewing. Content syncs automatically when you reconnect to the internet." },
      { q: "How accurate are the AI-generated study plans?", a: "Our AI plans are built on data from 500K+ students and expert curriculum designers. They're personalized to your goal, current level, and available time, and adapt automatically based on your progress." },
    ]
  },
  {
    category: "For Teachers & Tutors",
    faqs: [
      { q: "How do I start teaching on EdNeed?", a: "Register as a Teacher, complete your profile verification, create your first course or tutoring listing, set your price, and go live. The process typically takes 24-48 hours for verification." },
      { q: "How much can I earn on EdNeed?", a: "Earnings depend on course quality and demand. Many educators earn ₹50,000–₹1,50,000/month. EdNeed keeps a 20% platform fee; you receive 80% of all revenue generated." },
      { q: "What tools are available for teachers?", a: "Teachers get a full course creation studio, live class hosting, student management dashboard, revenue analytics, assignment tools, quiz builders, and marketing support." },
      { q: "How do I get paid?", a: "Payments are processed weekly via bank transfer or UPI. Minimum payout is ₹1,000. You can track all earnings in real-time on your revenue dashboard." },
    ]
  },
  {
    category: "For Institutions",
    faqs: [
      { q: "How does EdNeed's Institution plan work?", a: "The Institution plan provides a white-labeled portal for your school or coaching center with student management, attendance, timetable, fee management, parent communication, and academic reporting." },
      { q: "How long does institution onboarding take?", a: "Standard onboarding takes 48 hours. Our team provides full setup support including bulk student import, staff training, and customization of your institution portal." },
      { q: "Can we white-label the platform?", a: "Yes, Institution and Enterprise plans include custom branding with your logo, colors, and domain. Students and parents will experience EdNeed under your school's brand." },
      { q: "Is there a limit on the number of students?", a: "The Institution plan supports unlimited students. We scale automatically with your needs." },
    ]
  },
  {
    category: "Billing & Plans",
    faqs: [
      { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle. You'll never lose access to content you've already purchased." },
      { q: "What happens to my data if I cancel?", a: "Your data is retained for 90 days after cancellation, giving you time to reconsider. After 90 days, data is permanently deleted. You can request a data export at any time." },
      { q: "Do you offer student discounts?", a: "Yes! Students with a valid .edu or school email ID get an additional 10% off all paid plans. Verification is automatic during registration." },
      { q: "Is there a refund policy?", a: "All plans come with a 14-day free trial. If you're on a paid plan and request a refund within 14 days of any billing cycle, we provide a full refund, no questions asked." },
    ]
  }
];

const categories = faqData.map((f) => f.category);

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  const toggle = (key: string) => setOpenFaqs((p) => ({ ...p, [key]: !p[key] }));

  const activeFaqs = faqData.find((f) => f.category === activeCategory)?.faqs || [];
  const filteredFaqs = search
    ? faqData.flatMap((s) => s.faqs).filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : activeFaqs;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-background dark:from-slate-950" />
        <div className="container-custom relative z-10 text-center">
          <span className="badge-blue mb-5 inline-block">Help Center</span>
          <h1 className="text-5xl font-bold mb-5">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Everything you need to know about EdNeed. Can't find an answer? Contact our support team.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-5 py-3.5 border border-border rounded-2xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          {!search && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border",
                    activeCategory === cat ? "gradient-primary text-white border-transparent shadow-md" : "bg-muted border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="max-w-2xl mx-auto space-y-3">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, i) => {
              const key = `${activeCategory}-${i}`;
              return (
                <div key={key} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-sm pr-4 leading-relaxed">{faq.q}</span>
                    {openFaqs[key] ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  </button>
                  {openFaqs[key] && (
                    <div className="px-5 pb-4 border-t border-border pt-3 bg-muted/20 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center py-12">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No results found for "{search}"</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center">
              <MessageCircle className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-white/75 text-sm mb-5">Our support team is available Monday to Saturday, 9 AM to 8 PM IST.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/contact" className="px-6 py-2.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                  Contact Support
                </Link>
                <a href="mailto:support@edneed.com" className="px-6 py-2.5 bg-white/15 text-white border border-white/25 rounded-xl text-sm font-semibold hover:bg-white/25 transition-colors">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
