import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Globe, Star, TrendingUp, Users, Briefcase, Map, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const opportunitiesAll = [
  { id: 1, title: "IIT Summer Research Fellowship", org: "IIT Bombay", type: "Fellowship", deadline: "Jun 20", match: 95, category: "Engineering", suitable: ["Arjun Iyer", "Siddharth Rao"] },
  { id: 2, title: "NEET Top 1000 Scholarship", org: "Ministry of Health", type: "Scholarship", deadline: "Jul 1", match: 88, category: "Medicine", suitable: ["Ananya Reddy"] },
  { id: 3, title: "CAT Coaching Scholarship", org: "IIM Calcutta", type: "Scholarship", deadline: "Jul 15", match: 82, category: "Management", suitable: ["Kavya Nair"] },
  { id: 4, title: "International Science Olympiad", org: "ISF Global", type: "Competition", deadline: "Aug 5", match: 90, category: "Science", suitable: ["Arjun Iyer"] },
  { id: 5, title: "Fulbright-Nehru Fellowship", org: "USIEF", type: "Study Abroad", deadline: "Nov 15", match: 78, category: "Higher Education", suitable: ["Siddharth Rao"] },
];

export default function CounselorOpportunities() {
  const [search, setSearch] = useState("");

  const filtered = opportunitiesAll.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase()) ||
    o.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Opportunities" subtitle="Discover and recommend scholarships, internships, and programs for your students">
      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search opportunities..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((o, i) => (
          <div key={o.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{o.title}</h3>
                <p className="text-xs text-muted-foreground">{o.org}</p>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full flex-shrink-0 ml-2">{o.match}% match</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              <span className="bg-muted px-2 py-0.5 rounded-full">{o.type}</span>
              <span className="bg-muted px-2 py-0.5 rounded-full">{o.category}</span>
              <span className="text-muted-foreground">Deadline: {o.deadline}</span>
            </div>

            {o.suitable.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-muted-foreground mb-1">Recommended for:</div>
                <div className="flex flex-wrap gap-1">
                  {o.suitable.map((s) => <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => toast.success(`Recommending "${o.title}" to matched students!`)} className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">
                Recommend to Students
              </button>
              <button onClick={() => toast.success("Opening opportunity details...")} className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
