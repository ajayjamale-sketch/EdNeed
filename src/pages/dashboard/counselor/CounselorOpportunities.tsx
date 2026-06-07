import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Globe, Star, TrendingUp, Users, Briefcase, Map, Search, Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const opportunitiesAll = [
  { id: 1, title: "IIT Summer Research Fellowship", org: "IIT Bombay", type: "Fellowship", deadline: "Jun 20", match: 95, category: "Engineering", suitable: ["Arjun Iyer", "Siddharth Rao"] },
  { id: 2, title: "NEET Top 1000 Scholarship", org: "Ministry of Health", type: "Scholarship", deadline: "Jul 1", match: 88, category: "Medicine", suitable: ["Ananya Reddy"] },
  { id: 3, title: "CAT Coaching Scholarship", org: "IIM Calcutta", type: "Scholarship", deadline: "Jul 15", match: 82, category: "Management", suitable: ["Kavya Nair"] },
  { id: 4, title: "International Science Olympiad", org: "ISF Global", type: "Competition", deadline: "Aug 5", match: 90, category: "Science", suitable: ["Arjun Iyer"] },
  { id: 5, title: "Fulbright-Nehru Fellowship", org: "USIEF", type: "Study Abroad", deadline: "Nov 15", match: 78, category: "Higher Education", suitable: ["Siddharth Rao"] },
];

export default function CounselorOpportunities() {
  const [search, setSearch] = useState("");
  
  const [viewOpp, setViewOpp] = useState<any>(null);
  const [recommendOpp, setRecommendOpp] = useState<any>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

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

            <div className="flex gap-2 mt-4">
              <button onClick={() => setRecommendOpp(o)} className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">
                Recommend to Students
              </button>
              <button onClick={() => setViewOpp(o)} className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- View Opportunity Modal --- */}
      <Dialog open={!!viewOpp} onOpenChange={(open) => !open && setViewOpp(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Opportunity Details</DialogTitle>
          </DialogHeader>
          {viewOpp && (
            <div className="py-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{viewOpp.title}</h3>
                  <p className="text-sm text-muted-foreground">{viewOpp.org}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Type</div>
                  <div className="font-semibold text-sm">{viewOpp.type}</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Category</div>
                  <div className="font-semibold text-sm">{viewOpp.category}</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Match Score</div>
                  <div className="font-semibold text-sm text-primary">{viewOpp.match}% Match</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Deadline</div>
                  <div className="font-semibold text-sm">{viewOpp.deadline}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                This {viewOpp.type.toLowerCase()} is highly recommended for students focusing on {viewOpp.category}. 
                Based on your roster, {viewOpp.suitable.length > 0 ? `it matches well with ${viewOpp.suitable.join(", ")}.` : "you should consider recommending it to your high achievers."}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpp(null)}>Close</Button>
            {viewOpp && (
              <Button onClick={() => { setRecommendOpp(viewOpp); setViewOpp(null); }}>Recommend Opportunity</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Recommend Opportunity Modal --- */}
      <Dialog open={!!recommendOpp} onOpenChange={(open) => !open && setRecommendOpp(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Recommend Opportunity</DialogTitle>
          </DialogHeader>
          {recommendOpp && (
            <div className="py-2 space-y-4">
              <p className="text-sm text-muted-foreground">Select students to recommend <strong className="text-foreground">"{recommendOpp.title}"</strong> to:</p>
              <div className="space-y-2 border border-border rounded-xl p-3 max-h-[200px] overflow-y-auto">
                {["Rahul Mehta", "Ananya Reddy", "Siddharth Rao", "Kavya Nair", "Arjun Iyer"].map(student => (
                  <label key={student} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                      checked={selectedStudents.includes(student) || (recommendOpp.suitable.includes(student) && selectedStudents.length === 0)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedStudents([...selectedStudents, student]);
                        else setSelectedStudents(selectedStudents.filter(s => s !== student));
                      }}
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm font-medium">{student}</span>
                      {recommendOpp.suitable.includes(student) && <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">High Match</span>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRecommendOpp(null)}>Cancel</Button>
            <Button onClick={() => { 
              const count = selectedStudents.length || recommendOpp.suitable.length;
              toast.success(`Sent recommendation to ${count} students!`); 
              setRecommendOpp(null);
              setSelectedStudents([]);
            }} className="gap-2">
              <Send className="w-4 h-4" /> Send Recommendation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
