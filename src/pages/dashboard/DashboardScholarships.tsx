import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, Calendar, Clock, DollarSign, Search, Filter, BookOpen, Globe, Trophy, Briefcase, CheckCircle, ArrowRight, Bell, ExternalLink, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const scholarships = [
  { id: 1, type: "Scholarship", icon: Award, title: "National Merit Scholarship", org: "Ministry of Education, India", amount: "₹1,20,000/year", deadline: "Jul 31, 2025", eligibility: "Class 10 pass with 80%+", category: "Government", difficulty: "Competitive", applied: false, saved: false },
  { id: 2, type: "Scholarship", icon: Star, title: "INSPIRE Scholarship", org: "DST, Government of India", amount: "₹80,000/year", deadline: "Aug 15, 2025", eligibility: "Top 1% in Class 12, Science stream", category: "Government", difficulty: "Very Competitive", applied: true, saved: true },
  { id: 3, type: "Internship", icon: Briefcase, title: "Summer Research Internship", org: "IIT Delhi", amount: "₹15,000/month + accommodation", deadline: "Jun 30, 2025", eligibility: "B.Tech/BSc students, CGPA 8.0+", category: "Research", difficulty: "Competitive", applied: false, saved: true },
  { id: 4, type: "Competition", icon: Trophy, title: "National Science Olympiad", org: "Science Olympiad Foundation", amount: "₹50,000 + Gold Medal", deadline: "Sep 10, 2025", eligibility: "Class 1-12 students", category: "Olympiad", difficulty: "Open", applied: false, saved: false },
  { id: 5, type: "Scholarship", icon: DollarSign, title: "Tata Scholarship for Higher Education", org: "Tata Trusts", amount: "Full tuition + stipend", deadline: "Oct 1, 2025", eligibility: "Family income < ₹5 LPA, merit-based", category: "Corporate", difficulty: "Competitive", applied: false, saved: false },
  { id: 6, type: "Internship", icon: Briefcase, title: "Google Student Developer Program", org: "Google India", amount: "₹25,000/month", deadline: "Jul 20, 2025", eligibility: "CS/IT students, coding skills required", category: "Tech", difficulty: "Very Competitive", applied: false, saved: false },
  { id: 7, type: "Fellowship", icon: Globe, title: "Fulbright-Nehru Study Abroad", org: "US-India Educational Foundation", amount: "Full scholarship to USA", deadline: "Nov 15, 2025", eligibility: "Indian citizens, postgraduate level", category: "Study Abroad", difficulty: "Highly Competitive", applied: false, saved: false },
  { id: 8, type: "Competition", icon: Trophy, title: "International Mathematics Olympiad", org: "IMO Foundation", amount: "Gold/Silver/Bronze Medals + Recognition", deadline: "Aug 31, 2025", eligibility: "Class 9-12 students", category: "Olympiad", difficulty: "Highly Competitive", applied: false, saved: false },
];

const typeColor: Record<string, string> = {
  Scholarship: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Internship: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Fellowship: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Competition: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
};

const difficultyColor: Record<string, string> = {
  "Open": "text-green-600",
  "Competitive": "text-blue-600",
  "Very Competitive": "text-orange-600",
  "Highly Competitive": "text-red-600",
};

const categories = ["All", "Government", "Corporate", "Research", "Olympiad", "Tech", "Study Abroad"];

export default function DashboardScholarships() {
  const [items, setItems] = useState(scholarships);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"discover" | "applied" | "saved">("discover");

  const filtered = items.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || s.category === category;
    const matchType = typeFilter === "All" || s.type === typeFilter;
    if (activeTab === "applied") return s.applied && matchSearch && matchCategory && matchType;
    if (activeTab === "saved") return s.saved && matchSearch && matchCategory && matchType;
    return matchSearch && matchCategory && matchType;
  });

  const toggleSave = (id: number, title: string) => {
    setItems((prev) => prev.map((s) => {
      if (s.id === id) {
        const saved = !s.saved;
        toast.success(saved ? `Saved: ${title}` : "Removed from saved");
        return { ...s, saved };
      }
      return s;
    }));
  };

  const apply = (id: number, title: string) => {
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, applied: true } : s));
    toast.success(`Application started for "${title}"! Check your email for next steps.`);
  };

  const daysLeft = (deadline: string) => {
    const d = new Date(deadline + ", 2025");
    const today = new Date();
    const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <DashboardLayout title="Scholarship & Opportunities" subtitle="Discover scholarships, internships, fellowships, and competitions">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { label: "Available", val: scholarships.length, icon: Star, color: "text-yellow-500" },
          { label: "Applied", val: scholarships.filter((s) => s.applied).length, icon: CheckCircle, color: "text-accent" },
          { label: "Saved", val: scholarships.filter((s) => s.saved).length, icon: BookOpen, color: "text-primary" },
          { label: "Deadline Soon", val: 3, icon: Calendar, color: "text-destructive" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <s.icon className={cn("w-4 h-4 mb-2", s.color)} />
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "discover" as const, label: "Discover" },
          { id: "applied" as const, label: `Applied (${scholarships.filter((s) => s.applied).length})` },
          { id: "saved" as const, label: `Saved (${scholarships.filter((s) => s.saved).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all border", activeTab === tab.id ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search opportunities..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["All", "Scholarship", "Internship", "Fellowship", "Competition"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)} className={cn("px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap border flex-shrink-0 transition-all", typeFilter === t ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground bg-muted")}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tags */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0", category === cat ? "gradient-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold mb-1">No opportunities found</h3>
          <p className="text-sm text-muted-foreground">Try different filters or check back later</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const days = daysLeft(item.deadline);
            return (
              <div key={item.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className={cn("text-xs font-bold px-2.5 py-0.5 rounded-full", typeColor[item.type])}>
                      {item.type}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSave(item.id, item.title)}
                    className={cn("w-7 h-7 rounded-lg border flex items-center justify-center transition-colors", item.saved ? "bg-primary text-white border-primary" : "border-border hover:bg-muted")}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-semibold text-sm mb-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.org}</p>

                <div className="space-y-1.5 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-accent flex-shrink-0" />
                    <span className="font-medium text-accent">{item.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Deadline: {item.deadline}</span>
                    {days <= 30 && <span className="text-destructive font-bold">{days}d left</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{item.eligibility}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{item.category}</span>
                  <span className={cn("text-xs font-semibold", difficultyColor[item.difficulty])}>{item.difficulty}</span>
                </div>

                {item.applied ? (
                  <div className="flex items-center justify-center gap-2 py-2.5 bg-accent/10 text-accent rounded-xl text-xs font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Application Submitted
                  </div>
                ) : (
                  <button
                    onClick={() => apply(item.id, item.title)}
                    className="w-full py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
