import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  BookOpen, Award, Search, Filter, Calendar, DollarSign, ExternalLink,
  Bookmark, BookmarkCheck, ChevronRight, Trophy, Globe, CheckCircle,
  Bell, Clock, ArrowRight, Users, Star, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = ["All", "Scholarships", "Internships", "Competitions", "Olympiads", "Grants", "Fellowships"];

const opportunities = [
  { id: 1, title: "National Merit Scholarship 2025", org: "Ministry of Education", amount: "₹1,20,000/year", deadline: "Jul 31, 2025", type: "Scholarship", eligibility: "Class 10-12", category: "Scholarships", tag: "Government", color: "blue", applicants: 45000, saved: false },
  { id: 2, title: "Google Summer of Code", org: "Google", amount: "$1,500–$3,300", deadline: "Apr 2, 2026", type: "Internship", eligibility: "College Students", category: "Internships", tag: "Tech", color: "green", applicants: 9200, saved: true },
  { id: 3, title: "International Mathematics Olympiad", org: "IMO Foundation", amount: "Gold Medal + Certificate", deadline: "Dec 15, 2025", type: "Olympiad", eligibility: "Class 9-12", category: "Olympiads", tag: "International", color: "orange", applicants: 30000, saved: false },
  { id: 4, title: "AICTE Pragati Scholarship for Girls", org: "AICTE", amount: "₹50,000/year", deadline: "Sep 30, 2025", type: "Scholarship", eligibility: "Female Engineering Students", category: "Scholarships", tag: "Government", color: "pink", applicants: 28000, saved: false },
  { id: 5, title: "Microsoft Research Fellowship", org: "Microsoft", amount: "$42,000/year", deadline: "Oct 15, 2025", type: "Fellowship", eligibility: "PhD Students", category: "Fellowships", tag: "Research", color: "purple", applicants: 5000, saved: false },
  { id: 6, title: "Science Olympiad Foundation — NSO", org: "SOF", amount: "₹50,000 + Certificate", deadline: "Aug 20, 2025", type: "Olympiad", eligibility: "Class 1-12", category: "Olympiads", tag: "National", color: "teal", applicants: 120000, saved: true },
  { id: 7, title: "Infosys Summer Internship Program", org: "Infosys", amount: "₹15,000/month", deadline: "Mar 30, 2026", type: "Internship", eligibility: "3rd Year Engineering", category: "Internships", tag: "Tech", color: "indigo", applicants: 18000, saved: false },
  { id: 8, title: "KVPY Fellowship", org: "DST, Govt. of India", amount: "₹7,000–12,000/month", deadline: "Aug 25, 2025", type: "Fellowship", eligibility: "Class 11-1st Year BSc", category: "Fellowships", tag: "Government", color: "yellow", applicants: 80000, saved: false },
];

const tagColors: Record<string, string> = {
  "Government": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "Tech": "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "International": "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  "Research": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  "National": "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
  yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
};

export default function Scholarships() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(opportunities);

  const toggleSave = (id: number) => {
    setData((prev) => prev.map((o) => o.id === id ? { ...o, saved: !o.saved } : o));
    const item = data.find((o) => o.id === id);
    toast.success(item?.saved ? "Removed from saved" : "Saved to your list!");
  };

  const filtered = data.filter((o) => {
    const matchCat = activeCategory === "All" || o.category === activeCategory;
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) || o.org.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500/5 via-primary/5 to-background pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(45_93%_47%/0.06),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 text-sm font-semibold mb-6">
              <Trophy className="w-4 h-4" /> 10,000+ Opportunities Listed
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-5">
              Scholarship & <span className="gradient-text">Opportunity Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover scholarships, internships, competitions, olympiads, grants, and fellowships perfectly matched to your academic profile and career goals.
            </p>
          </div>
          <div className="max-w-2xl mx-auto flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scholarships, internships, competitions..." className="w-full pl-12 pr-4 py-4 border border-border rounded-2xl bg-card shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={() => toast.info("Advanced filters")} className="px-5 py-4 border border-border rounded-2xl bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award, label: "Active Scholarships", val: "5,400+" },
              { icon: Briefcase, label: "Internship Listings", val: "2,800+" },
              { icon: Trophy, label: "Competitions", val: "1,200+" },
              { icon: DollarSign, label: "Total Value Available", val: "₹500Cr+" },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xl font-bold">{s.val}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border bg-background sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0", activeCategory === cat ? "gradient-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">{activeCategory === "All" ? "All Opportunities" : activeCategory}</h2>
              <p className="text-sm text-muted-foreground">{filtered.length} opportunities found</p>
            </div>
            <select className="px-4 py-2 border border-border rounded-xl text-sm bg-background focus:outline-none">
              <option>Deadline: Nearest</option>
              <option>Amount: Highest</option>
              <option>Newly Added</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((opp) => (
              <div key={opp.id} className="glass-card-premium rounded-3xl p-6 hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", colorMap[opp.color])}>
                    {opp.category === "Scholarships" && <Award className="w-5 h-5" />}
                    {opp.category === "Internships" && <Briefcase className="w-5 h-5" />}
                    {opp.category === "Olympiads" && <Trophy className="w-5 h-5" />}
                    {opp.category === "Fellowships" && <Star className="w-5 h-5" />}
                    {!["Scholarships","Internships","Olympiads","Fellowships"].includes(opp.category) && <Globe className="w-5 h-5" />}
                  </div>
                  <button onClick={() => toggleSave(opp.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                    {opp.saved ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2">{opp.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{opp.org}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", tagColors[opp.tag] || "bg-muted text-muted-foreground")}>{opp.tag}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{opp.type}</span>
                </div>
                <div className="space-y-1.5 mb-3 flex-1">
                  <div className="flex items-center gap-2 text-xs"><DollarSign className="w-3 h-3 text-accent flex-shrink-0" /><span className="font-semibold text-accent">{opp.amount}</span></div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3 h-3 flex-shrink-0" />Deadline: {opp.deadline}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="w-3 h-3 flex-shrink-0" />{opp.applicants.toLocaleString()} applicants</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle className="w-3 h-3 flex-shrink-0" />{opp.eligibility}</div>
                </div>
                <button onClick={() => toast.success(`Opening application for ${opp.title}`)} className="w-full py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 mt-auto">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => toast.info("Loading more opportunities...")} className="px-8 py-3.5 border border-border rounded-2xl text-sm font-semibold hover:bg-muted transition-colors">
              Load More Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Alert Subscription */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">Never Miss an <span className="gradient-text">Opportunity</span></h2>
            <p className="text-muted-foreground mb-8">Set up personalized alerts for scholarships, internships, and competitions that match your profile. Get notified before deadlines.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input placeholder="Enter your email" className="flex-1 px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button onClick={() => toast.success("Alert set up! You will be notified of new opportunities.")} className="px-6 py-3 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap">
                Set Up Alerts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Tips */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Application <span className="gradient-text">Success Tips</span></h2>
            <p className="text-muted-foreground">Increase your chances of winning scholarships and securing opportunities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📝", title: "Write a Compelling Essay", desc: "Your personal statement is the most critical part of any application. Be specific, authentic, and highlight your unique story.", tip: "Use the STAR method" },
              { icon: "⏰", title: "Apply Early", desc: "Most scholarships have rolling admissions. Early applicants often get more consideration and have time to fix errors.", tip: "Set deadline reminders" },
              { icon: "📋", title: "Keep Documents Ready", desc: "Prepare your marksheets, recommendation letters, income certificate, and ID proofs well in advance.", tip: "Maintain a folder" },
              { icon: "🎯", title: "Match Eligibility Precisely", desc: "Only apply for opportunities where you clearly meet all eligibility criteria. Mismatched applications are rejected instantly.", tip: "Read all requirements" },
              { icon: "🌟", title: "Highlight Achievements", desc: "Include extracurricular activities, competitions won, community service, and leadership roles in your application.", tip: "Quantify your impact" },
              { icon: "📬", title: "Follow Up Professionally", desc: "Send a thank-you email after interviews and politely follow up on pending applications after the stated timeline.", tip: "Be professional always" },
            ].map((tip, i) => (
              <div key={i} className="glass-card-premium rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-3">{tip.icon}</div>
                <h3 className="font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{tip.desc}</p>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">💡 {tip.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.12),_transparent_60%)]" />
            <div className="relative">
              <Zap className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">Find Opportunities Matched to Your Profile</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Sign up on EdNeed and let our AI match you with scholarships, internships, and competitions perfectly suited to your academic profile.</p>
              <Link to="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Briefcase icon usage
function Briefcase({ className }: { className?: string }) {
  return <Award className={className} />;
}
