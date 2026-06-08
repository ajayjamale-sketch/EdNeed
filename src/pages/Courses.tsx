import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search, Filter, Star, Users, Clock, Play, BookOpen, ChevronRight,
  Zap, Award, TrendingUp, ArrowRight, CheckCircle, Globe, User, Mail, Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = [
  "All", "JEE / NEET", "School Curriculum", "Skill Development",
  "Certifications", "Language Learning", "Competitive Exams", "Professional"
];

const courses = [
  { id: 1, title: "Complete JEE Mathematics — Calculus to Algebra", instructor: "Dr. Ravi Tiwari", rating: 4.9, reviews: 3241, students: 18420, duration: "240h", price: 4999, originalPrice: 9999, level: "Advanced", category: "JEE / NEET", tag: "Bestseller", color: "blue", lessons: 320 },
  { id: 2, title: "NEET Biology Full Preparation — Class 11 & 12", instructor: "Dr. Priya Sharma", rating: 4.8, reviews: 2890, students: 15300, duration: "180h", price: 3999, originalPrice: 7999, level: "Advanced", category: "JEE / NEET", tag: "Top Rated", color: "green", lessons: 240 },
  { id: 3, title: "Python Programming — Beginner to Expert", instructor: "Mr. Arjun Nair", rating: 4.7, reviews: 5421, students: 32000, duration: "80h", price: 1999, originalPrice: 3999, level: "Beginner", category: "Skill Development", tag: "Popular", color: "purple", lessons: 120 },
  { id: 4, title: "UPSC Civil Services — Complete Study Plan", instructor: "Ms. Ananya Singh", rating: 4.9, reviews: 1820, students: 9800, duration: "300h", price: 5999, originalPrice: 11999, level: "Advanced", category: "Competitive Exams", tag: "Bestseller", color: "orange", lessons: 480 },
  { id: 5, title: "English Communication & Grammar Mastery", instructor: "Ms. Kavitha Nair", rating: 4.6, reviews: 6230, students: 41000, duration: "60h", price: 999, originalPrice: 2499, level: "Intermediate", category: "Language Learning", tag: "Free Trial", color: "teal", lessons: 85 },
  { id: 6, title: "Data Science with Machine Learning", instructor: "Dr. Vivek Kumar", rating: 4.8, reviews: 4102, students: 22400, duration: "120h", price: 3499, originalPrice: 6999, level: "Intermediate", category: "Professional", tag: "New", color: "indigo", lessons: 160 },
  { id: 7, title: "Class 10 Science — Full CBSE Coverage", instructor: "Mr. Sanjay Mehta", rating: 4.7, reviews: 3890, students: 28000, duration: "100h", price: 1499, originalPrice: 2999, level: "Intermediate", category: "School Curriculum", tag: "Popular", color: "red", lessons: 140 },
  { id: 8, title: "Digital Marketing Certification Program", instructor: "Ms. Deepika Rao", rating: 4.5, reviews: 2100, students: 12400, duration: "45h", price: 2499, originalPrice: 4999, level: "Beginner", category: "Certifications", tag: "Certified", color: "yellow", lessons: 70 },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
  red: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
};

const tagColors: Record<string, string> = {
  "Bestseller": "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "Top Rated": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  "Popular": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "New": "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "Free Trial": "bg-accent/10 text-accent",
  "Certified": "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
};

const stats = [
  { icon: BookOpen, label: "Total Courses", val: "15,000+" },
  { icon: Users, label: "Students Enrolled", val: "5M+" },
  { icon: Award, label: "Certified Instructors", val: "2,500+" },
  { icon: Globe, label: "Languages", val: "12+" },
];

export default function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  
  // Real auth check – replace with your actual auth context / hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState<any>(null);
  const [payModalOpen, setPayModalOpen] = useState<any>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({ name: "", email: "", phone: "" });

  // Check login status on mount and when location changes (after redirect)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("edneed-user");
        setIsLoggedIn(!!user);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location.key]);

  // On mount, check if there's a pending enrollment in sessionStorage
  useEffect(() => {
    const pendingCourseStr = sessionStorage.getItem("pendingEnrollment");
    if (pendingCourseStr && isLoggedIn) {
      try {
        const pendingCourse = JSON.parse(pendingCourseStr);
        sessionStorage.removeItem("pendingEnrollment");
        setEnrollmentData({ name: "", email: "", phone: "" });
        setEnrollmentModalOpen(pendingCourse);
        toast.info(`Welcome back! Continue enrollment for "${pendingCourse.title}"`);
      } catch (e) {
        console.error("Failed to parse pending enrollment", e);
      }
    }
  }, [isLoggedIn]);

  const handleEnroll = (course: any) => {
    if (!isLoggedIn) {
      sessionStorage.setItem("pendingEnrollment", JSON.stringify(course));
      toast.info("Please register to enroll in this course");
      navigate("/register");
    } else {
      setEnrollmentData({ name: "", email: "", phone: "" });
      setEnrollmentModalOpen(course);
    }
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentData.name || !enrollmentData.email || !enrollmentData.phone) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success(`Welcome ${enrollmentData.name}! Enrollment details saved.`);
    setEnrollmentModalOpen(null);
    setPayModalOpen(enrollmentModalOpen);
    sessionStorage.removeItem("pendingEnrollment");
  };

  // Filter courses
  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort filtered courses based on sortBy
  const sortedCourses = useMemo(() => {
    const sorted = [...filtered];
    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => b.students - a.students);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort((a, b) => b.id - a.id); // assuming higher id = newer
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [filtered, sortBy]);

  return (
    <Layout>
      {/* Hero section unchanged */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(221_83%_53%/0.08),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" /> 15,000+ Courses Available
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-5 leading-tight">
              Learn Anything, <span className="gradient-text">Achieve Everything</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From JEE preparation to skill development — explore world-class courses taught by India's best educators and industry experts.
            </p>
          </div>
          {/* Search bar */}
          <div className="max-w-2xl mx-auto flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses, instructors, or topics..."
                className="w-full pl-12 pr-4 py-4 border border-border rounded-2xl bg-card shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <button onClick={() => setShowFilterModal(true)} className="px-5 py-4 border border-border rounded-2xl bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-background sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                  activeCategory === cat
                    ? "gradient-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section id="course-list-section" className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">{activeCategory === "All" ? "All Courses" : activeCategory}</h2>
              <p className="text-sm text-muted-foreground">{sortedCourses.length} courses found</p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCourses.map((course) => (
              <div
                key={course.id}
                className="glass-card-premium rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
              >
                <div className={cn("h-36 flex items-center justify-center relative", colorMap[course.color].split(" ").slice(0, 1).join(" ").replace("text-", "bg-").replace("-600", "-50").replace("bg-blue-50", "bg-blue-50").replace("bg-emerald-50", "bg-emerald-50"))}>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", colorMap[course.color])}>
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <span className={cn("absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg", tagColors[course.tag] || "bg-muted text-muted-foreground")}>
                    {course.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{(course.students / 1000).toFixed(0)}K</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Play className="w-3 h-3" />{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">₹{course.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handleEnroll(course)}
                      className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => toast.info("Loading more courses...")} className="px-8 py-3.5 border border-border rounded-2xl text-sm font-semibold hover:bg-muted transition-colors">
              Load More Courses
            </button>
          </div>
        </div>
      </section>

      {/* Learning Paths (simplified placeholder) */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-2">Structured Learning Paths</h2>
          <p className="text-muted-foreground">Coming soon – curated paths for JEE, NEET, UPSC and more</p>
        </div>
      </section>

      {/* Top Instructors (simplified placeholder) */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-2">Top Instructors</h2>
          <p className="text-muted-foreground">Learn from India's best educators</p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.12),_transparent_60%)]" />
            <div className="relative">
              <Zap className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">Start Learning Today for Free</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 5 million+ students already learning on EdNeed. Get access to 1,000+ free courses and trial classes.</p>
              <Link to="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM MODAL */}
      <Dialog open={!!enrollmentModalOpen} onOpenChange={(open) => !open && setEnrollmentModalOpen(null)}>
        <DialogContent className="sm:max-w-[450px] bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl">Enroll in Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEnrollmentSubmit}>
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">{enrollmentModalOpen?.title}</p>
                  <p className="text-xs text-muted-foreground">{enrollmentModalOpen?.instructor}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={enrollmentData.name}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={enrollmentData.email}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={enrollmentData.phone}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between gap-2">
              <Button type="button" variant="outline" onClick={() => setEnrollmentModalOpen(null)}>Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Continue to Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Filter Courses</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === activeCategory ? "default" : "outline"}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowFilterModal(false);
                }}
                className="w-full justify-start"
              >
                {cat}
              </Button>
            ))}
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setShowFilterModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={!!payModalOpen} onOpenChange={(open) => !open && setPayModalOpen(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl mb-1 text-foreground">₹{payModalOpen?.price.toLocaleString()}</h3>
            <p className="text-sm font-semibold mb-1 text-foreground">{payModalOpen?.title}</p>
            <p className="text-xs text-muted-foreground mb-4">By {payModalOpen?.instructor}</p>
            
            <div className="text-left bg-muted p-4 rounded-xl mb-4">
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Original Price</span><span className="font-medium line-through">₹{payModalOpen?.originalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Discount</span><span className="font-medium text-green-600">-₹{(payModalOpen?.originalPrice - payModalOpen?.price).toLocaleString()}</span></div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-border mt-2"><span>Total Amount</span><span>₹{payModalOpen?.price.toLocaleString()}</span></div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-medium text-left mb-2">Select Payment Method</p>
              <div className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer bg-primary/5 border-primary/30">
                <div className="w-4 h-4 rounded-full border-[5px] border-primary flex-shrink-0" />
                <span className="text-sm font-semibold">Credit/Debit Card</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-muted/50">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium text-muted-foreground">UPI / Google Pay</span>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setPayModalOpen(null)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Successfully enrolled in ${payModalOpen.title}!`); setPayModalOpen(null); }} className="bg-primary hover:bg-primary/90 text-white w-full">
              Pay ₹{payModalOpen?.price.toLocaleString()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}