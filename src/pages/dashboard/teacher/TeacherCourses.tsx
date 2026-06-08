import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Plus, Edit, Trash2, Eye, Video, FileText, ToggleLeft, ToggleRight, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const initialCourses = [
  { id: 1, title: "Advanced Calculus for JEE", category: "JEE Prep", lessons: 120, students: 1842, rating: 4.9, revenue: 92100, status: "published", completionRate: 68 },
  { id: 2, title: "Physics Mechanics — NEET & JEE", category: "Physics", lessons: 95, students: 1205, rating: 4.8, revenue: 60250, status: "published", completionRate: 55 },
  { id: 3, title: "Differential Equations Mastery", category: "Mathematics", lessons: 60, students: 632, rating: 4.7, revenue: 31600, status: "published", completionRate: 40 },
  { id: 4, title: "IIT-JEE Problem Solving Workshop", category: "JEE Prep", lessons: 20, students: 0, rating: 0, revenue: 0, status: "draft", completionRate: 0 },
];

export default function TeacherCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("JEE Prep");
  const [editCourse, setEditCourse] = useState<any>(null);
  const [previewCourse, setPreviewCourse] = useState<any>(null);

  const toggleStatus = (id: number) => {
    setCourses((prev) => prev.map((c) => {
      if (c.id === id) {
        const s = c.status === "published" ? "draft" : "published";
        toast.success(`Course ${s === "published" ? "published" : "unpublished"}!`);
        return { ...c, status: s };
      }
      return c;
    }));
    // If the currently previewed course status is toggled, update its state too
    if (previewCourse && previewCourse.id === id) {
      setPreviewCourse((prev: any) => ({ ...prev, status: prev.status === "published" ? "draft" : "published" }));
    }
  };

  const deleteCourse = (id: number, title: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast.success(`Deleted: ${title}`);
  };

  const createCourse = () => {
    if (!newTitle.trim()) { toast.error("Enter a course title"); return; }
    const newCourse = { id: Date.now(), title: newTitle, category: newCategory, lessons: 0, students: 0, rating: 0, revenue: 0, status: "draft", completionRate: 0 };
    setCourses((prev) => [...prev, newCourse]);
    setNewTitle("");
    setShowForm(false);
    toast.success("New course created! Start adding lessons.");
  };

  const handleEditSave = () => {
    setCourses(courses.map(c => c.id === editCourse.id ? editCourse : c));
    toast.success("Course details updated!");
    // Update preview course if it is open
    if (previewCourse && previewCourse.id === editCourse.id) {
      setPreviewCourse(editCourse);
    }
    setEditCourse(null);
  };

  return (
    <DashboardLayout title="My Courses" subtitle="Create, manage, and publish your educational courses">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{courses.filter((c) => c.status === "published").length} Published</span>
          <span>{courses.filter((c) => c.status === "draft").length} Drafts</span>
          <span className="text-accent font-semibold">₹{courses.reduce((a, c) => a + c.revenue, 0).toLocaleString()} Total Revenue</span>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Create Course
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-primary/30 rounded-2xl p-5 mb-5">
          <h3 className="font-semibold mb-4">New Course</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1.5">Course Title</label>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Advanced Trigonometry" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Category</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                {["JEE Prep", "NEET Prep", "Mathematics", "Physics", "Chemistry", "Biology", "UPSC", "CAT Prep", "Coding", "Language"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={createCourse} className="px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Create & Start Adding Lessons</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold">{c.title}</h3>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{c.category}</span>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", c.status === "published" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300")}>
                      {c.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Video className="w-3 h-3" />{c.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students.toLocaleString()} students</span>
                    {c.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{c.rating}</span>}
                    {c.revenue > 0 && <span className="font-semibold text-accent">₹{c.revenue.toLocaleString()}</span>}
                  </div>
                  {c.status === "published" && c.students > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${c.completionRate}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{c.completionRate}% avg. completion</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleStatus(c.id)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors" title={c.status === "published" ? "Unpublish" : "Publish"}>
                  {c.status === "published" ? <ToggleRight className="w-4 h-4 text-accent" /> : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
                </button>
                <button onClick={() => setEditCourse(c)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors" title="Edit Course">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setPreviewCourse(c)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors" title="Preview Course">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteCourse(c.id, c.title)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors" title="Delete Course">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editCourse} onOpenChange={(open) => !open && setEditCourse(null)}>
        <DialogContent className="sm:max-w-[425px] bg-background">
          <DialogHeader>
            <DialogTitle>Edit Course Details</DialogTitle>
          </DialogHeader>
          {editCourse && (
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5">Course Title</label>
                <input 
                  value={editCourse.title} 
                  onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })} 
                  className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Category</label>
                <select 
                  value={editCourse.category} 
                  onChange={(e) => setEditCourse({ ...editCourse, category: e.target.value })} 
                  className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background"
                >
                  {["JEE Prep", "NEET Prep", "Mathematics", "Physics", "Chemistry", "Biology", "UPSC", "CAT Prep", "Coding", "Language"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCourse(null)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!previewCourse} onOpenChange={(open) => !open && setPreviewCourse(null)}>
        <DialogContent className="sm:max-w-[550px] bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> Course Preview
            </DialogTitle>
          </DialogHeader>
          {previewCourse && (
            <div className="py-4 space-y-6">
              {/* Header Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-muted px-2.5 py-1 rounded-full font-medium">{previewCourse.category}</span>
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", previewCourse.status === "published" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300")}>
                    {previewCourse.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading tracking-tight leading-tight text-foreground">{previewCourse.title}</h3>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-muted/40 border border-border">
                <div className="text-center sm:text-left">
                  <div className="text-xs text-muted-foreground">Lessons</div>
                  <div className="text-lg font-bold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                    <Video className="w-4 h-4 text-primary" /> {previewCourse.lessons}
                  </div>
                </div>
                <div className="text-center sm:text-left border-l border-border/60 pl-0 sm:pl-4">
                  <div className="text-xs text-muted-foreground">Students</div>
                  <div className="text-lg font-bold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                    <Users className="w-4 h-4 text-primary" /> {previewCourse.students.toLocaleString()}
                  </div>
                </div>
                <div className="text-center sm:text-left border-l border-border/60 pl-0 sm:pl-4">
                  <div className="text-xs text-muted-foreground">Rating</div>
                  <div className="text-lg font-bold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {previewCourse.rating > 0 ? previewCourse.rating : "N/A"}
                  </div>
                </div>
                <div className="text-center sm:text-left border-l border-border/60 pl-0 sm:pl-4">
                  <div className="text-xs text-muted-foreground">Revenue</div>
                  <div className="text-lg font-bold text-accent mt-0.5">
                    ₹{previewCourse.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Course Syllabus / Modules Preview */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Syllabus Curriculum (Preview)</h4>
                <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                  <div className="p-3 rounded-xl border border-border bg-card/50 flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-xs text-primary block mb-0.5">MODULE 1</span>
                      <span className="font-medium">Introduction & Core Fundamentals</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.max(1, Math.floor(previewCourse.lessons * 0.15))} Lessons</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-card/50 flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-xs text-primary block mb-0.5">MODULE 2</span>
                      <span className="font-medium">Intermediate Concepts & Problem Solving</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.max(1, Math.floor(previewCourse.lessons * 0.35))} Lessons</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-card/50 flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-xs text-primary block mb-0.5">MODULE 3</span>
                      <span className="font-medium">Advanced Applications & Mock Exams</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.max(1, Math.floor(previewCourse.lessons * 0.50))} Lessons</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex sm:justify-between items-center gap-2">
            {previewCourse && (
              <Button 
                variant="outline" 
                onClick={() => {
                  toggleStatus(previewCourse.id);
                }}
                className="w-full sm:w-auto"
              >
                {previewCourse.status === "published" ? "Unpublish Course" : "Publish Course"}
              </Button>
            )}
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditCourse(previewCourse);
                  setPreviewCourse(null);
                }}
              >
                Edit
              </Button>
              <Button onClick={() => setPreviewCourse(null)}>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
