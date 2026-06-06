import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Play, CheckCircle, Clock, Star, Filter, Search, RotateCcw, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const allCourses = [
  { id: 1, title: "JEE Mathematics - Complete Course", instructor: "Prof. Ramesh Kumar", progress: 68, lessons: 120, completed: 82, duration: "48h", category: "JEE Prep", rating: 4.9, color: "blue", status: "active" },
  { id: 2, title: "Physics for NEET & JEE", instructor: "Dr. Aisha Patel", progress: 42, lessons: 95, completed: 40, duration: "36h", category: "NEET Prep", rating: 4.8, color: "purple", status: "active" },
  { id: 3, title: "English Grammar Mastery", instructor: "Ms. Kavitha Nair", progress: 85, lessons: 60, completed: 51, duration: "22h", category: "Language", rating: 4.7, color: "green", status: "active" },
  { id: 4, title: "Organic Chemistry - Advanced", instructor: "Dr. Sanjay Mehta", progress: 31, lessons: 80, completed: 25, duration: "30h", category: "Chemistry", rating: 4.9, color: "orange", status: "active" },
  { id: 5, title: "UPSC General Studies - Paper 1", instructor: "Mr. Vikram Singh", progress: 100, lessons: 110, completed: 110, duration: "42h", category: "UPSC", rating: 5.0, color: "blue", status: "completed" },
  { id: 6, title: "Python for Data Science", instructor: "Ms. Preeti Sharma", progress: 100, lessons: 65, completed: 65, duration: "28h", category: "Tech Skills", rating: 4.8, color: "green", status: "completed" },
  { id: 7, title: "Calculus for Beginners", instructor: "Dr. Anuj Roy", progress: 0, lessons: 50, completed: 0, duration: "18h", category: "Mathematics", rating: 4.6, color: "purple", status: "not_started" },
  { id: 8, title: "Verbal Ability for CAT", instructor: "Ms. Neha Gupta", progress: 0, lessons: 45, completed: 0, duration: "16h", category: "CAT Prep", rating: 4.7, color: "orange", status: "not_started" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "In Progress", className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  not_started: { label: "Not Started", className: "bg-muted text-muted-foreground" },
};

export default function DashboardCourses() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof allCourses[0] | null>(null);

  const filtered = allCourses.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: allCourses.length,
    active: allCourses.filter((c) => c.status === "active").length,
    completed: allCourses.filter((c) => c.status === "completed").length,
    totalHours: allCourses.reduce((acc, c) => acc + parseInt(c.duration), 0),
  };

  if (selectedCourse) {
    return (
      <DashboardLayout title={selectedCourse.title} subtitle={`By ${selectedCourse.instructor}`}>
        <div className="max-w-4xl">
          <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            ← Back to My Courses
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              {/* Video Player Mock */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/40" />
                  <button
                    onClick={() => toast.success("Starting lecture: Introduction to Derivatives")}
                    className="relative z-10 w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Play className="w-7 h-7 text-white ml-1" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80 text-xs z-10">
                    <span>Lesson 56 / 120 — Introduction to Derivatives</span>
                    <span>32:15</span>
                  </div>
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold mb-4">Course Curriculum</h3>
                <div className="space-y-2">
                  {[
                    { title: "Limits & Continuity", lessons: 12, completed: true },
                    { title: "Differentiation Basics", lessons: 15, completed: true },
                    { title: "Applications of Derivatives", lessons: 10, completed: false, current: true },
                    { title: "Integration Techniques", lessons: 18, completed: false },
                    { title: "Definite Integrals", lessons: 14, completed: false },
                    { title: "Differential Equations", lessons: 12, completed: false },
                  ].map((section, i) => (
                    <div
                      key={i}
                      onClick={() => toast.success(`Opening: ${section.title}`)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors",
                        section.current ? "bg-primary/10 border border-primary/20" : "hover:bg-muted",
                        section.completed && "opacity-70"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {section.completed ? (
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        ) : (
                          <div className={cn("w-4 h-4 rounded-full border-2 flex-shrink-0", section.current ? "border-primary" : "border-border")} />
                        )}
                        <span className={cn("text-sm font-medium", section.current && "text-primary")}>{section.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {section.current && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Current</span>}
                        <span className="text-xs text-muted-foreground">{section.lessons} lessons</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold mb-4">Your Progress</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold gradient-text mb-1">{selectedCourse.progress}%</div>
                  <div className="text-sm text-muted-foreground">Course Complete</div>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${selectedCourse.progress}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-sm">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="font-bold">{selectedCourse.completed}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="font-bold">{selectedCourse.lessons - selectedCourse.completed}</div>
                    <div className="text-xs text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold mb-3">Course Details</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Duration", val: selectedCourse.duration },
                    { label: "Lessons", val: `${selectedCourse.lessons} lessons` },
                    { label: "Category", val: selectedCourse.category },
                    { label: "Rating", val: `${selectedCourse.rating}` },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{d.label}</span>
                      <span className="font-medium">{d.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toast.success("Resuming course...")}
                className="w-full py-3 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Resume Course
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Courses" subtitle="Track and continue your enrolled courses">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Enrolled", val: stats.total, icon: BookOpen, color: "blue" },
          { label: "In Progress", val: stats.active, icon: Play, color: "purple" },
          { label: "Completed", val: stats.completed, icon: CheckCircle, color: "green" },
          { label: "Total Hours", val: `${stats.totalHours}h`, icon: Clock, color: "orange" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", colorMap[s.color])}>
                <s.icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          {[
            { val: "all", label: "All" },
            { val: "active", label: "In Progress" },
            { val: "completed", label: "Completed" },
            { val: "not_started", label: "Not Started" },
          ].map((f) => (
            <button
              key={f.val}
              onClick={() => setFilter(f.val)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all border", filter === f.val ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold mb-1">No courses found</h3>
          <p className="text-sm text-muted-foreground mb-4">Try a different filter or search term</p>
          <Link to="/dashboard/marketplace" className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all card-hover cursor-pointer group"
              onClick={() => setSelectedCourse(course)}
            >
              <div className={cn("h-2", course.status === "completed" ? "bg-accent" : course.status === "active" ? "bg-primary" : "bg-muted")} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", colorMap[course.color])}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", statusConfig[course.status].className)}>
                    {statusConfig[course.status].label}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{course.rating}</span>
                </div>

                {course.status !== "not_started" && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-semibold text-primary">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", course.status === "completed" ? "bg-accent" : "bg-primary")} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}

                {course.status === "not_started" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toast.success(`Starting ${course.title}`); }}
                    className="w-full py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity mt-1"
                  >
                    Start Course
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
