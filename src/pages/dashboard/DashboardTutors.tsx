import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, Star, Clock, Search, Filter, Calendar, MessageSquare, Video, CheckCircle, MapPin, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const tutors = [
  { id: 1, name: "Dr. Vivek Agarwal", subject: "Physics", specialization: "JEE Advanced, Mechanics, Electrodynamics", rating: 4.9, reviews: 1240, students: 8500, hourlyRate: 800, sessionsDone: 3200, availability: "Available Today", verified: true, experience: "12 years", language: "Hindi, English", initials: "VA", color: "bg-blue-500" },
  { id: 2, name: "Dr. Priya Reddy", subject: "Biology", specialization: "NEET, Genetics, Human Physiology", rating: 4.8, reviews: 980, students: 6200, hourlyRate: 650, sessionsDone: 2800, availability: "Available Tomorrow", verified: true, experience: "8 years", language: "Telugu, English", initials: "PR", color: "bg-green-500" },
  { id: 3, name: "Prof. Sunit Kumar", subject: "Mathematics", specialization: "JEE Main, Calculus, Algebra, Coordinate Geometry", rating: 4.9, reviews: 2100, students: 12000, hourlyRate: 900, sessionsDone: 5600, availability: "Available Today", verified: true, experience: "18 years", language: "Hindi, English", initials: "SK", color: "bg-purple-500" },
  { id: 4, name: "Ms. Kavitha Nair", subject: "English", specialization: "Grammar, Verbal Ability, Writing Skills", rating: 4.7, reviews: 560, students: 3400, hourlyRate: 500, sessionsDone: 1800, availability: "Busy", verified: true, experience: "6 years", language: "Malayalam, English", initials: "KN", color: "bg-orange-500" },
  { id: 5, name: "Dr. Ananya Singh", subject: "Chemistry", specialization: "Organic Chemistry, NEET, JEE Chemistry", rating: 4.8, reviews: 1560, students: 9800, hourlyRate: 750, sessionsDone: 4100, availability: "Available Today", verified: true, experience: "10 years", language: "Hindi, English", initials: "AS", color: "bg-red-500" },
  { id: 6, name: "Mr. Rajesh Sharma", subject: "Quantitative Aptitude", specialization: "CAT, GMAT, Banking Exams", rating: 4.7, reviews: 820, students: 5500, hourlyRate: 600, sessionsDone: 2400, availability: "Available Tomorrow", verified: false, experience: "9 years", language: "Hindi, English", initials: "RS", color: "bg-teal-500" },
];

const subjects = ["All", "Physics", "Chemistry", "Biology", "Mathematics", "English", "Quantitative Aptitude"];

export default function DashboardTutors() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedTutor, setSelectedTutor] = useState<typeof tutors[0] | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [sessionType, setSessionType] = useState<"one_on_one" | "group">("one_on_one");
  const [showBooking, setShowBooking] = useState(false);

  const filtered = tutors.filter((t) => {
    const matchSubject = selectedSubject === "All" || t.subject === selectedSubject;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()) || t.specialization.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handleBook = () => {
    if (!bookingDate || !bookingTime) { toast.error("Please select a date and time"); return; }
    toast.success(`Session booked with ${selectedTutor?.name} on ${bookingDate} at ${bookingTime}!`);
    setShowBooking(false);
    setSelectedTutor(null);
    setBookingDate("");
    setBookingTime("");
  };

  if (selectedTutor && !showBooking) {
    return (
      <DashboardLayout title="Tutor Profile" subtitle={selectedTutor.subject + " Expert"}>
        <div className="max-w-3xl">
          <button onClick={() => setSelectedTutor(null)} className="text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors flex items-center gap-1">
            ← Back to Tutors
          </button>
          <div className="bg-card border border-border rounded-2xl p-6 mb-5">
            <div className="flex flex-col sm:flex-row gap-5 mb-6">
              <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0", selectedTutor.color)}>
                {selectedTutor.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold mb-0.5">{selectedTutor.name}</h2>
                    <p className="text-primary font-medium text-sm">{selectedTutor.subject} Expert</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedTutor.specialization}</p>
                  </div>
                  {selectedTutor.verified && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedTutor.rating}</span>
                    <span className="text-muted-foreground">({selectedTutor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>{selectedTutor.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedTutor.experience} experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{selectedTutor.sessionsDone.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Sessions Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">₹{selectedTutor.hourlyRate}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Per Hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{selectedTutor.language.split(",").length}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Languages</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-3">Teaching Languages</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTutor.language.split(",").map((l) => (
                  <span key={l} className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">{l.trim()}</span>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-3">Availability</h3>
              <div className={cn(
                "flex items-center gap-2 text-sm font-medium",
                selectedTutor.availability === "Busy" ? "text-destructive" : "text-accent"
              )}>
                <div className={cn("w-2 h-2 rounded-full", selectedTutor.availability === "Busy" ? "bg-destructive" : "bg-accent")} />
                {selectedTutor.availability}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowBooking(true)}
              className="flex-1 py-3 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Session
            </button>
            <button
              onClick={() => toast.success(`Message sent to ${selectedTutor.name}!`)}
              className="flex-1 py-3 border border-border rounded-xl font-semibold text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Message
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (showBooking && selectedTutor) {
    return (
      <DashboardLayout title="Book Session" subtitle={`Schedule with ${selectedTutor.name}`}>
        <div className="max-w-lg">
          <button onClick={() => setShowBooking(false)} className="text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors flex items-center gap-1">
            ← Back to Profile
          </button>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold", selectedTutor.color)}>
                {selectedTutor.initials}
              </div>
              <div>
                <div className="font-semibold">{selectedTutor.name}</div>
                <div className="text-sm text-muted-foreground">{selectedTutor.subject} · ₹{selectedTutor.hourlyRate}/hr</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Session Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "one_on_one" as const, label: "1-on-1 Session", icon: Video, price: selectedTutor.hourlyRate },
                  { val: "group" as const, label: "Group Class", icon: Users, price: Math.round(selectedTutor.hourlyRate * 0.4) },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setSessionType(opt.val)}
                    className={cn("p-4 rounded-xl border-2 text-left transition-all", sessionType === opt.val ? "border-primary bg-primary/5" : "border-border hover:border-primary/30")}
                  >
                    <opt.icon className="w-4 h-4 text-primary mb-2" />
                    <div className="text-sm font-medium">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">₹{opt.price}/hr</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setBookingTime(time)}
                    className={cn("py-2 rounded-lg text-xs font-medium border transition-all", bookingTime === time ? "gradient-primary text-white border-transparent" : "border-border hover:border-primary/30")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Session Duration</span>
                <span className="font-medium">60 minutes</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">₹{sessionType === "one_on_one" ? selectedTutor.hourlyRate : Math.round(selectedTutor.hourlyRate * 0.4)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-border mt-2">
                <span>Total</span>
                <span className="gradient-text">₹{sessionType === "one_on_one" ? selectedTutor.hourlyRate : Math.round(selectedTutor.hourlyRate * 0.4)}</span>
              </div>
            </div>

            <button onClick={handleBook} className="w-full py-3.5 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
              Confirm & Book Session
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Find Tutors" subtitle="Connect with 8,000+ verified subject experts">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tutors, subjects..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {subjects.map((s) => (
            <button key={s} onClick={() => setSelectedSubject(s)} className={cn("px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap border flex-shrink-0", selectedSubject === s ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((tutor) => (
          <div key={tutor.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
            <div className="flex items-start gap-4 mb-4">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0", tutor.color)}>
                {tutor.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm truncate">{tutor.name}</span>
                  {tutor.verified && <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />}
                </div>
                <p className="text-xs font-medium text-primary mb-0.5">{tutor.subject}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{tutor.specialization}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{tutor.rating} ({tutor.reviews})</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{(tutor.students / 1000).toFixed(1)}K students</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tutor.experience}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-base font-bold">₹{tutor.hourlyRate}</span>
                <span className="text-xs text-muted-foreground">/hour</span>
              </div>
              <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", tutor.availability === "Busy" ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400")}>
                {tutor.availability}
              </span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setSelectedTutor(tutor)} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity">
                View Profile
              </button>
              <button onClick={() => { setSelectedTutor(tutor); setShowBooking(true); }} className="flex-1 py-2.5 border border-primary text-primary rounded-xl text-xs font-semibold hover:bg-primary/5 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
