import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Search, Star, Users, Clock, Filter, MapPin, Video, MessageSquare,
  CheckCircle, ChevronRight, Award, BookOpen, Calendar, Zap, ArrowRight, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "History", "Economics", "Hindi"];
const modes = ["All Modes", "Online 1-on-1", "Group Classes", "Live Sessions", "Recorded"];

const tutors = [
  { id: 1, name: "Dr. Ravi Tiwari", subjects: ["Mathematics", "Statistics"], experience: "12 years", rating: 4.9, reviews: 1842, students: 3200, price: 800, mode: ["Online 1-on-1", "Group Classes"], badge: "Top Tutor", initials: "RT", color: "bg-blue-500", location: "Delhi", availability: "Today", bio: "IIT Delhi graduate with 12 years of JEE coaching experience. Helped 500+ students crack JEE Main and Advanced." },
  { id: 2, name: "Dr. Priya Sharma", subjects: ["Biology", "Chemistry"], experience: "10 years", rating: 4.8, reviews: 1205, students: 2100, price: 700, mode: ["Online 1-on-1", "Live Sessions"], badge: "NEET Expert", initials: "PS", color: "bg-emerald-500", location: "Mumbai", availability: "Tomorrow", bio: "AIIMS-qualified educator specializing in NEET preparation. Over 300 NEET qualifiers under her guidance." },
  { id: 3, name: "Ms. Ananya Singh", subjects: ["History", "Polity", "Economics"], experience: "8 years", rating: 4.9, reviews: 980, students: 1800, price: 900, mode: ["Online 1-on-1", "Group Classes"], badge: "UPSC Mentor", initials: "AS", color: "bg-purple-500", location: "Bangalore", availability: "Today", bio: "Former civil services aspirant turned mentor. Specializes in UPSC GS Paper 1 and 2 coaching." },
  { id: 4, name: "Mr. Arjun Nair", subjects: ["Computer Science", "Mathematics"], experience: "6 years", rating: 4.7, reviews: 2340, students: 5100, price: 600, mode: ["Live Sessions", "Recorded"], badge: "Tech Expert", initials: "AN", color: "bg-indigo-500", location: "Hyderabad", availability: "Today", bio: "Senior software engineer at Google turned educator. Teaches DSA, algorithms and competitive programming." },
  { id: 5, name: "Ms. Kavitha Nair", subjects: ["English", "Hindi"], experience: "9 years", rating: 4.6, reviews: 3120, students: 4200, price: 500, mode: ["Online 1-on-1", "Group Classes"], badge: "Language Expert", initials: "KN", color: "bg-teal-500", location: "Chennai", availability: "This Week", bio: "Literature graduate from JNU. Expert in English communication and creative writing for competitive exams." },
  { id: 6, name: "Dr. Vivek Kumar", subjects: ["Physics", "Mathematics"], experience: "15 years", rating: 4.9, reviews: 2890, students: 6200, price: 1000, mode: ["Online 1-on-1"], badge: "Physics Master", initials: "VK", color: "bg-orange-500", location: "Pune", availability: "Today", bio: "PhD in Physics from IISc Bangalore. Specializes in JEE Advanced level problem-solving and concept building." },
];

const stats = [
  { val: "2,500+", label: "Verified Tutors" },
  { val: "95%", label: "Satisfaction Rate" },
  { val: "50+", label: "Subjects Covered" },
  { val: "24/7", label: "Session Availability" },
];

export default function Tutors() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeMode, setActiveMode] = useState("All Modes");
  const [search, setSearch] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<typeof tutors[0] | null>(null);

  const filtered = tutors.filter((t) => {
    const matchSubject = activeSubject === "All" || t.subjects.includes(activeSubject);
    const matchMode = activeMode === "All Modes" || t.mode.includes(activeMode);
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchSubject && matchMode && matchSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-primary/5 to-background pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(262_83%_57%/0.08),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
              <Users className="w-4 h-4" /> 2,500+ Verified Educators
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-5">
              Find Your Perfect <span className="gradient-text">Personal Tutor</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with India's top educators for personalized 1-on-1 sessions, group classes, and live coaching tailored to your goals.
            </p>
          </div>
          <div className="max-w-2xl mx-auto flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tutors by name or subject..." className="w-full pl-12 pr-4 py-4 border border-border rounded-2xl bg-card shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={() => toast.info("Advanced filters")} className="px-5 py-4 border border-border rounded-2xl bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className="text-2xl font-bold text-primary">{s.val}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-background sticky top-16 z-30">
        <div className="container-custom py-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {subjects.map((s) => (
              <button key={s} onClick={() => setActiveSubject(s)} className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0", activeSubject === s ? "gradient-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {modes.map((m) => (
              <button key={m} onClick={() => setActiveMode(m)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 border", activeMode === m ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground")}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutor Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Available Tutors</h2>
              <p className="text-sm text-muted-foreground">{filtered.length} tutors found</p>
            </div>
            <select className="px-4 py-2 border border-border rounded-xl text-sm bg-background focus:outline-none">
              <option>Best Match</option>
              <option>Highest Rated</option>
              <option>Price: Low to High</option>
              <option>Most Students</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tutor) => (
              <div key={tutor.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0", tutor.color)}>{tutor.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm">{tutor.name}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tutor.badge}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{tutor.subjects.join(" · ")}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold">{tutor.rating}</span>
                      <span className="text-xs text-muted-foreground">({tutor.reviews})</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">{tutor.bio}</p>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-muted rounded-lg p-2"><div className="text-xs font-bold">{tutor.experience}</div><div className="text-[10px] text-muted-foreground">Experience</div></div>
                  <div className="bg-muted rounded-lg p-2"><div className="text-xs font-bold">{tutor.students.toLocaleString()}</div><div className="text-[10px] text-muted-foreground">Students</div></div>
                  <div className="bg-muted rounded-lg p-2"><div className="text-xs font-bold text-accent">₹{tutor.price}/h</div><div className="text-[10px] text-muted-foreground">Per Hour</div></div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />{tutor.location}
                  <span className="mx-1">·</span>
                  <Clock className="w-3 h-3" />Avail. {tutor.availability}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedTutor(tutor)} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity">
                    Book Session
                  </button>
                  <button onClick={() => toast.success(`Message sent to ${tutor.name}`)} className="w-10 h-10 border border-border rounded-xl flex items-center justify-center hover:bg-muted transition-colors flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => toast.info("Loading more tutors...")} className="px-8 py-3.5 border border-border rounded-2xl text-sm font-semibold hover:bg-muted transition-colors">
              Load More Tutors
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">How <span className="gradient-text">Tutoring Works</span></h2>
            <p className="text-muted-foreground">Start learning with your personal tutor in 4 simple steps</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Search, title: "Search & Discover", desc: "Browse verified tutors by subject, price, and availability" },
              { step: "02", icon: Video, title: "Book a Trial", desc: "Schedule a free 30-minute trial session to find the right fit" },
              { step: "03", icon: Calendar, title: "Schedule Sessions", desc: "Set up recurring sessions that fit your study timetable" },
              { step: "04", icon: Award, title: "Track Progress", desc: "Monitor improvement with detailed session reports and analytics" },
            ].map((step, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center relative">
                <div className="absolute -top-3 left-6 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{step.step}</div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Student <span className="gradient-text">Success Stories</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", grade: "JEE Advanced — AIR 142", text: "Dr. Ravi's personalized approach to calculus helped me crack JEE Advanced. His problem-solving techniques are unmatched.", tutor: "Dr. Ravi Tiwari", initials: "RS" },
              { name: "Priya Mehta", grade: "NEET — Score: 710/720", text: "Dr. Priya's biology sessions were incredibly thorough. Her concept maps made everything so clear and easy to revise.", tutor: "Dr. Priya Sharma", initials: "PM" },
              { name: "Arjun Nair", grade: "UPSC CSE — Rank 89", text: "Ms. Ananya's polity notes and daily current affairs sessions were the backbone of my UPSC preparation.", tutor: "Ms. Ananya Singh", initials: "AN" },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{t.initials}</div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-accent font-medium">{t.grade}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Tutored by <span className="text-primary font-medium">{t.tutor}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 lg:p-14 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.15),_transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Are You a Tutor or Teacher?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join EdNeed as an educator, create your profile, and start earning by teaching students across India.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                  Become a Tutor
                </Link>
                <Link to="/features" className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/20">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Book Session with {selectedTutor.name}</h3>
              <button onClick={() => setSelectedTutor(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Session Type</label>
                <select className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {selectedTutor.mode.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Preferred Date</label>
                <input type="date" className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Duration</label>
                <select className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>1 Hour — ₹{selectedTutor.price}</option>
                  <option>2 Hours — ₹{selectedTutor.price * 2}</option>
                  <option>Trial (30 min) — Free</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { toast.success(`Session booked with ${selectedTutor.name}!`); setSelectedTutor(null); }} className="flex-1 py-3 gradient-primary text-white rounded-xl text-sm font-bold hover:opacity-90">
                  Confirm Booking
                </button>
                <button onClick={() => setSelectedTutor(null)} className="flex-1 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
